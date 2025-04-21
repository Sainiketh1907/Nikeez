import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { configureAuthgear } from './authgear';

// Create root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Configure Authgear first, then render the app
async function initApp() {
  try {
    console.log("Starting application initialization...");
    // Initialize Authgear
    await configureAuthgear();
    console.log("Authgear initialized, rendering app...");
    
    // Now render the app
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Failed to initialize application:", error);
    root.render(
      <div className="max-container padding mt-20 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-red-500">Application Error</h2>
          <p className="mb-4">Failed to initialize authentication. Please try:</p>
          <ol className="list-decimal pl-5 mb-4">
            <li>Refreshing the page</li>
            <li>Clearing your browser cookies and cache</li>
            <li>Using a different browser</li>
          </ol>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }
}

// Start initialization
initApp();
