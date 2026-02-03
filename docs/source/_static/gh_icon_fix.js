document.addEventListener("DOMContentLoaded", function() {
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
        // Extract the repository name from the GitHub URL
        // Example: https://github.com/hed-standard/hed-resources/blob/main/docs/source/hed-python/...
        const match = href.match(/github\.com\/hed-standard\/([^\/]+)/);
        if (!match) {
            return null;
        }
        
        const repoInHref = match[1];
        
        // If the href points to hed-resources but contains a submodule path, extract the correct repo
        if (repoInHref === 'hed-resources') {
            // Check if the path contains a submodule directory
            for (const [pathPattern, repoName] of Object.entries(repoMap)) {
                const sourcePattern = `/docs/source/${pathPattern}`;
                if (href.includes(sourcePattern)) {
                    return repoName;
                }
            }
        }
        
        return repoInHref;
    }

    // Function to fix the icons
    function fixGitHubIcons() {
        const currentRepo = getCurrentRepo();
        
        // Furo puts icons in .content-icon-container
        // We look for links that point to GitHub
        const links = document.querySelectorAll(".content-icon-container a");

        links.forEach((link, index) => {
            const href = link.getAttribute("href");
            if (!href) return;

            // Check if it's a GitHub link (edit or blob/view)
            if (href.includes("github.com")) {
                // If it's the Edit link, hide it
                if (href.includes("/edit/")) {
                    link.style.display = "none";
                    link.classList.add("hidden-edit-link"); // Marker for CSS
                }
                // If it's the View/Blob link, hijack it
                else if (href.includes("/blob/") || href.includes("/tree/")) {
                    // Determine the correct repo - prefer detection from href, fallback to currentRepo
                    const detectedRepo = getRepoFromHref(href) || currentRepo;
                    const repoUrl = `https://github.com/hed-standard/${detectedRepo}`;
                    
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
    }

    fixGitHubIcons();
});
