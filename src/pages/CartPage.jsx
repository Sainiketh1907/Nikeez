import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useCart } from '../context/CartContext';
import defaultshoe from '../assets/images/defaultShoe.jpg';

// Accept className prop
const CartPage = ({ className }) => {
  // Added clearCart if you implement it in context, otherwise remove it from destructuring
  // Ensure clearCart is implemented in CartContext if you use it here
  const { cartItems, removeFromCart, itemCount, clearCart } = useCart();
  const navigate = useNavigate(); // Initialize useNavigate

  // Log items received by the CartPage component
  console.log("CartPage rendering with cartItems:", cartItems);
  console.log("CartPage rendering with itemCount:", itemCount);

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    // Use avg_price, fallback to max_price, otherwise 0 for calculation
    const price = item.avg_price || item.max_price || 0;
    // Assuming quantity is 1 for now, adjust if quantity is implemented
    const quantity = item.quantity || 1;
    return total + (price * quantity);
  }, 0);

  const handleProceedToCheckout = () => {
    // In a real app, this would navigate to a checkout flow,
    // potentially passing cart details or an order ID.
    console.log("Proceeding to checkout with items:", cartItems);
    console.log("Total Price:", totalPrice.toFixed(2));
    alert("Feature coming soon!");

  };

  return (
    // Apply the passed className here, ensure min-height is sufficient (min-h-screen recommended)
    <section className={`max-container padding mt-20 min-h-screen ${className || ''}`}>
      {/* Revert text color */}
      <h1 className="text-4xl font-palanquin font-bold mb-8 text-gray-900">Your Cart</h1>

      {itemCount === 0 ? (
        <div className="text-center">
          {/* Revert text color */}
          <p className="text-xl font-montserrat text-slate-gray mb-6">Your cart is currently empty.</p>
          <Link
            to="/"
            // Keep button colors purple
            className="px-6 py-3 bg-purple-700 text-white font-montserrat rounded hover:bg-purple-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Continue Shopping Link */}
          <div className="mb-4">
             <Link
                to="/"
                // Keep link color purple
                className="text-purple-700 hover:text-purple-600 inline-block"
             >
                &larr; Continue Shopping
             </Link>
          </div>

          {/* Cart Items List */}
          {cartItems.map((item) => (
            // Revert item card background, keep border
            <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 border-b border-gray-200 pb-4">
              <img
                src={item.image || defaultshoe}
                alt={item.title}
                // Revert image frame background
                className="w-24 h-24 object-cover rounded-md flex-shrink-0 p-1"
              />
              <div className="flex-grow text-center sm:text-left">
                {/* Revert text colors */}
                <h2 className="text-lg font-semibold font-palanquin text-gray-900">{item.title}</h2>
                {/* Keep price color purple */}
                <p className="text-md font-montserrat text-purple-700">
                  {item.avg_price ? `$${item.avg_price}` : (item.max_price ? `Approx $${item.max_price}` : 'Price unavailable')}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                // Revert remove button style for light theme
                className="mt-2 sm:mt-0 px-4 py-2 bg-gray-200 text-slate-gray text-sm font-montserrat rounded hover:bg-gray-300 transition-colors flex-shrink-0"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Cart Summary and Checkout */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
             {/* Revert text colors */}
             <div className="text-lg font-montserrat font-semibold text-gray-900">
               {/* Keep total price color purple */}
               Total: <span className="text-purple-700">${totalPrice.toFixed(2)}</span>
             </div>
            <button
              onClick={handleProceedToCheckout}
              // Keep button colors purple
              className="px-6 py-3 bg-purple-700 text-white font-montserrat rounded hover:bg-purple-800 transition-colors w-full sm:w-auto"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CartPage;