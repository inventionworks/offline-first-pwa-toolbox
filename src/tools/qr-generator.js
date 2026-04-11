import QRCode from 'qrcode';

export function initQRGenerator() {
  // Get elements – these exist because DOMContentLoaded already fired
  const input = document.getElementById('qr-input');
  const generateBtn = document.getElementById('generate-qr');
  const resultDiv = document.getElementById('qr-result');
  const downloadBtn = document.getElementById('download-qr');

  // Safety check
  if (!input || !generateBtn || !resultDiv || !downloadBtn) {
    console.error('QR elements missing – check IDs in index.html');
    return;
  }

  let currentQRDataUrl = null;

  // Generate QR code when button is clicked
  generateBtn.addEventListener('click', async () => {
    const text = input.value.trim();
    if (!text) {
      alert('Please enter text or URL');
      return;
    }

    try {
      resultDiv.innerHTML = '<p style="color:#94a3b8;">Generating QR code...</p>';
      const qrDataUrl = await QRCode.toDataURL(text, {
        width: 300,
        margin: 2,
        color: { dark: '#1e2937', light: '#ffffff' }
      });
      currentQRDataUrl = qrDataUrl;
      resultDiv.innerHTML = `<div style="text-align:center;"><img src="${qrDataUrl}" alt="QR Code" style="max-width:100%; border:8px solid #1e2937; border-radius:12px;"></div>`;
      downloadBtn.classList.remove('hidden');
    } catch (err) {
      console.error(err);
      resultDiv.innerHTML = '<p style="color:red;">Failed to generate QR code</p>';
    }
  });

  // Download button
  downloadBtn.addEventListener('click', () => {
    if (currentQRDataUrl) {
      const a = document.createElement('a');
      a.href = currentQRDataUrl;
      a.download = `qr-${Date.now()}.png`;
      a.click();
    }
  });

  // Press Enter to generate
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') generateBtn.click();
  });
}
