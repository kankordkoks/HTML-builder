const path = require('path');
const { readdir, readFile, writeFile } = require('fs').promises;

const pathBundle = path.join(__dirname, 'project-dist', 'bundle.css');
const pathSource = path.join(__dirname, 'styles');
let styles = [];

(async () => {
	const dir = await readdir(pathSource, { withFileTypes: true });
	for (let file of dir) {
		const pathFile = path.join(pathSource, file.name);
		const extension = path.extname(pathFile);
		const content = await readFile(pathFile, 'utf8');

		if (extension === '.css') {
			styles.push(content);
		}
	}
	await writeFile(pathBundle, styles.join('\n'), 'utf8');
})();