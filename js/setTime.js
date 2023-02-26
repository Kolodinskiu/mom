const timeEl = document.querySelector('.time');

/* ************ */
function setTime(date) {
  const currentTime = date.toLocaleTimeString(); // Чтобы из строки с датой и временем получить только время, удобно использовать метод toLocaleTimeString()
  // console.log(currentTime); // "21:18:57"

  timeEl.textContent = currentTime;
}