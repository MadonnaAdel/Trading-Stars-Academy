import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './src/context/authContext';

function PrivateRoute({ element }) {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }
  return isLoggedIn ? element : <Navigate to="/signin" />;
}

export default PrivateRoute;
