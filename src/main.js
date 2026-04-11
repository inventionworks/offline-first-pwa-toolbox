// ========== Offline First PWA Toolbox – Main Entry ==========
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM ready – initializing app');

  // --- Tab switching ---
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
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // --- Load QR generator only after DOM is ready ---
  import('./tools/qr-generator.js')
    .then(module => {
      if (typeof module.initQRGenerator === 'function') {
        module.initQRGenerator();
        console.log('✅ QR Generator loaded');
      } else {
        console.error('initQRGenerator is not a function');
      }
    })
    .catch(err => console.error('Failed to load QR generator:', err));

  // Start on QR tab
  switchTab('qr');
});
