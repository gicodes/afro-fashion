import  BrandContext  from "../../../../contexts/brand.context.tsx";
import { UserContext } from "../../../../contexts/user.context.tsx";
import { SellerPerformanceScore } from "./s-profile/s-performance.ts";
import { useAlert } from "../../../../contexts/alert.context.tsx";
import { SellerProfileCard } from "./s-profile/s-profile-card.tsx";
import { SellerCreateCard } from "./s-profile/s-create-card.tsx";
import { SellerProducts } from "./s-profile/s-products-card.tsx";
import { Button, CloseButton } from "react-bootstrap";
import PerformanceCard from "./seller-perf-card.tsx";
import { FaUserShield } from "react-icons/fa";
import React, { useState, useContext } from 'react';
import SellerCardIndex from "./seller-card.tsx";
import PieUtilityCard from "../pie-card.tsx";
import { Link } from "react-router-dom";
import { Paper } from "@mui/material";

import "../../dashboard.styles.scss";

const Dashboard: React.FC = () => {
  const { addAutoCloseAlert } = useAlert();
  const brandContext = useContext(BrandContext);
  const brandItemsMap = brandContext?.brandItemsMap || {};
  const { currentUser } = useContext(UserContext);
  const [ editItem, setEditItem ] = useState(false);
  const [ createItem, setCreateItem ] = useState(false);
  const [ editProfile, setEditProfile ] = useState(false);
  const { address, bank, bankAcct, bio, brandName, displayName, imageUrl, isVerified, phone, productCount, productSold, subscription, latestSubExpiry } = currentUser;

  const performanceScore = (SellerPerformanceScore(currentUser));
  const numberOfCategories = Object.keys(brandItemsMap[currentUser?.brandName] || {}).length;
  
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
    <div>
      <Link to="/subscriptions" className="flex-just-center">
        <FaUserShield size={25} fill="khaki"/>
      </Link>
      <span className="spc-manage-sub text-white">
        Manage Subscription
      </span>
    </div>
  )

  const performanceRating = performanceScore < 5 ? "text-warning"
    : performanceScore < 25 && performanceScore >= 5 ? "text-white"
    : performanceScore < 60 && performanceScore >= 25 ? "text-ok"
    : "text-success";

  return (
    <div className="dash-index-container">
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
        { editProfile && <div className="col-md-8 mx-auto">
            <RestoreIndexDash />
            <div className="flex-just-center">
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
          </div>
        }
        <div 
          className={
            createItem || editProfile ? "hidden" : "paper-container"
        }>
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
            products={undefined} 
            sold={undefined}          
          />        
        </div>
        <br/>

        <div className={createItem || editProfile ? "hidden" : "action-container"}>
          <PieUtilityCard 
            productCount={productCount || 0}
            productSold={productSold || 0} 
            userData={[]}          
          />
          <br/>

          <div className="action-btn-group">
            <Paper elevation={4}>
              <div className="p-1">
              <div className="container m-3 px-1">
                <p className="text-black"> Manage Inventory </p>
              </div>
                <hr/>
                <div 
                  onClick={toggleCreateItem} 
                  className="p-action btn text-success"
                >
                  Create New Product
                </div>
                <Button  
                  onClick={toggleEditItem}
                  className="p-action btn btn-warning"
                > 
                  Edit Active Product 
                </Button>
                {/* Number 3: edit/ delete products lists */}
                <div className="p-action">
                  { editItem && <SellerProducts sellerName={brandName} /> }
                </div>
                <Button // dummy/ disabled button
                  className="btn-secondary mt-1 w-100"
                >
                  ...
                </Button>
                <Button // dummy/ disabled button 2
                  className="btn-secondary mt-1 w-100"
                >
                  ...
                </Button>
              </div>
            </Paper>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard