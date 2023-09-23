import { fetchBreeds } from './JS/cat-api';
import { fetchCatByBreed } from './JS/cat-api';
import { Report } from 'notiflix/build/notiflix-report-aio';
import SlimSelect from 'slim-select';

const container = document.querySelector('.cat-info');
const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorLoad = document.querySelector('.error');

select.addEventListener('change', onChange);

loader.classList.remove('is-hidden');
errorLoad.classList.add('is-hidden');

fetchBreeds()
  .then(function (data) {
    const markUp = data
      .map(({ name, id }) => `<option value="${id}">${name}</option>`)
      .join('');
    select.insertAdjacentHTML('beforeend', markUp);
    new SlimSelect({
      select: '#selectElement',
    });
  })
  .catch(function (error) {
    errorLoad.classList.remove('is-hidden');
    Report.failure('Error!', 'Try reloading the page!');
  })
  .finally(() => loader.classList.add('is-hidden'));

function onChange(event) {
  let id = event.target.value;
  loader.classList.remove('is-hidden');

  fetchCatByBreed(id)
    .then(function (data) {
      let catName = data[0].breeds[0].name;
      let catImage = data[0].url;
      let catDescription = data[0].breeds[0].description;
      let catTemperament = data[0].breeds[0].temperament;

      container.innerHTML = `<img src="${catImage}" alt="${catName} width="600" height = "500">
    <div><h2 class="title">${catName}</h2>
    <p class="description">${catDescription}</p>
    <p class="temperament">TEMPERAMENT: ${catTemperament}</p></div>`;
    })
    .catch(function (error) {
      errorLoad.classList.remove('is-hidden');
      container.innerHTML = '';
      Report.failure('Error!', 'Try reloading the page!');
    })
    .finally(() => loader.classList.add('is-hidden'));
}
