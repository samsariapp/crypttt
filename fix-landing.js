const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'LandingPage.js');

console.log('Reading file:', filePath);
let content = fs.readFileSync(filePath, 'utf8');

// Replace both instances
const before = content;
content = content.replace(/onClick=\{\(\) => handlePlayGame\(game\.name\)\}/g, 'onClick={() => handlePlayGame(game)}');

fs.writeFileSync(filePath, content, 'utf8');

if (before !== content) {
  console.log('✅ Fixed LandingPage.js onClick handlers - 2 instances replaced');
} else {
  console.log('✅ LandingPage.js is already fixed!');
}
