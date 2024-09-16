import { Paper } from '@mui/material';
import { FcAddressBook } from 'react-icons/fc';
import { MdAccountBalance } from "react-icons/md";
import { blankAvi } from "../../brands/brands.route";
import { FaAddressBook, FaUserEdit,  } from "react-icons/fa";

const SellerCardIndex = (
    {displayName,
    brandName,
    address,
    bank,
    bio,
    bankAcct,
    imageUrl,
    phone,
    toggleEditProfile}
) => {
  return (
    <Paper elevation={8}>
        <div className="pro-card">
            <div className="p-card-header">
                <p className="flex-space-bet">
                Seller Profile
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
                    <p><FcAddressBook size={20}/>&nbsp; {brandName}</p>
                    <div className="flex-space-bet w-90 fs-smaller p-1">
                        <div>
                        <FaAddressBook size={15} color="wheat"/> &nbsp; {phone || "Missing info"}
                        <span className="add-bank">{address || "Missing info"}</span>
                        </div>
                        <div>
                        <MdAccountBalance size={15} color="wheat" /> &nbsp; {bankAcct || "Missing info"}
                        <span className="add-bank">{bank || "Missing info"}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="mt-4 font-awesome fs-smaller">
                <p>{bio || "-"}</p>              
            </div>
            </div>
        </div>
    </Paper>
  )
};

export default SellerCardIndex;