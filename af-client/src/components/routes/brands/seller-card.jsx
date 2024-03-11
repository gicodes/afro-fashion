import { FaPhone, FaCircleInfo, FaSellcast } from 'react-icons/fa6';
import { MdEmail, MdMyLocation } from 'react-icons/md';
import { blankAvi } from './brands.route';

import './brands.styles.scss';

const SellerCard= ({sellerInfo}) => {
  return (
    <div style={{background: "whitesmoke"}} className='card container -lg mt-4'>
    <div className='brand-card'>
      <div className='card p-3 mt-2 brand-info v-center fs-smaller text-secondary'>
        <p className='mt-3'> &nbsp; 
          <FaCircleInfo className='v-center' size={16} fill='#505050'/>
          <span style={{display: "block", textAlign: "left", marginLeft: "10px"}}>
            {sellerInfo?.bio || "Not available"}
          </span> 
        </p>
        <p> &nbsp; <MdEmail size={18} fill='#FF7F50'/> &nbsp; {sellerInfo?.email}</p>
        <p> &nbsp; <FaPhone size={16} fill='green'/> &nbsp; {sellerInfo?.phone}</p>
        <p> &nbsp; <FaSellcast size={16} className='v-center' fill='purple'/> 
          &nbsp; {sellerInfo?.sold || "Sales record unavailable"}
        </p>
        <p className='mb-3'> &nbsp; <MdMyLocation size={18} fill='#00308F'/> 
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