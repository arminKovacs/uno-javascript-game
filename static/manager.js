let button = document.querySelector(".btn");
button.addEventListener("click", function () {
    getRandomCard(createCardDeck())
});
let cardDeck;

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

function getRandomCard(deck) {
    let randomCard = deck[Math.floor(Math.random() * deck.length)];
    let cardBox = document.querySelector(".card");
    cardBox.setAttribute("data-color", `${randomCard.color}`);
    cardBox.setAttribute("data-number", `${randomCard.number}`);
    let newCard = document.createElement("img");
    newCard.setAttribute("src", "static/css/uno.jpg");
    cardBox.appendChild(newCard);
}