// seller specific modules and dependencies from writeBatch to firestore
import { getStorage, ref,  getDownloadURL, uploadBytes } from 'firebase/storage';
import { collection, doc, writeBatch } from "firebase/firestore";
import { db, firebaseApp } from "./firebase.utils";

const storage = getStorage(firebaseApp);
const batch = writeBatch(db);

// create collections and documents in db
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);

  objectsToAdd.forEach((object) => {
    const collDocRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(collDocRef, object);
  });

  await batch.commit();
}

// upload images to Firebase Storage
const uploadImages = async (imagesArray, itemId) => {
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

// create items and write images to db collection
export const addSellerItems = async (category, itemsToAdd) => {
  const categoryRef = doc(collection(db, 'categories'), category);

  for (let i = 0; i < itemsToAdd.length; i++) {
    const item = itemsToAdd[i];
    const itemDocRef = doc(categoryRef, 'items', item.id);

    // create a new batch for each iteration
    const batch = writeBatch(db);
    // upload images and get download URLs
    const imageUrls = await uploadImages(item.images, item.id);
    // set item data in Firestore
    batch.set(itemDocRef, { ...item, images: imageUrls });

    await batch.commit();
  };
}