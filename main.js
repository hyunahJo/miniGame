"use strict";

const cat_size = 80;
const cat_count = 5;
const dog_count = 5;
const game_duration_sec = 5;

const control = document.querySelector(".game__control");
const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();
const popUp = document.querySelector(".game__pop-up");
const popUp_control = document.querySelector(".game__control");
const popUpText = document.querySelector(".pop-up_text");
const gameTimer = document.querySelector(".game__timer");
const gameStop = document.querySelector(".game__stop");
const gameScore = document.querySelector(".cat_count");

const bgSound = new Audio("./sound/bgSound.mp3");
const alertSound = new Audio("./sound/alert.mp3");
const catSound = new Audio("./sound/catSound.mp3");
const dogSound = new Audio("./sound/dogSound.mp3");
const winSound = new Audio("./sound/winSound.mp3");
const lostSound = new Audio("./sound/lostBg.mp3");

let started = false;
let score = 0;
let timer = undefined;

field.addEventListener("click", onFieldClick);
control.addEventListener("click", () => {
    playSound(alertSound);
    startGame();
});

gameStop.addEventListener("click", () => {
    playSound(alertSound);
    stopGame();
});

function startGame() {
    started = true;
    initGame();
    hidePopUp();
    startGameTimer();
    playSound(bgSound);
}

function stopGame() {
    showPopUp();
    stopGameTimer();
    stopSound(bgSound);
}

function finishGame(win) {
    started = false;
    if (win) {
        playSound(winSound);
    } else {
        playSound(lostSound);
    }
    stopSound(bgSound);
    stopGameTimer();
    showPopUp();
    showPopUpRefresh(win ? "YOU Win!" : "YOU LOST..");
}

function initGame() {
    console.log(fieldRect);
    score = 0;
    gameScore.innerText = cat_count;
    field.innerHTML = "";
    addItem("cat", cat_count, "img/GettyImages-a10504517.png");
    addItem("dog", dog_count, "img/GettyImages-a10504518.png");
}

function hidePopUp() {
    popUp.style.visibility = "hidden";
}

function showPopUp() {
    const icon = document.querySelector(".fas");
    popUp.style.visibility = "visible";
    icon.classList.add("fa-redo");
    icon.classList.remove("fa-play");
}

function showPopUpRefresh(text) {
    popUpText.innerText = text;
}

function onFieldClick() {
    if (!started) {
        return;
    }
    const target = event.target;
    if (target.matches(".cat")) {
        target.remove();
        score++;
        playSound(catSound);
        updateScoreText();
        if (score === cat_count) {
            finishGame(true);
        }
    } else if (target.matches(".dog")) {
        playSound(dogSound);
        finishGame(false);
    }
}

function updateScoreText() {
    gameScore.innerText = cat_count - score;
}

function startGameTimer() {
    let remainingTimeSec = game_duration_sec;
    updateTimerText(remainingTimeSec);
    timer = setInterval(() => {
        if (remainingTimeSec <= 0) {
            clearInterval(timer);
            finishGame(false);
            return;
        }
        updateTimerText(--remainingTimeSec);
    }, 1000);
}

function stopGameTimer() {
    clearInterval(timer);
}

function updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerText = `${minutes}:${seconds}`;
}

function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - cat_size;
    const y2 = fieldRect.height - cat_size;

    for (let i = 0; i < count; i++) {
        const item = document.createElement("img");
        item.setAttribute("class", className);
        item.setAttribute("src", imgPath);
        item.style.position = "absolute";
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
