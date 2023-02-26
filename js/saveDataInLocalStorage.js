import { updateProgressAndAudioVolume } from './audioPlayer.js';
import {
  blockInputs,
  langInputs,
  setLang,
  imageSourceInputs,
} from './changeSettings.js';

const usernameInput = document.querySelector('.name');

/* ************* */
function setElementVisibility(element, visible) {
  visible
    ? element.classList.remove('invisible')
    : element.classList.add('invisible');
}

function setBlocksVisibility(name, visible) {
  switch (name) {
    case TIME:
      setElementVisibility(document.querySelector('.time'), visible);
      break;
    case DATE:
      setElementVisibility(document.querySelector('.date'), visible);
      break;
    case GREETING:
      setElementVisibility(
        document.querySelector('.greeting-container'),
        visible,
      );
      break;
    case QUOTE:
      setElementVisibility(document.querySelector('.quote-wrap'), visible);
      break;
    case WEATHER:
      setElementVisibility(document.querySelector('.weather'), visible);

      setElementVisibility(weatherBtn, visible);
      break;
    case AUDIO_PLAYER:
      setElementVisibility(document.querySelector('.player'), visible);

      setElementVisibility(document.querySelector('.music-btn'), visible);
      break;
    case TODOS:
      setElementVisibility(document.querySelector('.todo'), visible);
      break;
    default:
      console.log(`Sorry, no this input ${name}.`);
  }
}

/* ************* */
function setDataToLocalStorage() {
  localStorage.setItem('name', usernameInput.value);

  const city = cityInput.value
    ? cityInput.value
    : defaultData.defaultCity[initState.language];
  localStorage.setItem('city', city);

  const todosElements = document.querySelectorAll('.todo-item');
  const todos = Array.from(todosElements).map((el) => ({
    value: el.textContent,
    isChecked: el.classList.contains('checked'),
  }));
  localStorage.setItem('todos', JSON.stringify(todos));

  localStorage.setItem(
    'volume',
    document.querySelector('.progress-volume').value,
  );

  localStorage.setItem('settings', JSON.stringify(initState));
}

function getDataFromLocalStorage() {
  if (localStorage.getItem('name')) {
    usernameInput.value = localStorage.getItem('name');
  }

  if (localStorage.getItem('city')) {
    cityInput.value = localStorage.getItem('city');
    getWeather();
  }

  if (localStorage.getItem('todos')) {
    const todos = JSON.parse(localStorage.getItem('todos'));
    todos.forEach((todo) => createLI(todo.value, todo.isChecked));
  }

  if (localStorage.getItem('volume')) {
    document.querySelector('.progress-volume').value =
      localStorage.getItem('volume');
    updateProgressAndAudioVolume();
  }

  if (localStorage.getItem('settings')) {
    const settings = JSON.parse(localStorage.getItem('settings'));
    initState = settings;

    // cityInput.value = localStorage.getItem('city');
    // getWeather();

    langInputs.forEach((input) => {
      input.checked = false;
      const value = input.value;
      if (value === initState.language) {
        input.checked = 'checked';
        setLang();
      }
    });

    imageSourceInputs.forEach((input) => {
      input.checked = false;
      const value = input.value;
      const source = initState.photoSource.source;
      if (value === source) {
        input.checked = 'checked';
        const tagInput = document.querySelector(`.${source}`);
        if (tagInput) {
          tagInput.value = initState.photoSource.tag;
        }
        setBg();
      }
    });

    blockInputs.forEach((input) => {
      input.checked = false;
      const name = input.name;
      if (initState.visibleBlocks.includes(name)) {
        input.checked = 'checked';
        setBlocksVisibility(name, true);
      } else {
        setBlocksVisibility(name, false);
      }
    });
  }
}

/* ************* */
window.addEventListener('beforeunload', setDataToLocalStorage); // перед перезагрузкой или закрытием страницы (событие beforeunload) данные нужно сохранить

window.addEventListener('load', getDataFromLocalStorage);