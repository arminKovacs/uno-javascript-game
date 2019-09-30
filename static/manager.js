let cardDeck;
let button = document.querySelector(".btn");
button.addEventListener("click", function () {
    document.location.reload(false);
});

let gameButton = document.querySelector(".btn-game");
gameButton.addEventListener("click", function () {
    let counter = 0;
    for (let i = 0; i < 5; i++) {
        getRandomCard(testList());
        counter++;
    }
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


function testList() {
    cardDeck = [];
    let listOfColors = ["blue", "green"];
    let listOfNumbers = [0];
    for (let color of listOfColors) {
        for (let number of listOfNumbers) {
            cardDeck.push({color: `${color}`, number: `${number}`});
            cardDeck.push({color: `${color}`, number: `${number}`});
        }
    }
    return cardDeck;
}


function getRandomCard(deck) {
    let randomCard = deck[Math.floor(Math.random() * deck.length)];
    let cardBox = document.querySelector(".card");
    cardBox.setAttribute("data-color", `${randomCard.color}`);
    cardBox.setAttribute("data-number", `${randomCard.number}`);
    let newCard = document.createElement("div");
    newCard.style.height = "200px";
    newCard.style.width = "120px";
    newCard.style.backgroundSize = "contain";
    newCard.style.border = "10px";
    newCard.style.backgroundRepeat = "no-repeat";
    newCard.style.backgroundImage = `url('static/img/${randomCard.color + randomCard.number}.jpg')`;
    cardBox.appendChild(newCard);
}