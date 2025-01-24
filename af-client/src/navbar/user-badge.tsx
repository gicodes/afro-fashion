import './navbar.styles.scss';
import React from 'react';

// let imageUrlErrorBadge = 'https://thumbs.dreamstime.com/b/dashboard-icon-exclamation-mark-alert-error-alarm-danger-symbol-vector-152166957.jpg';
// let exclamataionBadge = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMFkE77XbXLrdZknBkc8_mxxqWKJDyDDKNOw&s'

// const noUserAvatar = "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="

function NavUserBadge({ imageUrl }) {
  return (
    <>
      <div 
        className='user-badge'
        // the next line has been disabled because the noUserAvatar event does not use this component
        // style={{ 
        //   border: imageUrl === noUserAvatar ? '1px solid goldenred' : 'none' 
        // }}
      >
        <img
          src={imageUrl}
          alt='user badge'
          className='user-avatar' />
      </div>
    </>
  );
}

export default NavUserBadge