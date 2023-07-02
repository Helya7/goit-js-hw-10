import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.6.min.css";
import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';

const selectEl = document.querySelector('.breed-select');
const infoBox = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

getNameCats();

selectEl.addEventListener("change", onSelectBreed);

async function onSelectBreed() {
  infoBox.innerHTML = "";
  infoBox.style.display = "none";
  const breedID = selectEl.value;
  loader.style.display = "block";

  try {
    const cats = await fetchCatByBreed(breedID);
    const catElements = cats.map(cat => createCatElement(cat)).join("");
    infoBox.style.display = "block";
    if (catElements) {
      infoBox.innerHTML += catElements;
    } else {
      Notiflix.Notify.failure(`Oops! Can't find the cat!`);
    }
  } catch {
    Notiflix.Notify.failure(`Oops! Something went wrong!`);
  } finally {
    loader.style.display = "none";
  }
}

function createCatElement(cat) {
  return `
    <div class="cat-cont">
      <img class="image" src="${cat.url}" alt="cat">
      <div class="text-cont">
        <h1 class="breed-name">${cat.breeds[0].name}</h1>
        <p class="description">${cat.breeds[0].description}</p>
        <p class="temperament">
          <span class="bold-temperament">Temperament: </span>
          ${cat.breeds[0].temperament}
        </p>
      </div>
    </div>
  `;
}

async function getNameCats() {
  selectEl.style.display = "none";
  loader.style.display = "block";

  try {
    const datas = await fetchBreeds();
    const catOptions = datas.map(data => createCatOption(data)).join("");
    selectEl.style.display = "block";
    selectEl.insertAdjacentHTML("afterbegin", catOptions);
  } catch {
    Notiflix.Notify.failure(`❌ Oops! Something went wrong! Try reloading the page!`);
  } finally {
    loader.style.display = "none";
  }
}

function createCatOption(data) {
  return `<option value="${data.id}">${data.name}</option>`;
}





