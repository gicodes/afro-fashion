import Paper from '@mui/material/Paper';
import { VerifyNow } from "../../verifyNow/profile-verify";
import { MdVerifiedUser, MdQuestionMark } from "react-icons/md";

import "../../dashboard.styles.scss";

const PerformanceCard = ({
  isVerified,
  performanceRating,
  performanceScore,
  productCount,
  productSold,
  subscription,
  latestSubExpiry,
  numberOfCategories,
  ManageSubscription,
}) => {
  
  return (
    <Paper elevation={8}>
      <div className="per-card">
          <div className="p-card-header">
          <p className="flex-space-bet">Seller Performance   
              <span>
                { isVerified ? <MdVerifiedUser fill="lightgreen"/> 
                : <MdQuestionMark color="lightsalmon" size={18}/>}
              </span>
          </p>
          </div>
          <div className="per-card-body">
          <div className="v-center stat-set">
              <div className="v-center m-1">
              { isVerified ? <ManageSubscription /> : <VerifyNow /> }
              </div>
              <div className="per-stats">
              <h6>{numberOfCategories}</h6> <span>Category</span>
              </div>
              <div className="per-stats">
              <h6>{productCount || "0"}</h6> <span>Products</span>
              </div>
              <div className="per-stats">
              <h6>{productSold || "0"}</h6> <span>Sold</span>
              </div>
              <div>
              <h5 className={`${performanceRating} per-rating`}>{performanceScore}</h5>
              <p>Overall</p>
              </div>
          </div> 
          {subscription ? <p className="fs-smaller">Your latest subscription expires {latestSubExpiry} </p> : " "}
          </div>
      </div>
    </Paper>
  )
}

export default PerformanceCard