import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Nav } from "./components";
import {
  CustomerReviews,
  Footer,
  Hero,
  PopularProducts,
  Services,
  SpecialOffer,
  Subscribe,
  SuperQuality,
} from "./sections";
import ShoeDetailPage from './components/shoeDetails';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { useEffect } from 'react';

// Layout component for the homepage - keeping all original CSS classes
const MainLayout = () => {
  const location = useLocation();

  useEffect(() => {
    // Determine the target section ID based on the pathname
    let sectionId = '';
    switch (location.pathname) {
      case '/about-us':
        sectionId = 'about-us';
        break;
      case '/products':
        sectionId = 'products';
        break;
      case '/contact-us':
        sectionId = 'contact-us';
        break;
      default:
        if (location.pathname === '/') {
          // Scroll to top on home
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
        return;
    }

    const timer = setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    // Modified scroll-snap container to prevent videos from expanding too much
    <>
      {/* Keep all original section classes but add max-h-screen to limit overflowing content */}
       <section className='xl:padding-l wide:padding-r padding-b snap-start min-h-screen flex items-center'>
      <Hero />
    </section>
    {/* Section 2: Light Gray BG */}
    <section className='padding bg-indigo-100 snap-start min-h-screen flex flex-col justify-center bg-slate-50'> {/* Example BG */}
      <PopularProducts />
    </section>
    {/* Section 3: Default BG */}
    <section className='padding bg-red-50 snap-start min-h-screen flex items-center'>
      <SuperQuality />
    </section>
    {/* Section 4: Light Gray BG */}
    <section className='padding-x py-10 snap-start min-h-screen flex items-center bg-slate-50'> {/* Example BG */}
      <Services />
    </section>
    {/* Section 5: Default BG */}
    <section className='padding bg-yellow-100 snap-start min-h-screen flex items-center'>
      <SpecialOffer />
    </section>
    {/* Section 6: Keep Pale Blue or change */}
    <section className='bg-blue-100 padding snap-start min-h-screen flex flex-col justify-center'>
      <CustomerReviews />
    </section>
    {/* Section 7: Light Gray BG */}
    <section className='bg-pink-50 padding-x sm:py-32 py-16 w-full snap-start min-h-screen flex items-center bg-slate-50'> {/* Example BG */}
      <Subscribe />
    </section>
    <section>
        <nav/>
    </section>
   </>
  );
};

// Create a component that uses useLocation INSIDE the Router context
const PageContent = () => {
  const location = useLocation();

  return (
    <div className='relative'>
      <Nav />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/* Routes that render MainLayout with smooth scroll */}
        <Route path="/" element={<MainLayout />} />
        <Route path="/about-us" element={<MainLayout />} />
        <Route path="/products" element={<MainLayout />} />
        <Route path="/contact-us" element={<MainLayout />} />
        
        {/* Product detail page */}
        <Route path="/products/:productId" element={<ShoeDetailPage />} />
        
        {/* Cart page (protected) */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

// App component wraps everything in providers
const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <PageContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;