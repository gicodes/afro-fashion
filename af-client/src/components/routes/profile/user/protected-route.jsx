import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../../../contexts/user.context";

const ProtectedUserRoute = ({ element }) => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  // check if the user is authenticated and has the userType 'buyer'
  const isBuyer = currentUser && currentUser?.userType === 'buyer';
  
  if (!isBuyer) {
    navigate('/auth'); 
    return null;
  }

  return element;
};

export default ProtectedUserRoute;