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

  fetchCountries(seachQuery)
    .then(res => {
      console.log(res);
      if (res.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      if (res.length >= 2 && seachQuery.length <= 10) {
        renderCountrisName(res);
      }
      if (res.length === 1) {
        renderCountrisName(res);
        renderCountryInfo(res);
      }
    })
    .catch(error => console.log(error));
}

function renderCountrisName(seachQuery) {
  const markup = seachQuery
    .map(({ name, flags }) => {
      return `<li class = "country-item"><img class = "country-img" src="${flags.svg}" alt="${flags.alt}"><span>${name.common}</span></li>`;
    })
    .join('');
  countryListEl.innerHTML = markup;
}

function renderCountryInfo(country) {
  const markupCountry = country
    .map(({ capital, population, languages }) => {
      
      return `<p>Capital: ${capital}</p>
      <p>Population: ${population}</p>
      <ul class="list-languages">
      {{#each languages}}
      <li>{{language}}</li>
      {{/each}}
      </ul>`
    })
    .join('');
  countryInfoEl.innerHTML = markupCountry;
}
