import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        // Check if user data exists in localStorage
        const savedUser = localStorage.getItem('nikeUser');
        
        if (savedUser) {
          setUser(JSON.parse(savedUser));
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error("Error checking authentication:", err);
        // Clear potentially corrupted data
        localStorage.removeItem('nikeUser');
      } finally {
        // Always set loading to false when done
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function - in a real app, this would validate with a backend
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simple validation (in reality, this would be server-side)
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      
      // Create a user object (in a real app, this would come from your API)
      const userData = {
        id: Date.now().toString(),
        email,
        name: email.split('@')[0], // Just use part of email as name for demo
        avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`,
      };
      
      // Save to localStorage
      localStorage.setItem('nikeUser', JSON.stringify(userData));
      
      // Update state
      setUser(userData);
      setIsAuthenticated(true);
      
      return true;
    } catch (err) {
      setError(err.message || "Login failed");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // Clear from localStorage
    localStorage.removeItem('nikeUser');
    
    // Update state
    setUser(null);
    setIsAuthenticated(false);
  };

  // Create the context value object
  const value = {
    isAuthenticated,
    isLoading,
    user,
    error,
    login,
    logout,
  };

  // Provide the context to children
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};