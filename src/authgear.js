import authgearWeb from '@authgear/web';

// Log the imported module to see what we've got
console.log("Authgear import:", authgearWeb);

// Export the singleton instance
const authgear = authgearWeb;

// Export configuration function to be called at application start
export const configureAuthgear = async () => {
  try {
    console.log("Configuring Authgear with:", {
      clientID: "d169817469616b28",
      endpoint: "https://nikeez.authgear.cloud"
    });
    
    // Check if authgearWeb has default
    if (authgearWeb.default) {
      console.log("Found authgearWeb.default, using it");
      await authgearWeb.default.configure({
        clientID: "d169817469616b28",
        endpoint: "https://nikeez.authgear.cloud",
        sessionType: "refresh_token",
        tokenStorage: "localStorage",
      });
      return authgearWeb.default;
    }
    
    // Otherwise use authgearWeb directly
    await authgear.configure({
      clientID: "d169817469616b28",
      endpoint: "https://nikeez.authgear.cloud",
      sessionType: "refresh_token",
      tokenStorage: "localStorage",
    });
    
    console.log("Authgear configured successfully!");
    console.log("Methods available:", Object.keys(authgear).filter(key => typeof authgear[key] === 'function'));
    return authgear;
  } catch (error) {
    console.error("Failed to configure Authgear:", error);
    throw error;
  }
};

// Export the singleton instance
export default authgear;