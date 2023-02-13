const axios = require('axios').default;
const BASE_URL = 'https://pixabay.com/api/';
const KEY = '33604820-2b95686eb9e2401382a4857df';
const BASE_PARAMS =
  'image_type=photo&orientation=horizontal&safesearch=true&per_page=40';

export const fetchImages = async function (querry, page) {
  const response = await axios.get(
    `${BASE_URL}?key=${KEY}&q=${querry}&${BASE_PARAMS}&page=${page}`
  );
  const images = response.data.hits;
  console.log(response);
  return images;
};
