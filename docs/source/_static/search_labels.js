/**
 * Group search results by repository into collapsible sections
 * Each repository section shows result count and can be expanded/collapsed
 */

(function() {
    'use strict';

    // Configuration for repository labels and sorting order
    const repoConfig = {
        'hed-python/': {
            label: 'HED Python',
            color: '#b8860b',  // goldenrod
            order: 2
        },
        'hed-schemas/': {
            label: 'HED Schemas',
            color: '#4b0082',  // indigo
            order: 3
        },
        'hed-matlab/': {
            label: 'HED MATLAB',
            color: '#e97451',  // burnt orange
            order: 4
        },
        'hed-javascript/': {
            label: 'HED JavaScript',
            color: '#f1e05a',  // JavaScript yellow
            order: 5
        },
        'hed-mcp/': {
            label: 'HED MCP',
            color: '#2e8b57',  // sea green
            order: 6
        },
        'hed-web/': {
            label: 'HED Web',
            color: '#563d7c',  // purple
            order: 7
        },
        'hed-vis/': {
            label: 'HED Vis',
            color: '#ff6347',  // tomato
            order: 8
        },
        'ndx-hed/': {
            label: 'NWB Extension',
            color: '#ff1493',  // deep pink
            order: 9
        },
        'table-remodeler/': {
            label: 'Table Remodeler',
            color: '#dc143c',  // crimson
            order: 10
        },
        'CTagger/': {
            label: 'CTagger',
            color: '#00ced1',  // dark turquoise
            order: 11
        },
        // Default for all other results
        'default': {
            label: 'HED Resources',
            color: '#0969da',  // blue
            order: 1
        }
    };

    /**
     * Get repository configuration for a given href
     */
    function getRepoConfig(href) {
        for (const [path, conf] of Object.entries(repoConfig)) {
            if (path !== 'default' && href.includes(path)) {
                return { key: path, ...conf };
            }
        }
        return { key: 'default', ...repoConfig.default };
    }

    /**
     * Group and organize search results by repository
     */
    function organizeSearchResults() {
        const searchResults = document.getElementById('search-results');
        if (!searchResults) return;

        const searchList = searchResults.querySelector('ul.search');
        if (!searchList) return;

        // Get all list items
        const items = Array.from(searchList.querySelectorAll('li'));
        if (items.length === 0) return;

        // Group items by repository
        const grouped = {};
        items.forEach(item => {
            const link = item.querySelector('a');
            if (!link) return;
            
            const href = link.getAttribute('href') || '';
            const config = getRepoConfig(href);
            const repoKey = config.key;
            
            if (!grouped[repoKey]) {
                grouped[repoKey] = {
                    config: config,
                    items: []
                };
            }
            
            grouped[repoKey].items.push(item);
        });

        // Sort repository groups by order
        const sortedRepos = Object.entries(grouped).sort((a, b) => {
            return a[1].config.order - b[1].config.order;
        });

        // Clear the search list
        searchList.innerHTML = '';

        // Create collapsible sections for each repository
        sortedRepos.forEach(([repoKey, data]) => {
            const { config, items } = data;
            
            // Create container for this repository section
            const section = document.createElement('li');
            section.className = 'repo-section';
            section.style.listStyle = 'none';
            section.style.marginBottom = '0.25rem';
            
            // Create details/summary for collapsible section
            const details = document.createElement('details');
            details.style.border = `2px solid ${config.color}`;
            details.style.borderRadius = '6px';
            details.style.padding = '0';
            details.style.backgroundColor = 'var(--color-background-secondary, #f8f9fa)';
            
            const summary = document.createElement('summary');
            summary.style.cursor = 'pointer';
            summary.style.padding = '0.75rem 1rem';
            summary.style.fontWeight = 'bold';
            summary.style.fontSize = '1.1em';
            summary.style.color = config.color;
            summary.style.userSelect = 'none';
            summary.style.display = 'flex';
            summary.style.justifyContent = 'space-between';
            summary.style.alignItems = 'center';
            
            // Add hover effect
            summary.addEventListener('mouseenter', () => {
                summary.style.backgroundColor = 'var(--color-background-hover, #e9ecef)';
            });
            summary.addEventListener('mouseleave', () => {
                summary.style.backgroundColor = 'transparent';
            });
            
            const titleSpan = document.createElement('span');
            titleSpan.textContent = config.label;
            
            const countSpan = document.createElement('span');
            countSpan.textContent = `${items.length} result${items.length !== 1 ? 's' : ''}`;
            countSpan.style.fontSize = '0.9em';
            countSpan.style.fontWeight = 'normal';
            countSpan.style.color = 'var(--color-foreground-muted, #666)';
            
            summary.appendChild(titleSpan);
            summary.appendChild(countSpan);
            
            // Create container for the results
            const resultsContainer = document.createElement('div');
            resultsContainer.style.padding = '0.5rem 0 0.5rem 0';
            
            // Create nested ul for this repo's results
            const repoList = document.createElement('ul');
            repoList.className = 'search';
            repoList.style.marginLeft = '1rem';
            repoList.style.marginRight = '1rem';
            
            // Sort items within this repo by score
            items.sort((a, b) => {
                const aLink = a.querySelector('a');
                const bLink = b.querySelector('a');
                if (!aLink || !bLink) return 0;
                
                const aScore = parseFloat(aLink.dataset.score || '0');
                const bScore = parseFloat(bLink.dataset.score || '0');
                return bScore - aScore;  // Higher scores first
            });
            
            // Add items to the nested list
            items.forEach(item => {
                // Reset any custom styles on the item
                item.style.listStyle = '';
                repoList.appendChild(item);
            });
            
            resultsContainer.appendChild(repoList);
            details.appendChild(summary);
            details.appendChild(resultsContainer);
            section.appendChild(details);
            searchList.appendChild(section);
        });
        
        // Add dark mode support
        const style = document.createElement('style');
        style.textContent = `
            body[data-theme="dark"] .repo-section details {
                background-color: var(--color-background-secondary, #1a1a1a) !important;
            }
            body[data-theme="dark"] .repo-section summary:hover {
                background-color: var(--color-background-hover, #2a2a2a) !important;
            }
            @media (prefers-color-scheme: dark) {
                body:not([data-theme="light"]) .repo-section details {
                    background-color: var(--color-background-secondary, #1a1a1a) !important;
                }
                body:not([data-theme="light"]) .repo-section summary:hover {
                    background-color: var(--color-background-hover, #2a2a2a) !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Set up observer to watch for search results being added
     */
    function setupObserver() {
        const searchResults = document.getElementById('search-results');
        if (!searchResults) {
            // Try again after a short delay
            setTimeout(setupObserver, 100);
            return;
        }

        let debounceTimer;
        let hasProcessed = false;
        
        // Create observer to watch for changes in search results
        const observer = new MutationObserver((mutations) => {
            // Only process once we detect the search list
            const searchList = searchResults.querySelector('ul.search');
            if (!searchList || hasProcessed) return;
            
            // Debounce to avoid processing while results are still being added
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                organizeSearchResults();
                hasProcessed = true;
                
                // Stop observing after processing
                observer.disconnect();
            }, 200);
        });

        observer.observe(searchResults, {
            childList: true,
            subtree: true
        });
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupObserver);
    } else {
        setupObserver();
    }

})();
