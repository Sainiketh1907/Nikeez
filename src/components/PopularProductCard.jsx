import { useState } from 'react';
import { Link } from 'react-router-dom';
import star from "../assets/icons/star.png";
import { motion } from 'framer-motion';

const PopularProductCard = ({ imgURL, name, price, rating, id }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Fallback image URL in case the provided one fails to load
  const fallbackImage = "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-665455a5-45de-40fb-945f-c1852b82400d/react-infinity-run-flyknit-mens-running-shoe-zX42Nc.jpg";

  // Handle image loading errors
  const handleImageError = () => {
    if (!imageError) {
      console.log(`Image failed to load for ${name}. Using fallback.`);
      setImageError(true);
    }
  };

  return (
    <motion.div 
      className="relative overflow-hidden rounded-2xl bg-white shadow-lg group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge - New or Sale */}
      <div className="absolute top-4 left-4 z-10">
        <span className="px-3 py-1 text-xs font-bold text-white bg-purple-600 rounded-full">
          NEW
        </span>
      </div>

      {/* Image Container */}
      <div className="overflow-hidden relative aspect-square w-full">
        <img
          src={imageError ? fallbackImage : imgURL}
          alt={name}
          onError={handleImageError}
          className={`w-fit h-fit object-cover object-center transition-all duration-500 ease-out ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        
        {/* Hover Overlay with Actions */}
        <div className={`absolute inset-0 bg-black bg-opacity-20 flex flex-col justify-end items-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="p-4 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <Link to={`/products/${id || 1}`}>
              <button className="w-full bg-white text-gray-900 font-bold py-3 px-6 rounded-lg shadow-md hover:bg-gray-100 transition-colors mb-2">
                View Details
              </button>
            </Link>
            
          </div>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-6 bg-white">
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <img 
                key={i}
                src={star} 
                alt="star" 
                className={`w-4 h-4 ${i < Math.floor(rating) ? 'opacity-100' : 'opacity-40'}`} 
              />
            ))}
          </div>
          <span className="ml-2 text-sm font-medium text-slate-500">({rating?.toFixed(1) || "N/A"})</span>
        </div>
        
        {/* Name */}
        <h3 className="text-xl font-bold text-gray-900 font-palanquin line-clamp-1 group-hover:text-purple-700 transition-colors">
          {name || "Nike Shoe"}
        </h3>
        
        {/* Price */}
        <div className="mt-3 flex items-center justify-between">
          <p className="font-semibold text-xl text-purple-700 font-montserrat">
            {price || "$150.00"}
          </p>
          
          {/* Quick add button (visible on mobile or when not hovering) */}
          <button 
            className={`rounded-full w-10 h-10 bg-gray-100 p-0 border-0 inline-flex items-center justify-center text-purple-700 hover:bg-purple-100 transition-all duration-300 ${isHovered ? 'opacity-0' : 'opacity-100 md:opacity-100'}`}
            aria-label="Add to cart"
          >
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14"></path>
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PopularProductCard;