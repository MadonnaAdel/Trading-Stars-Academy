import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { CircleLoader } from 'react-spinners';

function PrivateRoute({ element }) {
  const { isLoggedIn ,user,loading} = useAuth();
  if (loading) {
    return <CircleLoader/>;
  }
  if (isLoggedIn) {
    if (user.role === 'Admin') {
      return element; 
    } else {
      return <Navigate to="/dashboard" />;
    }
  }
  return <Navigate to="/signin" />;
}

export default PrivateRoute;
