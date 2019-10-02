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

function startingPage() {
    let container = document.querySelector('#container-middle');
    let header = document.querySelector('#header');
    let cardBack = document.createElement("div");
    let cardStack = document.createElement("div");
    let pressButtonText = document.querySelector('#press-button');
    header.removeChild(pressButtonText);
    cardBack.setAttribute('id', 'card-back');
    cardStack.setAttribute('id', 'container-stack');
    container.appendChild(cardBack);
    container.appendChild(cardStack);
}

function changeTurn() {
    let handCards = document.querySelector("#container-hand").querySelectorAll("div");
    let opponentCards = document.querySelector("#container-opponent").querySelectorAll("div");
    checkForWin();
    if (turn === 0) {
        player = "opponent";
        turn = 1;
        for (let item of handCards) {
            item.style.backgroundImage = `url('/static/images/cards/back.png')`;
        }
        for (let item of opponentCards) {
            let color = item.dataset.color;
            let number = item.dataset.number;
            item.style.backgroundImage = `url('/static/images/cards/${color}-${number}.png')`;
        }
    } else if (turn === 1) {
        player = "hand";
        turn = 0;
        for (let item of opponentCards) {
            item.style.backgroundImage = `url('/static/images/cards/back.png')`;
        }
        for (let item of handCards) {
            let color = item.dataset.color;
            let number = item.dataset.number;
            item.style.backgroundImage = `url('/static/images/cards/${color}-${number}.png')`;
        }
    }
}


//Reset button - load game.html from start to get a new first draw
let button = document.querySelector(".btn-danger");
button.addEventListener("click", function () {
    document.location.reload(true);
});

//Downside card stack
function downSideCard() {
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
}

//FIRST DRAW button - set the game by drawing the first 5-5 cards
let gameButton = document.querySelector(".btn-primary");
gameButton.addEventListener("click", firstDraw);

function firstDraw() {
    startingPage();
    downSideCard();
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
    if (turn === 0 && player === "hand") {
        newCard.style.backgroundImage = `url(/static/images/cards/${card.color}-${card.number}.png)`;
    } else if (turn === 0 && player === "opponent") {
        newCard.style.backgroundImage = `url('/static/images/cards/back.png')`;
    } else if (turn === 0 || turn === 1) {
        newCard.style.backgroundImage = `url('/static/images/cards/${card.color}-${card.number}.png')`;
    }
    newCard.style.backgroundSize = "contain";
    newCard.style.backgroundRepeat = "no-repeat";
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


function checkForWin() {
    let handContainer = document.querySelector("#container-hand").childNodes.length;
    let opponentContainer = document.querySelector("#container-opponent").childNodes.length;
    if (handContainer === 1) {
        sessionStorage.setItem("Player", "Player 1");
        modalWin();
    } else if (opponentContainer === 1) {
        sessionStorage.setItem("Player", "Player 2");
        modalWin();
    }
}

function modalWin() {
    let modal = document.querySelector("#myModal");
    document.querySelector(".modal-content").querySelector("h1").innerHTML = `${sessionStorage.getItem('Player')} won!`;
    let span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
        document.location.reload(true);
    };

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.location.reload(true);
        }
    };

}