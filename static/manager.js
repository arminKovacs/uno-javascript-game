let button = document.querySelector(".btn");
button.addEventListener("click", getRandomCard);

let color;
let number;
let placedCardColor = document.querySelector(".new-card-color");

function getRandomCard() {
    let newCard = document.querySelectorAll(".random-card");
    for (let item of newCard) {
        color = item.dataset.color;
        number = item.dataset.number;
        newRandomCard(color, number);
        placedCardColor.innerHTML = card.suit + " " + card.value;
    }
}