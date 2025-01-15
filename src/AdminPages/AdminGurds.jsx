import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export default function AdminGuards({ element }) { 
  const { isLoggedIn, loading, user } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // يمكنك استخدام مكون تحميل هنا
  }

  return isLoggedIn && user?.role === 'Admin' ? element : <Navigate to="/" />;
}



