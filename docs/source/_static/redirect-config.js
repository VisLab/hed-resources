/**
 * Redirect Configuration for Migrated Documentation Pages
 * 
 * This file contains the mapping of old pages/anchors to their new locations
 * for documentation that has been moved to different sites.
 * 
 * Usage: Add entries for each page that needs redirection.
 */

const REDIRECT_CONFIG = {
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
    },
    
    // CTagger Guide moved to hedtags.org/CTagger
    // All anchors redirect to the base URL (no fragments)
    "CTaggerGuide.html": {
        newUrl: "https://www.hedtags.org/CTagger/",
        anchorMap: {
            // Auto-generated heading anchors - all redirect to base page
            "#ctagger-guide": "",
            "#ctagger-installation": "",
            "#ctagger-standalone-installation": "",
            "#step-1check-to-see-that-you-have-java-installed": "",
            "#step-2-download-ctaggerjar": "",
            "#step-3-double-click-on-ctaggerjar-to-run": "",
            "#ctagger-in-eeglab": "",
            "#loading-bids-event-files": "",
            "#adding-hed-annotation": "",
            "#validating-your-annotation": ""
        }
    },
    
    // HED and EEGLAB documentation moved to hedtags.org/CTagger/ctagger_in_eeglab.html
    "HedAndEEGLAB.html": {
        newUrl: "https://www.hedtags.org/CTagger/ctagger_in_eeglab.html",
        anchorMap: {
            // Explicit MyST-style anchors
            "#hed-and-eeglab-anchor": "",
            "#annotating-datasets-anchor": "#annotating-datasets",
            
            // Auto-generated heading anchors
            "#hed-and-eeglab": "",
            "#installing-hedtools-eeglab-plugin": "#installing-hedtools-eeglab-plugin",
            "#method-1-eeglab-extension-manager": "#method-1-eeglab-extension-manager",
            "#method-2-download-and-unzip": "#method-2-download-and-unzip",
            "#annotating-datasets": "#annotating-datasets",
            "#launching-eeglab-hedtools": "#launching-eeglab-hedtools",
            "#tagging-the-events": "#tagging-the-events",
            "#validation": "#validation",
            "#hed-based-epoching": "#hed-based-epoching"
        }
    }
    
    /* Commented out - HED MATLAB Tools documentation now integrated in unified docs
    // HED MATLAB Tools documentation moved to hedtags.org/hed-matlab
    "HedMatlabTools.html": {
        newUrl: "https://www.hedtags.org/hed-matlab/",
        anchorMap: {
            // Explicit MyST-style anchors
            "#matlab-hedtools-anchor": "",
            "#what-to-download-anchor": "",
            "#matlab-python-install-anchor": "",
            "#step-1-find-python-anchor": "",
            "#step-2-install-python-if-needed-anchor": "",
            "#step-3-connect-python-to-matlab-anchor": "",
            "#step-4-install-hedtools-anchor": "",
            "#web-service-matlab-demos-anchor": "",
            "#overview-of-service-requests-anchor": "",
            "#setting-up-a-session-from-matlab-anchor": "",
            "#gethostoptions-source-anchor": "",
            "#creating-a-request-structure-anchor": "",
            "#create-request-sidecar-validate-anchor": "",
            "#making-a-service-request-anchor": "",
            "#decoding-a-service-response-anchor": "",
            
            // Auto-generated heading anchors - redirect to base
            "#hed-matlab-tools": "",
            "#tool-overview": "",
            "#matlab-hedtools-interface": "",
            "#what-to-download": "",
            "#using-matlab-hedtools": "",
            "#getting-a-hedtools-object": "",
            "#calling-a-tool": "",
            "#input-of-events": "",
            "#input-of-sidecars": "",
            "#assembling-hed-annotations": "",
            "#searching-hed-annotations": "",
            "#matlab-python-install": "",
            "#installing-python": "",
            "#step-1-find-python": "",
            "#step-2-install-python-if-needed": "",
            "#step-3-connect-python-to-matlab": "",
            "#step-4-install-hedtools": "",
            "#matlab-functions-for-python": "",
            "#additional-demos": "",
            "#web-service-matlab-demos": "",
            "#overview-of-service-requests": "",
            "#setting-up-a-session-from-matlab": "",
            "#creating-a-request-structure": "",
            "#making-a-service-request": "",
            "#decoding-a-service-response": ""
        }
    }
    */
    
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
