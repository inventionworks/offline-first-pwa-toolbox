// ==================== Offline First PWA Toolbox - Main App ====================

import { initQRGenerator } from './tools/qr-generator.js';

document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tools = document.querySelectorAll('.tool');

  function switchTab(tabName) {
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tools.forEach(tool => tool.classList.remove('active'));

    const activeButton = document.querySelector(`.tab-button[data-tab="${tabName}"]`);
    const activeTool = document.getElementById(tabName);

    if (activeButton) activeButton.classList.add('active');
    if (activeTool) activeTool.classList.add('active');
  }

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabName = button.getAttribute('data-tab');
      switchTab(tabName);
    });
  });

  console.log('✅ Offline First PWA Toolbox initialized');

  // Initialize tools
  initQRGenerator();
  initMarkdownEditor();
  initColorExtractor();
  initUnitConverter();
  initSketchpad();

  switchTab('qr');   // Start on QR tab
});
