import { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UserContext from "../../../contexts/user.context.tsx";
import { useAlert } from "../../../contexts/alert.context.tsx";

const ProtectedUserRoute = ({ element }) => {
  const { currentUser, setIntendedRoute } = useContext(UserContext);
  const { addAutoCloseAlert } = useAlert(); 
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    if (!currentUser) {
      if (location.pathname !== currentUser?.intendedRoute) {
        setIntendedRoute(location.pathname);
      }
      addAutoCloseAlert("warning", "You must be logged in to access this page");
      navigate('/auth');
    }
  }, [addAutoCloseAlert, currentUser, navigate, setIntendedRoute, location.pathname]);

  if (!currentUser || currentUser.userType !== 'buyer') {
    return null;
  }

  return element;
};

export default ProtectedUserRoute;