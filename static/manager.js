let cardDeck = [];
let listOfColors = ["blue", "green", "red", "yellow"];
let listOfNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "block", "reverse", "plus-2"];
let listOfBlacks = ["black"];
let listOfBlackAction = ["plus-4", "request"];
for (let color of listOfColors) {
    for (let number of listOfNumbers) {
        cardDeck.push({color: `${color}`, number: `${number}`});
        cardDeck.push({color: `${color}`, number: `${number}`});
    }
}

for (let color of listOfBlacks) {
    for (let action of listOfBlackAction) {
        cardDeck.push({color: `${color}`, number: `${action}`});
        cardDeck.push({color: `${color}`, number: `${action}`});
        cardDeck.push({color: `${color}`, number: `${action}`});
        cardDeck.push({color: `${color}`, number: `${action}`});
    }
}

let elementIsClicked = false;

function clickHandler() {
    elementIsClicked = true;
    document.querySelector(".message").innerHTML = "UNO!";
    unoButton.style.display = "none";
}

let unoButton = document.querySelector(".btn-success");
unoButton.style.display = "none";
unoButton.addEventListener("click", function () {
    console.log(clickHandler());
});
let player = "hand";
let turn = 0;
let playerDraggable = dragula([document.querySelector('#container-hand')]);
let opponentDraggable = dragula([document.querySelector('#container-opponent')]);


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

function flipCards() {
    let handCards = document.querySelector("#container-hand").querySelectorAll("div");
    let opponentCards = document.querySelector("#container-opponent").querySelectorAll("div");
    if (turn === 0) {
        player = "opponent";
        turn = 1;
        playerDraggable.destroy();
        opponentDraggable = dragula([document.getElementById('container-opponent')]);

        for (let item of handCards) {
            item.classList.value = 'opponent';
            item.style.backgroundImage = `url('/static/images/cards/back.png')`;
        }
        for (let item of opponentCards) {
            item.classList.value = 'card';
            let color = item.dataset.color;
            let number = item.dataset.number;
            item.style.backgroundImage = `url('/static/images/cards/${color}-${number}.png')`;
        }
    } else if (turn === 1) {
        player = "hand";
        turn = 0;
        opponentDraggable.destroy();
        playerDraggable = dragula([document.querySelector('#container-hand')]);


        for (let item of opponentCards) {
            item.classList.value = 'opponent';
            item.style.backgroundImage = `url('/static/images/cards/back.png')`;
        }
        for (let item of handCards) {
            item.classList.value = 'card';
            let color = item.dataset.color;
            let number = item.dataset.number;
            item.style.backgroundImage = `url('/static/images/cards/${color}-${number}.png')`;
        }
    }
}


function unoNotClicked() {
    if (elementIsClicked === false) {
        drawCardIfUnoFail();
        checkForWin();
        flipCards();
    } else if (elementIsClicked === true) {
        checkForWin();
        flipCards();
        elementIsClicked = false;
        document.querySelector(".message").innerHTML = "";
    }
}

function changeTurn(numberOfCardInHand) {
    if (numberOfCardInHand === 3) {
        switch (checkForUno()) {
            case true:
                countDown();
                setTimeout(unoNotClicked, 6000);
                break;
            case false:
                checkForWin();
                flipCards();
                break;
        }
    } else {
        checkForWin();
        flipCards();
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
    opponentDraggable.destroy();
    let cardBox = document.querySelector(`#container-${player}`);
    let newCard = document.createElement("div");
    newCard.setAttribute("data-color", `${card.color}`);
    newCard.setAttribute("data-number", `${card.number}`);

    if (cardBox.id.valueOf() === "container-hand") {
        newCard.classList.value = 'card';
    } else {
        newCard.classList.value = 'opponent';
    }

    if (turn === 0 && player === "hand") {
        newCard.style.backgroundImage = `url(/static/images/cards/${card.color}-${card.number}.png)`;
    } else if (turn === 0 && player === "opponent") {
        newCard.style.backgroundImage = `url('/static/images/cards/back.png')`;
    } else if (turn === 0 || turn === 1) {
        newCard.style.backgroundImage = `url('/static/images/cards/${card.color}-${card.number}.png')`;
    }
    newCard.style.backgroundSize = "contain";
    newCard.style.backgroundRepeat = "no-repeat";
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
    let cardContainerNumber = card.parentNode.childNodes.length;
    let stack = document.querySelector("#container-stack").querySelector('[data-color]');
    let stackColor = stack.dataset.color;
    let stackNumber = stack.dataset.number;
    let cardColor = card.dataset.color;
    let cardNumber = card.dataset.number;
    if (cardColor === "black") {
        cardColor = stackColor;
    }
    let cardStackBox = document.querySelector("#container-stack");
    if (cardNumber === stackNumber || cardColor === stackColor) {
        cardStackBox.removeChild(stack);
        cardStackBox.appendChild(card);
        if (cardNumber === "block" || cardNumber === "reverse") {
            changeTurn(cardContainerNumber);
        }
        if (cardNumber === "plus-2") {
            changeTurn(4);
            drawNewCard();
            changeTurn(4);
            drawNewCard();
        }
        if (cardNumber === "plus-4" || cardNumber === "request") {
            modal2();
            let validationButton = document.querySelector(".validation");
            validationButton.addEventListener("click", function () {
                let selected = document.querySelector(".dropdown");
                let selectedColor = selected.value;
                card.dataset.color = selectedColor;
                document.querySelector('#myModal2').style.display = "none";
                if (cardNumber === "plus-4") {
                    for (let i = 0; i < 4; i++) {
                        changeTurn(4)
                        drawNewCard()
                    }
                }
            });


        }
        changeTurn(cardContainerNumber);
    }
}

function drawNewCard() {
    if (turn === 0) {
        styleRandomCard(getRandomCard(cardDeck), "hand");
    } else if (turn === 1) {
        styleRandomCard(getRandomCard(cardDeck), "opponent")
    }
    changeTurn(4)
}


function drawCardIfUnoFail() {
    for (let i = 0; i < 2; i++) {
        if (turn === 0) {
            styleRandomCard(getRandomCard(cardDeck), "hand");
        } else if (turn === 1) {
            styleRandomCard(getRandomCard(cardDeck), "opponent")
        }
    }
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

function checkForUno() {
    let handContainer = document.querySelector("#container-hand").childNodes.length;
    let opponentContainer = document.querySelector("#container-opponent").childNodes.length;
    if (handContainer === 2 || opponentContainer === 2) {
        return true
    } else {
        return false;
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

function modal2() {
    let modal = document.querySelector('#myModal2');
    let span = document.getElementsByClassName('close2')[0];
    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
    };
}

function countDown() {
    unoButton.style.display = "inline-block";
    let timeLeft = 5;
    let downloadTimer = setInterval(function () {
        document.querySelector("#countdown").innerHTML = timeLeft + " seconds remaining";
        timeLeft -= 1;
        if (timeLeft < 0) {
            clearInterval(downloadTimer);
            document.getElementById("countdown").innerHTML = "";
        }
    }, 1000);
}