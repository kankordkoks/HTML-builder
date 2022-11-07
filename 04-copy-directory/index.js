const fs = require('fs');
const path = require('path');


fs.mkdir(__dirname + '/files-copy', { recursive: true }, err => {
	if (err) throw err;
});
const copyPath = path.join(__dirname, 'files-copy');
const oldPath = path.join(__dirname, 'files');

fs.readdir(oldPath, (err, data) => {
	if (err) throw err;
	data.forEach(file => {
		fs.copyFile(oldPath + '\\' + file, copyPath + '\\' + file, err => {
			if (err) throw err;
			console.log('File was copied');
		});
	});
});