// Get API URL from environment variables - update with correct API endpoint structure
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.kicks.dev/v3';
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchTrendingNikeShoes = async (page = 1, limit = 8) => {
  try {
    // Fix the endpoint path - removed /stockx/products/ part that's causing the 404
    const url =`${API_BASE_URL}/stockx/products?page=${page}&limit=${limit}&query=nike`;
    
    const headers = {
      'Content-Type': 'application/json',
    };
    
    // Add API key if available
    if (API_KEY) {
      headers['Authorization'] = `Bearer ${API_KEY}`;
    }

    console.log(`Fetching from: ${url}`);
    const response = await fetch(url, { headers });

    if (!response.ok) {
      if (response.status === 0 || response.type === 'opaque') {
        console.error("This might be a CORS issue. Check the Network tab and kicks.dev documentation regarding browser access.");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("Received data from kicks.dev REST API:", responseData);

    // Extract shoes based on various possible response structures
    const shoes = responseData.results || responseData.data || (Array.isArray(responseData) ? responseData : []);
    const totalPages = responseData.total_pages || responseData.totalPages || null;

    if (!Array.isArray(shoes)) {
      console.error("Extracted shoe data is not an array:", shoes);
      return { shoes: [], totalPages: 0 };
    }

    return { shoes, totalPages };

  } catch (error) {
    console.error("Error calling kicks.dev REST API:", error);
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      console.error("This might indicate a network issue or CORS problem.");
    }
    // Return default values in case of error
    return { shoes: [], totalPages: 0 };
  }
};

export const fetchShoeDetails = async (id) => {
  try {
    const url = `${API_BASE_URL}/stockx/products/${id}`;
    
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    };
    
    console.log(`Fetching shoe details from: ${url}`);
    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      console.error(`API responded with status: ${response.status}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("API Response Structure:", Object.keys(data)); 
    console.log("Full Response Data:", data);
    
    // Handle nested response structure - the product might be inside a 'data' property
    const productData = data.product || data.data || data;
    
    // Carefully extract nested properties with fallbacks
    const normalizedProduct = {
      id:  productData.id || id,
      title:  productData.title || "Nike Shoe",
      description: productData.description || productData.product_description || "No description available",
      price: productData.max_price || productData.avg_price || 150,
      image: productData.image,
      brand: productData.brand || "Nike",
      rating: productData.average_rating || 4.5,
      category: productData.category || extractCategory(productData),
      colorway: productData.colorway || extractColorway(productData) || "Not specified",
      release_date: productData.release_date || "Unknown",
      sku: productData.style_id || productData.sku || productData.style || "Unknown",
      style_id: productData.style_id || productData.sku || productData.style || "Unknown",
      traits: extractTraits(productData)
    };
    
    console.log("Normalized product object:", normalizedProduct);
    return normalizedProduct;
  } catch (error) {
    console.error(`Error fetching shoe details for ID ${id}:`, error);
    return createFallbackProduct(id, error);
  }
};

// Helper function to extract image URL from various possible locations
function extractImageUrl(data) {
  // Try all possible image paths
  return data.media?.image_url 
      || data.image_url 
      || data.thumbnail_url 
      || data.media?.imageUrl
      || data.media?.[0]?.imageUrl 
      || data.thumbnail 
      || data.image 
      || null;
}

// Helper function to extract category from other fields if not directly available
function extractCategory(data) {
  return data.category 
      || data.shoe_category 
      || data.product_category 
      || (data.title?.includes('Running') ? 'Running' : 'Lifestyle');
}

// Helper function to extract colorway
function extractColorway(data) {
  return data.colorway 
      || data.color 
      || data.color_description 
      || (data.traits?.find(t => t.name?.toLowerCase() === 'color' || t.trait?.toLowerCase() === 'color')?.value)
      || "Various";
}

// Helper function to extract traits
function extractTraits(data) {
  // If traits array exists, use it
  if (Array.isArray(data.traits) && data.traits.length > 0) {
    return data.traits;
  }
  
  // Otherwise, try to construct traits from other fields
  const traits = [];
  
  if (data.colorway) {
    traits.push({ trait: 'Color', value: data.colorway });
  }
  
  if (data.style_id || data.sku) {
    traits.push({ trait: 'Style ID', value: data.style_id || data.sku });
  }
  
  if (data.release_date) {
    traits.push({ trait: 'Release Date', value: data.release_date });
  }
  
  if (data.brand) {
    traits.push({ trait: 'Brand', value: data.brand });
  }
  
  // Add more fields that might be useful as traits
  return traits;
}

// Create fallback product when API fails
function createFallbackProduct(id, error) {
  console.log("Creating fallback product for ID:", id, "Error:", error.message);
  
  // Try fallback endpoint
  return fetchFallbackProduct(id).catch(() => {
    // If all else fails, return a placeholder object
    return {
      id: id,
      title: "Nike Shoe",
      name: "Nike Shoe",
      description: "Product details temporarily unavailable.",
      price: 150,
      avg_price: 150,
      max_price: 150,
      image: null,
      brand: "Nike",
      rating: 4.5,
      category: "Running", 
      colorway: "Not specified",
      release_date: "Unknown",
      sku: id,
      style_id: id,
      traits: []
    };
  });
}

// Fallback product fetch using alternative endpoint
async function fetchFallbackProduct(id) {
  const altUrl = `${API_BASE_URL}/search?query=${encodeURIComponent(id)}`;
  console.log(`Trying fallback endpoint: ${altUrl}`);
  
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
  };
  
  const response = await fetch(altUrl, { headers });
  
  if (!response.ok) {
    throw new Error(`Fallback API error: ${response.status}`);
  }
  
  const data = await response.json();
  console.log("Fallback API response:", data);
  
  // Find the first product in results
  const product = data.products?.[0] || data.results?.[0];
  
  if (!product) {
    throw new Error("No products found in fallback search");
  }
  
  return {
    id: product.uuid || product.id || id,
    title: product.name || product.title || "Nike Shoe",
    name: product.name || product.title || "Nike Shoe",
    description: product.description || "No description available",
    price: product.retail_price || 150,
    avg_price: product.market_data?.last_sale || product.average_deadstock_price || product.retail_price || 150,
    max_price: product.market_data?.highest_bid || product.highest_bid || product.retail_price || 150,
    image: extractImageUrl(product),
    brand: product.brand || "Nike",
    rating: product.average_rating || 4.5,
    category: product.category || extractCategory(product),
    colorway: product.colorway || extractColorway(product) || "Not specified",
    release_date: product.release_date || "Unknown",
    sku: product.style_id || product.sku || product.style || "Unknown",
    style_id: product.style_id || product.sku || product.style || "Unknown",
    traits: extractTraits(product)
  };
}

// Export with alternate name to match what's being imported in shoeDetails.jsx
export const fetchProductById = fetchShoeDetails;