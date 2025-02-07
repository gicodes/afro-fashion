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
  where,
} from 'firebase/firestore';
import { firebaseConfig } from './config.ts';
import { initializeApp } from "firebase/app";

const createdAt = new Date();

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
})

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)
export const db = getFirestore(firebaseApp);

// Sign in user with Google Provider
export const signInWithGoogle = async () => {
  return await signInWithPopup(auth, googleProvider)
};

// Sign in user with Email and Password
export const signInWithEmail = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}

// Sign out user
export const SignOutUser = () => signOut(auth)

// Sign up user with Email and Password
export const customCreateUserWithEmail = async (
  email, 
  password, 
  displayName, 
  brandName,
  phone,
  userType
  ) => {
  try {
    // create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // check if user is a seller...
    if (userType === 'seller') {
      const sellerId = userCredential.user.uid;
      const sellerDocRef = doc(db, 'sellers', sellerId);
      const SellerSnapshot = await getDoc(sellerDocRef);

      if (!SellerSnapshot.exists()) {
        try {
          await setDoc(sellerDocRef, {
            email,
            createdAt,
            displayName,
            brandName,
            phone,
            userType,
          }); // ... store sellerDocRef in firestore
        } catch (error: any) {
          throw new Error("Error writing seller document: ", error);
        }
      }
    } else
    if (userType === "buyer") { 
      const userId = userCredential.user.uid;
      const userDocRef = doc(db, 'users', userId);
      const UserSnapshot = await getDoc(userDocRef);

      if (!UserSnapshot.exists()) {
        try {
          await setDoc(userDocRef, {
            email,
            createdAt,
            displayName,
            phone,
            userType,
          }); // ... store userDocRef in firestore
        } catch (error: any) {
          throw new Error("Error writing document: ", error);
        }
      }
    }

    return userCredential;
  } catch (error: any) {     
    throw new Error(error.message);
  }
}

// Get snapshot and collection data with query
export const getCategoriesCollection = async () => {
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

// Get all items in every category
export const getAllItemsInCategories = async () => {
  const myQuery = query(collection(db, "categories"));
  const querySnapshot = await getDocs(myQuery);

  const allItems = querySnapshot.docs.reduce((acc: any[], docSnapshot) => {
    const data = docSnapshot.data();

    if (data.items) {
      acc.push(...data.items);
    }

    return acc;
  }, [] as any[]);

  return allItems;
};

// Get a product by its ID
export const getProductById = async (productId) => {
  const allItems = await getAllItemsInCategories();
  const product = allItems.find(item => item.id === productId);

  return product;
};

// Get snapshot and collection data with sellers query
export const getItemsBySellers = async () => {
  const categoriesQuery = query(collection(db, "categories"));
  const categoriesSnapshot = await getDocs(categoriesQuery);

  const itemsBySeller = {};

  categoriesSnapshot.forEach((categoryDoc) => {
    const categoryData = categoryDoc.data();
    const categoryName = categoryData.title.toLowerCase();

    if (categoryData.items) {
      categoryData.items.forEach((item) => {
        const { seller, ...restOfItem } = item;

        if (seller) {
          const sellerKey = seller.toLowerCase();

          if (!itemsBySeller[sellerKey]) {
            itemsBySeller[sellerKey] = {};
          }
          if (!itemsBySeller[sellerKey][categoryName]) {
            itemsBySeller[sellerKey][categoryName] = [];
          }
          itemsBySeller[sellerKey][categoryName].push(restOfItem);
        }
    })}
  });

  return itemsBySeller;
};

// Get snapshot and document data with seller query
export const getSellerInfo = async (seller) => {
  const sellersQuery = query(
    collection(db, "sellers"),
    where("brandName", "==", seller),
  );
  const sellersSnapshot = await getDocs(sellersQuery);
  let sellerInfo: {
    bio: any;
    createdAt: any;
    phone: any;
    address: any;
    email: any;
    imageUrl: any;
    sold: any;
    rating: any;
    products: any;
  } | null = null;

  sellersSnapshot.forEach((sellerDoc) => {
    const sellerData = sellerDoc.data();

    sellerInfo = {
      bio: sellerData?.bio,
      createdAt: sellerData?.createdAt,
      phone: sellerData?.phone,
      address: sellerData?.address,
      email: sellerData?.email,
      imageUrl: sellerData?.imageUrl,
      sold: sellerData?.productSold,
      rating: sellerData?.rating,
      products: sellerData?.productCount,
      // bank && bankAcct data are unavailable
      // add more data if needed
    };
  });

  return sellerInfo;
};

// Get snapshot and document data of sellers
export const getAllBrandNames = async () => {
  const brandNames: string[] = [];

  try {
    const sellersCollection = collection(db, 'sellers');
    const sellersSnapshot = await getDocs(sellersCollection);

    sellersSnapshot.forEach((sellerDoc) => {
      const brandName = sellerDoc.data().brandName;
      if (brandName) {
        brandNames.push(brandName);
    }})
  } catch (error: any) {
    throw new Error("Something went wrong:", error.message)
  }

  return brandNames;
};

// Get seller bank information for payment processing
export const getSellerBankInfo = async (seller) => {
  const sellersQuery = query(
    collection(db, "sellers"),
    where("brandName", "==", seller),
  );
  const sellersSnapshot = await getDocs(sellersQuery);

  let sellerBankInfo: {
    account_bank: null,
    account_number: null,
  } | null = null;

  sellersSnapshot.forEach((sellerDoc) => {
    const sellerData = sellerDoc.data();
    const bank = sellerData?.bank
    const bankAcct = sellerData?.bankAcct

    if (bank && bankAcct) {
      sellerBankInfo = {
        account_bank: bank,
        account_number: bankAcct,
      };
    } else throw new Error("Error finding bank account info!")
  });

  return sellerBankInfo;
};

// Get trending items from users collection by aggregating users savedItems 
export const getTrendingItems = async () => {
  try {
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);
    const itemMap = {};

    snapshot.forEach(doc => {
      const savedItems = doc.data().savedItems;
      if (Array.isArray(savedItems)) {
        savedItems.forEach(item => {
          if (item.id) {
            if (itemMap[item.id]) {
              itemMap[item.id].usersSavedCount++;
            } else {
              itemMap[item.id] = {
                id: item.id,
                name: item.name,
                price: item.price,
                imageUrl: item.imageUrl || item.imageUrls,
                usersSavedCount: 1, // set default usersSavedCount to 1
              };
            }
          }
        });
      }
    });

    // sort the items by usersSavedCount in descending order
    const trendingItemsArray = Object.values(itemMap).sort((a: any, b: any) => b.usersSavedCount - a.usersSavedCount);
    const topTrendingItems = trendingItemsArray.slice(0, 4);

    return topTrendingItems;
  } catch (error: any) {
    throw new Error(`Could not fetch trending items: ${error.message}`);
  }
};

// Get the latest items uploaded to categories collection
export const getLatestItems = async () => {
  try {
    const categoriesRef = collection(db, "categories");
    const categoriesSnapshot = await getDocs(categoriesRef);
    const latestItemsMap = {}; 

    categoriesSnapshot.forEach(categoryDoc => {
      const { items } = categoryDoc.data();

      if (Array.isArray(items)) {
        items.forEach(item => {
          const imageUrl = item.imageUrls && item.imageUrls.length > 0 ? item.imageUrls[0] : null;
          // fallback to document createTime if updatedAt is missing
          const itemUpdatedAt = item?.updatedAt 
            ? new Date(item.updatedAt.seconds * 1000) // convert Firestore Timestamp to Date
            : categoryDoc.metadata.hasPendingWrites ? new Date() : categoryDoc.data().createdAt.toDate(); // fallback to document createTime
          if (!latestItemsMap[item.id] || itemUpdatedAt > latestItemsMap[item.id].updatedAt) {
            latestItemsMap[item.id] = {
              id: item.id,
              name: item.name,
              price: item.price,
              imageUrl: imageUrl,
              updatedAt: itemUpdatedAt,
            };
          }
        });
      }
    });

    // convert latestItemsMap to an array and sort by updatedAt descending
    const latestItemsArray = Object.values(latestItemsMap).sort(
      (a: any, b: any) => b.updatedAt - a.updatedAt
    );
    const topLatestItems = latestItemsArray.slice(0, 4);
    return topLatestItems;
  } catch (error: any) {
    console.error("Error fetching latest items:", error);
    throw new Error(`Could not fetch latest items: ${error.message}`);
  }
};

// Function to get the seller ID by brand name
export const getSellerId = async (seller) => {
  const sellersQuery = query(collection(db, "sellers"),
    where("brandName", "==", seller) );

  const sellersSnapshot = await getDocs(sellersQuery);
  let sellerId: any | null = null;

  sellersSnapshot.forEach((sellerDoc) => {  // get the seller ID from the snapshot
    sellerId = sellerDoc.id; // get the document ID, which is the seller ID
  });
  return sellerId;
};
