// seller specific modules and dependencies from writeBatch to firestore
import { deleteObject, getStorage, ref,  getDownloadURL, uploadBytes } from 'firebase/storage';
import { collection, doc, getDoc, writeBatch } from "firebase/firestore";
import { db, firebaseApp } from "./firebase.utils";

const storage = getStorage(firebaseApp);

// create collections and documents in db
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const collDocRef = doc(collectionRef, object.name.toLowerCase());
    batch.set(collDocRef, object);
  });

  await batch.commit();
}

// create items and write images to db collection
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

    } else {
      throw new Error("Category document not found");
    }
  } catch (err) {
    console.error('Error during batch.set:', err);
    throw new Error(err.message);
  }
};

// helper function to upload images to Firebase Storage
export const uploadImages = async (imagesArray, itemId) => {
  const imageUrls = [];

  for (let i = 0; i < imagesArray.length; i++) {
    const image = imagesArray[i];
    const imageRef = ref(storage, `images/${itemId}_${i}`);
   
    await uploadBytes(imageRef, image);
    
    const imageUrl = await getDownloadURL(imageRef);
    imageUrls.push(imageUrl);
  }

  return imageUrls;
};

// edit items from a db collection
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
          // you can add additional validation logic as needed
          if (name !== undefined && price !== undefined && info !== undefined) {
            return { ...item, name, price, info };
          } else {
            throw new Error("Invalid properties in updatedItem");
          }
        } else {
          return item;
        }
      });

      batch.update(categoryRef, { items: updatedItems });
      await batch.commit();

    } else {
      throw new Error("Category document not found");
    }
  } catch (err) {
    console.error('Error during batch.update:', err);
    throw new Error(err.message);
  }
};


// delete items from a db collection along with images from storage
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
        // delete images from Firebase Storage
        await deleteImages(itemId, deletedItem.images);
        // update the database by removing the item
        const updatedItems = existingItems.filter((item) => item.id !== itemId);
        batch.update(categoryRef, { items: updatedItems });

        await batch.commit();
      } else {
        throw new Error(`Item with ID ${itemId} not found in category ${category}`);
      }
    } else {
      throw new Error(`Category document ${category} not found`);
    }
  } catch (err) {
    console.error('Error during batch.update:', err);
    throw new Error(err.message);
  }
};

// helper function to delete images from Firebase Storage
const deleteImages = async (itemId, imageUrls) => {
  try {
    if (imageUrls && imageUrls.length > 0) {
      const promises = imageUrls.map(async (imageUrl) => {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
      });

      await Promise.all(promises);
    }
  } catch (err) {
    console.error('Error during image deletion:', err);
    throw new Error(err.message);
  }
};