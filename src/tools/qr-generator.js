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
      alert('Please enter some text or a URL to generate a QR code.');
      return;
    }

    try {
      resultDiv.innerHTML = '<p style="color:#94a3b8; text-align:center; padding: 2rem;">Generating QR Code...</p>';

      // Generate QR Code as Data URL (this is the key line)
      const qrDataUrl = await QRCode.toDataURL(text, {
        width: 320,
        margin: 2,
        color: {
          dark: '#1e2937',   // Dark chemistry color
          light: '#ffffff'
        }
      });

      currentQRDataUrl = qrDataUrl;

      // Show the beautiful QR code
      resultDiv.innerHTML = `
        <div style="text-align: center; margin: 2rem 0;">
          <img src="${qrDataUrl}" 
               alt="Generated QR Code" 
               style="max-width: 100%; 
                      border: 12px solid #1e2937; 
                      border-radius: 16px; 
                      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.7);">
        </div>
      `;

      downloadBtn.classList.remove('hidden');

    } catch (error) {
      console.error('QR Code generation error:', error);
      resultDiv.innerHTML = `
        <p style="color:#ef4444; text-align:center; padding: 2rem;">
          Failed to generate QR Code.<br>
          Please try again.
        </p>`;
    }
  });

  // Download button
  downloadBtn.addEventListener('click', () => {
    if (!currentQRDataUrl) return;

    const link = document.createElement('a');
    link.href = currentQRDataUrl;
    link.download = `qr-code-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  // Bonus: Generate on Enter key
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      generateBtn.click();
    }
  });
}
