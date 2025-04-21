import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import  headerLogo  from '../assets/images/nikeBlack.png';
import { hamburger } from "../assets/icons";
import { navLinks } from "../constants";
import { useCart } from "../context/CartContext";
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Nav = () => {
  const { itemCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for nav background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on location change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className={`padding-x py-8 fixed z-40 w-full transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <nav className='flex justify-between items-center max-container'>
        <Link to="/" className="flex items-center">
          <img
            src={headerLogo}
            alt='logo'
            width={129}
            height={29}
            className='m-0 w-fit h-[30px]'
          />
        </Link>

        <ul className='flex-1 flex justify-center items-center gap-16 max-lg:hidden'>
          {navLinks.map((item) => (
            <li key={item.label}>
              <Link
                to={item.href}
                className='font-montserrat leading-normal text-lg text-slate-gray hover:text-purple-700 relative transition-colors duration-300 after:content-[""] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-purple-700 after:transition-all hover:after:w-full'
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="relative">
            <Link to="/cart" className='font-montserrat leading-normal text-lg text-slate-gray hover:text-purple-700 transition-colors duration-300'>
              Cart
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-3 bg-purple-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                >
                  {itemCount}
                </motion.span>
              )}
            </Link>
          </li>
          <li>
            {isAuthenticated ? (
              <div className="flex items-center gap-3 group">
                {user?.avatar && (
                  <img
                    src={user.avatar}
                    alt={user.name || "User"}
                    className="w-8 h-8 rounded-full border-2 border-purple-500 transition-all group-hover:border-purple-700 group-hover:shadow-md"
                  />
                )}
                <button
                  onClick={handleLogout}
                  className='font-montserrat leading-normal text-lg text-slate-gray bg-transparent border-none cursor-pointer hover:text-purple-700 transition-colors duration-300'
                >
                  Logout {user?.name && `(${user.name})`}
                </button>
              </div>
            ) : (
              <Link to="/login" className='font-montserrat leading-normal text-lg text-slate-gray hover:text-purple-700 transition-colors duration-300'>
                Login
              </Link>
            )}
          </li>
        </ul>

        <div className='hidden max-lg:block'>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <img src={hamburger} alt='hamburger icon' width={25} height={25} />
          </button>
        </div>
      </nav>

      {/* Mobile menu with animation */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: mobileMenuOpen ? 1 : 0, 
          y: mobileMenuOpen ? 0 : -20,
          display: mobileMenuOpen ? 'block' : 'none'
        }}
        transition={{ duration: 0.3 }}
        className='lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 z-30'
      >
        <ul className='flex flex-col items-center gap-4'>
          {navLinks.map((item) => (
            <li key={item.label}>
              <Link
                to={item.href}
                className='font-montserrat text-lg text-slate-gray hover:text-purple-700 transition-colors px-4 py-2 block'
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link 
              to="/cart" 
              className='font-montserrat text-lg text-slate-gray hover:text-purple-700 transition-colors px-4 py-2 block' 
              onClick={() => setMobileMenuOpen(false)}
            >
              Cart {itemCount > 0 && (
                <span className="ml-2 bg-purple-700 text-white text-xs rounded-full px-2 py-1">
                  {itemCount}
                </span>
              )}
            </Link>
          </li>
          <li>
            {isAuthenticated ? (
              <button 
                onClick={() => { handleLogout(); setMobileMenuOpen(false); }} 
                className='font-montserrat text-lg text-slate-gray hover:text-purple-700 transition-colors px-4 py-2 block w-full text-left'
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/login" 
                className='font-montserrat text-lg text-slate-gray hover:text-purple-700 transition-colors px-4 py-2 block' 
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </motion.div>
    </header>
  );
};

export default Nav;