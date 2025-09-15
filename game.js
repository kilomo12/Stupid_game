const gameContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('start-button');
const exitButton = document.getElementById('exit-button');
let score = 0;
let gameActive = false;
let circleTimeout;
let gameInterval;
let timeElapsed = 0;
const maxTime = 5 * 60 * 1000; // 5 minuti in millisecondi

// Funzione per creare un cerchio in una posizione casuale
function createCircle(speed) {
  const circle = document.createElement('div');
  circle.className = 'circle';

  const size = 50; // Dimensione del cerchio
  // Utilizza le dimensioni del contenitore invece della finestra
  const containerWidth = gameContainer.clientWidth;
  const containerHeight = gameContainer.clientHeight;

  const x = Math.random() * (containerWidth - size);
  const y = Math.random() * (containerHeight - size);

  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;

  // Aggiunge un evento click al cerchio
  circle.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = score;
    gameContainer.removeChild(circle);
    clearTimeout(circleTimeout);
    createCircle(Math.max(speed - 100, 500));
  });

  // Fine della partita se il cerchio non viene cliccato
  circleTimeout = setTimeout(() => {
    if (gameContainer.contains(circle)) {
      endGame("Hai perso! Non hai cliccato il cerchio in tempo.");
    }
  }, speed);

  gameContainer.appendChild(circle);
}

// Funzione per iniziare il gioco
function startGame() {
  if (gameActive) return;
  gameActive = true;
  score = 0;
  timeElapsed = 0;
  scoreDisplay.textContent = score;
  gameContainer.innerHTML = '';

  const initialSpeed = 2000; // Velocità iniziale
  createCircle(initialSpeed);

  // Controlla il tempo per la vittoria
  gameInterval = setInterval(() => {
    timeElapsed += 100;
    if (timeElapsed >= maxTime) {
      endGame("Complimenti! Hai vinto la partita!");
    }
  }, 100);
}

// Funzione per terminare il gioco
function endGame(message) {
  gameActive = false;
  clearInterval(gameInterval);
  clearTimeout(circleTimeout);
  gameContainer.innerHTML = '';
  alert(message);
}

// Evento per il pulsante Start
startButton.addEventListener('click', startGame);

// Evento per il pulsante Exit
exitButton.addEventListener('click', () => {
  if (gameActive) {
    endGame("Hai interrotto la partita.");
  }
});