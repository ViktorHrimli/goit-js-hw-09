import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

//  Refs
const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  button: document.querySelector('button[data-start]'),
  buttonStop: document.querySelector('button[data-stop]'),
  label: document.querySelectorAll('.field'),
  day: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};
// CONST
let TIMERS = null;
const DATE_NOW = new Date();
let setIntervalId;
refs.button.disabled = true;

flatpickr(refs.inputDate, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    TIMERS = selectedDates[0].getTime() - DATE_NOW.getTime();
    handleRangeDate(selectedDates);
    convertMs(TIMERS);
  },
});

//  Func

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));

  const hours = addLeadingZero(Math.floor((ms % day) / hour));

  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));

  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function onGetTimeTimer(days, hours, minutes, seconds) {
  refs.day.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

function handleRangeDate(e) {
  const funcTime = convertMs(TIMERS);
  const { days, hours, minutes, seconds } = funcTime;
  const timeInput = e[0].getTime();

  if (timeInput < DATE_NOW) {
    refs.button.disabled = true;
    refs.button.classList.remove('succsses-button');

    return Notiflix.Notify.failure('Please choose a date in the future');
  } else {
    refs.label.forEach(item => {
      item.style.color = 'green';
    });
    Notiflix.Notify.success('Correct date');
    btnEnable();
    btnDisable();
    onGetTimeTimer(days, hours, minutes, seconds);
  }
}

function onStart() {
  btnEnable();
  setIntervalId = setInterval(() => {
    TIMERS -= 1000;
    const funcTime = convertMs(TIMERS);
    const { days, hours, minutes, seconds } = funcTime;

    console.log(`${days}:${hours}:${minutes}:${seconds}`);
    onGetTimeTimer(days, hours, minutes, seconds);
  }, 1000);
}

function onStop() {
  clearInterval(setIntervalId);
  btnDisable();
}

function btnEnable() {
  refs.button.disabled = true;
  refs.buttonStop.disabled = false;
  refs.button.classList.remove('succsses-button');
  refs.buttonStop.classList.add('stop-button');
}

function btnDisable() {
  refs.button.disabled = false;
  refs.buttonStop.disabled = true;
  refs.button.classList.add('succsses-button');
  refs.buttonStop.classList.remove('stop-button');
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// listener
refs.button.addEventListener('click', onStart);
refs.buttonStop.addEventListener('click', onStop);
