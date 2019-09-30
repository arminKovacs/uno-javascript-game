let card;

function Card(suit, value) {
    this.suit = suit;
    this.value = value;
}

function newRandomCard(color, number) {
    card = new Card(color, number);
    return card;
}