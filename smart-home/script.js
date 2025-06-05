let currentTemp = 78;

function updateTempDisplay() {
  const tempEl = document.getElementById("tempDisplay");
  tempEl.textContent = `${currentTemp}°F`;
}

function increaseTemp() {
  currentTemp++;
  updateTempDisplay();
  console.log("Temperature increased to", currentTemp);
}

function decreaseTemp() {
  currentTemp--;
  updateTempDisplay();
  console.log("Temperature decreased to", currentTemp);
}

// Initialize display on page load
document.addEventListener("DOMContentLoaded", updateTempDisplay);

const funnySongs = [
  "Baby Shark Remix",
  "The Duck Song",
  "Yakety Sax",
  "Never Gonna Give You Up",
  "Banana Phone",
  "I'm Too Sexy",
  "What Does the Fox Say?",
  "Who Let the Dogs Out",
  "Nyan Cat",
  "Trololo Song",
];

let isPlaying = false;
let currentSongIndex = null;

function getRandomSongIndex(excludeIndex = null) {
  let index;
  do {
    index = Math.floor(Math.random() * funnySongs.length);
  } while (index === excludeIndex);
  return index;
}

function updateSongDisplay(text) {
  const songEl = document.getElementById("songDisplay");
  songEl.textContent = text;
}

function togglePlayPause() {
  const playPauseBtn = document.getElementById("playPauseBtn");

  if (!isPlaying) {
    // Play music
    currentSongIndex =
      currentSongIndex === null ? getRandomSongIndex() : currentSongIndex;
    updateSongDisplay(funnySongs[currentSongIndex]);
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
    isPlaying = true;
    console.log("Playing:", funnySongs[currentSongIndex]);
  } else {
    // Pause music
    updateSongDisplay("Paused: " + funnySongs[currentSongIndex]);
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i> Play';
    isPlaying = false;
    console.log("Paused:", funnySongs[currentSongIndex]);
  }
}

function stopMusic() {
  isPlaying = false;
  currentSongIndex = null;
  updateSongDisplay("No song playing");
  const playPauseBtn = document.getElementById("playPauseBtn");
  playPauseBtn.innerHTML = '<i class="fas fa-play"></i> Play';
  console.log("Music stopped");
}

function nextSong() {
  if (!isPlaying) {
    // If music is not playing, start playing a random song
    currentSongIndex = getRandomSongIndex();
    updateSongDisplay(funnySongs[currentSongIndex]);
    const playPauseBtn = document.getElementById("playPauseBtn");
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
    isPlaying = true;
    console.log("Playing:", funnySongs[currentSongIndex]);
  } else {
    // Change to next random song, excluding current
    currentSongIndex = getRandomSongIndex(currentSongIndex);
    updateSongDisplay(funnySongs[currentSongIndex]);
    console.log("Next song:", funnySongs[currentSongIndex]);
  }
}
