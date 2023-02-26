const body = document.querySelector('body');
/* ******************* */
function closeOpenPopup(event) {
  const path = event.path || (event.composedPath && event.composedPath());
  const target = event.target;

  if (path && !path.includes(todoWrap) && !todoBtn.contains(target)) {
    // если клик был не по todoWrap или не по todoBtn, то скрываем popup todo
    todoWrap.classList.remove('visible');
  }
  if (path && !path.includes(settingsUL) && !settingsBtn.contains(target)) {
    settingsUL.classList.remove('visible');
  }
  if (path && !path.includes(weatherEl) && !weatherBtn.contains(target)) {
    weatherEl.classList.remove('visible');
  }

  const musicBtn = document.querySelector('.music-btn');
  const playerEl = document.querySelector('.player');
  if (path && !path.includes(playerEl) && !musicBtn.contains(target)) {
    playerEl.classList.remove('visible');
  }
}

/* ******************* */
body.addEventListener('click', closeOpenPopup);