export function categoryTracker(items) {
  const categoryCount = {};

  // Helper function to count categories
  const trackCategories = (items) => {
    items.forEach(item => {
      const category = item?.category;
      if (category) categoryCount[category] = (categoryCount[category] || 0) + 1;
    });
  };

  // Track categories from either pastOrders or savedItems
  if (items && items.length > 0) {
    trackCategories(items);
  }

  return categoryCount;
}

export function sellerTracker(savedItems) {
  const sellerCount = {};
  
    // Helper function to count sellers
    const trackSellers = (items) => {
      items.forEach(item => {
        const seller = item?.seller;
        if (seller) sellerCount[seller] = (sellerCount[seller] || 0) + 1;
      });
    };
  
    // Track sellers from savedItems and pastOrders
    if (savedItems && savedItems.length > 0) {
      trackSellers(savedItems);
    }
  
    return sellerCount;
}