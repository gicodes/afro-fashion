import {  SellerProfileCard } from "./s-profile/s-profile-card"
import { UserContext } from "../../../../contexts/user.context";
import { SellerCreateCard } from "./s-profile/s-create-card";
import { SellerProducts } from "./s-profile/s-products-card";
import Button from "../../../buttons/button.component";
import { useState, useContext } from 'react';

import "../profile.styles.scss";

const date = new Date();
const today = date.toLocaleString().split(",")[0];

const Seller = () => {
  const [ createItem, setCreateItem ] = useState(false);
  const [ editItem, setEditItem]  = useState(false);
  const { currentUser } = useContext(UserContext);
  const {  bio, brandName, displayName, phone, address, bankAcct, bank, imageUrl } = currentUser

  const toggleCreateItem = () => {
    setCreateItem(!createItem);
  }
  
  const toggleEditItem = () => {
    setEditItem(!editItem);
  }

   return (
    <>
      <div className="card container -pc">
        <div className="profile-comp">
          <div className="card-title">
            <span className="-welcome">Welcome, {displayName}</span>
            <span className="-date">{today}</span>
          </div>
          <section id="image-edit">
            <SellerProfileCard 
              sellerName={brandName || displayName} 
              bio={bio}
              phone={phone} 
              address={address} 
              bankAcct={bankAcct}
              bank={bank}
              imageUrl={imageUrl}
            />
          </section>
          <section id="product-upload" className="mt-1">
            <Button onClick={toggleCreateItem}>
              Upload a new Product
            </Button>
            <div>
              {createItem && <SellerCreateCard/>}
            </div>
          </section>
          <section id="product-edit" className="mt-1 mb-2">
            <Button onClick={toggleEditItem}>
              Edit an existing Product
            </Button>
            <div>
              {editItem && <SellerProducts sellerName={displayName} />}
            </div>
          </section>
        </div>
      </div>
      <div className="lg-div"></div>
    </>
  )
}

export default Seller;