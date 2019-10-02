let cardDeck = [];
let listOfColors = ["blue", "green", "red", "yellow"];
let listOfNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
for (let color of listOfColors) {
    for (let number of listOfNumbers) {
        cardDeck.push({color: `${color}`, number: `${number}`});
        cardDeck.push({color: `${color}`, number: `${number}`});
    }
}



let player = "hand";
let turn = 0;

function changeTurn() {
    if (turn === 0) {
        player = "opponent";
        turn = 1;
    } else if (turn === 1) {
        player = "hand";
        turn = 0;
    }
};


//Reset button - load game.html from start to get a new first draw
let button = document.querySelector(".btn-danger");
button.addEventListener("click", function () {
    document.location.reload(false);
});

//Downside card stack
let backCard = document.querySelector("#card-back");
backCard.addEventListener("click", function () {
    if (player === "hand") {
        if (turn === 0) {
            drawNewCard();
        }
    } else if (player === "opponent") {
        if (turn === 1) {
            drawNewCard()
        }
    }
});


//FIRST DRAW button - set the game by drawing the first 5-5 cards
let gameButton = document.querySelector(".btn-primary");
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
    let index = deck.indexOf(randomCard);
    deck.splice(index, 1);
    return randomCard;
}

function styleRandomCard(card, player) {
    let cardBox = document.querySelector(`#container-${player}`);
    let newCard = document.createElement("div");
    newCard.setAttribute("data-color", `${card.color}`);
    newCard.setAttribute("data-number", `${card.number}`);
    newCard.classList.value = 'card';
    newCard.style.backgroundSize = "contain";
    newCard.style.backgroundRepeat = "no-repeat";
    newCard.style.backgroundImage = `url('static/images/cards/${card.color}-${card.number}.png')`;
    let cardAnim = document.createElement("svg");
    cardAnim.setAttribute("version", "1.1");
    cardAnim.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    newCard.appendChild(cardAnim);
    newCard.addEventListener("click", function () {
        if (player === "hand") {
            if (turn === 0) {
                clickCard()
            }
        } else if (player === 'opponent') {
            if (turn === 1) {
                clickCard()
            }
        }
    });
    cardBox.appendChild(newCard);
}

function clickCard() {
    let card = event.target;
    let stack = document.querySelector("#container-stack").querySelector('[data-color]');
    let stackColor = stack.dataset.color;
    let stackNumber = stack.dataset.number;
    let cardColor = card.dataset.color;
    let cardNumber = card.dataset.number;
    let cardStackBox = document.querySelector("#container-stack");
    if (cardNumber === stackNumber || cardColor === stackColor) {
        cardStackBox.removeChild(stack);
        cardStackBox.appendChild(card);
        changeTurn();
    }
}

function drawNewCard() {
    if (turn === 0) {
        styleRandomCard(getRandomCard(cardDeck), "hand");
    } else if (turn === 1) {
        styleRandomCard(getRandomCard(cardDeck), "opponent")
    }
    changeTurn()
}