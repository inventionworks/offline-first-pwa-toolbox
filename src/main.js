// ==================== Offline First PWA Toolbox - Main App ====================

document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ DOM fully loaded - Starting Offline Toolbox');

  // Tab logic
  const tabButtons = document.querySelectorAll('.tab-button');
  const tools = document.querySelectorAll('.tool');

  function switchTab(tabName) {
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tools.forEach(tool => tool.classList.remove('active'));

    const activeBtn = document.querySelector(`.tab-button[data-tab="${tabName}"]`);
    const activeTool = document.getElementById(tabName);

    if (activeBtn) activeBtn.classList.add('active');
    if (activeTool) activeTool.classList.add('active');
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.getAttribute('data-tab'));
    });
  });

  // Dynamically load QR Generator AFTER DOM is ready
  import('./tools/qr-generator.js')
    .then(module => {
      module.initQRGenerator();
      console.log('✅ QR Generator initialized');
    })
    .catch(err => {
      console.error('❌ Failed to load QR generator:', err);
    });

  // Default to QR tab
  switchTab('qr');
});
