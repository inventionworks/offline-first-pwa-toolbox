import QRCode from 'qrcode';

export function initQRGenerator() {
  // Get all elements safely
  const input = document.getElementById('qr-input');
  const generateBtn = document.getElementById('generate-qr');
  const resultDiv = document.getElementById('qr-result');
  const downloadBtn = document.getElementById('download-qr');

  if (!input || !generateBtn || !resultDiv || !downloadBtn) {
    console.error('❌ QR elements not found in DOM');
    return;
  }

  let currentQRDataUrl = null;

  generateBtn.addEventListener('click', async () => {
    const text = input.value.trim();

    if (!text) {
      alert('Please enter text or URL for the QR code');
      return;
    }

    try {
      resultDiv.innerHTML = '<p style="color:#94a3b8; text-align:center; padding:2rem;">Generating QR Code...</p>';

      const qrDataUrl = await QRCode.toDataURL(text, {
        width: 320,
        margin: 2,
        color: { dark: '#1e2937', light: '#ffffff' }
      });

      currentQRDataUrl = qrDataUrl;

      resultDiv.innerHTML = `
        <div style="text-align:center; margin:2rem 0;">
          <img src="${qrDataUrl}" 
               alt="QR Code" 
               style="max-width:100%; border:12px solid #1e2937; border-radius:16px; box-shadow:0 15px 35px rgba(0,0,0,0.7);">
        </div>
      `;

      downloadBtn.classList.remove('hidden');

    } catch (err) {
      console.error(err);
      resultDiv.innerHTML = '<p style="color:#ef4444; text-align:center; padding:2rem;">Failed to generate QR code. Try again.</p>';
    }
  });

  downloadBtn.addEventListener('click', () => {
    if (!currentQRDataUrl) return;
    const a = document.createElement('a');
    a.href = currentQRDataUrl;
    a.download = `qr-${Date.now()}.png`;
    a.click();
  });

  // Enter key support
  input.addEventListener('keypress', e => {
    if (e.key === 'Enter') generateBtn.click();
  });
}
