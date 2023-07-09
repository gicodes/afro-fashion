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
  getFirestore,
  getDocs,
  query,
} from 'firebase/firestore'

// Import the config funcs you need from the SDKs
import { firebaseConfig } from './config';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(firebaseApp);

console.log(`analytics: ${analytics}`);

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
        ...additionalInformation={},
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

// Get Snapshot and Collection data with query
export const getCollectionAndDocuments = async () => {
  const myQuery = query(collection(db, "categories"));
  const querySnapshot = await getDocs(myQuery);

  const categoryMap = querySnapshot.docs.reduce(
    (acc, docSnapshot) => {
      const data = docSnapshot.data();
      if (data.title) {
        const { title, items } = data;
        acc[title.toLowerCase()] = items;
      }
      return acc;
    }, {}
  );

  return categoryMap;
}