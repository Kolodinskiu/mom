const slideNextBtn = document.querySelector('.slide-next');
const slidePrevBtn = document.querySelector('.slide-prev');
/* ***************** */
let randomNum;

function getRandomNumberOfImage() {
  randomNum = getRandomNum(MIN_NUMBER_OF_IMAGE, MAX_NUMBER_OF_IMAGE);
}

async function getLinkToImage(source, tag) {
  if (source === UNSPLASH) {
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tag}&client_id=${API_KEY_UNSPLASH}`;
    // orientation=landscape - фото вытянутое по горизонтали
    // query=${tag} - запрос, по которому ищем фото
    // client_id= - Access Key.
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.urls.regular);
    return data.urls.regular;
    // fetch(url)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data.urls.regular);
    //   });
  } else if (source === FLICKR) {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY_FLICKR}&tags=${tag}&extras=url_l&format=json&nojsoncallback=1`;
    //api_key= - API Key
    // tags=${tag} - запрос, по которым ищем фото
    // extras=url_h - возвращать только большие (large) фото.
    const res = await fetch(url);
    const data = await res.json();
    //  console.log(data.photos.photo[0].url_l);
    return data.photos.photo[randomNum].url_l;
    // fetch(url)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data.photos.photo[randomNum].url_l);
    //   });
  }
}

async function setBg() {
  // Чтобы избежать моментов, когда фоновое изображение ещё не загрузилось, но уже используется как фоновое, необходимо указывать его фоном страницы только после полной загрузки. Для этого через js создаём изображение, указываем его адрес, дожидаемся загрузки изображения для чего используем событие load и только потом указываем ссылку на изображение в качестве фона страницы.
  // После установки фонового изображения через js желательно отключить фоновое изображение в css-стилях, иначе при загрузке страницы сначала будет появляться фон, указанный в css, а сразу за ним фон, указанный через js.
  const date = new Date();
  let timeOfDay = getTimeOfDay(date);
  if (timeOfDay === DAY) {
    timeOfDay = AFTERNOON;
  }
  getRandomNumberOfImage();
  const bgNumString = randomNum
    .toString()
    .padStart(COUNT_OF_NUMBERS_IN_BG_NUM, '0');
  const img = new Image();

  const photoSource = initState.photoSource.source;
  const userTag = initState.photoSource.tag;
  const tag = userTag ? userTag : timeOfDay;

  if (photoSource === GITHUB) {
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${tag}/${bgNumString}.jpg`;
  } else {
    img.src = await getLinkToImage(photoSource, tag);
  }

  img.onload = () => {
    document.body.style.background = `url(${img.src}) center center / cover no-repeat
    rgba(0, 0, 0, 0.5)`;
  };
}

/* ***************** */
function getSlideNext() {
  if (randomNum === MAX_NUMBER_OF_IMAGE) {
    randomNum = MIN_NUMBER_OF_IMAGE;
  } else {
    randomNum++;
  }
  setBg();
}

function getSlidePrev() {
  if (randomNum === MIN_NUMBER_OF_IMAGE) {
    randomNum = MAX_NUMBER_OF_IMAGE;
  } else {
    randomNum++;
  }
  setBg();
}

/* ***************** */
setBg();

slideNextBtn.addEventListener('click', getSlideNext);
slidePrevBtn.addEventListener('click', getSlidePrev);
