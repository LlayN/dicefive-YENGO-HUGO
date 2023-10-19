const diceCanvas = document.getElementById("diceCanvas");
const oneButton = document.querySelector(".firstButton");
const diceDiv = document.querySelector(".dice");
const twoButton = document.querySelector(".secondButton");
const firstPlayer = document.querySelector(".divgameOne");
const secondPlayer = document.querySelector(".divgameTwo");
const newGame = document.querySelector(".buttonresetgameAbsolute");
const numDiceOne = document.querySelector("#numOne");
const numDiceTwo = document.querySelector("#numTwo");
const popUp = document.querySelector("aside");
const closepopUp = document.querySelector(".closePage");
const divAside = document.querySelector(".divAside");

let ctx;
if (diceCanvas.getContext) {
  ctx = diceCanvas.getContext("2d");
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(65, 65, 10, 0, Math.PI * 2);
  ctx.fill();
} else {
  console.log("Navigateur pas compatible.");
}

class Player {
  constructor(num, score, player) {
    this.num = num;
    this.score = score;
    this.player = player;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  rollDice() {
    oneButton.removeEventListener("click", () => {});
    diceDiv.addEventListener("animationend", () => {
      diceDiv.classList.remove("rotateDiceAnim");
    });
    ctx.clearRect(0, 0, 130, 130);
    while (true) {
      let value = this.getRandomInt(7);

      if (value === 0) {
        continue;
      } else {
        switch (value) {
          case 1:
            diceDiv.classList.add("rotateDiceAnim");
            ctx.beginPath();
            ctx.arc(65, 65, 10, 0, Math.PI * 2);
            ctx.fill();
            this.restorePoint();
            break;
          case 2:
            diceDiv.classList.add("rotateDiceAnim");
            ctx.beginPath();
            ctx.arc(35, 35, 10, 0, Math.PI * 2);
            ctx.arc(95, 95, 10, 0, Math.PI * 2);
            ctx.fill();
            this.addPoint(value);
            break;
          case 3:
            diceDiv.classList.add("rotateDiceAnim");
            ctx.beginPath();
            ctx.arc(30, 30, 10, 0, Math.PI * 2);
            ctx.arc(65, 65, 10, 0, Math.PI * 2);
            ctx.arc(100, 100, 10, 0, Math.PI * 2);
            ctx.fill();
            this.addPoint(value);
            break;
          case 4:
            diceDiv.classList.add("rotateDiceAnim");
            ctx.beginPath();
            ctx.arc(30, 30, 10, 0, Math.PI * 2);
            ctx.moveTo(100, 30);
            ctx.arc(100, 30, 10, 0, Math.PI * 2);
            ctx.moveTo(100, 100);
            ctx.arc(100, 100, 10, 0, Math.PI * 2);
            ctx.moveTo(30, 100);
            ctx.arc(30, 100, 10, 0, Math.PI * 2);
            ctx.fill();
            this.addPoint(value);
            break;
          case 5:
            diceDiv.classList.add("rotateDiceAnim");
            ctx.beginPath();
            ctx.arc(30, 30, 10, 0, Math.PI * 2);
            ctx.moveTo(100, 30);
            ctx.arc(100, 30, 10, 0, Math.PI * 2);
            ctx.moveTo(65, 65);
            ctx.arc(65, 65, 10, 0, Math.PI * 2);
            ctx.moveTo(100, 100);
            ctx.arc(100, 100, 10, 0, Math.PI * 2);
            ctx.moveTo(30, 100);
            ctx.arc(30, 100, 10, 0, Math.PI * 2);
            ctx.fill();
            this.addPoint(value);
            break;
          case 6:
            diceDiv.classList.add("rotateDiceAnim");
            ctx.beginPath();
            ctx.arc(35, 20, 10, 0, Math.PI * 2);
            ctx.moveTo(35, 65);
            ctx.arc(35, 65, 10, 0, Math.PI * 2);
            ctx.moveTo(35, 110);
            ctx.arc(35, 110, 10, 0, Math.PI * 2);
            ctx.moveTo(95, 20);
            ctx.arc(95, 20, 10, 0, Math.PI * 2);
            ctx.moveTo(95, 65);
            ctx.arc(95, 65, 10, 0, Math.PI * 2);
            ctx.moveTo(95, 110);
            ctx.arc(95, 110, 10, 0, Math.PI * 2);
            ctx.fill();
            this.addPoint(value);
            break;
        }
      }
      break;
    }
  }

  addPoint(v) {
    let chaine = this.num.innerHTML;
    let numb = parseInt(chaine);
    let score = numb + v;
    this.num.innerHTML = score;
  }

  addpointtoScore() {
    const numdiceChaine = this.num.innerHTML;
    const numdiceNumb = parseInt(numdiceChaine);
    const scorediceChaine = this.score.innerHTML;
    const scorediceNumb = parseInt(scorediceChaine);
    const total = numdiceNumb + scorediceNumb;
    this.score.innerHTML = total;
    this.num.innerHTML = "0";
    const scoretoInt = parseInt(this.score.innerHTML);
    if (scoretoInt >= "100") {
      this.finishGame();
      this.popUp();
    }
    if (oneButton.innerHTML === "LANCER LE DÉ") {
      this.changePlayer();
    }
  }

  restorePoint() {
    this.num.innerHTML = "0";
    this.changePlayer();
  }

  changePlayer() {
    if (
      firstPlayer.firstElementChild.firstElementChild.classList.contains(
        "active"
      )
    ) {
      firstPlayer.firstElementChild.firstElementChild.classList.remove(
        "active"
      );
      secondPlayer.firstElementChild.firstElementChild.classList.add("active");
    } else {
      secondPlayer.firstElementChild.firstElementChild.classList.remove(
        "active"
      );
      firstPlayer.firstElementChild.firstElementChild.classList.add("active");
    }
  }

  finishGame() {
    document.querySelectorAll(".numDice, .scoreDice").forEach((element) => {
      element.innerHTML = "0";
    });
    firstPlayer.firstElementChild.firstElementChild.classList.remove("active");
    secondPlayer.firstElementChild.firstElementChild.classList.remove("active");
    numDiceOne.style.display = "block";
    numDiceTwo.style.display = "block";
    oneButton.innerHTML = "NOUVELLE PARTIE";
    twoButton.innerHTML = "RÈGLES";
    newGame.style.display = "none";
  }

  popUp() {
    popUp.style.display = "flex";
    divAside.firstElementChild.innerText = `BRAVO ${this.player} TU AS GAGNÉ ! `;
  }
}

function play() {
  if (
    firstPlayer.firstElementChild.firstElementChild.classList.contains("active")
  ) {
    const play = new Player(
      firstPlayer.children[1],
      firstPlayer.children[3],
      firstPlayer.firstElementChild.innerText
    );
    play.rollDice();
  } else if (
    secondPlayer.firstElementChild.firstElementChild.classList.contains(
      "active"
    )
  ) {
    let play = new Player(
      secondPlayer.children[1],
      secondPlayer.children[3],
      secondPlayer.firstElementChild.innerText
    );
    play.rollDice();
  } else {
    firstPlayer.firstElementChild.firstElementChild.classList.add("active");
  }
}

console.log();

function mobileVersion() {
  if (
    firstPlayer.firstElementChild.firstElementChild.classList.contains("active")
  ) {
    numDiceTwo.style.display = "none";
    numDiceOne.style.display = "block";
  } else {
    numDiceOne.style.display = "none";
    numDiceTwo.style.display = "block";
  }
}

oneButton.addEventListener("click", () => {
  if (oneButton.innerHTML === "LANCER LE DÉ") {
    play();
  } else {
    oneButton.innerHTML = "LANCER LE DÉ";
    twoButton.innerHTML = "STOP";
    newGame.style.display = "flex";
    firstPlayer.firstElementChild.firstElementChild.classList.add("active");
  }
});

twoButton.addEventListener("click", () => {
  if (
    firstPlayer.firstElementChild.firstElementChild.classList.contains("active")
  ) {
    const play = new Player(
      firstPlayer.children[1],
      firstPlayer.children[3],
      firstPlayer.firstElementChild.innerText
    );
    play.addpointtoScore();
  } else if (
    secondPlayer.firstElementChild.firstElementChild.classList.contains(
      "active"
    )
  ) {
    let play = new Player(
      secondPlayer.children[1],
      secondPlayer.children[3],
      secondPlayer.firstElementChild.innerText
    );
    play.addpointtoScore();
  }
});

oneButton.addEventListener("click", () => {
  if (window.innerWidth <= 767 && oneButton.innerHTML == "LANCER LE DÉ") {
    mobileVersion();
  }
});

newGame.addEventListener("click", () => {
  const finish = new Player(firstPlayer.children[1], firstPlayer.children[3]);
  finish.finishGame();
});

popUp.addEventListener("click", () => {
  popUp.style.display = "none";
});
