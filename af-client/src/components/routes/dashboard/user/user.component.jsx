import { UserContext } from "../../../../contexts/user.context";
import Button from "../../../buttons/button.component";
import {  UserProfileCard } from "./profile-card";
import { useState, useContext } from 'react';
import { SavedItems } from "./user.products";

import "../dashboard.styles.scss";

const date = new Date();
const today = date.toLocaleString().split(",")[0];

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

  const togglePastOrders = () => {
    setPastOrdersCard(!pastOrdersCard);
  }
  const toggleSavedItems = () => {
    setSavedItemsCard(!savedItemsCard);
  }

   return (
    <>
      <div className="card container -pc">
        <div className="profile-comp mx-auto">
          <div className="card-title">
            <span className="-welcome">Welcome, {displayName}</span>
            <span className="-date">{today}</span>
          </div>
          <section>
            <UserProfileCard 
              bio={bio}
              email={email} 
              phone={phone} 
              address={address} 
              name={displayName}
              imageUrl={imageUrl}
            />
          </section>
          <section id="product-orders">
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
      <div className="hide-in-sm">
        <div className="lg-div"></div>
      </div>
    </>
  )
}

export default UserProfile;