let game = {};
let player = {};

function envoieDonnees() {
	game = {
		nbPlayers: (<HTMLInputElement>document.getElementById('nbPlayers')).value,
		diffuclty: (<HTMLInputElement>document.getElementById('difficulty')).value,
		victoryScore: (<HTMLInputElement>document.getElementById('victoryScore')).value
	};
	player = {
		pseudo: (<HTMLInputElement>document.getElementById('pseudo')).value,
		leftKey: (<HTMLInputElement>document.getElementById('leftKey')).value,
		rightKey: (<HTMLInputElement>document.getElementById('rightKey')).value,
		leftcolor: (<HTMLInputElement>document.getElementById('leftColor')).value,
		colorPaddle: (<HTMLInputElement>document.getElementById('colorPaddle')).value,
		rightcolor: (<HTMLInputElement>document.getElementById('rightColor')).value
	};
	console.log(game);
	document.location.href = '../polygon/polygonGame.html';
	localStorage.setItem('globalGame', JSON.stringify(game));
	localStorage.setItem('globalPlayer', JSON.stringify(player));
}
