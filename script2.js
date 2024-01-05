"use script";
// Selecting elements

// players = [0, 1, 2];

// function setPlayerInformation(playerNumber) {
//   const playerEL = document.querySelector(`.player--${playerNumber}`);
//   const scoreEL = document.querySelector(`#score--${playerNumber}`);
//   const current0EL = document.getElementById("current--0");
//   const information = {
//     player: playerEL,
//     score: scoreEL,
//   };
//   return information;
// }

// let playerInformation = {};
// for (i = 0; i < players.length; i++) {
//   const playerDetails = setPlayerInformation(i);
//   //   console.log(playerDetails);
//   playerInformation[i] = setPlayerInformation(i);
// }

// console.log(playerInformation);

const player0EL = document.querySelector(".player--0");
const player1EL = document.querySelector(".player--1");
const player2EL = document.querySelector(".player--2");
const score0EL = document.querySelector("#score--0");
const score1EL = document.getElementById("score--1");
const score2EL = document.getElementById("score--2");
const current0EL = document.getElementById("current--0");
const current1EL = document.getElementById("current--1");
const current2EL = document.getElementById("current--2");
const dice1EL = document.querySelector(".dice1");
const dice2EL = document.querySelector(".dice2");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;
const init = function () {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0, 0];
  playing = true;
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  score2EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;
  current2EL.textContent = 0;
  dice1EL.classList.add("hidden");
  dice2EL.classList.add("hidden");
  player1EL.classList.remove("player--winner");
  player0EL.classList.remove("player--winner");
  player2EL.classList.remove("player--winner");
  player0EL.classList.add("player--active");
  player2EL.classList.remove("player--active");
  player1EL.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  if (activePlayer === 0) {
    player0EL.classList.remove("player--active");
    player1EL.classList.add("player--active");
    activePlayer = 1;
  } else if (activePlayer === 1) {
    player1EL.classList.remove("player--active");
    player2EL.classList.add("player--active");
    activePlayer = 2;
  } else if (activePlayer === 2) {
    player2EL.classList.remove("player--active");
    player0EL.classList.add("player--active");
    activePlayer = 0;
  }
};

btnRoll.addEventListener("click", function () {
  if (playing) {
    dice1EL.classList.remove("hidden");
    dice2EL.classList.remove("hidden");
    const dice1 = Math.trunc(Math.random() * 6) + 1;
    dice1EL.src = `dice-${dice1}.png`;
    const dice2 = Math.trunc(Math.random() * 6) + 1;
    dice2EL.src = `dice-${dice2}.png`;
    currentScore += dice1 + dice2;

    if (dice1 !== 1 && dice2 !== 1) {
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      dice1EL.classList.add("hidden");
      dice2EL.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});
btnNew.addEventListener("click", init);
