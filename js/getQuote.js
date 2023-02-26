const changeQuoteBtn = document.querySelector('.change-quote');
const quoteTextEl = document.querySelector('.quote');
const quoteAuthorEl = document.querySelector('.author');

/* ***************** */
async function fetchQuotes() {
  // Данные от JSON-файла получаем асинхронно.
  const quotesUrl = 'data/quotes.json';
  const res = await fetch(quotesUrl);
  const data = await res.json();
  // console.log(data);

  return data;
}

async function getQuote() {
  const data = await fetchQuotes();
  // console.log(data);

  const quote = quoteTextEl.textContent;

  let randomQuote;

  do {
    const randomQuoteIndex = getRandomNum(0, data.length - 1);

    randomQuote = data[randomQuoteIndex];
  } while (quote === randomQuote.text.en || quote === randomQuote.text.en);

  quoteTextEl.textContent = randomQuote.text[initState.language];
  quoteAuthorEl.textContent = randomQuote.author[initState.language];
}

/* ***************** */
getQuote();

changeQuoteBtn.addEventListener('click', getQuote);