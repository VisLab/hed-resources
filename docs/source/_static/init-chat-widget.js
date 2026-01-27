/**
 * Initialize HED Chat Widget
 * This file configures the OSA chat widget for HED documentation
 */

// Wait for DOM and widget to be ready
document.addEventListener('DOMContentLoaded', function() {
  // Configure the widget for HED
  if (window.OSAChatWidget) {
    OSAChatWidget.setConfig({
      title: 'HED Assistant',
      initialMessage: 'Hi! I\'m the HED Assistant. I can help with HED (Hierarchical Event Descriptors), annotation, validation, and related tools. What would you like to know?',
      placeholder: 'Ask about HED...',
      suggestedQuestions: [
        'What is HED and how is it used?',
        'How do I annotate an event with HED tags?',
        'What tools are available for working with HED?',
        'Explain this HED validation error.'
      ],
      showExperimentalBadge: true,
      repoUrl: 'https://github.com/hed-standard',
      repoName: 'HED Working Group',
      allowPageContext: true,
      pageContextDefaultEnabled: true
    });
  } else {
    console.warn('HED Chat Widget: OSAChatWidget not available. Widget may have failed to load.');
  }
  
  // Use MutationObserver to detect when the widget is added to the DOM
  var moved = false;
  var observer = new MutationObserver(function(mutations) {
    if (moved) return; // Already moved, skip
    
    var widgetButton = document.querySelector('.osa-chat-button');
    var widgetWindow = document.querySelector('.osa-chat-window');
    var widgetContainer = document.querySelector('.osa-chat-widget');
    
    console.log('[HED Widget Init] Checking for widget elements...', {
      button: !!widgetButton,
      window: !!widgetWindow,
      container: !!widgetContainer
    });
    
    if (widgetContainer) {
      // Found the widget container, now move it to .main
      var mainArea = document.querySelector('.main');
      
      console.log('[HED Widget Init] Found main area:', !!mainArea);
      
      if (mainArea) {
        mainArea.style.position = 'relative';
        mainArea.appendChild(widgetContainer);
        console.log('[HED Widget Init] ✓ Repositioned to main content area');
        moved = true;
        observer.disconnect(); // Stop observing once we've moved it
      } else {
        console.log('[HED Widget Init] ✗ .main not found, using default body positioning');
        observer.disconnect();
      }
    }
  });
  
  // Start observing the body for child additions
  console.log('[HED Widget Init] Starting MutationObserver...');
  observer.observe(document.body, {
    childList: true,
    subtree: false
  });
  
  // Also try immediately in case widget already loaded
  setTimeout(function() {
    if (!moved) {
      var widgetContainer = document.querySelector('.osa-chat-widget');
      
      if (widgetContainer) {
        var mainArea = document.querySelector('.main');
        if (mainArea) {
          mainArea.style.position = 'relative';
          mainArea.appendChild(widgetContainer);
          console.log('[HED Widget Init] ✓ Repositioned via timeout fallback');
          moved = true;
        }
      } else {
        console.log('[HED Widget Init] ✗ Widget container not found after 500ms');
      }
    }
    observer.disconnect();
  }, 500);
});
