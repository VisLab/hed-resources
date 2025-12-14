/**
 * Universal Redirect Script for GitHub Pages
 * 
 * This script handles redirects from old documentation pages to their new locations,
 * including intelligent anchor/hash handling and mapping.
 * 
 * It works by:
 * 1. Reading the current page filename from window.location
 * 2. Looking up the redirect configuration for this page
 * 3. Handling any anchor remapping if needed
 * 4. Performing the redirect
 */

(function() {
    'use strict';
    
    /**
     * Get the current page filename from the URL
     * @returns {string} The filename (e.g., "HedRemodelingQuickstart.html")
     */
    function getCurrentPageName() {
        const path = window.location.pathname;
        const parts = path.split('/');
        return parts[parts.length - 1] || 'index.html';
    }
    
    /**
     * Perform the redirect with anchor remapping
     * @param {Object} config - The redirect configuration for this page
     */
    function performRedirect(config) {
        if (!config || !config.newUrl) {
            console.error('Invalid redirect configuration');
            return;
        }
        
        let finalUrl = config.newUrl;
        const currentHash = window.location.hash; // e.g., "#old-anchor"
        
        // Handle anchor/hash if present
        if (currentHash) {
            const anchorMap = config.anchorMap || {};
            
            if (anchorMap[currentHash]) {
                // We have a specific mapping for this old anchor
                finalUrl += anchorMap[currentHash];
                console.log(`Redirecting with mapped anchor: ${currentHash} -> ${anchorMap[currentHash]}`);
            } else {
                // No mapping found, pass the original anchor through
                // (assumes the anchor name is the same on the new site)
                finalUrl += currentHash;
                console.log(`Redirecting with original anchor: ${currentHash}`);
            }
        }
        
        console.log(`Redirecting to: ${finalUrl}`);
        
        // Use replace() instead of setting location.href
        // This prevents the redirect page from appearing in browser history
        window.location.replace(finalUrl);
    }
    
    /**
     * Initialize and execute the redirect
     */
    function init() {
        // Check if REDIRECT_CONFIG is loaded
        if (typeof REDIRECT_CONFIG === 'undefined') {
            console.error('REDIRECT_CONFIG not loaded. Make sure redirect-config.js is included before redirect.js');
            return;
        }
        
        const pageName = getCurrentPageName();
        console.log(`Current page: ${pageName}`);
        
        const config = REDIRECT_CONFIG[pageName];
        
        if (config) {
            // Small delay to ensure the page is loaded
            // (usually not needed, but helps with some edge cases)
            setTimeout(function() {
                performRedirect(config);
            }, 100);
        } else {
            console.warn(`No redirect configuration found for page: ${pageName}`);
        }
    }
    
    // Execute when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM already loaded
        init();
    }
})();
