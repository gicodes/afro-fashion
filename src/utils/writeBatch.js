// seller specific modules and dependencies from writeBatch to firestore
import { getStorage, ref,  getDownloadURL, uploadBytes } from 'firebase/storage';
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

      alert("You've successfully created products!");
    } else {
      throw new Error("Category document not found");
    }
  } catch (err) {
    console.error('Error during batch.set:', err);
    throw new Error(err.message);
  }
};

// upload images to Firebase Storage
export const uploadImages = async (imagesArray, itemId) => {
  const imageUrls = [];

  for (let i = 0; i < imagesArray.length; i++) {
    const image = imagesArray[i];
    const imageRef = ref(storage, `images/${itemId}_${i}`);
   
    await uploadBytes(imageRef, image);
    
    const imageUrl = await getDownloadURL(imageRef);
    imageUrls.push(imageUrl);
  }

  alert("Re: Images uploaded!")
  return imageUrls;
};