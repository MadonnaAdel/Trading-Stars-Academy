import React from 'react';
import { Navigate } from 'react-router-dom';

import { CircleLoader } from 'react-spinners';
import { useAuth } from './src/context/authContext';

function PrivateRoute({ element }) {
  const { isLoggedIn, user, loading } = useAuth();
  console.log(user?.role,user)
  if (loading) {
    return <CircleLoader />;
  }
  if (isLoggedIn) {
    if (user.role === 'User') {
      return element; 
    } else {
      return <Navigate to="/dashboard" />;
    }
  }
  return <Navigate to="/signin" />;
}

export default PrivateRoute;
