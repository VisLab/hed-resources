# Documentation Redirect System for Migrated Pages

This directory contains the infrastructure for handling redirects from old documentation pages to their new locations on different sites. This is necessary because GitHub Pages (static hosting) does not support server-side 301 redirects.

## Overview

When documentation is moved to a different site, we need to:

1. Keep the old HTML page URL active (to avoid 404s from external links)
2. Redirect visitors to the new location
3. Preserve anchor/hash links (e.g., `#section-name`)
4. Handle cases where anchor names have changed

## Solution: Client-Side "SmartShim" Redirects

We use JavaScript-based redirects with:

- **Centralized configuration** for all redirect mappings
- **Anchor remapping** to handle renamed section anchors
- **Fallback meta refresh** for browsers with JavaScript disabled
- **SEO optimization** with canonical links for search engines

## Components

### 1. `redirect-config.js`

Central configuration file containing:

- Mappings of old page names to new URLs
- Anchor name mappings for pages where section anchors have changed

**Location**: `docs/source/_static/redirect-config.js`

### 2. `redirect.js`

Universal redirect script that:

- Reads the current page filename
- Looks up the configuration
- Handles anchor remapping
- Performs the redirect

**Location**: `docs/source/_static/redirect.js`

### 3. `redirect-page-template.html`

Template for creating shim pages that includes:

- Nice-looking "page moved" message
- Loading spinner
- Manual click-through link
- SEO optimization tags

**Location**: `docs/source/_templates/redirect-page-template.html`

## How to Add a New Redirect

### Step 1: Add Configuration

Edit `docs/source/_static/redirect-config.js` and add your page:

```javascript
const REDIRECT_CONFIG = {
    // Existing entries...
    
    "YourOldPage.html": {
        newUrl: "https://www.hedtags.org/new-site/NewPage.html",
        anchorMap: {
            // Only include anchors that changed names
            "#old-anchor-name": "#new-anchor-name",
            "#another-old-anchor": "#another-new-anchor"
        }
    }
};
```

**Important Notes**:

- Only include anchors in `anchorMap` if their names have **changed**
- If an anchor has the same name in both locations, omit it (will be passed through automatically)
- Include the `#` symbol in anchor names

### Step 2: Create the Shim Page

Copy `docs/source/_templates/redirect-page-template.html` and customize:

1. **Copy the template**:

```powershell
Copy-Item docs/source/_templates/redirect-page-template.html docs/source/YourOldPage.html
```

2. **Update the page-specific references**:

   - `<title>` tag - Update the page title
   - `<link rel="canonical">` - Update to the new URL
   - `<meta http-equiv="refresh">` - Update the fallback URL
   - Description text in the body
   - Manual redirect link text

3. **Update the page-specific script** at the bottom:

```javascript
const config = REDIRECT_CONFIG['YourOldPage.html'];  // Change filename here
```

### Step 3: Remove from Navigation

Edit `docs/source/index.rst` and remove the page from the table of contents:

```rst
.. toctree::
   :maxdepth: 2
   
   IntroductionToHed
   OtherPage
   .. Remove: YourOldPage
```

### Step 4: Test the Redirect

1. **Build the documentation**:

```powershell
sphinx-build -b html docs/source docs/_build/html
```

2. **Test locally from the repository root directory**:

```powershell
python -m http.server 8000 -d docs/_build/html
```

3. **Test scenarios**:

   - Base page: `http://localhost:8000/YourOldPage.html`
   - With unchanged anchor: `http://localhost:8000/YourOldPage.html#some-anchor`
   - With remapped anchor: `http://localhost:8000/YourOldPage.html#old-anchor-name`

4. **Verify in browser console** that:

   - Configuration loads correctly
   - Anchor remapping works
   - Redirect happens automatically

### Step 5: Deploy and Verify

After pushing to GitHub:

1. Wait for GitHub Pages to rebuild (usually 1-2 minutes)
2. Test with the production URLs
3. Check external links that pointed to the old location

## Example: Table Remodeling Migration

The table remodeling documentation was moved from `hedtags.org/hed-resources` to `hedtags.org/table-remodeler`.

### Configuration Entry

```javascript
"HedRemodelingQuickstart.html": {
    newUrl: "https://www.hedtags.org/table-remodeler/quickstart.html",
    anchorMap: {
        "#hed-remodeling-quickstart-anchor": "#quickstart-anchor",
        "#what-is-remodeling-anchor": "#what-is-remodeling-anchoor",
        // ... more mappings
    }
}
```

### Result

- Old URL: `hedtags.org/hed-resources/HedRemodelingQuickstart.html#what-is-remodeling-anchor`
- Redirects to: `hedtags.org/table-remodeler/quickstart.html#what-is-remodeling`

## SEO Considerations

### For Search Engines

- The `<link rel="canonical">` tag tells search engines the authoritative URL
- Over time, search results will transition to the new URL
- The old page remains accessible, avoiding 404 errors

### For Users

- Redirect happens in ~100ms (imperceptible delay)
- Browser back button works correctly (using `location.replace()`)
- Fallback meta refresh for JavaScript-disabled browsers

## Troubleshooting

### Redirect Not Working

1. Check browser console for errors
2. Verify `redirect-config.js` is loading (check Network tab)
3. Verify page filename matches exactly in config
4. Check for JavaScript errors in `redirect.js`

### Anchor Not Remapping

1. Verify anchor name in config includes `#` symbol
2. Check for typos in anchor names
3. Test with browser console: `console.log(REDIRECT_CONFIG)`

### Meta Refresh Not Working

1. Verify the URL in the `<meta http-equiv="refresh">` tag
2. Check that the content attribute uses `3` (3 seconds delay)
3. Test with JavaScript disabled in browser

## Maintenance

### When to Clean Up

After 6-12 months, once search engines have updated:

1. Check analytics for traffic to old URLs
2. If minimal (\<1% of site traffic), consider removing shim pages
3. Replace with simple static messages if needed

### Adding New Pages

Always update this README with:

- Why the page was moved
- Date of migration
- Any special considerations

## Files in This System

```
docs/source/
├── _static/
│   ├── redirect-config.js      # Central configuration
│   └── redirect.js              # Universal redirect script
├── _templates/
│   └── redirect-page-template.html  # Template for shim pages
└── [ShimPages].html            # Individual shim pages (created from template)
```

## References

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [HTML Meta Refresh](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-http-equiv)
- [Canonical Link Element](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
