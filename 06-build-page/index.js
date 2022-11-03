const path = require('path');
const { readFile, writeFile, readdir, copyFile, mkdir, rm } = require('fs').promises;

const folderNew = path.join(__dirname, 'project-dist');
const assetsNew = path.join(folderNew, 'assets');
const stylesNew = path.join(folderNew, 'style.css');
const newHtmlPath = path.join(folderNew, 'index.html');

const componentsSource = path.join(__dirname, 'components');
const assetsSource = path.join(__dirname, 'assets');
const stylesSource = path.join(__dirname, 'styles');
const htmlSource = path.join(__dirname, 'template.html');




async function createDirection(name) {
	await rm(name, { recursive: true, force: true });
	await mkdir(name);
}

async function createHtml() {
	let html = await readFile(htmlSource, 'utf-8');
	const files = await readdir(componentsSource, { withFileTypes: true });

	for (let file of files) {
		const content = await readFile(path.join(componentsSource, `${file.name}`), 'utf-8');
		const regExp = new RegExp(`{{${(file.name).split('.')[0]}}}`, 'g');
		html = html.replace(regExp, content);
	}

	await writeFile(newHtmlPath, html);
}

async function addFiles() {
	let styles = [];
	const files = await readdir(stylesSource, { withFileTypes: true });

	for (let file of files) {
		const filePath = path.join(stylesSource, file.name);
		const fileExtension = path.extname(filePath);
		if (fileExtension === '.css') {
			const content = await readFile(filePath, 'utf8');
			styles.push(content);
		}
	}
	await writeFile(stylesNew, styles.join('\n'), 'utf8');
}

async function copyDir(from, to) {
	const files = await readdir(from, { withFileTypes: true });
	for (const file of files) {
		if (file.isFile()) {
			await copyFile(path.join(from, file.name), path.join(to, file.name));
		} else if (file.isDirectory()) {
			await mkdir(path.join(to, file.name), { recursive: true });
			await copyDir(path.join(from, file.name), path.join(to, file.name));
		}
	}
}

(async () => {
	createDirection(folderNew);
	addFiles();
	copyDir(assetsSource, assetsNew);
	createHtml();
})();