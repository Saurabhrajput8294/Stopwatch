const timeDisplay = document.querySelector("#timeDisplay"); // Get the element with id "timeDisplay"
const startBtn = document.querySelector("#startBtn"); // Get the element with id "startBtn"
const pauseBtn = document.querySelector("#pauseBtn"); // Get the element with id "pauseBtn"
const resetBtn = document.querySelector("#resetBtn"); // Get the element with id "resetBtn"

let startTime = 0; // Variable to store the start time in milliseconds
let elapsedTime = 0; // Variable to store the elapsed time in milliseconds
let currentTime = 0; // Variable to store the current time in milliseconds
let paused = true; // Flag to track whether the timer is paused or not
let intervalId; // Variable to store the interval ID for updating the timer
let hrs = 0; // Variable to store the hours component of the timer
let mins = 0; // Variable to store the minutes component of the timer
let secs = 0; // Variable to store the seconds component of the timer

startBtn.addEventListener("click", () => {
  if (paused) {
    paused = false; // Set the flag to indicate that the timer is not paused
    startTime = Date.now() - elapsedTime; // Set the start time by subtracting the elapsed time from the current time
    intervalId = setInterval(updateTime, 1000); // Start the interval to update the timer every second
  }
});

pauseBtn.addEventListener("click", () => {
  if (!paused) {
    paused = true; // Set the flag to indicate that the timer is paused
    elapsedTime = Date.now() - startTime; // Calculate the elapsed time by subtracting the start time from the current time
    clearInterval(intervalId); // Clear the interval to stop updating the timer
  }
});

resetBtn.addEventListener("click", () => {
  paused = true; // Set the flag to indicate that the timer is paused
  clearInterval(intervalId); // Clear the interval to stop updating the timer
  startTime = 0; // Reset the start time
  elapsedTime = 0; // Reset the elapsed time
  currentTime = 0; // Reset the current time
  hrs = 0; // Reset the hours component of the timer
  mins = 0; // Reset the minutes component of the timer
  secs = 0; // Reset the seconds component of the timer
  timeDisplay.textContent = "00:00:00"; // Reset the time display
});

function updateTime() {
  elapsedTime = Date.now() - startTime; // Calculate the elapsed time by subtracting the start time from the current time

  secs = Math.floor((elapsedTime / 1000) % 60); // Calculate the seconds component of the timer
  mins = Math.floor((elapsedTime / (1000 * 60)) % 60); // Calculate the minutes component of the timer
  hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60); // Calculate the hours component of the timer

  secs = pad(secs); // Format the seconds component with leading zeros if necessary
  mins = pad(mins); // Format the minutes component with leading zeros if necessary
  hrs = pad(hrs); // Format the hours component with leading zeros if necessary

  timeDisplay.textContent = `${hrs}:${mins}:${secs}`; // Update the time display with the formatted time

  function pad(unit) {
    return ("0" + unit).length > 2 ? unit : "0" + unit; // Add leading zeros to the unit if it has only one digit
  }
}
