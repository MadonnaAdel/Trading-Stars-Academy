import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

function PrivateRoute({ element }) {
  const { isLoggedIn } = useAuth();
  console.log('isLoggedIn:', isLoggedIn); // لتتبع الحالة

  return isLoggedIn ? element : <Navigate to="/signin" />;
}

export default PrivateRoute;
