// declaring constants for the cards
const gameBoard = document.querySelector('.memory-game');
const pairs = ['A','B','C','D','E','F','G','H'];
const allCards = [...pairs, ...pairs] // this is super cool when I learn about it!

// a loop to random shuffle the dack
for (let i = allCards.length -1; i>0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [allCards[i], allCards[j]] = [allCards[j], allCards[i]];
}

// displaying to the user by adding them to html
allCards.forEach(letter => {
    const card = document.createElement('div');
    card.classList.add('memory-card');
    card.setAttribute('data-framework',letter);

    card.innerHTML = `
        <div class="front">@</div>
        <div class="back">${letter}</div>`

    gameBoard.appendChild(card);
})

// declaring more variables
// these variable has to be declear here to advoid
// conflicts from the code above
let hasFlippedCard = false;
let firstCard, secondCard;
let matchCount = 0;
const totalPairs = 8;

// methods for flipping the cards
function flipCard() {
    if (this === firstCard) return;
    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return
    }

    secondCard = this;
    checkForMatch();
}

// methods for checking if the cards are matching
function checkForMatch() {
    const isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    // it is cool that I can reference the variable by doing the .framework!

    if (isMatch) {
        disableCards();
    }
    else {
        unflipCards()
    }
}

// if the cards are matching, I will disable the interaction for the cards
// matchCount will increase to determine if the game is over
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard)
    matchCount++;
    if (matchCount === totalPairs) {
        document.getElementById('game-status').classList.remove('hidden')
    }
    resetBoard();
}

// function if the cards are not matching to flip the cards back to good.
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard()
    }, 1000);
}

// this method is to ensure that everything is back to good
// before the user flip the card again
// to advoid glitches
function resetBoard() {
    hasFlippedCard = false;
    firstCard = null;
    secondCard = null;
}

// methods that begin the game
function startGame() {
    gameBoard.innerHTML = '';

    const allCards = [...pairs, ...pairs];
    for (let i = allCards.length -1; i>0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [allCards[i], allCards[j]] = [allCards[j], allCards[i]];
    }
    allCards.forEach(letter => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.setAttribute('data-framework', letter);

        card.innerHTML = `
            <div class="front">@</div>
            <div class="back">${letter}</div>`;
        
        gameBoard.appendChild(card);
    });

    const cards = document.querySelectorAll('.memory-card');
    cards.forEach(card => card.addEventListener('click', flipCard));
}

// the button for restarting the game
document.getElementById('reset-game').addEventListener('click', () => {
    document.getElementById('game-status').classList.add('hidden');
    matchCount = 0;
    resetBoard();
    startGame();
})

// the game will start as long as the webpage loads
startGame();