import { categoryTracker } from "./user-profile/product-tracker.tsx";
import {  UserProfileCard } from "./user-profile/profile-card.tsx";
import { UserHistory } from "./user-profile/user.products.tsx";
import UserContext from "../../../contexts/user.context.tsx";
import { CloseButton, Button } from "react-bootstrap"; 
import React, { useState, useContext } from 'react';
import PieUtilityCard from "../index/pie-card.tsx";
import { today } from '../index/dash-assets.tsx';
import { Paper } from "@mui/material";
import "../dashboard.styles.scss";

interface User {
  bio: string;
  displayName: string;
  email: string;
  phone: string;
  address: string;
  imageUrl: string;
  orders: any[];
  savedItems: any[];
}

const UserProfile: React.FC = () => {
  const [ viewSavedItems, setViewSavedItems ] = useState<boolean>(false);
  const [ viewPastOrders, setViewPastOrders ] = useState<boolean>(false);
  const { currentUser } = useContext(UserContext);
  const { 
    bio, 
    displayName, 
    email, 
    phone, 
    address, 
    imageUrl,
    orders,
    savedItems,
  }: User = currentUser || {};

  const togglePastOrders = () => setViewPastOrders(!viewPastOrders);
  const toggleSavedItems = () => setViewSavedItems(!viewSavedItems);
  const trackedCategories = orders?.length > 0 ? categoryTracker(orders) : categoryTracker(savedItems);

  const restoreIndexDash = () => {
    setViewSavedItems(false);
    setViewPastOrders(false);
  }
  
  const RestoreIndexDash = () => (
    <div className="close-button">
      <CloseButton className="rounded-circle" onClick={restoreIndexDash}/>
    </div>
  )

   return (
    <>
      <div className="dash2-index-container">
        <div className="opening-text">
          <span className="-date">{today}</span>
          <span className="-welcome">Welcome, {displayName}</span>
        </div>

        <div className="body2-container">
          { viewSavedItems && <div className="col-md-8 mx-auto">
              <RestoreIndexDash />
              <UserHistory savedItems={savedItems} />
            </div>
          }
          { viewPastOrders && <div className="col-md-8 mx-auto">
              <RestoreIndexDash />
              <UserHistory savedItems={orders} item={"pastOrders"} />
            </div>
          }
          <div className={viewPastOrders || viewSavedItems ? "hidden" : "user-profile"}> 
            <UserProfileCard 
              bio={bio}
              email={email} 
              phone={phone} 
              address={address} 
              name={displayName}
              imageUrl={imageUrl}
            />
            <br/>
          </div>

          <div className={viewPastOrders || viewSavedItems ? "hidden" : "user-history"}>
            <PieUtilityCard userData={trackedCategories} />
            <br/>

            <div className="action-btn-group">
              <Paper elevation={4}>
                <div className="p-1">
                <div className="container m-3 px-1">
                  <p className="text-black"> Self Services </p>
                </div>
                  <hr/>
                  <div 
                    onClick={togglePastOrders} 
                    className="p-action btn text-success"
                  >
                    Past Orders
                  </div>
                  <Button  
                    onClick={toggleSavedItems}
                    className="p-action btn btn-warning"
                  > 
                    Saved Items
                  </Button>

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
      <div className="hide-in-sm lg-div" />
    </>
  )
}

export default UserProfile;
