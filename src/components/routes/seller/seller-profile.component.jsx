
import SellerProfileCard from "./profile-card.component";
import './seller.scss'



const Seller = () => {
  // const location = useLocation();

  // useEffect(() => {
  //   // Check if there is stored seller profile information
  //   const storedSellerProfile = localStorage.getItem("sellerProfile");

  //   if (storedSellerProfile) {
      
  //     const sellerProfile = JSON.parse(storedSellerProfile);
  //     localStorage.removeItem("sellerProfile");
  //   }
  // }, []);

  // Use state or Redux to manage the sellerProfile state if needed
  const sellerProfile = {}; 
  return (
    <div className="seller-container">
      <h1 className="text-white text-center"> Welcome To Your Seller Profile</h1>
      <SellerProfileCard sellerProfile={sellerProfile} />
    </div>
  );
};

export default Seller;
