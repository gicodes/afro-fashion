import { FaPhone, FaCircleInfo, FaLocationPinLock, FaInbox, FaSellcast } from 'react-icons/fa6';
import { blankAvi } from './brands.route';

import './brands.styles.scss';

const SellerCard= ({sellerInfo}) => {
  return (
    <div style={{background: "whitesmoke"}} className='card container -lg mt-4'>
    <div className='brand-card'>
      <div className='card p-3 mt-2 brand-info v-center fs-smaller text-secondary'>
        <p className='mt-3'> &nbsp; 
          <FaCircleInfo className='v-center' fill='black'/>
          <span style={{display: "block", textAlign: "left", marginLeft: "10px"}}>
            {sellerInfo?.bio || "Not available"}
          </span> 
        </p>
        <p> &nbsp; <FaInbox fill='black'/> &nbsp; {sellerInfo?.email}</p>
        <p> &nbsp; <FaPhone fill='black'/> &nbsp; {sellerInfo?.phone}</p>
        <p> &nbsp; <FaSellcast className='v-center' fill='black'/> &nbsp; {sellerInfo?.sold || "Sales record unavailable"}</p>
        <p className='mb-3'> &nbsp; <FaLocationPinLock fill='black'/> 
          &nbsp; {sellerInfo?.address || "Not available"}
        </p>
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