/**
 * Redirect Configuration for Migrated Documentation Pages
 * 
 * This file contains the mapping of old pages/anchors to their new locations
 * for documentation that has been moved to different sites.
 * 
 * Usage: Add entries for each page that needs redirection.
 */

const REDIRECT_CONFIG = {
    // Table Remodeling documentation moved to hedtags.org/table-remodeler
    "HedRemodelingQuickstart.html": {
        // New base URL for this page
        newUrl: "https://www.hedtags.org/table-remodeler/quickstart.html",
        
        // Anchor mappings: old anchor -> new anchor
        // Maps ALL anchors from the old page (both explicit and auto-generated)
        // This ensures full control regardless of heading changes in the new site
        anchorMap: {
            // Explicit MyST-style anchors (old -> new)
            "#hed-remodeling-quickstart-anchor": "#quickstart",
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
            "#table-remodeler-quickstart": "#quickstart",
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
        newUrl: "https://www.hedtags.org/table-remodeler/user_guide.html",
        anchorMap: {
            // Main page anchors
            "#hed-remodeling-tools-anchor": "#user-guide",
            "#overview-of-remodeling-anchor": "#getting-started",
            "#transformation-operations-anchor": "#basic-data-transformation",
            "#summarization-operations-anchor": "#basic-data-transformation",
            "#available-operations-anchor": "#getting-started",
            "#remodel-operation-summary-anchor": "#getting-started",
            "#installing-the-remodel-tools-anchor": "#installation",
            "#remodel-command-line-interface-anchor": "#using-the-cli",
            "#calling-remodel-tools-anchor": "#using-the-cli",
            "#remodeling-operation-summary-anchor": "#getting-started",
            "#remodel-command-line-arguments-anchor": "#using-the-cli",
            "#remodel-scripts-anchor": "#using-the-cli",
            "#backing-up-files-anchor": "#backup-and-restore",
            "#remodel-backup-anchor": "#backup-and-restore",
            "#remodel-backup-jupyter-anchor": "#backup-and-restore",
            "#remodeling-files-anchor": "#your-first-remodeling-pipeline",
            "#run-remodel-anchor": "#using-the-cli",
            "#restoring-files-anchor": "#backup-and-restore",
            "#run-remodel-restore-anchor": "#backup-and-restore",
            "#remodel-with-hed-anchor": "#working-with-hed-annotations",
            "#extracting-hed-information-from-bids-anchor": "#working-with-hed-annotations",
            "#directly-specifying-hed-information-anchor": "#working-with-hed-annotations",
            "#run-remodel-with-hed-direct-anchor": "#working-with-hed-annotations",
            "#remodel-with-hed-direct-python-anchor": "#working-with-hed-annotations",
            "#remodel-error-handling-anchor": "#troubleshooting",
            "#errors-in-the-remodel-file-anchor": "#troubleshooting",
            "#execution-time-remodel-errors-anchor": "#troubleshooting",
            "#remodel-sample-files-anchor": "#your-first-remodeling-pipeline",
            "#sample-remodel-file-anchor": "#your-first-remodeling-pipeline",
            "#sample-remodel-event-file-anchor": "#your-first-remodeling-pipeline",
            
            // Individual operations - redirect to operations reference
            "#remodel-transformations-anchor": "#basic-data-transformation",
            "#factor-column-anchor": "#basic-data-transformation",
            "#factor-hed-tags-anchor": "#working-with-hed-annotations",
            "#factor-hed-type-anchor": "#working-with-hed-annotations",
            "#merge-consecutive-anchor": "#basic-data-transformation",
            "#remap-columns-anchor": "#basic-data-transformation",
            "#remove-columns-anchor": "#basic-data-transformation",
            "#remove-rows-anchor": "#basic-data-transformation",
            "#rename-columns-anchor": "#renaming-columns",
            "#reorder-columns-anchor": "#basic-data-transformation",
            "#split-rows-anchor": "#basic-data-transformation",
            
            // Auto-generated heading anchors
            "#hed-remodeling-tools": "#user-guide",
            "#overview-of-remodeling": "#getting-started",
            "#transformation-operations": "#basic-data-transformation",
            "#summarization-operations": "#basic-data-transformation",
            "#available-operations": "#getting-started",
            "#installing-the-remodel-tools": "#installation",
            "#remodel-command-line-interface": "#using-the-cli",
            "#calling-remodel-tools": "#using-the-cli",
            "#backup-files": "#backup-and-restore",
            "#remodeling-files": "#your-first-remodeling-pipeline",
            "#restoring-files": "#backup-and-restore",
            "#remodel-error-handling": "#troubleshooting",
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
