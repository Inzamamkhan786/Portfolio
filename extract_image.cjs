const fs = require('fs');
const html = fs.readFileSync('legacy_version/index.html', 'utf8');
const match = html.match(/src="data:image\/png;base64,([^"]+)"/);
if (match) {
  if (!fs.existsSync('src/assets')) {
    fs.mkdirSync('src/assets');
  }
  fs.writeFileSync('src/assets/portrait.png', Buffer.from(match[1], 'base64'));
  console.log('Image saved successfully!');
} else {
  console.log('Image not found.');
}
