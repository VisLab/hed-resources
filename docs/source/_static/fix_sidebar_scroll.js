/**
 * Fix sidebar scroll jump when clicking navigation links
 * 
 * Furo's JavaScript scrolls the active navigation item into view, causing
 * the sidebar to jump to the top. This script aggressively prevents that.
 */

// Override scrollIntoView IMMEDIATELY, before anything else loads
(function() {
    'use strict';
    
    const originalScrollIntoView = Element.prototype.scrollIntoView;
    
    Element.prototype.scrollIntoView = function(arg) {
        // Get the sidebar container
        const sidebar = document.querySelector('.sidebar-scroll');
        
        // Check if this element is inside the sidebar
        if (sidebar && sidebar.contains(this)) {
            // Check if it's a navigation element
            const isInSidebarTree = this.closest('.sidebar-tree') !== null;
            const isNavElement = this.classList.contains('reference') ||
                               this.classList.contains('current') ||
                               this.classList.contains('toctree-l1') ||
                               this.classList.contains('toctree-l2') ||
                               this.classList.contains('toctree-l3') ||
                               this.tagName === 'LI';
            
            if (isInSidebarTree || isNavElement) {
                return; // Don't scroll!
            }
        }
        
        // For non-sidebar elements, use original behavior
        return originalScrollIntoView.call(this, arg);
    };
})();

// Also set up additional protections after DOM loads
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
