// Wait for the entire HTML to be ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM ready – starting app');

  // ----- Tab switching -----
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

  // ----- Load QR Generator dynamically (only after DOM is ready) -----
  import('./tools/qr-generator.js')
    .then(module => {
      module.initQRGenerator();
      console.log('✅ QR Generator loaded');
    })
    .catch(err => console.error('QR module error:', err));

  // Start on QR tab
  switchTab('qr');
});
