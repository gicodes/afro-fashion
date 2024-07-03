import React from 'react';
import './navbar.styles.scss';

// let imageUrlErrorBadge = 'https://thumbs.dreamstime.com/b/profile-icon-exclamation-mark-alert-error-alarm-danger-symbol-vector-152166957.jpg';
// let exclamataionBadge = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMFkE77XbXLrdZknBkc8_mxxqWKJDyDDKNOw&s'

const NavUserBadge = ({imageUrl}) => {
  return (
    <>
      <div className='user-badge'>
        <img 
          src={imageUrl} 
          alt='user badge' 
          className='user-avatar'
        />
      </div>
    </>
  )
}

export default NavUserBadge