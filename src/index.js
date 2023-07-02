import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.6.min.css";
// import SlimSelect from 'slim-select';
import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';

const selectEl = document.querySelector('.breed-select');
const infoBox = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');


getNameCats();


selectEl.addEventListener("change", onSelectBreed);

function onSelectBreed() {
    infoBox.innerHTML = "";
    infoBox.style.display = "none";
    const breedID = selectEl.value;
    loader.style.display = "block";

    fetchCatByBreed(breedID).then(cats => {
        const catEl = cats.map(cat =>
            `<div class="cat-cont">
            <img class="image" src="${cat.url}" alt="cat">
            <div class="text-cont">
            <h1 class="breed-name">${cat.breeds[0].name}</h1>
            <p class="description">${cat.breeds[0].description}</p>
            <p class="temperament"><span class="bold-temperament">Temperament: </span> ${cat.breeds[0].temperament}</p>
            </div>
            </div>
            `).join("");
        infoBox.style.display = "block";
        if (catEl) {
            infoBox.innerHTML += catEl;
        } else {
            return Notiflix.Notify.failure(`Oops! Cant find the cat!`);
        };

    }).catch(() => { Notiflix.Notify.failure(`Oops! Something went wrong!`) })
        .finally(() => { loader.style.display = "none" });

}

function getNameCats() {
    selectEl.style.display = "none";
    loader.style.display = "block";

    fetchBreeds().then(datas => {
        const cat = datas.map(data =>
            `<option value="${data.id}">${data.name}</option>`).join("");
        selectEl.style.display = "block";
        selectEl.insertAdjacentHTML("afterbegin", cat);
    }).catch(() => { Notiflix.Notify.failure(`❌ Oops! Something went wrong! Try reloading the page!`) })
        .finally(() => { loader.style.display = "none" });
}





