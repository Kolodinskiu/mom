import {
    translateQuote,
    translateAudioPlayList,
    translateCurrentSong,
    translateDefaultData,
  } from './translate.js';
  
  export const langInputs = document.querySelectorAll('input[name="lang"]');
  
  export const imageSourceInputs = document.querySelectorAll(
    'input[name="image-src"]',
  );
  const unsplashInput = document.querySelector('.unsplash');
  const flickrInput = document.querySelector('.flickr');
  
  export const blockInputs = document.querySelectorAll('input[type="checkbox"]');
  
  /* ******************** */
  
  export function setLang() {
    showData();
    translateQuote();
    translateAudioPlayList();
    translateCurrentSong();
    translateDefaultData();
    const value = cityInput.value;
    if (value === 'Minsk' || value === 'Минск') {
      cityInput.value = defaultData.defaultCity[initState.language];
    }
    getWeather();
  }
  
  function changeLang() {
    initState.language = this.value;
    setLang();
  }
  
  function changeBlocksVisibility(name) {
    switch (name) {
      case TIME:
        document.querySelector('.time').classList.toggle('invisible');
        break;
      case DATE:
        document.querySelector('.date').classList.toggle('invisible');
        break;
      case GREETING:
        document
          .querySelector('.greeting-container')
          .classList.toggle('invisible');
        break;
      case QUOTE:
        document.querySelector('.quote-wrap').classList.toggle('invisible');
        break;
      case WEATHER:
        document.querySelector('.weather').classList.toggle('invisible');
        weatherBtn.classList.toggle('invisible');
        break;
      case AUDIO_PLAYER:
        document.querySelector('.player').classList.toggle('invisible');
        document.querySelector('.music-btn').classList.toggle('invisible');
        break;
      case TODOS:
        document.querySelector('.todo').classList.toggle('invisible');
        break;
      default:
        console.log(`Sorry, no this input ${name}.`);
    }
  }
  
  function changeBlocksVisibilityAndInitState() {
    changeBlocksVisibility(this.name);
  
    initState.visibleBlocks = Array.from(blockInputs).reduce((array, input) => {
      if (input.checked) {
        array.push(input.name);
      }
      return array;
    }, []);
  }
  
  function changeTag() {
    initState.photoSource.tag = this.value;
    setBg();
  }
  
  function changeImageSource() {
    const source = this.value;
    initState.photoSource.source = source;
  
    const tagInput = document.querySelector(`.${source}`);
    if (tagInput) {
      initState.photoSource.tag = tagInput.value;
    }
    setBg();
  }
  
  /* ******************** */
  
  langInputs.forEach((input) => input.addEventListener('change', changeLang));
  imageSourceInputs.forEach((input) =>
    input.addEventListener('change', changeImageSource),
  );
  blockInputs.forEach((input) =>
    input.addEventListener('change', changeBlocksVisibilityAndInitState),
  );
  unsplashInput.addEventListener('change', changeTag);
  flickrInput.addEventListener('change', changeTag);
  