import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { CircleLoader } from 'react-spinners';

function PrivateRoute({ element }) {
  const { isLoggedIn, loading } = useAuth();
  if (loading) {
    return <CircleLoader />;
  }
  return isLoggedIn ? element : <Navigate to="/signin" />;
}

export default PrivateRoute;
