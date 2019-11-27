function fetchGiphs() {
  let url = `http://api.giphy.com/v1/gifs/search?&api_key=kkz9bHT772F1MVitwpOpVKXVyf3mumHS&limit=8&q=`
  const query = document.querySelector('.form__input').value.trim();
  url = url.concat(query);

  return fetch(url).
    then(response => response.json());
}

function onImgLoad(img) {
  return new Promise((resolve, reject) => {
    img.onload = resolve;
  });
}

async function showGiphs() {
  const giphs = await fetchGiphs();
  let container = document.querySelector('.container');

  container.innerHTML = '';

  let promises = [];

  giphs.data.forEach(gif => {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const caption = document.createElement('figcaption');
    const info = document.createElement('span');

    promises.push(onImgLoad(img));

    img.src = gif.images.original.url;
    img.alt = gif.title;
    caption.textContent = gif.title;
    info.textContent = 'ℹ︎';
    info.className = 'info';

    const sizeWrapper = document.createElement('div');
    const sizeSpan = document.createElement('span');
    const origin = document.createElement('a');

    const sizeA = gif.images.original.width;
    const sizeB = gif.images.original.height;
          
    sizeSpan.textContent = sizeA + 'x' + sizeB;
    origin.textContent = 'Original';
    origin.href = gif.images.original.webp;
    origin.target = '_blank';

    sizeWrapper.append(sizeSpan);
    sizeWrapper.append(origin);
    sizeWrapper.className = 'sizeWrapper';
      
    info.addEventListener('click', function() {      
      sizeWrapper.style.display = ((sizeWrapper.style.display === 'flex') ? 'none' : 'flex');
    })

    caption.append(info)
    figure.append(img);
    figure.append(caption);
    figure.append(sizeWrapper);
    container.insertAdjacentElement('afterBegin', figure);
  }); 

  await Promise.all(promises);
}

const loadBtn = document.querySelector('.form__btn');
loadBtn.addEventListener('click', (event) => {
  event.preventDefault();
  showGiphs();
})