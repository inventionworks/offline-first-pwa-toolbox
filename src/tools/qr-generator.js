import QRCode from 'qrcode';

export function initQRGenerator() {
  const input = document.getElementById('qr-input');
  const generateBtn = document.getElementById('generate-qr');
  const resultDiv = document.getElementById('qr-result');
  const downloadBtn = document.getElementById('download-qr');

  let currentQRDataUrl = null;

  generateBtn.addEventListener('click', async () => {
    const text = input.value.trim();

    if (!text) {
      alert('Please enter some text or a URL');
      return;
    }

    try {
      resultDiv.innerHTML = '<p style="color:#94a3b8; text-align:center;">Generating QR Code...</p>';

      // Generate QR Code as Data URL
      const qrDataUrl = await QRCode.toDataURL(text, {
        width: 300,
        margin: 2,
        color: {
          dark: '#1e2937',   // Dark chemistry theme
          light: '#ffffff'
        }
      });

      currentQRDataUrl = qrDataUrl;

      // Display the QR Code
      resultDiv.innerHTML = `
        <div style="text-align: center; margin: 1.5rem 0;">
          <img src="${qrDataUrl}" alt="QR Code" style="max-width: 100%; border: 8px solid #1e2937; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.6);">
        </div>
      `;

      // Show download button
      downloadBtn.classList.remove('hidden');

    } catch (error) {
      console.error('QR Generation failed:', error);
      resultDiv.innerHTML = `<p style="color:#ef4444;">Failed to generate QR Code. Please try again.</p>`;
    }
  });

  // Download QR Code
  downloadBtn.addEventListener('click', () => {
    if (!currentQRDataUrl) return;

    const link = document.createElement('a');
    link.href = currentQRDataUrl;
    link.download = `qrcode-${Date.now()}.png`;
    link.click();
  });

  // Optional: Generate QR automatically when pressing Enter in input
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      generateBtn.click();
    }
  });
}
