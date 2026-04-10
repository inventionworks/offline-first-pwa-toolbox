// ==================== Offline First PWA Toolbox - Main App ====================

document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tools = document.querySelectorAll('.tool');

  // Tab Switching Logic
  function switchTab(tabName) {
    // Remove active class from all buttons and tools
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tools.forEach(tool => tool.classList.remove('active'));

    // Activate the selected tab
    const activeButton = document.querySelector(`.tab-button[data-tab="${tabName}"]`);
    const activeTool = document.getElementById(tabName);

    if (activeButton) activeButton.classList.add('active');
    if (activeTool) activeTool.classList.add('active');
  }

  // Add click listeners to all tabs
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabName = button.getAttribute('data-tab');
      switchTab(tabName);
    });
  });

  // Initialize all tools (we'll expand these one by one)
  console.log('✅ Offline First PWA Toolbox initialized');

  initQRGenerator();
  initMarkdownEditor();
  initColorExtractor();
  initUnitConverter();
  initSketchpad();

  // Optional: Show first tab by default (QR Code)
  switchTab('qr');
});

// ====================== Tool Initializers ======================

function initQRGenerator() {
  const input = document.getElementById('qr-input');
  const generateBtn = document.getElementById('generate-qr');
  const resultDiv = document.getElementById('qr-result');
  const downloadBtn = document.getElementById('download-qr');

  generateBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) {
      alert('Please enter some text or URL');
      return;
    }

    resultDiv.innerHTML = ''; // Clear previous
    downloadBtn.classList.add('hidden');

    // We'll implement real QR code generation here in next step
    resultDiv.innerHTML = `
      <p style="color: #94a3b8; margin: 1rem 0;">QR Code will appear here (using qrcode library)</p>
      <canvas id="qr-canvas" style="margin: 1rem auto; display: block;"></canvas>
    `;

    console.log('QR generation requested for:', text);
  });
}

function initMarkdownEditor() {
  console.log('Markdown Editor ready (IndexedDB auto-save coming soon)');
}

function initColorExtractor() {
  console.log('Color Extractor ready (Canvas pixel picking coming soon)');
}

function initUnitConverter() {
  console.log('Unit Converter ready (real-time conversion coming soon)');
}

function initSketchpad() {
  console.log('Sketchpad ready (Canvas drawing coming soon)');
}
