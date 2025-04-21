import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components';

const LoginPage = ({ className }) => {
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  
  // Get auth context
  const { login, isAuthenticated, isLoading, error: authError } = useAuth();
  
  // Navigation
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect URL from query parameters
  const query = new URLSearchParams(location.search);
  const redirectUrl = query.get('redirect') || '/';
  
  // If already authenticated, redirect
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate(redirectUrl, { replace: true });
    }
  }, [isLoading, isAuthenticated, navigate, redirectUrl]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    // Simple validation
    if (!email.trim()) {
      setFormError('Email is required');
      return;
    }
    
    if (!password.trim()) {
      setFormError('Password is required');
      return;
    }
    
    // Try to login
    const success = await login(email, password);
    
    // If successful, the useEffect above will handle redirect
    if (!success) {
      setFormError(authError || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <section className={`max-container padding mt-20 min-h-screen flex flex-col items-center justify-center page-transition ${className || ''}`}>
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="text-center mb-8 fade-in">
          <h1 className="text-3xl font-bold font-palanquin text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-slate-gray">Sign in to continue your Nike shopping experience</p>
        </div>
        
        {/* Show any errors */}
        {(formError || authError) && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 opacity-0 animate-[fadeIn_0.5s_ease_forwards]">
            <p className="text-red-700">{formError || authError}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6 stagger-fade-in">
          <div className="relative">
            <label 
              htmlFor="email" 
              className={`block text-sm font-medium transition-all duration-200 ease-in-out ${
                focusedField === 'email' || email 
                  ? 'text-purple-600 text-xs transform -translate-y-6' 
                  : 'text-gray-700 font-montserrat'
              }`}
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
                transition-all duration-200"
              placeholder="you@example.com"
            />
          </div>
          
          <div className="relative">
            <label 
              htmlFor="password" 
              className={`block text-sm font-medium transition-all duration-200 ease-in-out ${
                focusedField === 'password' || password 
                  ? 'text-purple-600 text-xs transform -translate-y-6' 
                  : 'text-gray-700 font-montserrat'
              }`}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                transition-all duration-200"
              placeholder="••••••••"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded transition-all"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            
            <div className="text-sm">
              <a href="#" className="font-medium text-purple-600 hover:text-purple-500 transition-colors hover:underline">
                Forgot password?
              </a>
            </div>
          </div>
          
          <div className="pt-2">
            <Button
              label={isLoading ? "Signing in..." : "Sign in"}
              type="submit"
              fullWidth={true}
              disabled={isLoading}
            />
          </div>
        </form>
        
        <div className="mt-6 fade-in" style={{animationDelay: '0.4s'}}>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Demo accounts
              </span>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 gap-3">
            <button
              type="button"
              className="py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium 
                text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                transition-all hover:shadow-md hover:-translate-y-1 active:translate-y-0"
              onClick={() => {
                setEmail('demo@nike.com');
                setPassword('password');
              }}
            >
              Use Demo Account
            </button>
          </div>
        </div>
        
        <div className="text-center mt-4 fade-in" style={{animationDelay: '0.6s'}}>
          <p className="text-sm text-slate-gray">
            Don't have an account?{' '}
            <a href="#" className="font-medium text-purple-600 hover:text-purple-500 transition-colors hover:underline">
              Sign up now
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;