import { useEffect, useRef } from 'react'; 
import { Link } from 'react-router-dom';
import "./navbar.styles.scss";


// This component controls both Mobile and Larger Screen Displays of the Auth Menu in the Navigation Bar
export const SideNav = ({ 
  displayName, 
  displayEmail,
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
      className={isOpen ? `card ${device_class}` : "hidden"}
      >
      <div>
        <div className='card-header'>
          <div className='fs-smaller font-awesome'>
            {displayName}
          </div>
          <div className='fs-xs m-1 text-gray'>
            {displayEmail}
          </div>
        </div>
        
        <div className='card-body fs-smaller'>
          <div className='hide-in-sm'>
            <Link title="Dashboard" onClick={onClose} to="dashboard">
              Dashboard
            </Link>
          </div>
          <div className='flex-just-center hide-in-sm'>
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
        
        <div onClick={handleSignOut}>
          <span className='text-warning'>
            Sign out
          </span>
        </div>
      </div>
    </div>
  );
};
