import Button from "../../../components/buttons/button.component.tsx";
import { categoryTracker } from "./user-profile/product-tracker";
import { UserContext } from "../../../contexts/user.context.tsx"; 
import {  UserProfileCard } from "./user-profile/profile-card.tsx";
import { SavedItems } from "./user-profile/user.products.tsx";
import React, { useState, useContext } from 'react';
import PieUtilityCard from "../index/pie-card.tsx";
import { today } from '../index/dash-assets.tsx';

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
  const [ savedItemsCard, setSavedItemsCard ] = useState(false);
  const [ pastOrdersCard, setPastOrdersCard]  = useState(false);
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

  const togglePastOrders = () => setPastOrdersCard(!pastOrdersCard);
  const toggleSavedItems = () => setSavedItemsCard(!savedItemsCard);

  // implement pie chart props here

   return (
    <>
      <div className="dash2-index-container">
        <div className="opening-text">
          <span className="-date">{today}</span>
          <span className="-welcome">Welcome, {displayName}</span>
        </div>

        <div className="body2-container">
          <div className="user-profile"> {/* this.className is used elsewhere, i.e. very sensitive to change */}
            <UserProfileCard 
              bio={bio}
              email={email} 
              phone={phone} 
              address={address} 
              name={displayName}
              imageUrl={imageUrl}
            />
          </div>

          <div className="user-history">
            <section id="product-orders" className="mt-2">
              <Button buttonType={"default"} onClick={togglePastOrders}>
                past orders
              </Button>
              <div className="p-1">
                {pastOrdersCard && <SavedItems savedItems={orders} item={"pastOrders"} />}
              </div>
            </section>
            <section id="saved-items">
              <Button buttonType={"default"} onClick={toggleSavedItems}>
                saved items
              </Button>
              <div className="p-1">
                {savedItemsCard && <SavedItems savedItems={savedItems} item={undefined} />}
              </div>
            </section>

            <PieUtilityCard userData={undefined} productCount={null} productSold={null} />
          </div>
        </div>
      </div>
      <div className="hide-in-sm lg-div" />
    </>
  )
}

export default UserProfile;