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
    },
    
    // HED Python Tools documentation moved to hedtags.org/hed-python
    // All anchors redirect to the base URL (no fragments)
    "HedPythonTools.html": {
        newUrl: "https://www.hedtags.org/hed-python/",
        anchorMap: {
            // Explicit MyST-style anchors - all redirect to base page
            "#jupyter-notebooks-for-hed-anchor": "",
            "#extract-json-template-anchor": "",
            "#find-event-combinations-anchor": "",
            "#merge-spreadsheet-into-sidecar-anchor": "",
            "#sidecar-to-spreadsheet-anchor": "",
            "#summarize-events-anchor": "",
            "#validate-bids-dataset-anchor": "",
            "#validate-bids-dataset-with-libraries-anchor": "",
            "#validate-bids-datasets-anchor": "",
            
            // Auto-generated heading anchors - all redirect to base page
            "#hed-python-tools": "",
            "#hed-python-tool-installation": "",
            "#jupyter-notebooks-for-hed": "",
            "#extract-json-template": "",
            "#find-event-combinations": "",
            "#merge-spreadsheet-into-sidecar": "",
            "#sidecar-to-spreadsheet": "",
            "#summarize-events": "",
            "#validate-bids-dataset": "",
            "#validate-bids-dataset-with-libraries": "",
            "#validate-bids-datasets": ""
        }
    },
    
    // HED Schema Developers Guide moved to hedtags.org/hed-schemas
    "HedSchemaDevelopersGuide.html": {
        newUrl: "https://www.hedtags.org/hed-schemas/developer_guide.html"
    },
    
    // HED Annotation in NWB documentation moved to hedtags.org/ndx-hed
    // All anchors redirect to the base URL (no fragments)
    "HedAnnotationInNWB.html": {
        newUrl: "https://www.hedtags.org/ndx-hed/",
        anchorMap: {
            // Auto-generated heading anchors - all redirect to base page
            "#hed-annotation-in-nwb": "",
            "#nwb-ndx-hed-installation": "",
            "#nwb-ndx-hed-examples": "",
            "#hedtags-as-a-standalone-vector": "",
            "#adding-a-row-to-hedtags": "",
            "#hed-in-a-table": "",
            "#add-a-row-to-a-dynamictable": "",
            "#hed-and-ndx-events": "",
            "#hed-in-nwb-files": ""
        }
    },
    
    // HED Online Tools documentation moved to hedtags.org/hed-web
    // All anchors redirect to the base URL (no fragments)
    "HedOnlineTools.html": {
        newUrl: "https://www.hedtags.org/hed-web/",
        anchorMap: {
            // Explicit MyST-style anchors - all redirect to base page
            "#online-access-anchor": "",
            "#events-online-tools-anchor": "",
            "#sidecars-online-tools-anchor": "",
            "#spreadsheets-online-tools-anchor": "",
            "#strings-online-tools-anchor": "",
            "#schemas-online-tools-anchor": "",
            "#hed-restful-services-anchor": "",
            
            // Auto-generated heading anchors - all redirect to base page
            "#hed-online-tools": "",
            "#online-access": "",
            "#events-files": "",
            "#validate-an-events-file": "",
            "#assemble-annotations": "",
            "#search-annotations": "",
            "#generate-sidecar-template": "",
            "#execute-remodel-script": "",
            "#sidecar-files": "",
            "#validate-a-sidecar": "",
            "#convert-sidecar-to-long": "",
            "#convert-sidecar-to-short": "",
            "#extract-spreadsheet-from-sidecar": "",
            "#merge-a-spreadsheet-with-a-sidecar": "",
            "#spreadsheet-files": "",
            "#validate-a-spreadsheet": "",
            "#convert-spreadsheet-to-long": "",
            "#convert-spreadsheet-to-short": "",
            "#string-online-tools": "",
            "#validate-a-hed-string": "",
            "#convert-a-hed-string-to-long": "",
            "#convert-hed-string-to-short": "",
            "#schema-online-tools": "",
            "#validate-a-hed-schema": "",
            "#convert-a-hed-schema": "",
            "#compare-hed-schemas": "",
            "#hed-restful-services": "",
            "#service-setup": "",
            "#request-format": "",
            "#service-responses": ""
        }
    },
    
    // HED JavaScript Tools documentation moved to hedtags.org/hed-javascript
    // All anchors redirect to the base URL (no fragments)
    "HedJavascriptTools.html": {
        newUrl: "https://www.hedtags.org/hed-javascript/",
        anchorMap: {
            // Auto-generated heading anchors - all redirect to base page
            "#hed-javascript-tools": "",
            "#javascript-tool-installation": "",
            "#javascript-package-organization": "",
            "#javascript-programmatic-interface": ""
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
