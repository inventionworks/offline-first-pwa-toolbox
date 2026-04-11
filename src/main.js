// Wait for the HTML to be fully loaded before doing anything
document.addEventListener('DOMContentLoaded', () => {
  console.log('App starting...');

  // Tab switching (safe because DOM is ready)
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

  // Load the QR generator module dynamically
  import('./tools/qr-generator.js')
    .then(module => {
      if (typeof module.initQRGenerator === 'function') {
        module.initQRGenerator();
        console.log('QR Generator ready');
      }
    })
    .catch(err => console.error('QR module error:', err));

  // Start on QR tab
  switchTab('qr');
});
