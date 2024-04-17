import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../../contexts/user.context';

const ProtectedSellerRoute = ({ element }) => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/auth'); 
    } else if (currentUser.userType !== 'seller') {
      navigate('/auth'); 
    }
  }, [currentUser, navigate]);

  if (!currentUser || currentUser.userType !== 'seller') {
    return null;
  }

  return element;
};

export default ProtectedSellerRoute;
