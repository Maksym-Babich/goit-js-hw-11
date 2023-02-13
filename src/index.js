import Notiflix from 'notiflix';
import { fetchImages } from './js/api';
const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('input'),
  submitBtn: document.querySelector('[type="submit"]'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
  gallery: document.querySelector('.gallery'),
};
let page = 1;
let querry = '';

const cardBuilder = function (image) {
  return `<div class="photo-card">
  <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <span>${image.likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b>
      <span>${image.views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b>
      <span>${image.comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <span>${image.downloads}</span>
    </p>
  </div>
</div>`;
};

const renderImages = function (images) {
  const markup = images.map(cardBuilder).join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
};

const onformSubmit = async function (event) {
  event.preventDefault();
  refs.gallery.innerHTML = '';
  page = 1;
  querry = refs.input.value.trim();
  if (!refs.loadMoreBtn.classList.contains('hidden')) {
    refs.loadMoreBtn.classList.toggle('hidden');
  }
  const imagesList = await fetchImages(querry, page);
  if (imagesList.length === 0 || querry === '') {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  renderImages(imagesList);
  if (imagesList.length < 40) {
    Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
    return;
  }
  if (refs.loadMoreBtn.classList.contains('hidden')) {
    refs.loadMoreBtn.classList.toggle('hidden');
  }
};

const onLoadMoreBtnClick = async function () {
  refs.loadMoreBtn.classList.toggle('hidden');
  page += 1;
  const imagesList = await fetchImages(querry, page);
  renderImages(imagesList);
  if (imagesList.length < 40) {
    Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
    return;
  }
  refs.loadMoreBtn.classList.toggle('hidden');
};

refs.form.addEventListener('submit', onformSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
// fetchImages('sdfsdf123231', 1).then(renderImages);
