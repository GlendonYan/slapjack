const cards = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
const totalPairs = 12;
let flippedCards = [];
let matchedPairs = 0;
let timeLeft = 60;
let timer;

const cardDeck = [...cards, ...cards];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function initializeGame() {
  const gameBoard = document.getElementById('game-board');
  const shuffledCards = shuffle(cardDeck);

  shuffledCards.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.index = index;
    cardElement.dataset.value = card; // Store the card value in a data attribute
    cardElement.addEventListener('click', flipCard);
    gameBoard.appendChild(cardElement);
  });

  startTimer();
}

function flipCard() {
  if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
    this.classList.add('flipped');
    this.textContent = this.dataset.value; // Reveal the card value
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.value === card2.dataset.value) {
    matchedPairs++;
    flippedCards = [];

    if (matchedPairs === totalPairs) {
      endGame(true);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.textContent = ''; // Hide the card value again
      card2.textContent = ''; // Hide the card value again
      flippedCards = [];
    }, 1000);
  }
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').textContent = `Time Left: ${timeLeft}`;

    if (timeLeft === 0) {
      endGame(false);
    }
  }, 1000);
}

function endGame(isWin) {
  clearInterval(timer);
  const message = document.getElementById('message');
  message.textContent = isWin ? 'Congratulations! You won!' : 'Time\'s up! You lost!';
  message.style.color = isWin ? 'green' : 'red';
}

initializeGame();