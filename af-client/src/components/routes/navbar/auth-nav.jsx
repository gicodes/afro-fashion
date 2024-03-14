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
      <Link onClick={onClose} to="profile" 
        className="-mb p-1 text-primary" 
        title="click to view profile"
        >
        {displayName.split(" ")[0] || displayName}
      </Link>
      <hr/>       
      <div onClick={handleSignOut}>Logout</div>
    </div>
  );
};
