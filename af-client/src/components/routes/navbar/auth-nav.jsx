import { Link } from "react-router-dom";
import "./navbar.styles.scss";

export const SideNav = ({ displayName, onSignOut, device_class }) => {
  return (
    <div className={displayName ? `card ${device_class}` : "dis-non"}>
      {device_class === "-lg" && 
        <>
          <Link to="profile" className="nav-link" title="click to view profile">
            {displayName}
          </Link>
          <hr/>
        </>
      }
      <div className="text-primary" onClick={onSignOut}>Sign out</div>
    </div>
  );
};
