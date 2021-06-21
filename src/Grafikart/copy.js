let fs = require('fs');

let file = 'Grafikart/test.srt';
let read = fs.createReadStream(file);

fs.stat(file, (err, stat) => {
	let total = stat.size;
	let progress = 0;
	let read = fs.createReadStream(file);

	read.on('data', (chunk) => {
		progress += chunk.length;

		console.log("J'ai lu " + (100 * progress) / total + '%');
	});

	read.on('end', () => {
		console.log("J'ai fini de lire le fichier");
	});
});
