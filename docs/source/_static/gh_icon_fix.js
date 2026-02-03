console.log('[gh_icon_fix] Script loaded');

document.addEventListener("DOMContentLoaded", function() {
    console.log('[gh_icon_fix] DOMContentLoaded event fired');
    
    // Map of URL path patterns to repository names
    const repoMap = {
        'hed-python/': 'hed-python',
        'hed-schemas/': 'hed-schemas',
        'hed-matlab/': 'hed-matlab',
        'hed-javascript/': 'hed-javascript',
        'hed-mcp/': 'hed-mcp',
        'hed-web/': 'hed-web',
        'hed-vis/': 'hed-vis',
        'ndx-hed/': 'ndx-hed',
        'table-remodeler/': 'table-remodeler',
        'CTagger/': 'CTagger'
    };

    // Function to determine which repository we're currently viewing
    function getCurrentRepo() {
        const currentPath = window.location.pathname;
        
        // Check if path contains any submodule identifier
        for (const [pathPattern, repoName] of Object.entries(repoMap)) {
            if (currentPath.includes(pathPattern)) {
                return repoName;
            }
        }
        
        // Default to hed-resources if not in a submodule
        return 'hed-resources';
    }

    // Function to determine repository from the link's own href
    function getRepoFromHref(href) {
        console.log('[gh_icon_fix] Analyzing href:', href);
        
        // Extract the repository name from the GitHub URL
        // Example: https://github.com/hed-standard/hed-resources/blob/main/docs/source/hed-python/...
        const match = href.match(/github\.com\/hed-standard\/([^\/]+)/);
        if (!match) {
            console.log('[gh_icon_fix] No repo match in href');
            return null;
        }
        
        const repoInHref = match[1];
        console.log('[gh_icon_fix] Repository in href:', repoInHref);
        
        // If the href points to hed-resources but contains a submodule path, extract the correct repo
        if (repoInHref === 'hed-resources') {
            // Check if the path contains a submodule directory
            for (const [pathPattern, repoName] of Object.entries(repoMap)) {
                const sourcePattern = `/docs/source/${pathPattern}`;
                if (href.includes(sourcePattern)) {
                    console.log('[gh_icon_fix] Detected submodule from href:', repoName, 'via pattern:', sourcePattern);
                    return repoName;
                }
            }
            console.log('[gh_icon_fix] No submodule pattern matched in href');
        }
        
        console.log('[gh_icon_fix] Using repo from href:', repoInHref);
        return repoInHref;
    }

    // Function to fix the icons
    function fixGitHubIcons() {
        const currentRepo = getCurrentRepo();
        console.log('[gh_icon_fix] Current page repo:', currentRepo);
        console.log('[gh_icon_fix] Current pathname:', window.location.pathname);
        
        // Furo puts icons in .content-icon-container
        // We look for links that point to GitHub
        const links = document.querySelectorAll(".content-icon-container a");
        console.log('[gh_icon_fix] Found', links.length, 'icon links');

        links.forEach((link, index) => {
            const href = link.getAttribute("href");
            if (!href) return;

            // Check if it's a GitHub link (edit or blob/view)
            if (href.includes("github.com")) {
                console.log('[gh_icon_fix] Link', index, 'is a GitHub link');

                // If it's the Edit link, hide it
                if (href.includes("/edit/")) {
                    console.log('[gh_icon_fix] Link', index, 'is edit link - hiding');
                    link.style.display = "none";
                    link.classList.add("hidden-edit-link"); // Marker for CSS
                }
                // If it's the View/Blob link, hijack it
                else if (href.includes("/blob/") || href.includes("/tree/")) {
                    // Determine the correct repo - prefer detection from href, fallback to currentRepo
                    const detectedRepo = getRepoFromHref(href) || currentRepo;
                    const repoUrl = `https://github.com/hed-standard/${detectedRepo}`;
                    
                    console.log('[gh_icon_fix] Link', index, 'setting to repo:', detectedRepo, 'URL:', repoUrl);
                    
                    // Change URL to the correct repo root based on detected repository
                    link.href = repoUrl;
                    link.title = `Go to ${detectedRepo} repository`;
                    link.setAttribute("aria-label", `Go to ${detectedRepo} repository`);

                    // Mark this link so CSS can style it as an icon-only GitHub link
                    // (e.g. hide any text/SVG content and show a custom background icon).
                    // The actual hiding of text/SVG is handled in CSS using the github-repo-link 
                    link.classList.add("github-repo-link"); // Add class for CSS targeting
                    link.style.display = "inline-flex";
                }
            }
        });
        
        console.log('[gh_icon_fix] Icon fix completed');
    }

    fixGitHubIcons();
});
