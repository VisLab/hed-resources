/**
 * Fix sidebar scroll jump when expanding/collapsing navigation items
 * 
 * This script prevents the sidebar from jumping to the top when clicking
 * on expandable navigation items (toctree expanders) in the Furo theme.
 */

(function() {
    'use strict';
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        const sidebar = document.querySelector('.sidebar-scroll');
        if (!sidebar) return;
        
        // Store the current scroll position before any clicks
        let scrollPosition = 0;
        
        // Find all toctree expander labels (the clickable elements that expand/collapse sections)
        const expanderLabels = document.querySelectorAll('.toctree-expand');
        
        expanderLabels.forEach(label => {
            label.addEventListener('click', function(e) {
                // Save the current scroll position
                scrollPosition = sidebar.scrollTop;
                
                // After the expansion/collapse animation, restore the scroll position
                // Use requestAnimationFrame to ensure this happens after the DOM update
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        sidebar.scrollTop = scrollPosition;
                    });
                });
            });
        });
        
        // Also handle any dynamically added expanders (if navigation is rebuilt)
        const observer = new MutationObserver(() => {
            const newExpanders = document.querySelectorAll('.toctree-expand');
            newExpanders.forEach(label => {
                // Check if this label already has the listener (avoid duplicates)
                if (!label.hasAttribute('data-scroll-fix')) {
                    label.setAttribute('data-scroll-fix', 'true');
                    label.addEventListener('click', function(e) {
                        scrollPosition = sidebar.scrollTop;
                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                sidebar.scrollTop = scrollPosition;
                            });
                        });
                    });
                }
            });
        });
        
        // Observe changes to the sidebar navigation
        const sidebarTree = document.querySelector('.sidebar-tree');
        if (sidebarTree) {
            observer.observe(sidebarTree, {
                childList: true,
                subtree: true
            });
        }
    }
})();
