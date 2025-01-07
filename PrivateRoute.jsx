import { Navigate } from 'react-router-dom';
import { useAuth } from './src/context/authContext';


const PrivateRoute = ({ element }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? element : <Navigate to="/signin" />;
};

export default PrivateRoute;