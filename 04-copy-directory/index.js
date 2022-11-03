
const { readdir, copyFile, mkdir, rm } = require('fs').promises;
const path = require('path');
const { stdout } = process;

const source = path.join(__dirname, 'files');
const purpose = path.join(__dirname, 'copy');

async function copyDir(from, to) {
	try {
		const dir = await readdir(from, { withFileTypes: true });
		for (const file of dir) {
			if (file.isFile()) {
				await copyFile(path.join(from, file.name), path.join(to, file.name));
			} else if (file.isDirectory()) {
				await mkdir(path.join(to, file.name));
				await copyDir(path.join(from, file.name), path.join(to, file.name));
			}
		}
	} catch (error) {
		stdout.write(error.message);
	}
}

(async function () {
	await rm(purpose, { recursive: true, force: true });
	await mkdir(purpose, { recursive: true });
	await copyDir(source, purpose);
})();