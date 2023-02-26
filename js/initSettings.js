let initState = {
    language: EN,
    photoSource: { source: GITHUB, tag: '' },
    visibleBlocks: [TIME, DATE, GREETING, QUOTE, WEATHER, AUDIO_PLAYER, TODOS],
  };
  
  const settingsBtn = document.querySelector('.settings-btn');
  const settingsUL = document.querySelector('.settings-list');
  
  /* ******************** */
  function toggleShowSettingsList() {
    settingsUL.classList.toggle('visible');
  }
  
  /* ******************** */
  settingsBtn.addEventListener('click', toggleShowSettingsList);