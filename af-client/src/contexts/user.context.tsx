import React, { ReactNode, createContext, useEffect, useState, useCallback } from 'react';
import { onAuthStateChangedListener } from '../utils/firebase.utils.ts';
import { getFirestore, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useLoading } from './loading.context.tsx';
import { useNavigate } from 'react-router-dom';

interface UserContextType {
  uid: string;
  currentUser: any;
  setCurrentUser: (user: any) => void;
  intendedRoute: string | null;
  setIntendedRoute: (route: string | null) => void;
}

const UserContext = createContext<UserContextType>({
  uid: '',
  currentUser: null,
  intendedRoute: null,
  setCurrentUser: () => null,
  setIntendedRoute: () => null,
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [intendedRoute, setIntendedRoute] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userId, setUserId] = useState<string>('');
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();

  // Memoized function to fetch user data
  const fetchUserData = useCallback(async (uid: string, collection: string) => {
    try {
      const firestore = getFirestore();
      const userDocRef = doc(firestore, collection, uid);
      const userSnapshot = await getDoc(userDocRef);
      return userSnapshot.exists() ? userSnapshot.data() : null;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  }, []);

  // Function to handle user data retrieval and setting state
  const fetchData = useCallback(async (user) => {
    if (!user) {
      setCurrentUser(null);
      return;
    }

    showLoading();
    const isVerified = user?.emailVerified;

    try {
      const userData = await fetchUserData(user.uid, 'users');

      if (userData) {
        setCurrentUser({
          displayName: userData.displayName,
          email: user.email,
          userType: userData.userType,
          bio: userData.bio || '',
          phone: userData.phone || '',
          address: userData.address || '',
          orders: userData.orders || '',
          savedItems: userData.savedItems || '',
          imageUrl: userData.imageUrl || '',
        });
        setUserId(user?.uid);
      } else {
        const sellerData = await fetchUserData(user.uid, 'sellers');

        if (sellerData) {
          setCurrentUser({
            createdAt: sellerData.createdAt,
            displayName: sellerData.displayName,
            email: user.email,
            userType: sellerData.userType,
            bio: sellerData.bio || '',
            brandName: sellerData.brandName || '',
            phone: sellerData.phone || '',
            address: sellerData.address || '',
            bankAcct: sellerData.bankAcct || '',
            bank: sellerData.bank || '',
            imageUrl: sellerData.imageUrl || '',
            isVerified: isVerified,
            productCount: sellerData.productCount,
            productSold: sellerData.productSold,
            rating: sellerData.rating,
            subscription: sellerData.subscription || null,
            latestSubAction: sellerData.latestSubAction,
            latestSubExpiry: sellerData.latestSubExpiry,
          });
          setUserId(user?.uid);
        } else {
          setCurrentUser(null);
        }
      }

      hideLoading();

      if (intendedRoute) {
        navigate(intendedRoute);
        setIntendedRoute(null);
      }
    } catch (error) {
      setCurrentUser(null);
    } finally {
      hideLoading();
    }
  }, [fetchUserData, intendedRoute, navigate, showLoading, hideLoading]);

  
  useEffect(() => {// listen for auth state changes
    const unsubscribe = onAuthStateChangedListener((user) => fetchData(user));
    return () => unsubscribe();
  }, [fetchData]);

  
  useEffect(() => {// listen for real-time updates to the authenticated user's document
    if (!userId) return; // only listen if a user is logged in
    
    const firestore = getFirestore();
    
    const userDocRef = doc(firestore, 'users', userId);
    const sellerDocRef = doc(firestore, 'sellers', userId);
  
    const unsubscribeUser = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const updatedUserData = docSnapshot.data();
        setCurrentUser((prevUser) => ({
          ...prevUser,
          ...updatedUserData,
        }));
      }
    });
  
    const unsubscribeSeller = onSnapshot(sellerDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const updatedSellerData = docSnapshot.data();
        setCurrentUser((prevUser) => ({
          ...prevUser,
          ...updatedSellerData,
        }));
      }
    });
  
    return () => {
      unsubscribeUser();
      unsubscribeSeller();
    };
  }, [userId]);  

  const value = { 
    uid: userId, 
    setCurrentUser, 
    currentUser, 
    setIntendedRoute, 
    intendedRoute 
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
