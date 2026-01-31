/**
 * Additional sidebar scroll fixes for navigation clicks
 * 
 * This script provides additional protections against sidebar scrolling
 * when clicking navigation links. The primary scrollIntoView override
 * is in base.html (loaded before Furo), while this file handles
 * click-time scroll position preservation.
 */

// Set up click handlers to preserve scroll position
(function() {
    'use strict';
    
    function init() {
        const sidebar = document.querySelector('.sidebar-scroll');
        if (!sidebar) {
            return;
        }
        
        // Intercept all clicks on sidebar links
        sidebar.addEventListener('click', function(e) {
            const link = e.target.closest('a.reference');
            if (link && link.closest('.sidebar-tree')) {
                const scrollPos = sidebar.scrollTop;
                
                // Restore scroll position aggressively after click
                setTimeout(() => {
                    sidebar.scrollTop = scrollPos;
                }, 0);
                
                requestAnimationFrame(() => {
                    sidebar.scrollTop = scrollPos;
                    requestAnimationFrame(() => {
                        sidebar.scrollTop = scrollPos;
                    });
                });
                
                setTimeout(() => { sidebar.scrollTop = scrollPos; }, 10);
                setTimeout(() => { sidebar.scrollTop = scrollPos; }, 50);
                setTimeout(() => { sidebar.scrollTop = scrollPos; }, 100);
            }
        }, true); // Use capture phase
    }
    
    // Run immediately if DOM is ready, otherwise wait
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
