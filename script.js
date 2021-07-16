'use strict';
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.getElementById('score--0');
const score1EL = document.getElementById('score--1');
const diceEL = document.querySelector('.cube');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');

let currentClass = '';
let currentScore, activePlayer, score, playing;
//Initial conditions
const init = () => {
  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];
  playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;
  diceEL.classList.add('hidden');
  player0EL.classList.remove(`player--winner`);
  player1EL.classList.remove(`player--winner`);

  player0EL.classList.add(`player--active`); // player 1 gets activated
  player1EL.classList.remove(`player--winner`);
};
init();

//Rolling dice functions
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

btnRoll.addEventListener('click', () => {
  //1.Generating random dice rollig
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2.Display dice
    diceEL.classList.remove('hidden');
    const showClass = 'show-' + dice;
    console.log(showClass);
    if (currentClass) {
      diceEL.classList.remove(currentClass);
    }
    diceEL.classList.add(showClass);
    currentClass = showClass;
    //diceEL.src = `dice-${dice}.png`;
    //3.Check if dice is 1;the swtich to next player otherwise add the score

    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  //1.Add current score to active player
  if (playing) {
    score[activePlayer] += currentScore;
    // console.log(score);
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    //2.Check if player reaches 100
    if (score[activePlayer] >= 20) {
      //finish the game
      playing = false;

      diceEL.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //3.
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
