import {
  signOut,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import {
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  getFirestore,
  getDocs,
  query,
} from 'firebase/firestore'

// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration; For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBacXMUN6quLM_iCmS9l2IBA-EeuZvchhk",
  authDomain: "wendys-co-db.firebaseapp.com",
  projectId: "wendys-co-db",
  storageBucket: "wendys-co-db.appspot.com",
  messagingSenderId: "539850203617",
  appId: "1:539850203617:web:375e1faeb2f537eb7f72a0",
  measurementId: "G-J9Q3VLGVJF"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
console.log('...analytics', analytics)

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth();

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback)

// Sign out user
export const SignOutUser = () => { signOut(auth) };

// Sign in user with Google Provider
export const signInWithGoogle = async () => {
  return await signInWithPopup(auth, googleProvider)
};

// Sign in user with Email and Password
export const signInWithEmail = async (email, password) => {
  if (!email || !password) return

  return await signInWithEmailAndPassword(auth, email, password);
}

export const db = getFirestore();

// Sign up user with Google Snapshot
export const createUserDocFromAuth = async (
  userAuth,
  additionalInformation = {},
) => {
  const userDocRef = doc(db, 'usersColl', userAuth.uid)
  const UserSnapshot = await getDoc(userDocRef)

  if (!UserSnapshot.exists()) {
    const { email, displayName } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        email,
        createdAt,
        displayName,
        ...additionalInformation,
      });
    }
    catch (error) {
      console.log(error.message);
    }
  }

  return userDocRef;
}

// Sign up user with Email and Password
export const createAuthUserWithEmailandPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const collDocRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(collDocRef, object);
  });

  await batch.commit();
};

export const getCollectionAndDocuments = async () => {
  const collectionRef = collection(db, 'categories')
  const myQue = query(collectionRef);
  const querySnapshot = await getDocs(myQue);

  const categoryMap = querySnapshot.docs.reduce(
    (acc, docSnapshot) => {
      const { title, items } = docSnapshot.data();
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})

  return categoryMap;
}