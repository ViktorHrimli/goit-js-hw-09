import Notiflix from 'notiflix';
// import
const refs = {
  form: document.querySelector('.form'),
};
let totalMS = null;

function getValueForm(event) {
  event.preventDefault();
  let position = 1;
  let { delay, step, amount } = event.currentTarget;

  let dalayNum = Number(delay.value);
  let stepNum = Number(step.value);
  let amountNum = Number(amount.value);

  setTimeout(() => {
    totalMS = dalayNum;
    alertPromise(position, dalayNum);
    const timerInt = setInterval(() => {
      totalMS += stepNum;

      if (position === amountNum - 1) {
        clearInterval(timerInt);
      }
      position += 1;
      alertPromise(position, totalMS);
    }, stepNum);
  }, dalayNum);
}

function alertPromise(position, delay) {
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
refs.form.addEventListener('submit', getValueForm);
