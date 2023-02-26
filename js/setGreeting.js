const greetingEl = document.querySelector('.greeting');

/* ***************** */
function getTimeOfDay(date) {
  const hours = date.getHours();
  //   console.log(hours); // 18
  if (hours >= 6 && hours < 12) {
    return MORNING;
  }
  if (hours >= 12 && hours < 18) {
    return DAY;
  }
  if (hours >= 18 && hours < 24) {
    return EVENING;
  }
  return NIGHT;
}

function setGreeting(date) {
  const timeOfDay = getTimeOfDay(date);
  greetingEl.textContent = `${
    greetingTranslate[timeOfDay][initState.language]
  },`;
}