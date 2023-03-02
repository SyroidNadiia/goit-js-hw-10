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

  if (!seachQuery) {
    onClearData();
    return;
  }

  fetchCountries(seachQuery)
    .then(res => {
      if (res.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      if (res.length >= 2 && seachQuery.length <= 10) {
        renderCountrisName(res, 20);
      }
      if (res.length === 1) {
        renderCountrisName(res, 34);
        renderCountryInfo(res);
      }
    })
    .catch(error => console.log(error));
}

function renderCountrisName(seachQuery, fontSize) {
  onClearData();
  const markup = seachQuery
    .map(({ name, flags }) => {
      return `<li class = "country-item"><img class = "country-img" src="${flags.svg}" alt="${flags.alt}"><span style="font-size: ${fontSize}px">${name.common}</span></li>`;
    })
    .join('');
  countryListEl.innerHTML = markup;
}

function renderCountryInfo(country) {
  const markupCountry = country
    .map(({ capital, population, languages }) => {
      return `<p><b>Capital:</b> ${capital}</p>
      <p><b>Population</b>: ${population}</p>
      <ul class="list-languages"><b>Languages:</b> 
      <li>${Object.values(languages).join(', ')}</li>
      </ul>`;
    })
    .join('');
  countryInfoEl.innerHTML = markupCountry;
}

function onClearData() {
  countryListEl.innerHTML = '';
  countryInfoEl.innerHTML = '';
}
