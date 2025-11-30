const QRCode = require('qrcode');
const fs = require('fs');

const text = process.argv[2] || 'https://github.com/yasminbandeira/MIsturaDona-';
const outDir = 'src/assets';
const outFile = `${outDir}/qrcode-repo.png`;

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

QRCode.toFile(outFile, text, { width: 600 }, function (err) {
  if (err) {
    console.error('Erro ao gerar QR:', err);
    process.exit(1);
  }
  console.log('QR salvo em', outFile);
});
