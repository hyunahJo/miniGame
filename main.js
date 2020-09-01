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

let timer = undefined;

control.addEventListener("click", () => {
    startGame();
});

function startGame() {
    initGame();
    hidePopUp();
    startGameTimer();
}

function initGame() {
    field.innerHTML = "";
    addItem("cat", cat_count, "img/GettyImages-a10504517.png");
    addItem("dog", dog_count, "img/GettyImages-a10504518.png");
}

function hidePopUp() {
    popUp.style.visibility = "hidden";
}

function startGameTimer() {
    let remainingTimeSec = game_duration_sec;
    updateTimerText(remainingTimeSec);
    timer = setInterval(() => {
        if (remainingTimeSec <= 0) {
            clearInterval(timer);
            return;
        }
        updateTimerText(--remainingTimeSec);
    }, 1000);
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

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
