const NB_CARD = 12;

const cards = [];
const tabRandomNumber = [];
let nbFlippedCard = [];
let score =0;


let firstFlippedCard = null;

const bgSound = document.createElement("audio");

function init() {
	loadSound();
	
	for (let i = 0; i < NB_CARD; i++) {
		createCard();
	}
}

function loadSound() {
	
	bgSound.src = "assets/ambient.mp3";

	bgSound.autoplay = true;
	bgSound.volume = 0.4;

	document.body.appendChild(bgSound);
}

// eslint-disable-next-line no-unused-vars
function toggleSound() {
	if (!bgSound.paused) {
		bgSound.pause();
		console.log("You turn the music off!");
	} else {
		bgSound.play() ;
		console.log("You turn the music on!");
	}
}

// eslint-disable-next-line no-unused-vars
// function reload() {
// 	score = 0;
// 	displayScore();
	// for (let i = NB_CARD; i >= NB_CARD; i--) {
	// 	cards.pop();
	// }
}

function loadWinningSound() {
	const winningSound = document.createElement("audio");

	winningSound.src = "assets/winning.mp3";

	winningSound.autoplay = true;
	winningSound.volume = 0.4;

	document.body.appendChild(winningSound);
}



function createCard() {
	// eslint-disable-next-line quotes
	const card = document.createElement('div');
	const backCard = document.createElement("div");
	const frontCard = document.createElement("div");

	card.appendChild(backCard);
	card.appendChild(frontCard);

	card.className = "card";
	backCard.classList.add("back");
	frontCard.classList.add("front");

	cards.push(card);
	handleCard(cards.length - 1);
}

function handleCard(index) {
	const card = cards[index];
	addClickListener(card);
	generateRendomNB(card, index);
	shuffleCards();
	cards.forEach((card) => {
		document.querySelector(".wrapper").appendChild(card);
	});
}

function addClickListener(card) {
	card.addEventListener("click", function() {
		card.classList.toggle("flipped");
		nbFlippedCard = document.getElementsByClassName("flipped");
			
		if (firstFlippedCard) {
			if (firstFlippedCard.textContent === this.textContent) {
				score = nbFlippedCard.length;
				console.log("You've got you'self a pair!");
				firstFlippedCard = null;
				
			} else {
				console.log("Flip card back");
				setTimeout(() => {
					firstFlippedCard.classList.remove("flipped");
					this.classList.remove("flipped");
					firstFlippedCard = null;
					displayScore();
				}, 300);
			} 
		}
		else {
			firstFlippedCard = this;
		}
		if (score < 1 && (nbFlippedCard.length !== NB_CARD)) {
			
			score = 0;
			console.log("Don't have a pair, score stays at 0!");
			
		} else if (score >= 1 && (nbFlippedCard.length !== NB_CARD)) {
			
			score = nbFlippedCard.length;
			displayScore();
			console.log("Keep going!");
			
		} else {
			console.log("Ok! You win!");
			setTimeout(() => {
				loadWinningSound();
				confirm ("Vous avez gagné la partie! Voulez vous rejouer?");
				location.reload();				
			}, 1000);
		}
	});
	
}

function generateRendomNB(card, index) {
	let randomNumber = tabRandomNumber[tabRandomNumber.length - 1];
	if (index % 2 === 0) {
		do {
			randomNumber = Math.ceil(Math.random() * 20);
		} while (tabRandomNumber.includes(randomNumber));
		{
			tabRandomNumber.push(randomNumber);
		}
	}
	card.querySelector(".front").textContent = randomNumber;
}

function shuffleCards() {
	// SHUFFLE CARDS
	cards.sort(function() {
		return Math.random() - 0.5;
	});
}

function displayScore() {
	do {
		
		if (nbFlippedCard.length < 2) {
			score = 0;
			document.getElementById("score").innerHTML =score;
		}else {
			score = Math.floor(nbFlippedCard.length/2);
			document.getElementById("score").innerHTML = score;
		}
		return score/2;
	} while (nbFlippedCard.length !== NB_CARD);
}

init();