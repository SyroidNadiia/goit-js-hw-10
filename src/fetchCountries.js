export { fetchCountries };
import Notiflix from 'notiflix';

const BASE_URL = 'https://restcountries.com/v3.1';
const params = 'fields=name,capital,population,flags,languages';

function fetchCountries(name) {
  return fetch(`${BASE_URL}/name/${name}?${params}`).then(response => {
    if (!response.ok) {
      throw new Error(
        Notiflix.Notify.failure('Oops, there is no country with that name')
      );
    }
    return response.json();
  });
}
