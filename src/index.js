import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

let seachQuery = '';

const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));

function onInputCountry(event) {
  seachQuery = event.target.value.trim();

  let arrayOfCountry = fetchCountries(seachQuery)
    .then(res => console.log(res))
    .catch(error => console.log(error));

  console.log(typeof(arrayOfCountry));
}
//   if (result.length > 10) {
//     Notiflix.Notify.info(
//       'Too many matches found. Please enter a more specific name.'
//     );
//     return;
//   }

//   if (result.length >= 2 && seachQuery.length <= 10) {
//     fetchCountries(seachQuery)
//       .then(renderCountrisName)
//       .catch(error => console.log(error));
//   }

//   // if ((seachQuery.length = 1)) {
//   // }
// }

// function renderCountrisName(seachQuery) {
//   const markup = seachQuery
//     .map(({ name, flags }) => {
//       return `<li class = "country-item"><img class = "country-img" src="${flags.svg}" alt="${flags.alt}"><span>${name.common}</span></li>`;
//     })
//     .join('');
//   countryListEl.innerHTML = markup;
// }
