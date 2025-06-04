// === DOM ELEMENTS ===
const startButton = document.getElementById("start-button");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const finalMessage = document.getElementById("final-message");
const faces = document.querySelectorAll(".face");

let score = 0;
let timeLeft = 30;
let gameTimer;
let faceTimer;
let gameActive = false;

// === Utility: Pick a random face (image element) ===
function getRandomFace() {
  const index = Math.floor(Math.random() * faces.length);
  return faces[index];
}

// === Show a face briefly ===
function popUpFace() {
  if (!gameActive) return;

  const face = getRandomFace();
  if (face.classList.contains("show")) {
    // Skip if already visible (rare but possible)
    return;
  }

  face.classList.add("show");

  // Hide the face after a random time between 700-1200ms
  setTimeout(() => {
    face.classList.remove("show");
  }, Math.random() * 500 + 700);
}

// === Repeatedly show faces at random intervals ===
function startFaceLoop() {
  faceTimer = setInterval(() => {
    popUpFace();
  }, 800); // Show a new face every 800ms
}

// === Handle player clicking a face ===
faces.forEach((face) => {
  face.addEventListener("click", () => {
    if (!gameActive || !face.classList.contains("show")) return;

    score++;
    scoreDisplay.textContent = score;
    face.classList.remove("show"); // Hide after hit
  });
});

// === Countdown timer logic ===
function startCountdown() {
  timeLeft = 30;
  timeDisplay.textContent = timeLeft;

  gameTimer = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

// === End game and display final score + message ===
function endGame() {
  clearInterval(gameTimer);
  clearInterval(faceTimer);
  gameActive = false;

  // Hide any remaining visible faces
  faces.forEach((face) => face.classList.remove("show"));

  // Display final message
  let message = `Time's up! You scored ${score} point${
    score !== 1 ? "s" : ""
  }. `;

  if (score >= 15) {
    message += "You're a certified FaceBomper!";
  } else if (score >= 8) {
    message += "Nice reflexes, FaceBomp Rookie!";
  } else {
    message += "Keep practicing—those faces won’t bonk themselves!";
  }

  finalMessage.textContent = message;
}

// === Start or restart the game ===
function startGame() {
  // Reset all values
  score = 0;
  scoreDisplay.textContent = score;
  finalMessage.textContent = "";
  gameActive = true;

  clearInterval(gameTimer);
  clearInterval(faceTimer);

  startCountdown();
  startFaceLoop();
}

// === Event Listener for Start Button ===
startButton.addEventListener("click", startGame);
