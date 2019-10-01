let cardDeck;
let button = document.querySelector(".btn");
button.addEventListener("click", function () {
    document.location.reload(false);
});

let gameButton = document.querySelector(".btn-game");
gameButton.addEventListener("click", function () {
    let counter = 0;
    for (let i = 0; i < 5; i++) {
        getRandomCard(createCardDeck(), "hand");
        counter++;
        if (counter >= 5) {
        }
    }
    for (let i = 0; i < 5; i++) {
        getRandomCard(createCardDeck(), "opponent");
        counter++;
    }
    getRandomCard(createCardDeck(), "stack");
    gameButton.style.display = "none";
});


function createCardDeck() {
    cardDeck = [];
    let listOfColors = ["blue", "green", "red", "yellow"];
    let listOfNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let color of listOfColors) {
        for (let number of listOfNumbers) {
            cardDeck.push({color: `${color}`, number: `${number}`});
            cardDeck.push({color: `${color}`, number: `${number}`});
        }
    }
    return cardDeck;
}


function workWithCardDeck(deck) {
    return deck;
}

function getRandomCard(deck, player) {
    let randomCard = deck[Math.floor(Math.random() * deck.length)];
    console.log(deck);
    let index = deck.indexOf(randomCard);
    deck.splice(index, 1);
    console.log(deck);
    let cardBox = document.querySelector(`.card-${player}`);
    cardBox.setAttribute("data-color", `${randomCard.color}`);
    cardBox.setAttribute("data-number", `${randomCard.number}`);
    let newCard = document.createElement("div");
    newCard.style.height = "250px";
    newCard.style.width = "200px";
    newCard.style.backgroundSize = "contain";
    newCard.style.backgroundRepeat = "no-repeat";
    newCard.style.backgroundImage = `url('static/images/${randomCard.color}-${randomCard.number}.png')`;
    cardBox.appendChild(newCard);
}

