let http = require('http');
let fs = require('fs');
let url = require('url');
const EventEmitter = require('events');

let App = {
	start: (port) => {
		let emitter = new EventEmitter();
		let server = http
			.createServer((req, res) => {
				res.writeHead(200, {
					'Content-Type': 'text/html; charset=utf-8'
				});
				if (req.url === '/') {
					emitter.emit('root', res);
				}
				res.end();
			})
			.listen(port);
		return emitter;
	}
};

let app = App.start(8080);
app.on('root', (res) => {
	res.write('Je suis à la racine');
});
/*
let server = http.createServer();
server.on('request', (req, res) => {
	res.writeHead(200);
	let query = url.parse(req.url, true).query;
	let nom = query.name === undefined ? 'anonymous' : query.name;
	fs.readFile('Grafikart/index.html', 'utf8', (err, data) => {
		if (err) {
			res.writeHead(404);
			res.end("Ce fichier n'existe pas");
		} else {
			res.writeHead(200, {
				'Content-Type': 'text/html; charset=utf-8'
			});
			data = data.replace('{{ nom }}', nom);
			res.end(data);
		}
	});
});
server.listen('8080');
*/
