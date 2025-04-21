import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import * as authgearSdk from '@authgear/web';

// --- Authgear Configuration ---
const authgearConfig = {
  clientID: "d169817469616b28",
  endpoint: "https://nikeez.authgear.cloud",
  sessionType: "refresh_token",
  tokenStorage: "localStorage",
};
// --- End Authgear Configuration ---

const AuthgearWebContext = createContext(null);

let isConfigured = false;

export const AuthgearWebProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [initialConfigFinished, setInitialConfigFinished] = useState(false);

  const authgear = authgearSdk.default;

  useEffect(() => {
    const initializeAndCheckSession = async () => {
      setIsLoading(true);
      try {
        if (!authgear) {
            console.error("Authgear default export not found. SDK Namespace:", authgearSdk);
            throw new Error("Authgear default export not found.");
        }

        if (!isConfigured) {
          console.log("AuthgearWebContext: Configuring Authgear SDK via default export...");
          await authgear.configure(authgearConfig);
          isConfigured = true;
          console.log("AuthgearWebContext: Authgear SDK configured.");
          // --- Add Debugging Logs Here ---
          console.log("AuthgearWebContext: Checking authgear object IMMEDIATELY AFTER configure:", authgear);
          console.log("AuthgearWebContext: typeof authgear.authorize AFTER configure:", typeof authgear.authorize);
          // --- End Debugging Logs ---
        } else {
          console.log("AuthgearWebContext: Authgear SDK already configured.");
        }

        console.log("AuthgearWebContext: Checking session state via default export...");
        if (authgear.sessionState === "AUTHENTICATED") {
          console.log("AuthgearWebContext: Session is AUTHENTICATED. Fetching user info via default export...");
          const info = await authgear.fetchUserInfo();
          setUserInfo(info);
          setIsAuthenticated(true);
          console.log("AuthgearWebContext: User info fetched:", info);
        } else {
          console.log("AuthgearWebContext: Session is not AUTHENTICATED. State:", authgear.sessionState);
          setUserInfo(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("AuthgearWebContext: Error during initialization/session check:", error);
        setUserInfo(null);
        setIsAuthenticated(false);
      } finally {
        setInitialConfigFinished(true);
        setIsLoading(false);
        console.log("AuthgearWebContext: Initial loading finished.");
      }
    };

    initializeAndCheckSession();

  }, [authgear]);

  const value = useMemo(() => ({
    container: authgear,
    isLoading,
    isAuthenticated,
    userInfo,
  }), [authgear, isLoading, isAuthenticated, userInfo]);

  if (!initialConfigFinished) {
     console.log("AuthgearWebContext: Waiting for initial configuration...");
     return <div className="max-container padding mt-20 min-h-screen flex items-center justify-center"><p>Initializing authentication...</p></div>;
  }

  if (!authgear && initialConfigFinished) {
      console.error("AuthgearWebContext: authgear default object is not available after configuration attempt.");
      return <div className="max-container padding mt-20 min-h-screen flex items-center justify-center"><p>Authentication setup failed.</p></div>;
  }

  return (
    <AuthgearWebContext.Provider value={value}>
      {children}
    </AuthgearWebContext.Provider>
  );
};

export const useAuthgearWeb = () => {
  const context = useContext(AuthgearWebContext);
  if (context === undefined || context === null) {
    throw new Error('useAuthgearWeb must be used within an AuthgearWebProvider');
  }
  if (!context.container && !context.isLoading) { // Check container availability after loading
      console.warn("useAuthgearWeb: Authgear container (default export) is not available in context after loading.");
  }
  return context;
};