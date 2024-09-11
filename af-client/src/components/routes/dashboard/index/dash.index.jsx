import { UserContext } from "../../../../contexts/user.context";
import { useAlert } from "../../../../contexts/alert.context";
import { VerifyNow } from "../verifyNow/profile-verify";
import { blankAvi } from "../../brands/brands.route";
import { MdVerifiedUser } from "react-icons/md";
import { FaUserShield } from "react-icons/fa6";
import { useState, useContext } from 'react';
import "../dashboard.styles.scss";

const Dashboard = () => {
  const { addAutoCloseAlert } = useAlert();
  const { currentUser } = useContext(UserContext);
  const { address, 
          bank, 
          bankAcct, 
          bio, 
          brandName, 
          displayName, 
          categoryCount,
          imageUrl, 
          isVerified, 
          phone, 
          productCount,
          productSold,
} = currentUser

  return (
    <div className="index-container">
        <div className="opening-text">
          <h6>Welcome Back, {displayName} &nbsp;🤝</h6>
        </div>
        <div className="body-container">
            <div className="card per-card">
                <div className="p-card-header">
                  <p className="flex-space-bet" >Seller Performance   
                    <span>
                        {isVerified ? <MdVerifiedUser fill="lightgreen"/> : ""}
                    </span>
                  </p>
                </div>
                <div className="per-card-body">
                  <div className="v-center stat-set">
                    <div className="m-1">
                      { isVerified ? <FaUserShield size={25} fill="khaki"/> : <VerifyNow/> }
                    </div>
                    <div className="m-width">
                        <h6>{categoryCount || "-"}</h6> {/* category range */}
                        <span className="fs-tiny">Category</span>
                    </div>
                    <div className="m-width">
                        <h6>{productCount || "-"}</h6> {/* products count */}
                        <span className="fs-tiny">Products</span>
                    </div>
                    <div className="m-width">
                        <h6>{productSold || "-"}</h6> {/* products sold */}
                        <span className="fs-tiny">Sold</span>
                    </div>
                    <div className="w-25">
                        <h5>25%</h5> {/* performance score: 10-100% */}
                        <p>Overall</p>
                    </div>
                  </div> 
                </div>
            </div>
            <br/>
            <div className="card pro-card">
                <div className="p-card-header">
                    <p>Seller Profile</p>
                </div>
                <div className="card pro-card-body">
                    <div className="img-av">
                        <img 
                            alt={`${displayName}'s profile pic`} 
                            src={imageUrl || blankAvi} 
                            className="rounded-circle "
                        />  
                    </div>
                    <div className="flex">              
                        <div className="info-set">
                            <p>{brandName}</p>
                            <span>{bio || "Hi"}</span>
                            <p>{bank || "UBA"} - &nbsp;
                            {bankAcct || "0123456789"}</p>
                            <p>{address || "Chino's Mansion"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard