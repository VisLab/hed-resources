/**
 * HED Multi-Repository Documentation Search
 * 
 * Client-side search across multiple Sphinx-generated documentation sites.
 * Compatible with standard Sphinx searchindex.js format.
 */

/**
 * Simple glob pattern matcher for excluding files
 */
function matchesPattern(filename, pattern) {
    filename = filename.replace(/\\/g, '/');
    pattern = pattern.replace(/\\/g, '/');
    
    if (pattern === filename) return true;
    
    let regexPattern = pattern
        .replace(/\./g, '\\.')
        .replace(/\*\*/g, '§§')
        .replace(/\*/g, '[^/]*')
        .replace(/§§/g, '.*');
    
    regexPattern = '^' + regexPattern + '$';
    return new RegExp(regexPattern).test(filename);
}

function isExcluded(filename, excludePatterns) {
    if (!excludePatterns || excludePatterns.length === 0) {
        return false;
    }
    return excludePatterns.some(pattern => matchesPattern(filename, pattern));
}

function debugLog(...args) {
    if (typeof SEARCH_CONFIG !== 'undefined' && SEARCH_CONFIG.options.enableDebugLog) {
        console.log('[HED Search]', ...args);
    }
}

class HEDSearch {
    constructor(config) {
        this.config = config;
        this.indices = {};
        this.loadingStatus = {};
    }

    /**
     * Load search indices from all configured sources
     */
    async loadIndices() {
        const promises = this.config.sources.map(async (source) => {
            this.loadingStatus[source.name] = 'loading';
            try {
                debugLog(`Loading index for ${source.name}...`);
                
                const response = await fetch(source.searchIndex, {
                    method: 'GET',
                    cache: 'default',
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                
                // Extract the Search.setIndex() call from the JS file
                const text = await response.text();
                const match = text.match(/Search\.setIndex\((.*)\)/s);
                
                if (!match) {
                    throw new Error('Invalid search index format');
                }
                
                // Parse the JSON data
                const indexData = JSON.parse(match[1]);
                
                debugLog(`Loaded ${source.name}: ${indexData.titles?.length || 0} documents`);
                
                this.indices[source.name] = {
                    data: indexData,
                    source: source
                };
                
                this.loadingStatus[source.name] = 'loaded';
                return { source: source.name, status: 'success' };
            } catch (error) {
                const errorMessage = `Failed to load search index for "${source.name}" from "${source.searchIndex}". ` +
                    `This may be due to network issues, server unavailability, or invalid index format. ` +
                    `Original error: ${error.message}`;
                console.error('[HED Search]', errorMessage, error);
                this.loadingStatus[source.name] = 'error';
                return { source: source.name, status: 'error', error: errorMessage };
            }
        });

        return Promise.all(promises);
    }

    /**
     * Search across all loaded indices
     */
    search(query) {
        if (!query || query.trim().length === 0) {
            return [];
        }

        const searchTerms = this.tokenize(query.toLowerCase());
        debugLog(`Searching for terms:`, searchTerms);
        
        const allResults = [];

        // Search each source
        for (const [sourceName, index] of Object.entries(this.indices)) {
            const sourceResults = this.searchIndex(
                searchTerms,
                index.data,
                index.source
            );
            debugLog(`Found ${sourceResults.length} results in ${sourceName}`);
            allResults.push(...sourceResults);
        }

        // Sort by score (descending) and priority
        allResults.sort((a, b) => {
            if (Math.abs(a.score - b.score) > 0.01) {
                return b.score - a.score;
            }
            return a.priority - b.priority;
        });

        debugLog(`Total results: ${allResults.length}`);
        return allResults;
    }

    /**
     * Search within a single index
     */
    searchIndex(searchTerms, indexData, source) {
        const results = [];
        const { titles, filenames, docnames, terms, titleterms } = indexData;

        if (!titles || !filenames) {
            console.warn(`Invalid index structure for ${source.name}`);
            return results;
        }

        // Score each document
        const docScores = {};
        
        // Search in terms (document content)
        for (const term of searchTerms) {
            if (terms && terms[term]) {
                for (const docId of terms[term]) {
                    docScores[docId] = (docScores[docId] || 0) + 1;
                }
            }
        }

        // Search in title terms (higher weight)
        for (const term of searchTerms) {
            if (titleterms && titleterms[term]) {
                for (const docId of titleterms[term]) {
                    docScores[docId] = (docScores[docId] || 0) + 3;
                }
            }
        }

        // Convert scores to results
        for (const [docId, rawScore] of Object.entries(docScores)) {
            const docIdNum = parseInt(docId, 10);
            if (docIdNum >= titles.length) continue;

            const title = titles[docIdNum];
            const filename = filenames[docIdNum];
            
            // Check if this file should be excluded
            if (source.exclude && isExcluded(filename, source.exclude)) {
                debugLog(`Excluded: ${filename} from ${source.name}`);
                continue;
            }

            // Construct URL - prefer docnames for correct .html links
            let relativePath;
            if (docnames && docnames[docIdNum]) {
                relativePath = docnames[docIdNum] + '.html';
            } else {
                // Fallback to filename with extension fix
                relativePath = filename;
                if (relativePath.match(/\.(md|rst|txt)$/i)) {
                    relativePath = relativePath.replace(/\.(md|rst|txt)$/i, '.html');
                } else if (!relativePath.endsWith('.html') && !relativePath.endsWith('/')) {
                    relativePath += '.html';
                }
            }
            
            // Normalize score
            const score = rawScore / (searchTerms.length * 4);
            
            if (score >= this.config.options.minScore) {
                results.push({
                    title: title,
                    url: `${source.url}/${relativePath}`,
                    source: source.name,
                    sourceColor: source.color,
                    sourceDescription: source.description,
                    score: score,
                    priority: source.priority,
                    preview: this.generatePreview(title, searchTerms)
                });
            }
        }

        // Limit results per source
        return results
            .sort((a, b) => b.score - a.score)
            .slice(0, this.config.options.maxResultsPerSource);
    }

    /**
     * Tokenize search query into terms
     */
    tokenize(text) {
        const tokens = text
            .toLowerCase()
            .split(/\s+/)
            .filter(term => term.length > 1)
            .map(term => term.replace(/[^\w-]/g, ''));

        // Use Sphinx Stemmer if available
        if (typeof Stemmer !== 'undefined' && Stemmer.stemName) {
            return tokens.map(term => Stemmer.stemName(term));
        }
        return tokens;
    }

    /**
     * Generate preview text with highlighted terms
     */
    generatePreview(text, searchTerms) {
        if (!this.config.options.showPreviews || !text) {
            return '';
        }

        // Escape HTML to prevent XSS
        let preview = text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
        
        // Truncate if too long
        if (preview.length > this.config.options.previewLength) {
            preview = preview.substring(0, this.config.options.previewLength) + '...';
        }

        // Highlight search terms (after escaping)
        if (this.config.options.highlightTerms) {
            for (const term of searchTerms) {
                // Escape regex special characters
                const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regex = new RegExp(`\\b${escapedTerm}\\b`, 'gi');
                preview = preview.replace(regex, '<mark>$&</mark>');
            }
        }

        return preview;
    }

    /**
     * Get loading status for all sources
     */
    getLoadingStatus() {
        return this.loadingStatus;
    }
}

/**
 * Initialize and render search results
 */
async function initializeSearch() {
    // Get query from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q') || '';
    
    // Update search input if present
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = query;
    }

    // Show loading state
    const statusContainer = document.getElementById('searchStatus');
    
    if (statusContainer) {
        statusContainer.innerHTML = `
            <div class="alert alert-info">
                <span class="spinner-border spinner-border-sm me-2" role="status"></span>
                Loading search indices from ${SEARCH_CONFIG.sources.length} documentation sources...
            </div>
        `;
    }

    // Initialize search
    const hedSearch = new HEDSearch(SEARCH_CONFIG);
    
    // Load indices
    const loadResults = await hedSearch.loadIndices();
    
    // Check for errors
    const errors = loadResults.filter(r => r.status === 'error');
    if (errors.length > 0) {
        console.warn('Some indices failed to load:', errors);
    }

    // Perform search if query exists
    if (query.trim().length > 0) {
        const results = hedSearch.search(query);
        renderResults(results, query, hedSearch.getLoadingStatus());
    } else {
        if (statusContainer) {
            statusContainer.innerHTML = `
                <div class="alert alert-info">
                    <h5>Search HED Documentation</h5>
                    <p class="mb-0">Enter a search term above to search across all HED documentation sites.</p>
                </div>
            `;
        }
    }
}

/**
 * Render search results to the page
 */
function renderResults(results, query, loadingStatus) {
    const resultsContainer = document.getElementById('searchResults');
    const statusContainer = document.getElementById('searchStatus');
    
    if (!resultsContainer) return;

    // Show loading status
    const loadedCount = Object.values(loadingStatus).filter(s => s === 'loaded').length;
    const totalCount = Object.keys(loadingStatus).length;
    
    if (statusContainer) {
        if (loadedCount < totalCount) {
            const failedSources = Object.entries(loadingStatus)
                .filter(([_, status]) => status === 'error')
                .map(([name, _]) => name);
            
            statusContainer.innerHTML = `
                <div class="alert alert-warning">
                    <strong>Note:</strong> Some documentation sources could not be loaded: ${failedSources.join(', ')}
                </div>
            `;
        } else {
            statusContainer.innerHTML = `
                <div class="alert alert-success">
                    Searched ${loadedCount} documentation source${loadedCount !== 1 ? 's' : ''}
                </div>
            `;
        }
    }

    // Display results
    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="alert alert-warning">
                <h5>No results found</h5>
                <p>No matches found for "<strong>${escapeHtml(query)}</strong>" in ${loadedCount} documentation source(s).</p>
                <p class="mb-0">Try different keywords or check the spelling.</p>
            </div>
        `;
        return;
    }

    // Group results by source
    const resultsBySource = {};
    for (const result of results) {
        if (!resultsBySource[result.source]) {
            resultsBySource[result.source] = [];
        }
        resultsBySource[result.source].push(result);
    }

    // Build HTML
    let html = `<div class="search-summary mb-4">
        <h4>Found ${results.length} result${results.length !== 1 ? 's' : ''} for "<mark>${escapeHtml(query)}</mark>"</h4>
        <p class="text-muted">Across ${Object.keys(resultsBySource).length} documentation source(s)</p>
    </div>`;

    for (const [sourceName, sourceResults] of Object.entries(resultsBySource)) {
        const source = sourceResults[0];
        html += `
            <div class="search-source-group mb-4">
                <h5 class="border-start border-4 ps-3 mb-3" style="border-color: ${source.sourceColor} !important;">
                    <span class="badge" style="background-color: ${source.sourceColor};">${sourceResults.length}</span>
                    ${escapeHtml(sourceName)}
                    <small class="text-muted d-block fs-6 fw-normal mt-1">${escapeHtml(source.sourceDescription)}</small>
                </h5>
                <div class="list-group">
        `;

        for (const result of sourceResults) {
            const scorePercent = Math.round(result.score * 100);
            html += `
                <a href="${escapeHtml(result.url)}" class="list-group-item list-group-item-action">
                    <div class="d-flex w-100 justify-content-between align-items-start">
                        <h6 class="mb-1">${escapeHtml(result.title)}</h6>
                        <small class="text-muted">${scorePercent}%</small>
                    </div>
                    ${result.preview ? `<p class="mb-1 small">${result.preview}</p>` : ''}
                    <small class="text-muted">${escapeHtml(result.url)}</small>
                </a>
            `;
        }

        html += `
                </div>
            </div>
        `;
    }

    resultsContainer.innerHTML = html;
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Handle search form submission
 */
function handleSearchSubmit(event) {
    event.preventDefault();
    const searchInput = document.getElementById('searchInput');
    if (searchInput && searchInput.value.trim()) {
        window.location.href = `?q=${encodeURIComponent(searchInput.value.trim())}`;
    }
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSearch);
} else {
    initializeSearch();
}
