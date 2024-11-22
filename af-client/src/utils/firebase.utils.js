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
} from 'firebase/firestore'
import { firebaseConfig } from './config';
import { initializeApp } from "firebase/app";

const createdAt = new Date();

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
})

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const onAuthStateChangedListener = 
  (callback) => onAuthStateChanged(auth, callback)
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
        } catch (error) {
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
        } catch (error) {
          throw new Error("Error writing document: ", error);
        }
      }
    }

    return userCredential;
  } catch (error) {     
    throw new Error(error.message);
  }
}

// Get snapshot and collection data with query
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

// Get all items in every category
export const getAllItemsInCategories = async () => {
  const myQuery = query(collection(db, "categories"));
  const querySnapshot = await getDocs(myQuery);

  const allItems = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const data = docSnapshot.data();

    if (data.items) {
      acc.push(...data.items);
    }

    return acc;
  }, []);

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
  let sellerInfo = null;

  sellersSnapshot.forEach((sellerDoc) => {
    const sellerData = sellerDoc.data();

    sellerInfo = {
      bio: sellerData?.bio,
      phone: sellerData?.phone,
      address: sellerData?.address,
      email: sellerData?.email,
      imageUrl: sellerData?.imageUrl,
      sold: sellerData?.productSold
      // add more properties if needed
    };
  });

  return sellerInfo;
};

// Get snapshot and document data of sellers
export const getAllBrandNames = async () => {
  const brandNames = [];

  try {
    const sellersCollection = collection(db, 'sellers');
    const sellersSnapshot = await getDocs(sellersCollection);

    sellersSnapshot.forEach((sellerDoc) => {
      const brandName = sellerDoc.data().brandName;
      if (brandName) {
        brandNames.push(brandName);
    }})
  } catch (error) {
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

  let sellerBankInfo = null;

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

// get trending items from users collection by aggregating savedItems 
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
              itemMap[item.id].count++;
            } else {
              itemMap[item.id] = {
                id: item.id,
                name: item.name,
                price: item.price,
                imageUrl: item.imageUrl,
                count: 1, // initialize count
              };
            }
          }
        });
      }
    });

    // sort the items by count in descending order
    const trendingItemsArray = Object.values(itemMap).sort((a, b) => b.count - a.count);
    const topTrendingItems = trendingItemsArray.slice(0, 4);

    return topTrendingItems;
  } catch (error) {
    throw new Error(`Could not fetch trending items: ${error.message}`);
  }
};

// Get the latest items uploaded to categories collection
export const getLatestItems = async () => {
  try {
    const categoriesRef = collection(db, "categories");
    const categoriesSnapshot = await getDocs(categoriesRef);

    const latestItems = [];

    categoriesSnapshot.forEach(categoryDoc => {
      const categoryData = categoryDoc.data();

      if (categoryData && Array.isArray(categoryData.items)) {
        // Iterate over the items in each category
        categoryData.items.forEach(item => {
          if (item && item.name && item.price && Array.isArray(item.imageUrls)) {
            const updatedAt = item.updatedAt?.toDate
              ? item.updatedAt.toDate() // Convert Firestore Timestamp to Date
              : categoryDoc.updateTime?.toDate(); // Fallback to Firestore metadata

            latestItems.push({
              name: item.name,
              price: item.price,
              imageUrl: item.imageUrls[0] || null,
              updatedAt: updatedAt ? updatedAt.toISOString() : new Date().toISOString(), // Use ISO format for sorting
            });
          }
        });
      }
    });

    // Sort items by updatedAt descending
    const sortedItems = latestItems.sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );

    // Return the top 4 latest items
    return sortedItems.slice(0, 4);
  } catch (error) {
    console.error("Error fetching latest items:", error.message);
    throw new Error(`Could not fetch latest items: ${error.message}`);
  }
};

// Function to get the seller ID by brand name
export const getSellerId = async (seller) => {
  const sellersQuery = query(
    collection(db, "sellers"),
    where("brandName", "==", seller)
  );
  const sellersSnapshot = await getDocs(sellersQuery);
  let sellerId = null;

  // Get the seller ID from the snapshot
  sellersSnapshot.forEach((sellerDoc) => {
    sellerId = sellerDoc.id; // Get the document ID, which is the seller ID
  });

  return sellerId;
};
