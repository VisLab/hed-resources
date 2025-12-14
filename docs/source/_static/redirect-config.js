/**
 * Redirect Configuration for Migrated Documentation Pages
 * 
 * This file contains the mapping of old pages/anchors to their new locations
 * for documentation that has been moved to different sites.
 * 
 * Usage: Add entries for each page that needs redirection.
 */

const REDIRECT_CONFIG = {
    // Table Remodeling documentation moved to hedtags.org/table-remodeling
    "HedRemodelingQuickstart.html": {
        // New base URL for this page
        newUrl: "https://www.hedtags.org/table-remodeler/quickstart.html",
        
        // Anchor mappings: old anchor -> new anchor
        // Maps ALL anchors from the old page (both explicit and auto-generated)
        // This ensures full control regardless of heading changes in the new site
        anchorMap: {
            // Explicit MyST-style anchors (old -> new)
            "#hed-remodeling-quickstart-anchor": "#quickstart-anchor",
            "#what-is-remodeling-anchor": "#what-is-remodeling-anchor",
            "#the-remodeling-process-anchor": "#the-remodeling-process-anchor",
            "#json-remodeling-files-anchor": "#json-remodeling-files-anchor",
            "#basic-remodel-operation-syntax-anchor": "#basic-remodel-operation-syntax-anchor",
            "#applying-multiple-remodel-operations-anchor": "#applying-multiple-remodel-operations-anchor",
            "#more-complex-remodeling-anchor": "#more-complex-remodeling-anchor",
            "#sample-remodeling-events-file-anchor": "#sample-remodeling-events-file-anchor",
            "#remodeling-file-locations-anchor": "#remodeling-file-locations-anchor",
            "#using-the-remodeling-tools-anchor": "#using-the-remodeling-tools-anchor",
            "#online-tools-for-debugging-anchor": "#online-tools-for-debugging-anchor",
            "#the-command-line-interface-anchor": "#the-command-line-interface-anchor",
            "#jupyter-notebooks-for-remodeling-anchor": "#jupyter-notebooks-for-remodeling-anchor",
            "#summary-of-hed-remodeling-operations-anchor": "#summary-of-operations-anchor",
            
            // Auto-generated anchors from headings (H1, H2, H3)
            "#table-remodler-quickstart": "#quickstart",
            "#what-is-remodeling": "#what-is-remodeling",
            "#the-remodeling-process": "#the-remodeling-process", 
            "#json-remodeling-files": "#json-remodeling-files",
            "#basic-remodel-operation-syntax": "#basic-remodel-operation-syntax",
            "#applying-multiple-remodel-operations": "#applying-multiple-remodel-operations",
            "#more-complex-remodeling": "#more-complex-remodeling",
            "#remodeling-file-locations": "#remodeling-file-locations",
            "#using-the-remodeling-tools": "#using-the-remodeling-tools",
            "#online-tools-for-debugging": "#online-tools-for-debugging",
            "#the-command-line-interface": "#the-command-line-interface",
            "#jupyter-notebooks-for-remodeling": "#jupyter-notebooks-for-remodeling",
        }
    },
    
    "HedRemodelingTools.html": {
        newUrl: "https://www.hedtags.org/table-remodeler/RemodelingTools.html",
        anchorMap: {
            // Add anchor mappings as needed when this page is migrated
        }
    }
    
    // Add more pages as they are migrated:
    // "OldPageName.html": {
    //     newUrl: "https://new-site/new-page.html",
    //     anchorMap: {
    //         "#old-anchor": "#new-anchor"
    //     }
    // }
};

// Export for use in redirect script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = REDIRECT_CONFIG;
}
