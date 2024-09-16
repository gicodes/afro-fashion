import { SellerPerformanceScore } from "../seller/s-profile/s-performance";
import { SellerProfileCard } from "../seller/s-profile/s-profile-card";
import { SellerCreateCard } from "../seller/s-profile/s-create-card";
import { SellerProducts } from "../seller/s-profile/s-products-card";
import { BrandContext } from "../../../../contexts/brand.context";
import { UserContext } from "../../../../contexts/user.context";
import { MdVerifiedUser, MdQuestionMark } from "react-icons/md";
import { useAlert } from "../../../../contexts/alert.context";
import { VerifyNow } from "../verifyNow/profile-verify";
import { Button, CloseButton } from "react-bootstrap";
import { PieChart } from '@mui/x-charts/PieChart';
import { FaUserShield } from "react-icons/fa";
import { useState, useContext } from 'react';
import SellerCardIndex from "./seller-card";
import { Link } from "react-router-dom";
import Paper from '@mui/material/Paper';

import "../dashboard.styles.scss";

const Dashboard = () => {
  const { addAutoCloseAlert } = useAlert();
  const { brandsMap } = useContext(BrandContext);
  const { currentUser } = useContext(UserContext);
  const [ editItem, setEditItem ] = useState(false);
  const [ createItem, setCreateItem ] = useState(false);
  const [ editProfile, setEditProfile ] = useState(false);
  const { address, bank, bankAcct, bio, brandName, displayName, imageUrl, isVerified, phone, productCount, productSold, subscription, latestSubExpiry } = currentUser;

  const performanceScore = (SellerPerformanceScore(currentUser))
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
        { isVerified && // if verified, show >>>
          <>
            <RestoreIndexDash />
            {createItem && <SellerCreateCard/>}
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
          <Paper elevation={8}>
            <div className="per-card">
              <div className="p-card-header">
                <p className="flex-space-bet">Seller Performance   
                  <span>{isVerified ? <MdVerifiedUser fill="lightgreen"/> : <MdQuestionMark color="lightsalmon" size={18}/>}</span>
                </p>
              </div>
              <div className="per-card-body">
                <div className="v-center stat-set">
                  <div className="m-1">
                    { isVerified ? <ManageSubscription /> : <VerifyNow /> }
                  </div>
                  <div className="per-stats">
                    <h6>{numberOfCategories}</h6> <span>Category</span>
                  </div>
                  <div className="per-stats">
                    <h6>{productCount || "0"}</h6> <span>Products</span>
                  </div>
                  <div className="per-stats">
                    <h6>{productSold || "0"}</h6> <span>Sold</span>
                  </div>
                  <div>
                    <h5 className={`${performanceRating} per-rating`}>{performanceScore}</h5>
                    <p>Overall</p>
                  </div>
                </div> 
                {subscription ? <p className="fs-smaller">Your latest subscription expires {latestSubExpiry} </p> : " "}
              </div>
            </div>
          </Paper>
          <br/>
          <SellerCardIndex  
            displayName
            brandName
            address
            bank
            bio
            bankAcct
            imageUrl
            phone
            toggleEditProfile={toggleEditProfile}
          />        
        </div>
        <br/>

        <div className={createItem || editProfile ? "hidden" : "action-container"}>
          <Paper elevation={8}>
            <div className="sales-card">
              <div className="p-card-header">
                <p> Sales Performance </p>
              </div>

              <div className="sales-card-body">
                <PieChart
                  series={[
                    { data: [
                        { id: 0, value: productSold, label: 'Sales' },
                        { id: 1, value: productCount, label: 'Inventory' },
                        { id: 2, value: 45, label: 'Max Capacity' }, 
                    ], },
                  ]}
                  width={350}
                  height={150}
                />
              </div>
            </div>
          </Paper>
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