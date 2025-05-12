function nouvellePartie() {
	location.reload();
}

//fonction pour initialiser des joueurs
function activerJoueur(j) {
	if (joueur [j]!=true&&distribuer) {
		continu [j] = true;
		valeurCartesJoueur [j] = document.getElementById('valeur_cartes_joueur_'+j);
		cashJoueur [j] = document.getElementById('cash_joueur_'+j);
		miseJoueur [j] = document.getElementById('mise_joueur_'+j);
		annonceJoueur [j] = document.getElementById('annonce_joueur_'+j);
		cartesJoueur [j] = document.getElementById('cartes_joueur_'+j);
		hitJoueur [j] = document.getElementById('hit_joueur_'+j);
		doubleDownJoueur [j] = document.getElementById('doubleDown_joueur_'+j);
		
		cash [j] = cashDprt;
		montantMiseJoueur [j] = miseDepart;
		
		valeurCartesJoueur [j].innerHTML = "<div>&#8203;</div>";
		cashJoueur [j].innerHTML = "<div class='cash'>$ "+ cash [j] +"</div>";
		miseJoueur [j].innerHTML = "<div style='display: flex;'><div onclick='dimMise("+j+");' class='moins'>-</div><div style='background-color: black;width: 80%;text-align:center;'>" + montantMiseJoueur [j] + "</div><div onclick='augmMise("+j+");' class='plus'>+</div></div>";
		hitJoueur [j].innerHTML = "<div>&#8203;</div>";
		doubleDownJoueur [j].innerHTML = "<div>&#8203;</div>";
		annonceJoueur [j].innerHTML = annonceJoueurPart1 + "" + annonceJoueurPart2 ;
		joueur [j] = true;
		}
	}

function carteRandom() {
	i = Math.ceil(Math.random() * nbCarte);
	while (carteDeck [i]!==undefined) {
		i = Math.ceil(Math.random() * nbCarte);
		nbCarte--;
		if (nbCarte == 0) {
			alert("Il n'y a plus de carte !");
			location.reload();	
			return false;
		}
	}
	carteDeck [i]='check';
	return i;
}

function dimMise (j) {
	if (montantMiseJoueur [j]> palierMise) {
		cash [j] += palierMise;
		cashJoueur [j].innerHTML = "<div class='cash'>$ "+ cash [j] +"</div>";
		montantMiseJoueur [j] -= palierMise;
		miseJoueur [j].innerHTML = "<div style='display: flex;'><div onclick='dimMise("+j+");' class='moins'>-</div><div style='background-color: black;width: 80%;text-align:center;'>" + montantMiseJoueur [j] + "</div><div onclick='augmMise("+j+");' class='plus'>+</div></div>";
		}
}

function augmMise (j) {
	if (cash [j]>0) {	
		cash [j] -= palierMise;
		cashJoueur [j].innerHTML = "<div class='cash'>$ "+ cash [j] +"</div>";
		montantMiseJoueur [j] += palierMise;
		miseJoueur [j].innerHTML = "<div style='display: flex;'><div onclick='dimMise("+j+");' class='moins'>-</div><div style='background-color: black;width: 80%;text-align:center;'>" + montantMiseJoueur [j] + "</div><div onclick='augmMise("+j+");' class='plus'>+</div></div>";
	}	
}



function valCarte (nameCarte) {
		valeurCarte = nameCarte%13;
		if (valeurCarte==11||valeurCarte==12||valeurCarte==0) {valeurCarte = 10;}
		return valeurCarte;
}

function nvCarte () {

	if (distribuer&&(joueur[1]||joueur[2]||joueur[3]||joueur[4])) {
		premiere_carteRandomBanque = carteRandom();
		valeur_premiereCarteBanque = valCarte (premiere_carteRandomBanque);
		
		if (valeur_premiereCarteBanque==1) {
			valeur_premiereCarteBanque = 11;
			asBanque++;
			}
		
		deuxieme_carteRandomBanque = carteRandom();
		valeur_deuxiemeCarteBanque = valCarte (deuxieme_carteRandomBanque);
		
		if (valeur_premiereCarteBanque<11&&valeur_deuxiemeCarteBanque==1) {
			valeur_deuxiemeCarteBanque = 11;
			asBanque++;
			}

		valeurCarteBanque = valeur_premiereCarteBanque + valeur_deuxiemeCarteBanque;
		cartesBanque.innerHTML = "<img class='' src='images/"+premiere_carteRandomBanque+".jpg' alt='carte de la banque' /><div style='width: 10px;' ></div><img class='verso_2' onClick='reste();'src='images/verso.jpg' alt='carte du joueur' />";
		scoreBanque.innerHTML = valeur_premiereCarteBanque;
		if (valeurCarteBanque==21) {blackjackBanque=true;}

		for (j=1;j<=nbJoueur;j++) {
			if (joueur[j]) {
				gagne [j] = true;
				blackjack [j] = false;
				push [j] = false;
				asJoueur [j]=0;
				premiere_carteRandomJoueur [j] = carteRandom();
				valeur_premiereCarteJoueur [j] = valCarte(premiere_carteRandomJoueur [j]);
				if (valeur_premiereCarteJoueur [j]==1) {
					valeur_premiereCarteJoueur [j] = 11;
					asJoueur [j]++;
				}
				
				deuxieme_carteRandomJoueur [j] = carteRandom();
				valeur_deuxiemeCarteJoueur [j] = valCarte(deuxieme_carteRandomJoueur [j]);

				if (valeur_deuxiemeCarteJoueur [j]==1) {
					asJoueur [j]++;
					if (valeur_premiereCarteJoueur [j]<11) {
						valeur_deuxiemeCarteJoueur [j] = 11;
					}
					else  {
						valeur_deuxiemeCarteJoueur [j] = 1;
						asJoueur [j]--;
					}
				}
				miseJoueur [j].innerHTML = "<div style='background-color: gray;text-align:center;'>" + montantMiseJoueur [j]+"</div>";
				hitJoueur [j].innerHTML = "<div onClick='hit("+j+");' class='hit'>Hit</div>";
				doubleDownJoueur [j].innerHTML = "<div onClick='doubleDown("+j+");' class='doubleDown'>Double down</div>";
				cartesJoueur [j].innerHTML = "<div style='position:relative;width:25px;'><img class='recto' src='images/"+premiere_carteRandomJoueur [j]+".jpg'></div><div style='position:relative;width:25px;'><img class='recto_2' src='images/"+deuxieme_carteRandomJoueur [j]+".jpg'></div>";
				scoreJoueur [j] = valeur_premiereCarteJoueur [j] + valeur_deuxiemeCarteJoueur [j];
				valeurCartesJoueur [j].innerHTML = scoreJoueur [j];
				if (scoreJoueur [j]==21) {
					blackjack [j] = true;
					hitJoueur [j].innerHTML = "<div>&#8203;</div>";
					doubleDownJoueur [j].innerHTML = "<div>&#8203;</div>";
					annonceJoueur [j].innerHTML = annonceJoueurPart1 + "<b>blackjack</b>" + annonceJoueurPart2 ;
				}
			}
		}
	distribuer=false;
	}
	
	if (ramasser) {
		scoreBanque.innerHTML = "";
		for (j=1;j<=nbJoueur;j++) {
			if (joueur[j]) {
				if (cash [j]>0) {
					cash [j] -= miseDepart;
					cashJoueur [j].innerHTML = "<div class='cash'>$ "+ cash [j] +"</div>";
					miseJoueur [j].innerHTML = "<div style='display: flex;'><div onclick='dimMise("+j+");' class='moins'>-</div><div style='background-color: black;width: 80%;text-align:center;'>" + montantMiseJoueur [j] + "</div><div onclick='augmMise("+j+");' class='plus'>+</div></div>";
					hitJoueur [j].innerHTML = "<div>&#8203;</div>";
					doubleDownJoueur [j].innerHTML = "<div>&#8203;</div>";
					annonceJoueur [j].innerHTML = annonceJoueurPart1 + "" + annonceJoueurPart2 ;
					cartesBanque.innerHTML = "<div>&#8203;</div>";
					cartesJoueur [j].innerHTML = "<div>&#8203;</div>";
					valeurCartesJoueur [j].innerHTML = "<div>&#8203;</div>";
				}
				else {
					miseJoueur [j].innerHTML = "<div>&#8203;</div>";
					hitJoueur [j].innerHTML = "<div>&#8203;</div>";
					doubleDownJoueur [j].innerHTML = "<div>&#8203;</div>";
					annonceJoueur [j].innerHTML = "<div>&#8203;</div>";
					cartesBanque.innerHTML = "<div>&#8203;</div>";
					cartesJoueur [j].innerHTML = "<div>&#8203;</div>";
					valeurCartesJoueur [j].innerHTML = "<img onClick='activerJoueur("+j+");' class='add' src='images/add.png'/>";
					cashJoueur [j].innerHTML = "<div>&#8203;</div>";
					joueur [j] = false;
				}
			}
		}
	ramasser=false;
	distribuer=true;
	}	
	
}

function hit(j) {
	doubleDownJoueur [j].innerHTML = "<div>&#8203;</div>";
	if (gagne [j]) {
		carteHit = carteRandom();
		valeurCarteHit = valCarte (carteHit);
		if ((valeurCarteHit==1)&&(scoreJoueur [j]<11)) {
			valeurCarteHit = 11;
			asJoueur [j]++;
			}
		scoreJoueur [j]+= valeurCarteHit;
		if (scoreJoueur [j]>21&&asJoueur [j]>0){
			scoreJoueur [j] = scoreJoueur [j] - 10;
			asJoueur  [j]--;
		}
		if (scoreJoueur [j]>21) {
			hitJoueur [j].innerHTML = "<div>&#8203;</div>";
			annonceJoueur [j].innerHTML = annonceJoueurPart1 + "burn" + annonceJoueurPart2 ;
			gagne [j] = false;
		}
		cartesJoueur [j].innerHTML += divCarteJoueurPart1 + carteHit + divCarteJoueurPart2;
		valeurCartesJoueur [j].innerHTML = scoreJoueur [j];
	}
	else {
	hitJoueur [j].innerHTML = "<div>&#8203;</div>";
	annonceJoueur [j].innerHTML = annonceJoueurPart1 + "burn" + annonceJoueurPart2 ;			
	}
}

function doubleDown(j) {
	if (montantMiseJoueur [j]<=cash [j]) {
		hitJoueur [j].innerHTML = "<div>&#8203;</div>";
		doubleDownJoueur [j].innerHTML = "<div>&#8203;</div>";
		cash [j] -= montantMiseJoueur [j];
		cashJoueur [j].innerHTML = "<div class='cash'>$ "+ cash [j] +"</div>";
		montantMiseJoueur [j]*=2;
		miseJoueur [j].innerHTML = "<div style='background-color: gray;text-align:center;'>" + montantMiseJoueur [j]+"</div>";
		hitDoubledown [j] = carteRandom();
		valeurCarteHit = valCarte (hitDoubledown [j]);
		if ((valeurCarteHit==1)&&(scoreJoueur [j]<11)) {
			valeurCarteHit = 11;
			asJoueur [j]++;
			}
		scoreJoueur [j]+= valeurCarteHit;
		if (scoreJoueur [j]>21&&asJoueur [j]>0){
			scoreJoueur [j] = scoreJoueur [j] - 10;
			asJoueur  [j]--;
		}
		cartesJoueur [j].innerHTML += divCarteJoueurDoubleDown;
		doubledown [j] = true;
		if (scoreJoueur [j]>21) {
			gagne [j] = false;
		}
	}
}

//« la banque tire à 16, reste à 17 »
function reste() {
	for (j=1;j<=nbJoueur;j++) {
			if (joueur [j]) {
			annonceJoueur [j].innerHTML = annonceJoueurPart1 + "" + annonceJoueurPart2 ;
			hitJoueur [j].innerHTML = "<div>&#8203;</div>";	
			doubleDownJoueur [j].innerHTML = "<div>&#8203;</div>";
			}
	}
	if (ramasser==false&&distribuer==false) {
		cartesBanque.innerHTML = "<img class='' src='images/"+premiere_carteRandomBanque+".jpg' alt='carte de la banque' /><div style='width: 1Opx;' ></div><img class='' src='images/"+deuxieme_carteRandomBanque+".jpg' alt='carte de la banque' />";
		scoreBanque.innerHTML = valeurCarteBanque;		
		while (valeurCarteBanque < 17) {
			carteRandBanque = carteRandom() ;
			valeur_carteRandBanque = valCarte (carteRandBanque);
			cartesBanque.innerHTML += "<div style='width: 1%;' ></div><img class='' src='images/" + carteRandBanque + ".jpg' alt='carte de la banque' />";
			valeurCarteBanque += valeur_carteRandBanque ;
			scoreBanque.innerHTML = valeurCarteBanque;
		}
		if (valeurCarteBanque>21) {gagneBanque=false;}
		for (j=1;j<=nbJoueur;j++) {
			if (joueur [j]) {
				if (blackjack [j]) {
					if (blackjackBanque) {
						gagne[j]=false;
						push[j]=true;
						blackjack [j]=false;
						cash [j] += montantMiseJoueur [j];
						cashJoueur [j].innerHTML = "<div class='cash'>$ "+ cash [j] +"</div>";
						annonceJoueur [j].innerHTML = annonceJoueurPart1 + "push" + annonceJoueurPart2 ;
					}
				
					else {
						gagne[j]=false;
						push[j]=false;
						blackjack [j]=true;
						cash [j] += 2.5*montantMiseJoueur [j];
						cashJoueur [j].innerHTML = "<div class='cash'>$ "+ cash [j] +"</div>";
						annonceJoueur [j].innerHTML = annonceJoueurPart1 + "<b>+"+ 2.5*montantMiseJoueur [j] +"</b>" + annonceJoueurPart2 ;
					}
				}
				else {
					if (doubledown [j]) {
						cartesJoueur [j].innerHTML = "<div style='position:relative;width:25px;'><img class='recto' src='images/"+ premiere_carteRandomJoueur [j]+".jpg'></div><div style='position:relative;width:25px;'><img class='recto_2' src='images/"+deuxieme_carteRandomJoueur [j]+".jpg'></div>"+ divCarteJoueurPart1 + hitDoubledown [j] + divCarteJoueurPart2;
						valeurCartesJoueur [j].innerHTML = scoreJoueur [j];
						}
					miseJoueur [j].innerHTML = "<div>&#8203;</div>";
					if ((scoreJoueur [j]>21)||((scoreJoueur [j]<valeurCarteBanque)&&(valeurCarteBanque<22))) {
						gagne[j]=false;
						cashJoueur [j].innerHTML = "<div class='cash'>$ "+ cash [j] +"</div>";
					}
					if ((scoreJoueur [j]>valeurCarteBanque)&&(scoreJoueur [j]<22)) {
						gagne[j]=true;
						push[j]=false;
						blackjack [j]=false;
						cash [j] += 2*montantMiseJoueur [j];
						cashJoueur [j].innerHTML = "<div class='cash'>$ "+ cash [j] +"</div>";
						annonceJoueur [j].innerHTML = annonceJoueurPart1 + "+ " + montantMiseJoueur [j] + " $"+ annonceJoueurPart2 ;
					}
					if (gagne[j]&&gagneBanque==false) {
						gagne[j]=true;
						push[j]=false;
						blackjack [j]=false;
						cash [j] += 2*montantMiseJoueur [j];
						cashJoueur [j].innerHTML = "<div class='cash'>$ "+ cash [j] +"</div>";
						annonceJoueur [j].innerHTML = annonceJoueurPart1 + "+ " + montantMiseJoueur [j] + " $"+ annonceJoueurPart2 ;
					}
					if ((scoreJoueur [j]==valeurCarteBanque)&&(scoreJoueur [j]<22)) {
						gagne[j]=false;
						push[j]=true;
						blackjack [j]=false;
						cash [j] += montantMiseJoueur [j];
						cashJoueur [j].innerHTML = "<div class='cash'>$ "+ cash [j] +"</div>";
						annonceJoueur [j].innerHTML = annonceJoueurPart1 + "push" + annonceJoueurPart2 ;
					}
				}
				
			}
		montantMiseJoueur [j] = miseDepart;
		gagne [j] = true;
		doubledown [j] = false;
		}
	}
	ramasser = true;
}

let deck = 1;
let nbCarte = deck * 52;
let carteDeck = new Array();
let valeurCarte;
let i;
let carteHit;
let valeurCarteHit;
let ramasser = false;
let distribuer = true;

let nbJoueur = 4;
let joueur = new Array();
let valeurCartesJoueur = new Array ();
let cashJoueur = new Array();
let miseJoueur = new Array();
let annonceJoueur = new Array();
let cartesJoueur = new Array();
let asJoueur = new Array();
let hitJoueur = new Array();
let doubleDownJoueur = new Array();
let montantMiseJoueur = new Array();
let cash = new Array();
let scoreJoueur = new Array();
let continu = new Array();
let blackjack = new Array();
let doubledown = new Array();
let hitDoubledown = new Array();
let gagne = new Array();
let push = new Array ();
let blackjackBanque = false;
let gagneBanque = true;

let divCarteJoueurPart1 = "<div style='position:relative;width:25px;'><img class='recto_2' src='images/";
let divCarteJoueurPart2 = ".jpg'></div>";
let annonceJoueurPart1 = "<div style='display: flex;position: relative;'><div><div style='position: relative;top: -20%;'>╔</div><div></div><div style='position: relative;top: -20%;'>╚</div></div><div style='width: 80%;top:8%;position: relative;text-align:center;'>" ;
let annonceJoueurPart2 = "</div><div><div style='position: relative;top: -20%;'>╗</div><div></div><div style='position: relative;top: -20%;'>╝</div></div>";
let divCarteJoueurDoubleDown = "<div style='position:relative;width:25px;'><img class='recto_2' onClick='reste();'src='images/verso.jpg' alt='carte du joueur' /></div>";

let cashDprt = 1000;
let miseDepart = 100;
cashDprt -= miseDepart;
let palierMise = 100;

let asBanque = 0;
let scoreBanque = document.getElementById('scoreBanque');
let premiere_carteRandomBanque;
let valeur_premiereCarteBanque;
let deuxieme_carteRandomBanque;
let valeur_deuxiemeCarteBanque;
let cartesBanque = document.getElementById('cartes_banque');
let valeurCarteBanque;
let carteRandBanque;
let valeur_carteRandBanque;

let premiere_carteRandomJoueur = new Array();
let valeur_premiereCarteJoueur = new Array();
let deuxieme_carteRandomJoueur = new Array();
let valeur_deuxiemeCarteJoueur = new Array();