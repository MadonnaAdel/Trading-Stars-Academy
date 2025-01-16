import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export default function AdminGuards({ element }) { 
  const { isLoggedIn, loading, user } = useAuth();

  if (loading) {
    return <div>Loading...</div>; 
  }

  return isLoggedIn && user?.role === 'Admin' ? element : <Navigate to="/" />;
}



