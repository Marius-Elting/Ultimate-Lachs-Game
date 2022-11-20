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
let modeChoose = document.getElementById("mode");
let openSpan = document.getElementById("openSpan");
let left = 50;
let Top = 50;
let direction;
let interval;
let count = 0;
let speed = 80;
let jumpheight = 0;
let lachsSpeed = 50;
let LEFT = false;
let RIGHT = false;
let UP = false;
let DOWN = false;
let open = false;
let eatMathLeft;
let eatMathtop;
let score = 0;
let time = 30;
let gameInterval;
let oldX = 0;
let oldY = 0;
let openCount = 1;
let foodCountdown = 0;
let countPlus;
let countMinus;
let abc;
let countMinusInterval;
let foodLeft = Math.floor(Math.random() * (window.innerWidth - 250)) + 125;
let foodtop = Math.floor(Math.random() * (window.innerHeight - 250)) + 125;
food.style.left = foodLeft + "px";
food.style.top = foodtop + "px";


let keyDownFunction = (e) => {
    if (e.key == "w" || e.key == "ArrowUp") {
        UP = true;
        eatMathLeft = +45;
        eatMathtop = +250;
    }
    if (e.key == "a" || e.key == "ArrowLeft") {
        LEFT = true;
        eatMathLeft = 0;
        eatMathtop = -45;
    }
    if (e.key == "s" || e.key == "ArrowDown") {
        DOWN = true;
        eatMathLeft = +45;
        eatMathtop = 0;
    }
    if (e.key == "d" || e.key == "ArrowRight") {
        RIGHT = true;
        eatMathLeft = +45;
        eatMathtop = +250;
    }


    walking();
    checkPosition();
};

let spaceDownFunction = (e) => {
    if (openCount > 0) {
        switch (e.key) {
            case " ": cat.src = "./assets/img/lachs offen2.png";
                open = true;
                if (abc >= 1) {
                    return;
                } else {
                    abc = 1;
                    countMinusInterval = setInterval(countMinusFunction, 1000);
                    setTimeout(() => {
                        abc = 0;
                    }, openCount * 1000);
                }
        }
    }

};

let countMinusFunction = () => {
    abc = 1;
    openCount--;
    openSpan.innerHTML = openCount;
    if (openCount <= 0) {
        open = false;
        cat.src = "./assets/img/lachs zu2.png";

        clearInterval(countMinusInterval);
    }

};

let spaceUpFunction = (e) => {
    switch (e.key) {
        case " ": cat.src = "./assets/img/lachs zu2.png";
            open = false;
            clearInterval(countMinusInterval);

    }

};

let keyUpFunction = (e) => {

    if (e.key == "w" || e.key == "ArrowUp") {
        UP = false;
    }
    if (e.key == "a" || e.key == "ArrowLeft") {
        LEFT = false;
    }
    if (e.key == "s" || e.key == "ArrowDown") {
        DOWN = false;
    }
    if (e.key == "d" || e.key == "ArrowRight") {
        RIGHT = false;
    }


    walking();
};

let mouseMoveFunction = (e) => {
    checkPosition();

    let mouseX = e.clientX;
    let mouseY = e.clientY;
    left = mouseX;
    Top = mouseY - 45;
    fish.style.left = left + "px";
    fish.style.top = Top + "px";

    let radian = Math.atan2(e.pageX - oldX, e.pageY - oldY);
    let rot = (radian * (180 / Math.PI) * -1) + 270;


    fish.style.transform = "scaleX(1) rotate(" + rot + "deg)";
    // fish.style.backgroundColor = "pink";
    setTimeout(() => {
        oldY = mouseY;
        oldX = mouseX;
    }, 100);
};



// let boxBoundingRect = fish.getBoundingClientRect();

// let boxCenter = {
//     x: boxBoundingRect.left + boxBoundingRect.width / 2,
//     y: boxBoundingRect.top + boxBoundingRect.height / 2
// };

// document.addEventListener("mousemove", e => {
//     let angle = Math.atan2(e.pageX - boxCenter.x, - (e.pageY - boxCenter.y)) * (180 / Math.PI);
//     fish.style.transform = `rotate(${angle}deg)`;
// });


function start() {
    score = 0;
    scoreSpan.innerHTML = score;
    anleitung.style.display = "none";
    startButton.style.display = "none";
    resultDiv.style.display = "none";
    modeChoose.style.display = "none";

    if (document.getElementById("mouseMode").checked) {
        document.body.addEventListener("mousemove", mouseMoveFunction);
        document.body.addEventListener("keyup", spaceUpFunction);
        document.body.addEventListener("keydown", spaceDownFunction);
    } else if (document.getElementById("keyboardMode").checked) {
        document.body.addEventListener("keyup", keyUpFunction);
        document.body.addEventListener("keydown", keyDownFunction);
        document.body.addEventListener("keyup", spaceUpFunction);
        document.body.addEventListener("keydown", spaceDownFunction);
        fish.style.transition = "0.3s linear";
    }


    time = 30;
    timeSpan.innerHTML = time;
    fish.style.opacity = "1";
    food.style.opacity = "1";
    centerDiv.style.backgroundColor = "transparent";
    gameInterval = setInterval(timer, 1000);

    countPlus = setInterval(() => {
        if (open == false) {
            openCount++;
            openSpan.innerHTML = openCount;

        }
    }, 2000);

}

function timer() {
    time--;
    timeSpan.innerHTML = time;
    if (time <= 0) {
        openCount = 1;
        fish.style.transition = "none";
        document.body.removeEventListener("keydown", keyDownFunction);
        document.body.removeEventListener("keyup", keyDownFunction);
        document.body.removeEventListener("mousemove", mouseMoveFunction);
        document.body.removeEventListener("keyup", spaceUpFunction);
        document.body.removeEventListener("keydown", spaceDownFunction);
        clearInterval(gameInterval);
        clearInterval(countPlus);
        fish.style.opacity = "0";
        food.style.opacity = "0";
        resultDiv.style.display = "flex";
        resultScore.innerHTML = score;
        centerDiv.style.backgroundColor = "rgba(128, 128, 128, 0.479)";
        time = 0;
        setTimeout(() => {
            startButton.innerHTML = "Neues Spiel";
            startButton.style.display = "inline";
            modeChoose.style.display = "inline";

        }, 500);
    }
}


function walking() {
    if (RIGHT) {
        if (left >= window.innerWidth) {
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
    } if (DOWN) {
        if (Top >= window.innerHeight) {
            return;
        } else {
            Top += lachsSpeed;
            fish.style.transform = "scaleX(1)";
            fish.style.transform = "rotate(270deg)";
        }
    } if (UP) {
        console.log(Top);
        if (Top <= 0) {
            return;
        } else {
            fish.style.transform = "scaleX(1)";
            fish.style.transform = "rotate(90deg)";
            Top -= lachsSpeed;
        }
    }

    fish.style.left = left + "px";
    fish.style.top = Top + "px";
}
function checkPosition() {
    if (open == true) {
        if (elementsOverlap(food, head) && foodCountdown == 0) {
            foodCountdown = 1;
            score++;
            foodLeft = Math.floor(Math.random() * (window.innerWidth - 250)) + 125;
            foodtop = Math.floor(Math.random() * (window.innerHeight - 250)) + 125;
            scoreSpan.innerHTML = score;
            setTimeout(() => {
                foodCountdown = 0;

            }, 500);
        }
    }

    food.style.left = foodLeft + "px";
    food.style.top = foodtop + "px";
}
// console.log(elementsOverlap(food, head));
function elementsOverlap(el1, el2) {
    const domRect1 = el1.getBoundingClientRect();
    const domRect2 = el2.getBoundingClientRect();

    return !(
        domRect1.top > domRect2.bottom ||
        domRect1.right < domRect2.left ||
        domRect1.bottom < domRect2.top ||
        domRect1.left > domRect2.right
    );
};