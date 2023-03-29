import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getImages } from './modules/apiClient';
import { renderGallery, clearGallery } from './modules/gallery';

const form = document.querySelector('#search-form');
const btn = document.querySelector('.load-more');
const lightbox = new SimpleLightbox('.gallery a');

let searchState = '';
let pageState = 1;
const limit = 40;
let totalPages = null;

form.addEventListener('submit', onFormSubmit);
btn.addEventListener('click', onLoadMoreBtnClick);

async function onFormSubmit(e) {
  e.preventDefault();

  const search = e.target.elements.searchQuery.value.trim();

  if (!search) {
    btn.classList.contains('visually-hidden') === false
      ? btn.classList.add('visually-hidden')
      : true;

    clearGallery();

    return;
  }

  if (search !== searchState) {
    searchState = search;
    pageState = 1;

    btn.classList.contains('visually-hidden') === false
      ? btn.classList.add('visually-hidden')
      : true;

    clearGallery();

    const response = await getImages(search, pageState);
    const { hits, totalHits } = response.data;

    if (hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);

    renderGallery(hits);

    lightbox.refresh();

    if (totalHits > 40) {
      btn.classList.remove('visually-hidden');
      totalPages = totalHits;
      pageState += 1;
    }
  }
}

async function onLoadMoreBtnClick() {
  const search = document.querySelector('#search-form > input').value.trim();

  const response = await getImages(search, pageState);

  renderGallery(response.data.hits);

  lightbox.refresh();

  pageState += 1;

  if (pageState > Math.ceil(totalPages / limit)) {
    btn.classList.add('visually-hidden');

    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
}
