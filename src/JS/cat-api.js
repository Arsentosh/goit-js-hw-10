import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_pBq8QFvm4u2hboEfZvmFHIh1ViUDt30TWnRgJArFkumfFPowkaOpVm41r6rZT8GG';

export function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds').then(response => {
    if (response.status !== 200) {
      throw new Error(error);
    }
    return response.data;
  });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      if (response.status !== 200) {
        throw new Error(error);
      }
      return response.data;
    });
}
