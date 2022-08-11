import Notiflix from 'notiflix';
// import

// Refs
const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};
// CONSTANTS
let DELAY = null;
let STEP = null;
let AMOUNT = null;
let position = 1;
let timerMS = null;
let timerInt = null;

// func
const getValueForm = event => {
  event.preventDefault();
  clearInterval(timerInt);
  position = 1;
  timerMS = DELAY;

  setTimeout(() => {
    rep(position, timerMS);
    timerInt = setInterval(() => {
      timerMS += STEP;

      if (position === AMOUNT - 1) {
        clearInterval(timerInt);
      }

      position += 1;
      rep(position, timerMS);
    }, STEP);
  }, DELAY);
};

const delayInput = e => {
  DELAY = 0;
  DELAY = Number(e.target.value);
};
const stepInput = e => {
  STEP = 0;
  STEP = Number(e.target.value);
};
const amountInput = e => {
  AMOUNT = 0;
  AMOUNT = Number(e.target.value);
};

function rep(position, delay) {
  createPromise(position, delay)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}

// promis
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}

// listener
refs.delay.addEventListener('change', delayInput);
refs.step.addEventListener('change', stepInput);
refs.amount.addEventListener('change', amountInput);
refs.form.addEventListener('submit', getValueForm);
