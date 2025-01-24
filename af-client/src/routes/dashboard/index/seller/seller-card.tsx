import React from 'react';
import { Paper } from '@mui/material';
import { blankAvi } from '../dash-assets.tsx';
import { BsBank2, BsDot } from "react-icons/bs";
import { FcAddressBook, FcBriefcase } from 'react-icons/fc';
import { FaAddressBook, FaUserEdit,  } from "react-icons/fa";

import "../../dashboard.styles.scss"

const SellerCardIndex = ({
    displayName,
    brandName,
    address,
    bank,
    bankAcct,
    bio,
    imageUrl,
    phone,
    products,
    sold,
    toggleEditProfile
}) => {
  return (
    <Paper elevation={8}>
      <div className="pro-card">
        <div className="p-card-header">
          <p className="flex-space-bet"> Seller Profile
            { toggleEditProfile && 
              <span className="text-warning">
                <FaUserEdit size={15} onClick={toggleEditProfile} />
              </span>
            }
          </p>
        </div>
        <div className="pro-card-body">
          <div className="flex-space-bet">
            <div className="img-area">
            <img 
              alt={`${displayName}'s profile pic`} 
              src={imageUrl || blankAvi} 
              className="rounded-circle"
            />  
            </div>             
            <div className="info-set">
              <p> <FcAddressBook size={20}/>&nbsp; {brandName} </p>
              <div className="flex-space-bet fs-smaller p-1 mb-2">
                <div>
                  <div>
                    <FaAddressBook size={15}/> &nbsp; 
                    <span> {phone || "phone not set"} </span>
                  </div> 

                  <span className="sc-subtitle">
                    <BsDot size={'20px'} fill='greenyellow' />&nbsp;
                    {address || "address missing"}
                  </span>
                </div>
                { bankAcct && <div>
                    <BsBank2 size={15} /> &nbsp; 
                    <span>{bank}</span>
                    <span className='sc-subtitle'>{bankAcct}</span>
                  </div>
                }
              </div>
              <div>
                { products && 
                  <div className='inventory-set'>
                    <span className='flex'>
                      <FcBriefcase size={15}/> &nbsp; Inventory 
                      <span className='text-success'>&nbsp; -&#x3e; </span>
                    </span>
                    <div className='val'>
                      Active: {products}
                      { sold && 
                        <span>Sold: {sold}</span>
                      }
                    </div>
                  </div>
                }
              </div>
          </div>
        </div>
        
        <div className="mt-2 text-center font-awesome fs-xs">
          <p>{bio || "-"}</p>              
        </div>
        </div>
      </div>
    </Paper>
  )
};

export default SellerCardIndex;