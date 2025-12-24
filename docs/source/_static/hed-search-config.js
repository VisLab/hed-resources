/**
 * HED Multi-Repository Search Configuration
 * 
 * This configuration defines which documentation sources to search.
 * Each repository should customize this file with its own priority ordering.
 * 
 * Priority determines search order and result ranking (lower number = higher priority).
 */

const SEARCH_CONFIG = {
    sources: [
        {
            name: 'HED resources',
            url: 'https://www.hedtags.org/hed-resources',
            searchIndex: 'https://www.hedtags.org/hed-resources/searchindex.js',
            description: 'HED tutorials, guides, and documentation',
            priority: 1,
            color: '#0dcaf0',  // Bootstrap info (cyan)
            exclude: [
                // Exclude redirect shim pages
                'HedRemodelingQuickstart.html',
                'HedRemodelingTools.html',
                'HedPythonTools.html',
                'HedAnnotationInNWB.html',
                'HedOnlineTools.html',
                'HedJavascriptTools.html',
                // Exclude submission document
                'HEDSubmissionToINCF.html',
            ]
        },
        {
            name: 'HED Python Tools',
            url: 'https://www.hedtags.org/hed-python',
            searchIndex: 'https://www.hedtags.org/hed-python/searchindex.js',
            description: 'Python library for HED validation and analysis',
            priority: 2,
            color: '#6610f2',  // Bootstrap purple
            exclude: []
        },
        {
            name: 'HED Specification',
            url: 'https://www.hedtags.org/hed-specification',
            searchIndex: 'https://www.hedtags.org/hed-specification/searchindex.js',
            description: 'Official HED specification and standards',
            priority: 3,
            color: '#198754',  // Bootstrap success green
            exclude: []
        },
        {
            name: 'HED Web Tools',
            url: 'https://www.hedtags.org/hed-web',
            searchIndex: 'https://www.hedtags.org/hed-web/searchindex.js',
            description: 'Web-based HED tools and REST API',
            priority: 4,
            color: '#0d6efd',  // Bootstrap primary blue
            exclude: []
        }
    ],
    
    // Search options
    options: {
        maxResultsPerSource: 10,   // Maximum results to show per source
        minScore: 0.1,              // Minimum relevance score (0-1)
        highlightTerms: true,       // Highlight search terms in results
        showPreviews: true,         // Show text previews of matches
        previewLength: 150,         // Characters to show in preview
        enableDebugLog: false       // Set to true to see debug messages
    }
};
