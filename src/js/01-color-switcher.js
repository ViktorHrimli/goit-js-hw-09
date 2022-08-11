// Refs
const refs = {
  buttonsStart: document.querySelector('button[data-start]'),
  buttonsStop: document.querySelector('button[data-stop]'),
};

let runTime = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function handleClickStart() {
  onDisabled();
  refs.buttonsStop.style.backgroundColor = 'red';

  setTimeout(() => {
    document.body.style.background = getRandomHexColor();
    runTime = setInterval(() => {
      document.body.style.background = getRandomHexColor();
    }, 1000);
  }, 0);
}

function handleStopTime() {
  offDisabled();

  clearInterval(runTime);
}

function offDisabled() {
  refs.buttonsStart.disabled = false;
  refs.buttonsStart.style.backgroundColor = 'green';
  refs.buttonsStop.style.backgroundColor = 'grey';
}

function onDisabled() {
  refs.buttonsStart.disabled = true;
  refs.buttonsStart.style.backgroundColor = 'grey';
}

// Listeners
refs.buttonsStart.addEventListener('click', handleClickStart);
refs.buttonsStop.addEventListener('click', handleStopTime);
