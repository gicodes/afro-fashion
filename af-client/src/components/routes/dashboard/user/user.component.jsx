import { categoryTracker } from "./user-profile/product-tracker";
import { UserContext } from "../../../../contexts/user.context";
import {  UserProfileCard } from "./user-profile/profile-card";
import { SavedItems } from "./user-profile/user.products";
import Button from "../../../buttons/button.component";
import PieUtilityCard from "../index/pie-card";
import { useState, useContext } from 'react';
import { today } from "../index/dash-assets";

import "../dashboard.styles.scss";

const UserProfile = () => {
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
  } = currentUser

  const togglePastOrders = () => setPastOrdersCard(!pastOrdersCard);
  
  const toggleSavedItems = () => setSavedItemsCard(!savedItemsCard);

  const trackedCategories = orders?.length > 0 ? categoryTracker(orders) : categoryTracker(savedItems);

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
            <PieUtilityCard userData={trackedCategories} />

            <section id="product-orders" className="mt-2">
              <Button onClick={togglePastOrders}>
                past orders
              </Button>
              <div className="p-1">
                {pastOrdersCard && <SavedItems savedItems={orders} item={"pastOrders"} />}
              </div>
            </section>
            <section id="saved-items">
              <Button onClick={toggleSavedItems}>
                saved items
              </Button>
              <div className="p-1">
                {savedItemsCard && <SavedItems savedItems={savedItems} />}
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className="hide-in-sm lg-div" />
    </>
  )
}

export default UserProfile;