import { db, firebaseApp } from './firebase.utils.ts';
import { deleteObject, getStorage, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection, doc, getDoc, serverTimestamp, updateDoc, writeBatch } from "firebase/firestore";

// Most of the following code functions use the Firebase SDK (version 9+) for modular approach: 
// Allowing tree shaking, type safety and smaller bundle sizes resulting in imporoved performance.

const storage = getStorage(firebaseApp);

// Critical function to create collections and documents
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  if (!collectionKey || !objectsToAdd) return;

  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const collDocRef = doc(collectionRef, object.name.toLowerCase());
    batch.set(collDocRef, object);
  });
  await batch.commit();
};

// Critical function to add or update user properties
export const updateUser = async (userId, inputField, value) => {  
  if (!userId || !inputField || !value) return;

  const collectionId = "users";

  try {
    const userRef = doc(collection(db, collectionId), userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const updateObject = {};
      updateObject[inputField] = value;
      
      await updateDoc(userRef, updateObject);
    } 
  } catch (err: any) {
    throw new Error(err.message);
  }
};

// Critical function to add or update seller properties
export const updateSeller = async (sellerId, inputField, value) => {
  if (!sellerId || !inputField || !value) return;
  const collectionId = "sellers";

  try {
    const sellerRef = doc(collection(db, collectionId), sellerId);
    const sellerDoc = await getDoc(sellerRef);

    if (sellerDoc.exists()) {
      const updateObject = {};
      updateObject[inputField] = value;

      await updateDoc(sellerRef, updateObject);
    } 
  } catch(err: any) {
    throw new Error(err.message);
  }
};

// Helper method to upload an image and obtain the image URL
export const uploadImageAndGetUrl = async (imageFile, itemId) => {
  if (!imageFile || !itemId) return;

  const imageRef = ref(storage, `image/${itemId}`);

  await uploadBytes(imageRef, imageFile);
  const imageUrl = await getDownloadURL(imageRef);

  return imageUrl;
};

// Critical function to create new product from seller action
export const addNewProduct = async (category, itemsToAdd) => {
  if (!category || !itemsToAdd) return;

  const batch = writeBatch(db);
  const collectionId = "categories";
  
  try {
    const categoryRef = doc(collection(db, collectionId), category);
    const categoryDoc = await getDoc(categoryRef);

    if (categoryDoc.exists()) {
      const existingItems = categoryDoc.data().items || [];
      const updatedItems = [...existingItems, itemsToAdd];

      batch.update(categoryRef, { 
        items: updatedItems,
        updatedAt: serverTimestamp()
      })      
      await batch.commit();
    } else { // create a new document if it does not exist
      batch.set(categoryRef, { 
        items: [itemsToAdd],
        updatedAt: serverTimestamp() 
      })
    }
  } catch (error) {
    console.error("Error updating category:", error);
  }
};

// Critical function to track seller subscription and add product count
export const countOkAddProduct = async (seller, sellerId) => {
  if (!seller || !sellerId) return;

  let maxProductCount;
  const subscription = seller?.subscription;
  let productCount = seller?.productCount || 0;

  switch (subscription) {
    case "basic":
      maxProductCount = 25;
      break;
    case "business":
      maxProductCount = 50;
      break;
    case "premium":
      maxProductCount = 100;
      break;
    default:
      maxProductCount = 5;
  }
  
  try {
    if (productCount < maxProductCount) {// check if the productCount is within seller subscription
      const sellerRef = doc(collection(db, "sellers"), sellerId);
      const sellerDoc = await getDoc(sellerRef)

      if (sellerDoc.exists())await updateDoc(sellerRef, { productCount: productCount +1 });   
      
      return true; 
    } else return null;
  } catch (err: any) {
    throw new Error("New item failed to add to Seller's Product Count", err.message);
  }
};

// Helper method for writing images to db collection
export const uploadProductImages = async (imagesArray: (Blob | ArrayBuffer | Uint8Array<ArrayBufferLike>)[], itemId: string) => {
  try {
    const imagesArrayConverted = Array.from(imagesArray);

    const uploadPromises = imagesArrayConverted.map(async (image: Blob | ArrayBuffer | Uint8Array<ArrayBufferLike>, i: number) => {
      const imageRef = ref(storage, `images/${itemId}_${i}`);
      await uploadBytes(imageRef, image);
      return getDownloadURL(imageRef);
    });

    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
  } catch (err) {
    throw err;
  }
};

// Helper method to edit items from a db collection
export const editSellerItem = async (category, itemId, updatedItem) => {
  if (!category || !itemId || !updatedItem) return;

  const batch = writeBatch(db);
  const collectionId = "categories";

  try {
    const categoryRef = doc(collection(db, collectionId), category);
    const categoryDoc = await getDoc(categoryRef);

    if (categoryDoc.exists()) {
      const existingItems = categoryDoc.data().items || [];
      const updatedItems = existingItems.map((item) => {
        if (item.id === itemId) {
          // validate properties in updatedItem before updating
          const { name, price, info } = updatedItem;

          if (name !== undefined && price !== undefined && info !== undefined) {
            return { ...item, name, price, info };
          } else throw new Error("Invalid properties in updatedItem");
        } else return item;
      })
      batch.update(categoryRef, { 
        items: updatedItems,
        updatedAt: serverTimestamp()
      });

      await batch.commit();
    } else {
      throw new Error("Category document not found");
    }
  } catch (err: any) {
    throw new Error(err.message);
  }
};

// Helper method to delete items from a db collection along with images from storage
export const deleteSellerItem = async (category, itemId) => {
  if (!category || !itemId) return;

  const batch = writeBatch(db);
  const collectionId = "categories";

  try {
    const categoryRef = doc(collection(db, collectionId), category);
    const categoryDoc = await getDoc(categoryRef);

    if (categoryDoc.exists()) {
      const existingItems = categoryDoc.data().items || [];
      const deletedItem = existingItems.find((item) => item.id === itemId);
      if (deletedItem) {
        await deleteImages(itemId, deletedItem.images);
        // update the database by removing the item
        const updatedItems = existingItems.filter((item) => item.id !== itemId);
        batch.update(categoryRef, { items: updatedItems });

        await batch.commit();
      } else throw new Error(`Item with ID ${itemId} not found in category ${category}`);
    } else throw new Error(`Category document ${category} not found`);
  } catch (err: any) {
    throw new Error(err.message);
  }
};

// Helper method to delete images from Firebase Storage
const deleteImages = async (itemId, imageUrls) => {
  if (!itemId) return;

  try {
    if (Array.isArray(imageUrls) && imageUrls.length > 0) {
      const promises = imageUrls.map(async (imageUrl) => {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
      });
      await Promise.all(promises);
    } else console.error(`No images provided for item with ID: ${itemId}. Skipping image deletion.`);
  } catch (err: any) {
    console.error(`Error deleting images for item with ID: ${itemId}.`, err);
    throw new Error(err.message);
  }
};

// Critical function to add or update items and orders to a users saved items
export const addToSavedItems = async (userId, newItems, docField) => {
  if (!userId) return;

  const collectionId = "users";
  const maxItems = 3;

  try {
    const userRef = doc(collection(db, collectionId), userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      if (docField === "savedItems"){
        const existingItems = userDoc.data().savedItems || [];
        const itemsArray = Array.isArray(newItems) ? newItems : [newItems]; 
        const updatedItems = [...existingItems, ...itemsArray];
        const trimmedItems = updatedItems.slice(-maxItems);

        await updateDoc(userRef, { savedItems: trimmedItems });
      } else
      if (docField === "orders") {
        const existingItems = userDoc.data().orders || [];
        const itemsArray = Array.isArray(newItems) ? newItems : [newItems];
        const updatedItems = [...existingItems, ...itemsArray];
        const trimmedItems = updatedItems.slice(-maxItems);

        await updateDoc(userRef, { orders: trimmedItems });
      }
    } else throw new Error('User document not found for userId');
  } catch (err: any) {
    console.error('Failed to update user doc:', err);
    throw new Error(err.message);
  }
}

// Critical function to reduce item count after a user purchases the item
export const reduceItemCount = async (item, sellerId) => {
  if (!item || !sellerId) return;
  const { id, quantity, count, category } = item;

  // check if the item has sufficient quantity available
  if (typeof count !== 'undefined' && count >= quantity) {
    const newCount = count - quantity;
    const updatedItem = { count: newCount };

    try {
      await editSellerItem(category, id, updatedItem);

      const sellerRef = doc(collection(db, "sellers"), sellerId);
      const sellerDoc = await getDoc(sellerRef);

      if (sellerDoc.exists()) {
        const sellerData = sellerDoc.data();
        const newProductsSold = (sellerData.productSold || 0) + quantity;

        await updateDoc(sellerRef, { productSold: newProductsSold });
      } else {
        throw new Error("Seller not found!");
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  } else {
    throw new Error("Insufficient quantity available!");
  }
};

// Critical function to remove items for users who dislike