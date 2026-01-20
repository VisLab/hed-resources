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
        },
        {
            name: 'HED MATLAB Tools',
            url: 'https://www.hedtags.org/hed-matlab',
            searchIndex: 'https://www.hedtags.org/hed-matlab/searchindex.js',
            description: 'MATLAB tools for HED',
            priority: 5,
            color: '#d63384',  // Bootstrap pink
            exclude: []
        },
        {
            name: 'HED JavaScript Tools',
            url: 'https://www.hedtags.org/hed-javascript',
            searchIndex: 'https://www.hedtags.org/hed-javascript/searchindex.js',
            description: 'JavaScript tools for HED',
            priority: 6,
            color: '#fd7e14',  // Bootstrap orange
            exclude: []
        },
        {
            name: 'HED MCP',
            url: 'https://www.hedtags.org/hed-mcp',
            searchIndex: 'https://www.hedtags.org/hed-mcp/searchindex.js',
            description: 'HED Model Context Protocol',
            priority: 7,
            color: '#20c997',  // Bootstrap teal
            exclude: []
        },
        {
            name: 'Table Remodeler',
            url: 'https://www.hedtags.org/table-remodeler',
            searchIndex: 'https://www.hedtags.org/table-remodeler/searchindex.js',
            description: 'Table Remodeling Tools',
            priority: 8,
            color: '#6c757d',  // Bootstrap secondary gray
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
