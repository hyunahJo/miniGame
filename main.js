"use strict";

const cat_size = 80;
const cat_count = 5;
const dog_count = 5;

const control = document.querySelector(".game__control");
const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();
const popUp = document.querySelector(".game__pop-up");
const popUp_control = document.querySelector(".game__control");
const popUpText = document.querySelector(".pop-up_text");

control.addEventListener("click", () => {
    startGame();
});

function startGame() {
    initGame();
    hidePopUp();
    gameTimer();
}

function initGame() {
    field.innerHTML = "";
    addItem("cat", cat_count, "img/GettyImages-a10504517.png");
    addItem("dog", dog_count, "img/GettyImages-a10504518.png");
}

function hidePopUp() {
    popUp.style.visibility = "hidden";
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
