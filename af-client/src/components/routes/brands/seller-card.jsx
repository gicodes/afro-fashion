import { FaPhone, FaCircleInfo, FaSellcast } from 'react-icons/fa6';
import { MdEmail, MdMyLocation } from 'react-icons/md';
import { blankAvi } from './brands.route';

import './brands.styles.scss';

const SellerCard= ({sellerInfo}) => {
  return (
    <div 
      style={{ background: "whitesmoke" }} 
      className='card container -lg mt-4'
    >
      <div className='brand-card'>
        <div className='card brand-info'>
          <div className='p-3 v-center fs-smaller text-secondary'>
            <p>
              &nbsp; <FaCircleInfo className='v-center' size={17} fill='orange'/>
              <span 
                style={{ 
                  display: "block", 
                  textAlign: "left", 
                  marginLeft: "7px"
                }}>
                  {sellerInfo?.bio || "Not available"}
              </span> 
            </p>

            <p>
              &nbsp; <FaSellcast size={17} className='v-center' fill='purple'/>
              &nbsp; {sellerInfo?.sold || "Sales records unavailable"}
            </p>

            <p> &nbsp; <FaPhone size={16} fill='forestgreen'/>
              &nbsp; {sellerInfo?.phone}
            </p>

            <p> 
              &nbsp; <MdEmail size={18} fill='goldenrod'/> 
              &nbsp; {sellerInfo?.email}
            </p>

            <p> 
              &nbsp; <MdMyLocation size={18} fill='#909090'/> 
              &nbsp; {sellerInfo?.address || "Not available"}
            </p>
          </div>
        </div>

        <div className='flex-just-center avatar'>
          <img
            className='rounded-circle profile-image'
            loading='lazy'
            src={sellerInfo?.imageUrl || blankAvi}
            alt={`brand logo`}
          />
        </div>
      </div>
    </div>
  )
}

export default SellerCard