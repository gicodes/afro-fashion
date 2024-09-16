import { onAuthStateChangedListener } from '../utils/firebase.utils';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoading } from './loading.context';

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
  intendedRoute: null,
  setIntendedRoute: () => null,
});

export const UserProvider = ({ children }) => {
  const [intendedRoute, setIntendedRoute] = useState(null);
  const [ currentUser, setCurrentUser ] = useState(null);
  const { showLoading, hideLoading } = useLoading();
  const [ userId, setUserId ] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    showLoading()
  
    const fetchData = async (user) => {
      if (!user) {
        setCurrentUser(null);
        return;
      }
      const isVerified = user?.emailVerified;

      try {
        const userData = await fetchUserData(user?.uid, 'users');

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
              productCount: sellerData?.productCount,
              productSold: sellerData?.productSold,
              subscription: sellerData?.subscription || null,
              latestSubAction: sellerData?.latestSubAction,
              latestSubExpiry: sellerData?.latestSubExpiry,
              // add other properties if needed
            });
            setUserId(user.uid);
          } else setCurrentUser(null);  
        }

        if (intendedRoute) {
          showLoading();
          navigate(intendedRoute);
          setIntendedRoute(null);
          hideLoading();
        }
      } catch (error) {
        setCurrentUser(null);
        hideLoading();
      }
    };
    hideLoading();
    
    const unsubscribe = onAuthStateChangedListener(fetchData);
    return unsubscribe;
  }, [showLoading, hideLoading, intendedRoute, navigate]);

  const fetchUserData = async (uid, collection) => {
    const firestore = getFirestore();
    const userDocRef = doc(firestore, collection, uid);

    try {
      const userSnapshot = await getDoc(userDocRef);
      return userSnapshot.exists() ? userSnapshot.data() : null;
    } catch (error) { return null; }
  };

  const value = { userId, setCurrentUser, currentUser, setIntendedRoute, intendedRoute };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
