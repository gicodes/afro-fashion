import { SellerCreateCard } from "./s-create-card";
import SellerProfileCard from "./s-profile-card";
import Button from "../../buttons/button.component";
import { useState } from "react";
import "./seller.scss";
import SellerBusiness from "./s.business-profile";

const Seller = () => {
  const [createItem, setCreateItem] = useState(false);
  const [editItem, setEditItem] = useState(false);
  const [createBizInfo, setBizInfo] = useState();

  const toggleCreateItem = () => {
    setCreateItem(!createItem);
  };
  const toggleEditItem = () => {
    setEditItem(!editItem);
  };
  const toggleBizInfo = () => {
    setBizInfo(!createBizInfo);
  };
  return (
    <>
      <div className="seller-container">
        <h1 className="text-white text-center">
          {" "}
          Welcome To Your Seller Profile
        </h1>
        <SellerProfileCard />
        <hr />
        <h1 className="text-white text-center">
          {" "}
          Complete Your Seller Registration Below:
        </h1>
        <hr />

        <Button onClick={toggleBizInfo}>
          Fill in Your Business Information
        </Button>
        {createBizInfo && <SellerBusiness />}
        <hr />
        <Button onClick={toggleCreateItem}>Upload a new Product!</Button>
        {createItem && <SellerCreateCard />}
        <hr />
        <Button onClick={toggleEditItem}>Edit an existing Product!</Button>
      </div>
    </>
  );
};

// user info, contact info, category,  isVerified,

// profile card, CRUD card -- create (C) -- edit & delete (RUD),

export default Seller;
