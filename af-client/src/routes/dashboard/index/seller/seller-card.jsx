import { Paper } from '@mui/material';
import { blankAvi } from '../dash-assets';
import { BsBank2, BsCartCheckFill } from "react-icons/bs";
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
              <div className='flex-space-bet w-75'>
                <p> <FcAddressBook size={20}/>&nbsp; {brandName}</p>
                { sold && 
                  <div className="fill-success">
                    <BsCartCheckFill size={19}/> 
                    <span className='fs-smaller'> &nbsp; {sold}</span>
                  </div>
                }
                </div>
              <div className="flex-space-bet w-90 fs-smaller p-1">
                <div> 
                  <FaAddressBook size={15}/> &nbsp; 
                  <span>{phone || "Phone not set"}</span>
                  <span className="sc-subtitle">{address || "Address not set"}</span>
                </div>
                { products && <div>
                    <FcBriefcase size={15}/> &nbsp; 
                    <span>{products}</span>
                    <span className="sc-subtitle">Inventory</span>
                  </div>
                }
                { bankAcct && <div>
                    <BsBank2 size={15} /> &nbsp; 
                    <span>{bank}</span>
                    <span className='sc-subtitle'>{bankAcct}</span>
                  </div>
                }
              </div>
          </div>
        </div>
        
        <div className="mt-4 text-center font-awesome fs-smaller">
          <p>{bio || "-"}</p>              
        </div>
        </div>
      </div>
    </Paper>
  )
};

export default SellerCardIndex;