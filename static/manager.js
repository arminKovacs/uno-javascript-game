let cardDeck;

//Reset button - load game.html from start to get a new first draw
let button = document.querySelector(".btn-danger");
button.addEventListener("click", function () {
    document.location.reload(false);
});

//FIRST DRAW button - set the game by drawing the first 5-5 cards
let gameButton = document.querySelector(".btn-primary");
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


function getRandomCard(deck, player) {
    let randomCard = deck[Math.floor(Math.random() * deck.length)];
    let index = deck.indexOf(randomCard);
    deck.splice(index, 1);
    let cardBox = document.querySelector(`.container-${player}`);
    let newCard = document.createElement("div");
    newCard.setAttribute("data-color", `${randomCard.color}`);
    newCard.setAttribute("data-number", `${randomCard.number}`);

    if (cardBox.classList.value === "container-hand") {
        newCard.classList.value = "card";
    } else {
        newCard.classList.value = "opponent";
    }

    newCard.style.backgroundSize = "contain";
    newCard.style.backgroundRepeat = "no-repeat";
    newCard.style.backgroundImage = `url('static/images/cards/${randomCard.color}-${randomCard.number}.png')`;
    let cardAnim = document.createElement("svg");
    cardAnim.setAttribute("version", "1.1");
    cardAnim.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    newCard.appendChild(cardAnim);
    cardBox.appendChild(newCard);
}

