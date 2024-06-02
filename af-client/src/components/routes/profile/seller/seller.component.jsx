import {  SellerProfileCard } from "./s-profile/s-profile-card";
import { UserContext } from "../../../../contexts/user.context";
import { useAlert } from "../../../../contexts/alert.context";
import { SellerCreateCard } from "./s-profile/s-create-card";
import { SellerProducts } from "./s-profile/s-products-card";
import Button from "../../../buttons/button.component";
import { useState, useContext } from 'react';

import "../profile.styles.scss";
import { Link } from "react-router-dom";
import { VerifyNow } from "../verifyNow/profile-verify";

const today =  new Date().toLocaleString().split(",")[0];

const Seller = () => {
  const { addAutoCloseAlert } = useAlert();
  const [ createItem, setCreateItem ] = useState(false);
  const [ editItem, setEditItem]  = useState(false);
  const { currentUser } = useContext(UserContext);
  const { address, bank, bankAcct, bio, brandName, displayName, imageUrl, isVerified, phone, } = currentUser

  const toggleCreateItem = () => {
    if (!isVerified) addAutoCloseAlert("warning", 'Verify your account to continue!'); 
    setCreateItem(!createItem);
  }
  
  const toggleEditItem = () => setEditItem(!editItem);

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
              sellerName={displayName} 
              brandTag={brandName}
              bio={bio}
              phone={phone} 
              address={address} 
              bankAcct={bankAcct}
              bank={bank}
              imageUrl={imageUrl}
              isVerified={isVerified}
            />
          </section>
          <section id="product-upload" className="mt-1">
            <Button onClick={toggleCreateItem}>
              Upload a new Product
            </Button>
            {
              isVerified && 
            <div>
              {createItem && <SellerCreateCard/>}
            </div>}
          </section>
          <section id="product-edit" className="mt-1">
            <Button onClick={toggleEditItem}>
              Edit an existing Product
            </Button>
            <div>
              {
                editItem && <SellerProducts sellerName={displayName} />
              }
            </div>
          </section>
          <hr/>
          {
            isVerified && 
            <section id="manage-subscription" className="mb-2">
              <Link to='/subscriptions'>
                <Button>
                  Manage Subscriptions
                </Button>
              </Link>
            </section>
            }
            {!isVerified && <VerifyNow />}
        </div>
      </div>
      <div className="lg-div"></div>
    </>
  )
}
export default Seller;