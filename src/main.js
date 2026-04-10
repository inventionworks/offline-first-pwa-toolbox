// ==================== Offline First PWA Toolbox - Main App ====================

import { initQRGenerator } from './tools/qr-generator.js';


// Wait until the entire DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ DOM fully loaded - Initializing Offline Toolbox');

  const tabButtons = document.querySelectorAll('.tab-button');
  const tools = document.querySelectorAll('.tool');

  // Tab switching function
  function switchTab(tabName) {
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tools.forEach(tool => tool.classList.remove('active'));

    const activeButton = document.querySelector(`.tab-button[data-tab="${tabName}"]`);
    const activeTool = document.getElementById(tabName);

    if (activeButton) activeButton.classList.add('active');
    if (activeTool) activeTool.classList.add('active');
  }

  // Add click listeners to tabs
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabName = button.getAttribute('data-tab');
      switchTab(tabName);
    });
  });

  // Import and initialize tools AFTER DOM is ready
  import('./tools/qr-generator.js')
    .then(({ initQRGenerator }) => {
      initQRGenerator();
    })
    .catch(err => console.error('Failed to load QR generator:', err));

  // Placeholder for other tools (we'll add them later)
  console.log('📝 Markdown, Color, Converter, Sketchpad ready for implementation');

  // Start on QR Code tab
  switchTab('qr');
});
