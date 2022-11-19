let cat = document.getElementById("cat");
let head = document.getElementById("head");
let fish = document.getElementById("fish");
let food = document.getElementById("food");
let scoreSpan = document.getElementById("scoreSpan");
let startButton = document.getElementById("startButton");
let resultScore = document.getElementById("resultScore");
let resultDiv = document.getElementById("resultDiv");
let timeSpan = document.getElementById("timeSpan");
let centerDiv = document.getElementById("centerDiv");
let anleitung = document.getElementById("anleitung");
let left = 0;
let direction;
let interval;
let count = 0;
let speed = 80;
let jumpheight = 0;
let bottom = 0;
let lachsSpeed = 50;
let LEFT = false;
let RIGHT = false;
let UP = false;
let DOWN = false;
let open = false;
let eatMathLeft;
let eatMathBottom;
let score = 0;
let time = 30;
let gameInterval;
let foodLeft = Math.floor(Math.random() * (window.innerWidth - 250)) + 125;
let foodBottom = Math.floor(Math.random() * (window.innerHeight - 250)) + 125;
food.style.left = foodLeft + "px";
food.style.bottom = foodBottom + "px";


let keyDownFunction = (e) => {
    console.log(e.key);
    switch (e.key) {
        case "w": UP = true;
            eatMathLeft = +45;
            eatMathBottom = +250;
            break;
        case "a": LEFT = true;
            eatMathLeft = 0;
            eatMathBottom = -45;
            break;
        case "s": DOWN = true;
            eatMathLeft = +45;
            eatMathBottom = 0;
            break;
        case "d": RIGHT = true;
            eatMathLeft = +45;
            eatMathBottom = +250;
            break;
        case " ": cat.src = "./assets/img/lachs offen2.png";
            open = true;
    }

    walking();
    checkPosition();
};



let keyUpFunction = (e) => {
    // console.log(e.key);
    switch (e.key) {
        case "w": UP = false;
            break;
        case "a": LEFT = false;
            break;
        case "s": DOWN = false;
            break;
        case "d": RIGHT = false;
            break;
        case " ": cat.src = "./assets/img/lachs zu2.png";
            open = false;
    }


    walking();
};

function start() {
    score = 0;
    scoreSpan.innerHTML = score;
    anleitung.style.display = "none";
    startButton.style.display = "none";
    resultDiv.style.display = "none";
    document.body.addEventListener("keyup", keyUpFunction);
    document.body.addEventListener("keydown", keyDownFunction);
    time = 30;
    timeSpan.innerHTML = time;
    fish.style.opacity = "1";
    food.style.opacity = "1";
    centerDiv.style.backgroundColor = "transparent";
    gameInterval = setInterval(timer, 1000);
    console.log("start");

}

function timer() {
    time--;
    timeSpan.innerHTML = time;
    console.log(time);
    if (time <= 0) {
        document.body.removeEventListener("keydown", keyDownFunction);
        document.body.removeEventListener("keyup", keyDownFunction);
        console.log("ende");
        clearInterval(gameInterval);

        fish.style.opacity = "0";
        food.style.opacity = "0";
        resultDiv.style.display = "flex";
        resultScore.innerHTML = score;
        centerDiv.style.backgroundColor = "rgba(128, 128, 128, 0.479)";
        time = 0;
        setTimeout(() => {
            startButton.innerHTML = "Neues Spiel";
            startButton.style.display = "inline";

        }, 500);
    }
}


function walking() {

    if (RIGHT) {
        if (left + 310 >= window.innerWidth) {
            return;
        } else {
            left += lachsSpeed;
            fish.style.transform = "scaleX(11)";
            fish.style.transform = "rotate(180deg)";
        }
    } if (LEFT) {
        if (left <= 0) {
            return;
        } else {
            left -= lachsSpeed;
            fish.style.transform = "scaleX(1)";
        }
    } if (UP) {
        if (bottom + 50 >= window.innerHeight) {
            return;
        } else {
            bottom += lachsSpeed;
            fish.style.transform = "scaleX(1)";
            fish.style.transform = "rotate(90deg)";
        }
    } if (DOWN) {
        if (bottom <= 0) {
            return;
        } else {
            fish.style.transform = "scaleX(1)";
            fish.style.transform = "rotate(270deg)";
            bottom -= lachsSpeed;
        }
    }

    fish.style.left = left + "px";
    fish.style.bottom = bottom + "px";
}
function checkPosition() {
    if (open == true) {
        if (elementsOverlap(food, head)) {
            score++;
            foodLeft = Math.floor(Math.random() * (window.innerWidth - 250)) + 125;
            foodBottom = Math.floor(Math.random() * (window.innerHeight - 250)) + 125;
            // console.log("ESSEEN");
            scoreSpan.innerHTML = score;
        }
    }

    food.style.left = foodLeft + "px";
    food.style.bottom = foodBottom + "px";
}

function elementsOverlap(el1, el2) {
    const domRect1 = el1.getBoundingClientRect();
    const domRect2 = el2.getBoundingClientRect();

    return !(
        domRect1.top > domRect2.bottom ||
        domRect1.right < domRect2.left ||
        domRect1.bottom < domRect2.top ||
        domRect1.left > domRect2.right
    );
}