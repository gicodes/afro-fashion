import { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../../../contexts/user.context.tsx';

const ProtectedSellerRoute = ({ element }) => {
  const { currentUser, setIntendedRoute } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!currentUser) {
      if (location.pathname !== currentUser?.intendedRoute) {
        setIntendedRoute(location.pathname);
      }
      navigate('/auth');
    } else if (currentUser.userType !== 'seller') {
      navigate('/auth');
    }
  }, [currentUser, navigate, setIntendedRoute, location.pathname]);

  if (!currentUser || currentUser.userType !== 'seller') {
    return null;
  }

  return element;
};

export default ProtectedSellerRoute;