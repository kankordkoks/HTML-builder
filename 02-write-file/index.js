const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin, stdout } = process;

let newFile = fs.createWriteStream(path.join(__dirname, '02-text.txt'));

stdout.write('Привет! Напиши что-нибудь - ');

let rl = readline.createInterface({
	input: stdin,
	output: newFile,
});

rl.on('line', line => {
	if (line.toLowerCase() === 'exit') {
		rl.close();
		stdout.write('Удачи!' + '\n');
	} else {
		newFile.write(line + '\n');
	}
});

process.on('SIGINT', () => {
	stdout.write('Удачи!' + '\n');
	rl.close();
});