import { deleteObject, getStorage, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection, doc, getDoc, updateDoc, writeBatch } from "firebase/firestore";
import { db, firebaseApp } from "./firebase.utils";

// Most of the following code functions use the Firebase SDK (version 9+) for modular approach: 
// Allowing tree shaking, type safety and smaller bundle sizes resulting in imporoved performance.

const storage = getStorage(firebaseApp);

// General method to create collections and documents
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const collDocRef = doc(collectionRef, object.name.toLowerCase());
    batch.set(collDocRef, object);
  });
  await batch.commit();
};

// Add or update user properties
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
  } catch (err) {
    throw new Error(err.message);
  }
};

// Add or update seller properties
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
  } catch(err) {
    throw new Error(err.message);
  }
};

// Create seller items
export const addSellerItems = async (category, itemsToAdd) => {
  const batch = writeBatch(db);
  const collectionId = "categories";
  
  try {
    const categoryRef = doc(collection(db, collectionId), category);
    const categoryDoc = await getDoc(categoryRef);

    if (categoryDoc.exists()) {
      const existingItems = categoryDoc.data().items || [];
      const updatedItems = [...existingItems, itemsToAdd];
      
      batch.update(categoryRef, { items: updatedItems });
      await batch.commit();

    } else throw new Error("Category document not found");
  } catch (err) {
    throw new Error(err.message);
  }
};

// Create seller items helper: writing images to db collection
export const uploadProductImages = async (imagesArray, itemId) => {
  try {
    const imagesArrayConverted = Array.from(imagesArray);

    const uploadPromises = imagesArrayConverted.map(async (image, i) => {
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

// Helper method to upload an image and obtain the image URL
export const uploadImageAndGetUrl = async (imageFile, itemId) => {
  const imageRef = ref(storage, `image/${itemId}`);

  await uploadBytes(imageRef, imageFile);
  const imageUrl = await getDownloadURL(imageRef);

  return imageUrl;
};

// Edit items from a db collection
export const editSellerItem = async (category, itemId, updatedItem) => {
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
      batch.update(categoryRef, { items: updatedItems });

      await batch.commit();
    } else {
      throw new Error("Category document not found");
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

// Delete items from a db collection along with images from storage
export const deleteSellerItem = async (category, itemId) => {
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
  } catch (err) {
    throw new Error(err.message);
  }
};

// Helper method to delete images from Firebase Storage
const deleteImages = async (imageUrls) => {
  try {
    if (imageUrls && imageUrls.length > 0) {
      const promises = imageUrls.map(async (imageUrl) => {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
      })

      await Promise.all(promises);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

// Critical function to track seller subscription and product count
export const sellerProductCount = async (seller, sellerId) => {
  let maxProductCount;
  let productCount = seller?.productCount || 0; 
  const subscription = seller?.subscription;

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
  
  if (productCount < maxProductCount) { // check if the productCount is within seller subscription
    productCount++;

    const sellerRef = doc(collection(db, "sellers"), sellerId);
    const sellerDoc = await getDoc(sellerRef)

    if (sellerDoc.exists()){
      try {
        await updateDoc(sellerRef, { productCount: productCount })
      } catch (err) {
        throw new Error(err.message);
      }
    }

    return true;
  } else return null;
};

// Add or update items and orders to a users saved items
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
    } else throw new Error('User document not found for userId: ' + userId);
  } catch (err) {
    console.error('Failed to update user doc:', err);
    throw new Error(err.message);
  }
}

// reduce item count after a user purchases the item
export const reduceItemCount = async (item) => {
  const { id, quantity, count, category } = item;

  if (typeof count !== 'undefined' && count >= quantity) {
    const newCount = count - quantity;
    
    const updatedItem = { count: newCount };

    await editSellerItem(category, id, updatedItem);
  } else {
    throw new Error("Insufficient quantity available!");
  }
};

// deprecate item appearance for users who dislike an item