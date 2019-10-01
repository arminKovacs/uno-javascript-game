let cardDeck = [];
let listOfColors = ["blue", "green", "red", "yellow"];
let listOfNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
for (let color of listOfColors) {
    for (let number of listOfNumbers) {
        cardDeck.push({color: `${color}`, number: `${number}`});
        cardDeck.push({color: `${color}`, number: `${number}`});
    }
}
let player;
let turn = 0;

function changeTurn() {
    if (turn === 0) {
        player = "hand"
        turn = 1;
    } else if (turn === 1) {
        player = "opponent"
        turn = 0;
    }
    return player;
}


//Reset button - load game.html from start to get a new first draw
let button = document.querySelector(".button");
button.addEventListener("click", function () {
    document.location.reload(false);
});

//Downside card stack
let backCard = document.querySelector("#card-back");
backCard.addEventListener("click", function () {
    drawNewCard(changeTurn())
});

//FIRST DRAW button - set the game by drawing the first 5-5 cards
let gameButton = document.querySelector(".btn-game");
gameButton.addEventListener("click", firstDraw);

function firstDraw() {
    for (let i = 0; i < 5; i++) {
        styleRandomCard(getRandomCard(cardDeck), "hand");
    }
    for (let i = 0; i < 5; i++) {
        styleRandomCard(getRandomCard(cardDeck), "opponent");
    }
    styleRandomCard(getRandomCard(cardDeck), "stack");
    gameButton.style.display = "none";
}


function getRandomCard(deck) {
    let randomCard = deck[Math.floor(Math.random() * deck.length)];
    console.log(deck);
    let index = deck.indexOf(randomCard);
    deck.splice(index, 1);
    console.log(deck);
    return randomCard;
}

function styleRandomCard(card, player) {
    let cardBox = document.querySelector(`#card-${player}`);
    let newCard = document.createElement("div");
    newCard.setAttribute("data-color", `${card.color}`);
    newCard.setAttribute("data-number", `${card.number}`);
    newCard.style.height = "250px";
    newCard.style.width = "200px";
    newCard.style.backgroundSize = "contain";
    newCard.style.backgroundRepeat = "no-repeat";
    newCard.style.backgroundImage = `url('static/images/cards/${card.color}-${card.number}.png')`;
    newCard.addEventListener("click", function () {
        clickCard(player, changeTurn())
    });
    cardBox.appendChild(newCard);
}

function clickCard(player, turn) {
    if (turn === player) {
        let card = event.target;
        let stack = document.querySelector("#card-stack").querySelector('[data-color]');
        let stackColor = stack.dataset.color;
        let stackNumber = stack.dataset.number;
        let cardColor = card.dataset.color;
        let cardNumber = card.dataset.number;
        let cardStackBox = document.querySelector("#card-stack");
        if (cardNumber === stackNumber || cardColor === stackColor) {
            cardStackBox.removeChild(stack);
            cardStackBox.appendChild(card);
        }
    }
}

function drawNewCard(player) {
    styleRandomCard(getRandomCard(cardDeck), player);
}