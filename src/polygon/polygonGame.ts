//import * as $ from 'jquery';

var globalGame = JSON.parse(localStorage.getItem('globalGame') || '{}');
var globalPlayer = JSON.parse(localStorage.getItem('globalPlayer') || '{}');
//Content informations about all players
var players: { pseudo: string; score: number; colors: string[] }[] = [];
var hits = 0;

for (var i = 0; i < globalGame.nbPlayers; i++) {
	players.push({
		pseudo: 'pseudo' + i,
		score: 0,
		colors: ['#ffffff', '#ff0000', '#ffffff']
	});
}

function scoreDisplay() {
	var scoreDiv = document.getElementById('scores')!;
	for (var i = 0; i < globalGame.nbPlayers; i++) {
		var score = document.createElement('score');
		score.textContent = players[i].pseudo + ': ' + players[i].score;
		score.style.color = players[i].colors[1];
		scoreDiv.appendChild(score);
	}
}

function hitDisplay() {
	var hitsDiv = document.getElementById('hits')!;
	hitsDiv.innerText = 'Hits:\n' + hits;
}

scoreDisplay();
hitDisplay();

//Definition of the game
const WIDTH: number = $(window).width()!;
const HEIGHT: number = $(window).height()!;

const circle = {
	Ox: (WIDTH * 0.8) / 2,
	Oy: (HEIGHT * 0.8) / 2,
	radius: Math.min(WIDTH * 0.8 - 150, HEIGHT * 0.8),
	color: '#252525'
};

interface Polygon {
	center: { x: number; y: number };
	radius: number;
	color: string;
	centerAngle: number;
	externalAngle: number;
	line: [number, number];
	points: [[number, number]];
	cote: number;
	beta: [number];
}

const polygon: Polygon = {
	center: { x: (WIDTH * 0.8) / 2, y: (HEIGHT * 0.8) / 2 },
	radius: Math.min(WIDTH * 0.8 - 200, HEIGHT * 0.8) / 2,
	color: '#252525',
	centerAngle: (2 * Math.PI) / globalGame.nbPlayers,
	externalAngle: (Math.PI * (globalGame.nbPlayers - 2)) / globalGame.nbPlayers,
	line: [0, 0],
	points: [[0, 0]],
	cote: 0,
	beta: [0]
};

polygon.cote = polygon.radius * Math.sin(Math.PI / globalGame.nbPlayers);
polygon.beta = [(Math.PI - polygon.externalAngle) / 2];

for (var i = 0; i <= globalGame.nbPlayers + 1; i++) {
	polygon.points[i] = [
		polygon.center.x + polygon.radius * Math.sin((i + 0.5) * polygon.centerAngle),
		polygon.center.y + polygon.radius * Math.cos((i + 0.5) * polygon.centerAngle)
	];
}

function displayGame() {
	var game = <HTMLCanvasElement>document.getElementById('game')!;
	if (game.getContext) {
		var ctx = game.getContext('2d')!;
		game.width = WIDTH * 0.8;
		game.height = HEIGHT * 0.8;

		//Polygon display
		for (i = 1; i <= globalGame.nbPlayers; i++) {
			ctx.beginPath();
			ctx.moveTo(polygon.points[i][0], polygon.points[i][1]);
			ctx.lineTo(
				polygon.points[i][0] + (polygon.points[i + 1][0] - polygon.points[i][0]) / 5,
				polygon.points[i][1] + (polygon.points[i + 1][1] - polygon.points[i][1]) / 5
			);
			ctx.moveTo(polygon.points[i][0], polygon.points[i][1]);
			ctx.lineTo(
				polygon.points[i][0] + (polygon.points[i - 1][0] - polygon.points[i][0]) / 5,
				polygon.points[i][1] + (polygon.points[i - 1][1] - polygon.points[i][1]) / 5
			);
			ctx.strokeStyle = '#ffffff';
			ctx.lineWidth = 4;
			ctx.stroke();

			//We put a little circle to avoid some holes between sides
			ctx.arc(polygon.points[i][0], polygon.points[i][1], 2, 0, Math.PI * 2);
			ctx.closePath();
			ctx.fillStyle = '#ffffff';
			ctx.fill();
		}
	}
}

displayGame();
