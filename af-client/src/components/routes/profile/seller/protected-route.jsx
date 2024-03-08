import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../../contexts/user.context';

const ProtectedSellerRoute = ({ element }) => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  // check if the user is authenticated and has the userType 'seller'
  const isSeller = currentUser && currentUser.userType === 'seller';

  if (!isSeller) {
    navigate('/auth');
    return null;
  }

  return element;
};

export default ProtectedSellerRoute;
