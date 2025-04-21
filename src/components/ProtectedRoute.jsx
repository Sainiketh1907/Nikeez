import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  console.log("ProtectedRoute: isLoading =", isLoading, "isAuthenticated =", isAuthenticated, "Current location:", location.pathname);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      console.log("ProtectedRoute: Not authenticated, redirecting to login");
      const currentPath = location.pathname + location.search;
      navigate(`/login?redirect=${encodeURIComponent(currentPath)}`, { replace: true });
    }
  }, [isLoading, isAuthenticated, location, navigate]);

  if (isLoading) {
    return (
      <div className="max-container padding mt-20 min-h-screen flex items-center justify-center">
        <div className="text-center fade-in">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-700"></div>
          <p className="mt-6 text-xl text-slate-gray font-montserrat animate-pulse">Loading your experience...</p>
        </div>
      </div>
    );
  }

  // Apply a fade-in animation to the children when they are rendered
  return isAuthenticated ? <div className="page-transition">{children}</div> : null;
};

export default ProtectedRoute;