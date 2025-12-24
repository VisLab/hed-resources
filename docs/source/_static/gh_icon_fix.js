document.addEventListener("DOMContentLoaded", function() {
    // Function to fix the icons
    function fixGitHubIcons() {
        // Furo puts icons in .content-icon-container
        // We look for links that point to GitHub
        const links = document.querySelectorAll(".content-icon-container a");

        links.forEach(link => {
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
                    // Change URL to repo root
                    link.href = "https://github.com/hed-standard/hed-resources";
                    link.title = "Go to repository";
                    link.setAttribute("aria-label", "Go to repository");

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
