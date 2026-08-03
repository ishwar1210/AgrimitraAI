const fs = require('fs');

const files = [
  'd:/JMNProject/AgriMitra/AgriMitra/src/assets/images/slpshscreen asset1.png',
  'd:/JMNProject/AgriMitra/AgriMitra/src/assets/images/slpshscreen asset2.png',
  'd:/JMNProject/AgriMitra/AgriMitra/src/assets/images/slpshscreen asset3.png',
  'd:/JMNProject/AgriMitra/AgriMitra/src/assets/images/slpshscreen asset4.png',
  'd:/JMNProject/AgriMitra/AgriMitra/src/assets/images/slpshscreen asset5.png',
];

files.forEach((file, index) => {
  if (fs.existsSync(file)) {
    // Read just the first few bytes to get PNG dimensions
    const fd = fs.openSync(file, 'r');
    const buffer = Buffer.alloc(24);
    fs.readSync(fd, buffer, 0, 24, 0);
    
    // Check if PNG magic number is correct
    if (buffer.toString('hex', 0, 8) === '89504e470d0a1a0a') {
      const width = buffer.readUInt32BE(16);
      const height = buffer.readUInt32BE(20);
      console.log(`Asset ${index + 1}: ${width}x${height}`);
    } else {
      console.log(`Asset ${index + 1}: Not a standard PNG`);
    }
    fs.closeSync(fd);
  } else {
    console.log(`File not found: ${file}`);
  }
});
