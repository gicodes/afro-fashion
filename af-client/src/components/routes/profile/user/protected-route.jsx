import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from "../../../../contexts/user.context";

const ProtectedUserRoute = ({ element }) => {
  const { currentUser } = useContext(UserContext);

  // check if the user is authenticated and has the userType 'buyer'
  const isBuyer = currentUser && currentUser?.userType === 'buyer';
  
  return (
      isBuyer ? element : <Navigate to="/auth" />
  )
};

export default ProtectedUserRoute;