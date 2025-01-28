import useClickOutside from '../hooks/autoClose.component.tsx';
import UserContext from '../contexts/user.context.tsx';
import React, { useContext } from 'react'; 
import { Link } from 'react-router-dom';
import "./navbar.styles.scss";

interface AuthNavProps {
  onSignOut: () => void | null;
  device_class: string;
  isDisabled: boolean;
  isOpen: boolean;
  onClose: () => void | null
}

// This component controls lg & mobile Auth Menu in the Navigation Bar
export const AuthNav: React.FC<AuthNavProps> = ({ 
  onSignOut, 
  device_class, 
  isDisabled,
  isOpen, 
  onClose,
}) => {
  const { currentUser } = useContext(UserContext);
  const navBarRef = useClickOutside(isOpen, onClose);

  return (
    <div 
      ref={navBarRef} 
      className={isOpen ? `card ${device_class}` : "hidden"}
    >
      <div className={isDisabled ? "disabled" : ""}>
        <div className='card-header'>
          <div className='fs-smaller font-awesome'>
            {!currentUser ? "Guest" : currentUser?.displayName}
          </div>
          <div className='fs-xs m-1 text-gray'>
            {currentUser?.email || ""}
          </div>
        </div>
        
        <div className='card-body fs-smaller'>
          <div //removed className='hide-in-sm'
          >
            <Link title="Dashboard" onClick={onClose} to="dashboard">
              Dashboard
            </Link>
          </div>
          <div className='flex-just-center' // removed hide-in-sm
          > 
            <hr className='w-50'/>
          </div>  
          <div>
            <Link title="subscriptions" onClick={onClose} to="subscriptions">
              Subscriptions
            </Link>
          </div> 
          <div className='flex-just-center -mb2'>
            <hr className='w-50'/>
          </div> 
        </div>
        
        <div onClick={onSignOut}>
          <span className='text-warning'>
            Sign out
          </span>
        </div>
      </div>
    </div>
  );
}
