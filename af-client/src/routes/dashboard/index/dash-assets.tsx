const date = new Date();
export const today = date.toLocaleString().split(",")[0];

export const blankAvi = "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="

export const getSellerRatingRemarks = (productCount: number, productSold: number) => {
  switch (true) {
    case productCount > 25 && productSold > 10:
      return { text: "Incredible! 🏆", color: "indigo" };
    case productCount < 25 && productSold > 5:
      return { text: "Amazing work! 🎉", color: "forestgreen" };
    case productCount < 6 && productSold > 3:
      return { text: "Good job! 🙌🏾", color: "darkgreen" };
    case productCount > 3 && productSold < 3:
      return { text: "Keep working 🙂", color: "darkblue" };
    case productCount < 3 && productSold === 0:
      return { text: "No sales yet", color: "red" };
    default:
      return { text: "No data", color: "black" };
  }
};