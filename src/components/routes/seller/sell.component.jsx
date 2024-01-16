import { SellerCreateCard } from "./s-create-card";
import Button from "../../buttons/button.component";
import { useState } from 'react';

const Seller = () => {
  const [createItem, setCreateItem] = useState(false);
  const [editItem, setEditItem] = useState(false);

  const toggleCreateItem = () => {
    setCreateItem(!createItem);
  }
  const toggleEditItem = () => {
    setEditItem(!editItem);
  }

   return (
    <>
    <Button onClick={toggleCreateItem} >Upload a new Product!</Button>
    {createItem && <SellerCreateCard/>}
    <hr/>
    <Button onClick={toggleEditItem} >Edit an existing Product!</Button>

    </>
  )
}

// user info, contact info, category,  isVerified, 

// profile card, CRUD card -- create (C) -- edit & delete (RUD), 

export default Seller;