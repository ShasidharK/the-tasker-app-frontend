import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ children }) {
  const { isAuthenticated, token, status } = useSelector(state => state.auth);
  const navigate = useNavigate();
  
  useEffect(() => {
    // If authentication status changes to false, redirect to login
    if (status === 'failed') {
      navigate('/login', { replace: true });
    }
  }, [status, navigate]);
  
  // Check if user is authenticated
  if (!isAuthenticated || !token) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the protected component
  return children;
}

export default ProtectedRoute;