//fonction qui gère le choix des touches et des couleurs des joueurs dans le menu
var nbjoueur;
var touches;

function selectionTouches() {
	nbjoueur = document.getElementById("nbPlayers").value;
	document.getElementById("divKeyboard").innerHTML = "";
	touches = [];
	for (var i = 0; i < nbjoueur; i++) {
		var touche0 = document.createElement("input");
		touche0.id = i + "touche0";
		touche0.setAttribute("maxlength", "1");
		touche0.setAttribute("size", "1");
		var touche1 = document.createElement("input");
		touche1.id = i + "touche1";
		touche1.setAttribute("maxlength", "1");
		touche1.setAttribute("size", "1");
		var couleur = document.createElement("input");
		couleur.type = "color";
		couleur.value = "#ff0000";
		couleur.id = i + "couleur";
		touches[i] = [37, 39];

		document.getElementById("divclavier").appendChild(document.createTextNode("Joueur " + (i + 1) + " : "));
		document.getElementById("divclavier").appendChild(touche0);
		document.getElementById("divclavier").appendChild(touche1);
		document.getElementById("divclavier").appendChild(couleur);
		document.getElementById("divclavier").appendChild(document.createElement("br"));
	}
}
