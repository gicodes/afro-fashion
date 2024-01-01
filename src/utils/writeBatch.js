// can be modified for more seller-region specific CRUD logic
import { collection, doc, writeBatch, } from "firebase/firestore";

// create: upload documents and write to db collection
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const collDocRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(collDocRef, object);
  });

  await batch.commit();
};