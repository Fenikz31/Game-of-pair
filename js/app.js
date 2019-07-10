const NB_CARD = 12;

const cards = [];
const tabRandomNumber = [];


let firstFlippedCard = null;

function init() {
	loadSound();

	for (let i = 0; i < NB_CARD; i++) {
		createCard();
	}
}

function loadSound() {
	const bgSound = document.createElement("audio");
	const winningSound = document.createElement("audio");

	bgSound.src = "assets/ambient.mp3";
	winningSound.src = "assets/winning.mp3";

	bgSound.autoplay = true;
	bgSound.volume = 0.4;

	document.body.appendChild(bgSound);
	document.body.appendChild(winningSound);
}

// confirm ("Vous avez gagné la partie! Voulez vous rejouer?");
// location.reload();

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

		if (firstFlippedCard) {
			if (firstFlippedCard.textContent === this.textContent) {
				console.log("ok");
				firstFlippedCard = null;

			} else {
				console.log("not ok");
				setTimeout(() => {
					firstFlippedCard.classList.remove("flipped");
					this.classList.remove("flipped");
					firstFlippedCard = null;
				}, 300);
			} 
		}
		else {
			firstFlippedCard = this;
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

// function createCardFast() {
// 	const card = `
//     <div class="card">
//       <div class="back"></div>
//       <div class="front"></div>
//     </div>
//     `;
// 	document.querySelector('.wrapper').innerHTML = card;
// }

init();

// const cards = document.querySelectorAll('.card');

// const myInterval = setInterval(function() {
// 	for (let card of cards) {
// 		if (!card.classList.contains('stop')) card.classList.toggle('flipped');
// 	}
// }, 1000);

// setTimeout(function() {
// 	clearInterval(myInterval);
// }, 50000);
