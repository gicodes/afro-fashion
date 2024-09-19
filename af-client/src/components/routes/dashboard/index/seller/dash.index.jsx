import { SellerPerformanceScore } from "../../seller/s-profile/s-performance";
import { SellerProfileCard } from "../../seller/s-profile/s-profile-card";
import { SellerCreateCard } from "../../seller/s-profile/s-create-card";
import { SellerProducts } from "../../seller/s-profile/s-products-card";
import { BrandContext } from "../../../../../contexts/brand.context";
import { UserContext } from "../../../../../contexts/user.context";
import { useAlert } from "../../../../../contexts/alert.context";
import { Button, CloseButton } from "react-bootstrap";
import PerformanceCard from "./seller-perf-card";
import { FaUserShield } from "react-icons/fa";
import { useState, useContext } from 'react';
import SellerCardIndex from "./seller-card";
import { Link } from "react-router-dom";

import "../../dashboard.styles.scss";
import PieUtilityCard from "../pie-card";

const Dashboard = () => {
  const { addAutoCloseAlert } = useAlert();
  const { brandsMap } = useContext(BrandContext);
  const { currentUser } = useContext(UserContext);
  const [ editItem, setEditItem ] = useState(false);
  const [ createItem, setCreateItem ] = useState(false);
  const [ editProfile, setEditProfile ] = useState(false);
  const { address, bank, bankAcct, bio, brandName, displayName, imageUrl, isVerified, phone, productCount, productSold, subscription, latestSubExpiry } = currentUser;

  const performanceScore = (SellerPerformanceScore(currentUser));
  const numberOfCategories = Object.keys(brandsMap[currentUser?.brandName] || {}).length;
  
  const toggleEditItem = () => setEditItem(!editItem);
  const toggleCreateItem = () => {
    if (!isVerified) {
      addAutoCloseAlert("warning", 'Verify your account to continue!'); 
      return
    } setCreateItem(!createItem);
  }
  const toggleEditProfile = () => setEditProfile(!editProfile)
  const restoreIndexDash = () => {
    setCreateItem(false);
    setEditProfile(false);
  }

  const RestoreIndexDash = () => (
    <div className="close-button">
      <CloseButton className="rounded-circle" onClick={restoreIndexDash}/>
    </div>
  )

  const ManageSubscription = () => (
    <Link to="/subscriptions">
      <FaUserShield size={25} fill="khaki"/>
    </Link>
  )

  const performanceRating = performanceScore < 5 ? "text-warning"
    : performanceScore < 25 && performanceScore >= 5 ? "text-white"
    : performanceScore < 60 && performanceScore >= 25 ? "text-ok"
    : "text-success";

  return (
    <div className="index-container">
      <div className="opening-text">
        <h6>Welcome Back, {displayName} &nbsp;🤝</h6>
      </div>

      <div className="body-container">
        { createItem && // if verified, show >>>
          <>
            <RestoreIndexDash />
            <SellerCreateCard />
          </>
        }
        { editProfile && <div className="col-md-6 mx-auto">
            <RestoreIndexDash />
            <SellerProfileCard 
              sellerName={displayName} 
              brandName={brandName}
              bio={bio}
              phone={phone} 
              address={address} 
              bankAcct={bankAcct}
              bank={bank}
              imageUrl={imageUrl}
              isVerified={isVerified}
            />
          </div>
        }
        <div className={createItem || editProfile ? "hidden" : "paper-container"}>
          <PerformanceCard 
            isVerified={isVerified}
            performanceRating={performanceRating}
            performanceScore={performanceScore}
            productCount={productCount}
            productSold={productSold}
            subscription={subscription}
            latestSubExpiry={latestSubExpiry}
            numberOfCategories={numberOfCategories}
            ManageSubscription={ManageSubscription}
          />
          <br/>
          
          <SellerCardIndex  
            displayName={displayName}
            brandName={brandName}
            address={address}
            bank={bank}
            bankAcct={bankAcct}
            bio={bio}
            imageUrl={imageUrl}
            phone={phone}
            toggleEditProfile={toggleEditProfile}
          />        
        </div>
        <br/>

        <div className={createItem || editProfile ? "hidden" : "action-container"}>
          <PieUtilityCard 
            productCount={productCount}
            productSold={productSold}
          />
          <br/>

          <div className="action-btn-group">
            <Button  
              onClick={toggleEditItem}
              className="p-action btn btn-warning"
            > 
              Edit Active Product 
            </Button>
            <div className="p-action">
              { editItem && <SellerProducts sellerName={displayName} /> }
            </div>
            <Button 
              onClick={toggleCreateItem} 
              className="p-action btn btn-secondary"
            >
              Create New Product
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard