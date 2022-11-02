const fs = require('fs');
const path = require('path');
const fullPath = path.join(__dirname, 'text.txt');

const stream = fs.createReadStream(fullPath, 'utf-8');

let data = '';

stream.on('data', chunk => data += chunk);
stream.on('end', () => console.log(data));
stream.on('error', error => console.log('error ', error.message)); 