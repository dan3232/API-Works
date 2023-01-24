let deckId;
let score1 = 0;
let score2 = 0;
const winnerMessage = document.getElementById("msg");
const cardsContainer = document.getElementById("cards");
const remainingValue = document.getElementById("remaining");
const displayIt = document.getElementById("display"); 

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then(res => res.json())
    .then(data => {
        deckId = data.deck_id
    })
    displayIt.style.display = "initial"
}

document.getElementById("deck-btn").addEventListener("click", handleClick);

document.getElementById("draw-btn").addEventListener("click", drawCards)

function drawCards() {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
        cardsContainer.children[0].innerHTML = `
        <img src=${data.cards[0].image} class="card"/>
        `
        cardsContainer.children[1].innerHTML = `
        <img src=${data.cards[1].image} class="card"/>
        `
        const winnerCard = score(data.cards[0], data.cards[1]);
        winnerMessage.textContent = winnerCard
        remainingValue.textContent = data.remaining
        if (data.remaining === 0) {
            document.getElementById("draw-btn").disabled = true
            if (score1 < score2) {
                winnerMessage.textContent = "Awesom, You won the game! 😎"
            } else if (score2 < score1) {
                winnerMessage.textContent = "Computer is godlike, it won the game! 💻"
            } else {
                winnerMessage.textContent = "It's a tie game😮"
            }
        }
    })
}

function score(card1, card2) {
    const valueOptions = ["2","3","4","5","6","7","8","9","10","JACK","QUEEN","KING","ACE"]
    const cardValue1 = valueOptions.indexOf(card1.value);
    const cardValue2 = valueOptions.indexOf(card2.value);
    if (cardValue1 > cardValue2) {
        score1++
        document.getElementById("score1").textContent = `Score: ${score1}`
        return "Computer wins!";
    } else if (cardValue2 > cardValue1) {
        score2++
        document.getElementById("score2").textContent = `Score: ${score2}`
        return "You win!";
    } else {
        return "War";
    }

}

