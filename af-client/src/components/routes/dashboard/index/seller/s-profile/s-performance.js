export const SellerPerformanceScore = (currentUser) => {
    const {
      address,
      bank,
      bankAcct,
      bio,
      displayName,
      categoryCount = 0,
      imageUrl,
      isVerified,
      phone,
      productCount = 0,
      productSold = 0,
    } = currentUser;
  
    let score = 0;
  
    if (!isVerified) return score + 4; 
    score += 10;
  
    if (bank && bankAcct) score += 10;
    // Calculate points for productSold (5% each, max 10)
    score += Math.min(productSold * 5, 10);
    // Calculate points for productCount (1% each, max 10)
    score += Math.min(productCount * 1, 10);
    // Calculate points for categoryCount (2% each, max 5)
    score += Math.min(categoryCount * 2, 10);
  
    if (address) score += 2;
    if (bio) score += 2;
    if (imageUrl) score += 2;
    if (phone) score += 2;
    if (displayName) score += 2;
  
    return score;
  }