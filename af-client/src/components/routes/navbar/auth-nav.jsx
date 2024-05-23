import { useEffect, useRef } from 'react'; 
import { Link } from 'react-router-dom';
import "./navbar.styles.scss";

export const SideNav = ({ 
  displayName, 
  onSignOut, 
  device_class, 
  isOpen, 
  onClose 
}) => {
  const sideNavRef = useRef(null); 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sideNavRef.current 
          && !sideNavRef.current.contains(event.target)
        ) onClose()
    };

    if (isOpen) document.body.style.overflow = "hidden";
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSignOut = () => {
    onSignOut();
  };

  return (
    <div 
      ref={sideNavRef} 
      className={isOpen ? `card ${device_class}` : "dis-non"}
      >
      <div>
        <div className='card-header text-gray'>
          <span className='fs-smaller font-awesome'>
            Self services
          </span>
        </div>
        <div className='card-body fs-smaller'>
            <div>
              <Link title="user profile" onClick={onClose} to="profile">
                User Profile
              </Link>
            </div>
            <div className='flex-just-center'>
              <hr className='w-50'/>
            </div>  
            <div>
              <Link title="subscriptions" onClick={onClose} to="subscriptions">
                Subscriptions
              </Link>
            </div> 
          <div className='mt-4 -mb card-footer' onClick={handleSignOut}>
            <span className='text-warning'>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};
