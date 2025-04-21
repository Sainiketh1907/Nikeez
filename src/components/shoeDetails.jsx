import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchShoeDetails as fetchProductById } from '../utils/fetchProducts';
import defaultshoe from '../assets/images/defaultShoe.jpg';
import { useCart } from '../context/CartContext';

const ShoeDetailPage = ({ className }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [shoe, setShoe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Add debug logging when component mounts or productId changes
  useEffect(() => {
    console.log("ShoeDetailPage mounted/updated with productId:", productId);
  }, [productId]);

  useEffect(() => {
    const loadShoeDetails = async () => {
      if (!productId) {
        console.error("No productId provided");
        setError("No product ID found. Please go back and try again.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      setShoe(null);

      try {
        console.log(`Fetching details for product ID: ${productId}`);
        const fetchedShoe = await fetchProductById(productId);
        console.log("Received shoe data:", fetchedShoe);
        
        if (fetchedShoe) {
          // Ensure all required fields exist with fallbacks
          const processedShoe = {
            id: fetchedShoe.id || productId,
            title: fetchedShoe.title || fetchedShoe.name || "Unknown Shoe",
            avg_price: fetchedShoe.avg_price || fetchedShoe.price || 0,
            max_price: fetchedShoe.max_price || fetchedShoe.price || 0,
            brand: fetchedShoe.brand || "Nike",
            sku: fetchedShoe.sku || fetchedShoe.style_id || "Unknown",
            description: fetchedShoe.description || "No description available.",
            image: fetchedShoe.image || null,
            traits: Array.isArray(fetchedShoe.traits) ? fetchedShoe.traits : []
          };
          
          console.log("Processed shoe data:", processedShoe);
          setShoe(processedShoe);
        } else {
          console.error("fetchProductById returned null/undefined");
          setError("Shoe not found or failed to load details.");
        }
      } catch (err) {
        console.error("Error fetching shoe details:", err);
        setError("An error occurred while loading shoe details.");
      } finally {
        setLoading(false);
      }
    };

    loadShoeDetails();
  }, [productId]);

  const handleAddToCart = () => {
    console.log("Attempting to add to cart...");
    if (shoe) {
      console.log("Shoe data being added:", shoe);
      if (!shoe.id) {
        console.error("Shoe object is missing an ID!", shoe);
        alert("Cannot add item: Missing product ID.");
        return;
      }
      addToCart(shoe);
      alert(`${shoe.title} added to cart!`);
    } else {
      console.error("Cannot add to cart: Shoe data is null.");
      alert("Cannot add item: Shoe details not loaded.");
    }
  };

  if (loading) {
    return (
      <div className="max-container padding mt-20 text-center">
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-xl font-montserrat">Loading shoe details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-container padding mt-20">
        <button
          onClick={() => navigate(-1)}
          className="text-purple-700 hover:text-purple-600 mb-6 inline-block bg-transparent border-none cursor-pointer p-0"
        >
          &larr; Back
        </button>
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
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
                onClick={() => loadShoeDetails()}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!shoe) {
    return (
      <div className="max-container padding mt-20">
        <button
          onClick={() => navigate(-1)}
          className="text-purple-700 hover:text-purple-600 mb-6 inline-block bg-transparent border-none cursor-pointer p-0"
        >
          &larr; Back
        </button>
        <div className="text-center text-xl font-montserrat">
          Shoe details not available.
        </div>
      </div>
    );
  }

  return (
    <section className={`max-container padding mt-20 min-h-screen ${className || ''}`}>
      <button
        onClick={() => navigate(-1)}
        className="text-purple-700 hover:text-purple-600 mb-6 inline-block bg-transparent border-none cursor-pointer p-0"
      >
        &larr; Back
      </button>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:w-1/2 p-4 rounded-lg">
          <img
            src={shoe.image || defaultshoe}
            alt={shoe.title}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="lg:w-1/2">
          <h1 className="text-4xl font-palanquin font-bold mb-2 text-gray-900">{shoe.title || 'N/A'}</h1>
          <p className="text-2xl font-semibold font-montserrat text-purple-700 mb-4">
            {shoe.avg_price ? `$${shoe.avg_price}` : (shoe.max_price ? `Approx $${shoe.max_price}` : 'Price unavailable')}
          </p>
          <p className="text-lg font-montserrat text-slate-gray mb-4">Brand: {shoe.brand || 'N/A'}</p>
          <p className="text-lg font-montserrat text-slate-gray mb-4">SKU: {shoe.sku || 'N/A'}</p>
          <p className="text-lg font-montserrat text-slate-gray mb-6">{shoe.description || 'No description available.'}</p>

          {shoe.traits && shoe.traits.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold font-montserrat mb-2 text-gray-900">Details:</h3>
              <ul className="list-disc list-inside text-slate-gray font-montserrat">
                {shoe.traits.map((trait, index) => (
                  <li key={index}>
                    <strong>{trait.trait || trait.name || 'Feature'}:</strong> {trait.value || trait.description || 'N/A'}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            className="mt-4 px-6 py-3 bg-purple-700 text-white font-montserrat rounded hover:bg-purple-800 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShoeDetailPage;