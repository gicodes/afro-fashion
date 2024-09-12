import { MdVerifiedUser, MdAccountBalance, MdError } from "react-icons/md";
import { FaUserShield, FaAddressBook, FaUserEdit } from "react-icons/fa";
import { SellerProfileCard } from "../seller/s-profile/s-profile-card";
import { SellerCreateCard } from "../seller/s-profile/s-create-card";
import { SellerProducts } from "../seller/s-profile/s-products-card";
import { UserContext } from "../../../../contexts/user.context";
import { useAlert } from "../../../../contexts/alert.context";
import { VerifyNow } from "../verifyNow/profile-verify";
import { Button, CloseButton } from "react-bootstrap";
import { blankAvi } from "../../brands/brands.route";
import { FcAddressBook } from "react-icons/fc";
import { useState, useContext } from 'react';
import "../dashboard.styles.scss";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { addAutoCloseAlert } = useAlert();
  const { currentUser } = useContext(UserContext);
  const [ editItem, setEditItem ] = useState(false);
  const [ createItem, setCreateItem ] = useState(false);
  const [ editProfile, setEditProfile ] = useState(false);
  const { address, bank, bankAcct, bio, brandName, displayName, categoryCount, imageUrl, isVerified, phone, productCount, productSold } = currentUser;

  const toggleEditItem = () => setEditItem(!editItem);
  const toggleCreateItem = () => {
    if (!isVerified) {
      addAutoCloseAlert("warning", 'Verify your account to continue!'); 
      return
    }
    setCreateItem(!createItem);
  }
  const toggleEditProfile = () => setEditProfile(!editProfile)

  const restoreIndexDash = () => {
    setCreateItem(false);
    setEditProfile(false)
  }

  const RestoreIndexDash = () => (
    <div className="close-button">
      <CloseButton className="rounded-circle" onClick={restoreIndexDash}/>
    </div>
  )

  const ManageSubscription = () => (
    <Link to="/subscriptions">
      <FaUserShield size={25} fill="khaki"/>
    </Link>
  )
  return (
    <div className="index-container">
      <div className="opening-text">
        <h6>Welcome Back, {displayName} &nbsp;🤝</h6>
      </div>

      <div className="body-container">
        { isVerified && // if verified, show >>>
          <>
            <RestoreIndexDash />
            {createItem && <SellerCreateCard/>}
          </>
        }
        { editProfile && 
          <>
            <RestoreIndexDash />
            <SellerProfileCard 
              sellerName={displayName} 
              brandName={brandName}
              bio={bio}
              phone={phone} 
              address={address} 
              bankAcct={bankAcct}
              bank={bank}
              imageUrl={imageUrl}
              isVerified={isVerified}
            />
          </>
        }

        <div className={createItem || editProfile ? "hidden" : " "}>
        <div className="card per-card">
          <div className="p-card-header">
            <p className="flex-space-bet">Seller Performance   
              <span>{isVerified ? <MdVerifiedUser fill="lightgreen"/> : <MdError color="orange" />}</span>
            </p>
          </div>
          <div className="per-card-body">
            <div className="v-center stat-set">
              <div className="m-1">
                { isVerified ? <ManageSubscription /> : <VerifyNow /> }
              </div>
              <div className="per-stats">
                  <h6>{categoryCount || "0"}</h6> {/* category range */}
                  <span>Category</span>
              </div>
              <div className="per-stats">
                  <h6>{productCount || "0"}</h6> {/* products count */}
                  <span>Products</span>
              </div>
              <div className="per-stats">
                  <h6>{productSold || "0"}</h6> {/* products sold */}
                  <span>Sold</span>
              </div>
              <div className="w-25">
                  <h5>25%</h5> {/* performance score: 10-100% */}
                  <p>Overall</p>
              </div>
            </div> 
          </div>
        </div>

        <div className="card pro-card mt-4">
          <div className="p-card-header">
              <p className="flex-space-bet">
                Seller Profile
                <span className="text-warning">
                  <FaUserEdit size={15} onClick={toggleEditProfile} />
                </span>
              </p>
          </div>
          <div className="card pro-card-body">
            <div className="flex-space-bet">
              <div className="img-area">
                <img 
                  alt={`${displayName}'s profile pic`} 
                  src={imageUrl || blankAvi} 
                  className="rounded-circle"
                />  
              </div>             
              <div className="info-set">
                <p className="brandname">
                  <FcAddressBook size={20} /> &nbsp; {brandName}
                </p>

                <div className="flex-space-bet fs-smaller">
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
            
            <div className="flex-just-center mt-3 font-awesome">
              <p>{bio || "-"}</p>              
            </div>
          </div>
        </div>

        <Button  
          onClick={toggleEditItem}
          className="mt-4 btn btn-secondary w-100"
        > 
          Edit Product 
        </Button>

        { editItem && <SellerProducts sellerName={displayName} /> }

        <Button 
          onClick={toggleCreateItem} 
          className="mt-2 btn btn-success w-100"
        >
          Create Product
        </Button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard