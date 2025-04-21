import { useState, useEffect } from 'react';
import { PopularProductCard } from "../components";
import { motion } from 'framer-motion';
import { fetchTrendingNikeShoes } from '../utils/fetchProducts';

const PopularProducts = () => {
  // State variables
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Categories for filter (in a real app, these might come from the API too)
  const categories = ['All', 'Running', 'Basketball', 'Lifestyle', 'Training'];
  
  // Function to load products
  const loadProducts = async (page = 1) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch products using your utility function
      const { shoes, totalPages: pages } = await fetchTrendingNikeShoes(page, 8);
      
      if (shoes) {
        console.log("Loaded shoes:", shoes);
        setProducts(shoes);
        if (pages) setTotalPages(pages);
      } else {
        throw new Error("Failed to load products");
      }
    } catch (err) {
      console.error("Error loading products:", err);
      setError("Couldn't load products. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Load products on component mount
  useEffect(() => {
    loadProducts(currentPage);
  }, [currentPage]);
  
  // Handle category changes - in a real implementation, you would
  // modify the API call to filter by category
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1); // Reset to first page when changing category
    
    // In a complete implementation, you would add category to the API call
    // For now, just reload the products
    loadProducts(1);
  };
  
  // Handle pagination
  const handleNextPage = () => {
    if (totalPages === null || currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <motion.div 
      className="max-container"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <section className="flex flex-col justify-center gap-5">
        <div className="flex flex-col justify-start gap-5">
          {/* Section title and subtitle with decoration */}
          <div className="relative">
            <div className="absolute -left-4 top-0 h-12 w-1 bg-purple-600 rounded-full"></div>
            <h2 className="text-4xl font-bold font-palanquin">
              Our <span className="text-purple-600">Popular</span> Products
            </h2>
          </div>
          
          <p className="lg:max-w-lg mt-2 font-montserrat text-slate-gray">
            Experience top quality Nike kicks from leading collections and styles.
             
          </p>
        </div>

        {/* Category tabs */}
        <div className="mt-8 mb-12">
          <div className="flex space-x-1 sm:space-x-2 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-3 text-sm font-medium rounded-full whitespace-nowrap transition-all ${
                  activeCategory === category
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="min-h-[300px] flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
              <p className="mt-4 text-slate-500">Loading fresh kicks...</p>
            </div>
          </div>
        )}
        
        {/* Error State */}
        {error && !isLoading && (
          <div className="min-h-[200px] flex items-center justify-center">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 w-full max-w-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                  <button 
                    className="mt-2 text-sm font-medium text-red-700 underline"
                    onClick={() => loadProducts(currentPage)}
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        {!isLoading && !error && (
          <>
            {products && products.length > 0 ? (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                  <PopularProductCard 
                    key={product.id || product.uuid || product._id} 
                    id={product.id || product.uuid || product._id}
                    name={product.name || product.title || "Nike Shoe"}
                    price={`$${product.max_price}` || `$${150}`}
                    rating={product.averageRating || 4.5}
                    imgURL={product.image || product.thumbnail || product.media?.imageUrl}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-20 text-center min-h-[200px] flex items-center justify-center">
                <p className="text-xl text-slate-500">No products available right now.</p>
              </div>
            )}

            {/* Pagination Controls */}
            {products && products.length > 0 && (
              <div className="mt-12 flex justify-center items-center space-x-4">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-full transition-colors flex-1 max-w-[120px] ${
                    currentPage === 1 
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  Previous
                </button>
                
                <span className="text-gray-700 text-xl font-medium">
                   Page {currentPage} {totalPages ? `of ${totalPages}` : ''}
                </span>
                
                <button
                  onClick={handleNextPage}
                  disabled={totalPages !== null && currentPage >= totalPages}
                  className={`px-4 py-2 rounded-full transition-colors flex-1 max-w-[120px] ${
                    totalPages !== null && currentPage >= totalPages
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </motion.div>
  );
};

export default PopularProducts;