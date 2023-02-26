import playList from '../data/playList.js';
import { currentSongIndex } from '../js/audioPlayer.js';

export async function translateQuote() {
  const data = await fetchQuotes();
  // console.log(data);

  const quote = quoteTextEl.textContent;
  const currentLang = initState.language;
  const prevLang = currentLang === EN ? RU : EN;

  const index = data.findIndex((item) => item.text[prevLang] === quote);

  if (index !== -1) {
    quoteTextEl.textContent = data[index].text[currentLang];
    quoteAuthorEl.textContent = data[index].author[currentLang];
  }
}

export function translateAudioPlayList() {
  const allPlayListLI = document.querySelectorAll('.play-item');
  allPlayListLI.forEach((li, index) => {
    li.textContent = playList[index].title[initState.language];
  });
}

export function translateCurrentSong() {
  document.querySelector('.current-song').textContent =
    playList[currentSongIndex].title[initState.language];
}

export function translateDefaultData() {
  const currentLang = initState.language;

  document.querySelector('.name').placeholder =
    defaultData.namePlaceholder[currentLang];

  cityInput.placeholder = defaultData.cityPlaceholder[currentLang];

  addTodoInput.placeholder = defaultData.todoPlaceholder[currentLang];

  document
    .querySelectorAll('.image-src-input')
    .forEach(
      (input) => (input.placeholder = defaultData.tagPlaceholder[currentLang]),
    );

  document.querySelector('.lang').firstChild.textContent =
    settingsTranslate.language[currentLang];

  document.querySelector('.image-src').firstChild.textContent =
    settingsTranslate.imageSrc[currentLang];

  document.querySelector('.show').firstChild.textContent =
    settingsTranslate.show[currentLang];

  document
    .querySelectorAll('.show-wrap')
    .forEach(
      (item, index) =>
        (item.firstChild.textContent =
          settingsTranslate.showItem[index][currentLang]),
    );
}