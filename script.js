const circle = document.querySelector('.progress-ring__circle');
const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const alarm = document.getElementById('alarmSound');

const circumference = 100 * 2 * Math.PI;
let duration = 3600; // 3600 seconds
let timeLeft = duration;
let timerId = null;

circle.style.strokeDasharray = `${circumference} ${circumference}`;

function updateDisplay() {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    display.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    
    const percent = (timeLeft / duration) * 100;
    const offset = circumference - (percent / 100 * circumference);
    circle.style.strokeDashoffset = offset;
}

function startTimer() {
    if (timerId) return; // Prevent double clicking
    
    startBtn.style.display = 'none'; // Hide start button while running
    
    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay();

        if (timeLeft <= 0) {
            clearInterval(timerId);
            timerId = null;
            alarm.play(); // PLAY SOUND
            display.innerText = "DONE!";
            display.style.color = "#ff4444";
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = duration;
    updateDisplay();
    startBtn.style.display = 'inline-block';
    display.style.color = "white";
    alarm.pause();
    alarm.currentTime = 0; // Stop the sound
}

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

// Init
updateDisplay();
