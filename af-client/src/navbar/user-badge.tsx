import React from 'react';
import './navbar.styles.scss';

interface NavUserBadgeProps {
  imageUrl: String | any;
}

const NavUserBadge: React.FC<NavUserBadgeProps> = ({ imageUrl }) => {
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
  );
}

export default NavUserBadge