import { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from "../../../contexts/user.context";

const ProtectedUserRoute = ({ element }) => {
  const { currentUser, setIntendedRoute } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    if (!currentUser) {
      setIntendedRoute((prev) => {
        if (prev !== location.pathname) {
          return location.pathname;
        }
        return prev;
      });
      navigate('/auth');
    }
  }, [currentUser, navigate, setIntendedRoute, location.pathname]);

  if (!currentUser || currentUser.userType !== 'buyer') {

    return null;
  }

  return element;
};

export default ProtectedUserRoute;