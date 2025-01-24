import React, {ReactNode, createContext, useEffect, useState, useCallback } from 'react';
import { onAuthStateChangedListener } from '../utils/firebase.utils.ts';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useLoading } from './loading.context.tsx';

interface UserContextType {
  currentUser: any;
  setCurrentUser: (user: any) => void;
  intendedRoute: string | null;
  setIntendedRoute: (route: string | null) => void;
}

export const UserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => null,
  intendedRoute: null,
  setIntendedRoute: () => null,
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [intendedRoute, setIntendedRoute] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const { showLoading, hideLoading } = useLoading();
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  // Memoized version of fetchUserData to prevent unnecessary re-creation
  const fetchUserData = useCallback(async (uid, collection) => {
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

  // Optimized fetchData function with early returns: minimal error handling
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
        setUserId(user.uid);
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
          setUserId(user.uid);
        } else setCurrentUser(null);
      }

      hideLoading(); // prevents prolonged & redudant state

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

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => fetchData(user));
    return () => unsubscribe();
  }, [fetchData]);

  const value = { userId, setCurrentUser, currentUser, setIntendedRoute, intendedRoute };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};