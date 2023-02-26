const dateEl = document.querySelector('.date');

/* ************ */
function setDate(date) {
  const options = {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    year: 'numeric',
    timeZone: 'UTC', // В данном задании указывать таймзону нет необходимости, но в будущем возможно вам захочется создать приложение, отображающее время для разных точек планеты или сравнивающее время в разных странах.
  };

  const lang = initState.language === EN ? DATE_EN : DATE_RU;

  const currentDate = date.toLocaleDateString(lang, options);
  // console.log(currentDate); // "Wednesday, October 13, 2021"

  dateEl.textContent = currentDate;
}
