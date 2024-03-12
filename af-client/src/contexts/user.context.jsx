import { createContext, useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { onAuthStateChangedListener } from '../utils/firebase.utils';
import { useLoading } from './loading.context';

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [ currentUser, setCurrentUser ] = useState(null);
  const { showLoading, hideLoading } = useLoading();
  const [ userId, setUserId ] = useState("");

  useEffect(() => {
    showLoading()
  
    const fetchData = async (user) => {
      if (!user) {
        setCurrentUser(null);
        return;
      }

      const isVerified = user.emailVerified;

      try {
        const userData = await fetchUserData(user.uid, 'users');

        if (userData) {
          setCurrentUser({
            displayName: userData.displayName,
            email: user.email,
            userType: userData.userType,
            bio: userData?.bio || "",
            phone: userData?.phone || "",
            address: userData?.address || "",
            orders: userData?.orders || "",
            savedItems: userData?.savedItems || "",
            imageUrl: userData?.imageUrl || "",
            // add other properties if needed
          });
          setUserId(user.uid);
        } else {
          const sellerData = await fetchUserData(user.uid, 'sellers');

          if (sellerData) {
            setCurrentUser({
              displayName: sellerData.displayName,
              email: user.email,
              userType: sellerData.userType,
              bio: sellerData?.bio || "",
              brandName: sellerData?.brandName || "",
              phone: sellerData?.phone || "",
              address: sellerData?.address || "",
              bankAcct: sellerData?.bankAcct || "",
              bank: sellerData?.bank || "",
              imageUrl: sellerData?.imageUrl || "",
              isVerified: isVerified,
              products: sellerData?.products,
              subscription: sellerData?.subscription || null,
              latestSubAction: sellerData?.latestSubAction,
              latestSubExpiry: sellerData?.latestSubExpiry,
              // add other properties if needed
            });
            setUserId(user.uid);
          } else {
            setCurrentUser(null);
          }
        }
      } catch (error) {
        setCurrentUser(null);

        hideLoading();
      }
    };

    hideLoading();
    
    const unsubscribe = onAuthStateChangedListener(fetchData);
    return unsubscribe;
  }, [showLoading, hideLoading]);

  const fetchUserData = async (uid, collection) => {
    const firestore = getFirestore();
    const userDocRef = doc(firestore, collection, uid);

    try {
      const userSnapshot = await getDoc(userDocRef);
      return userSnapshot.exists() ? userSnapshot.data() : null;
    } catch (error) {
      return null;
    }
  };

  const value = { currentUser, setCurrentUser, userId };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};