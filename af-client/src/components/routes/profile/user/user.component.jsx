import { UserContext } from "../../../../contexts/user.context";
import Button from "../../../buttons/button.component";
import {  UserProfileCard } from "./profile-card";
import { useState, useContext } from 'react';
import { SavedItems } from "./user.products";

import "../profile.styles.scss";

const date = new Date();
const today = date.toLocaleString().split(",")[0];

const UserProfile = () => {
  const [ savedItemsCard, setSavedItemsCard ] = useState(false);
  const [ productOrders, setProductOrders]  = useState(false);
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

  const toggleProductOrders = () => {
    setProductOrders(!productOrders);
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
              name={displayName} 
              email={email} 
              phone={phone} 
              address={address} 
              imageUrl={imageUrl}/>
          </section>
          <section id="product-orders">
            <Button onClick={toggleProductOrders}>
              See your orders
            </Button>
            <div className="p-1">
              {productOrders && <SavedItems savedItems={orders} item={"orders"} />}
            </div>
          </section>
          <section id="saved-items">
            <Button onClick={toggleSavedItems}>
              Saved Items
            </Button>
            <div className="p-1">
              {savedItemsCard && <SavedItems savedItems={savedItems} />}
            </div>
          </section>
        </div>
      </div>
      
      <div className="lg-div"></div>
    </>
  )
}

export default UserProfile;