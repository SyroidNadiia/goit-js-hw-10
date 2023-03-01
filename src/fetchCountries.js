export { fetchCountries };

const BASE_URL = 'https://restcountries.com/v3.1';
const params = 'fields=name,capital,population,flags,languages';


function fetchCountries(name) {
  return fetch(
    `${BASE_URL}/name/${name}?${params}`
  )
    .then(response => response.json());
}
