import './css/styles.css';
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
const totalPages = Math.ceil(500 / limit);

form.addEventListener('submit', onFormSubmit);
btn.addEventListener('click', onLoadMoreBtnClick);

// function onFormSubmit(e) {
//   e.preventDefault();

//   const search = e.target.elements.searchQuery.value.trim();

//   if (!search) {
//     clearGallery();
//     return;
//   }

//   if (search !== searchState) {
//     searchState = search;
//     pageState = 1;

//     if (!btn.classList.contains('visually-hidden')) {
//       btn.classList.add('visually-hidden');
//     }

//     clearGallery();

//     getImages(search, pageState)
//       .then(response => {
//         if (response.hits.length === 0) {
//           Notiflix.Notify.failure(
//             'Sorry, there are no images matching your search query. Please try again.'
//           );
//           return;
//         }

//         Notiflix.Notify.success(
//           `Hooray! We found ${response.totalHits} images.`
//         );

//         renderGallery(response.hits);
//         lightbox.refresh();

//         if (response.totalHits > 40) {
//           btn.classList.remove('visually-hidden');
//         }

//         pageState += 1;
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }
// }

async function onFormSubmit(e) {
  e.preventDefault();

  const search = e.target.elements.searchQuery.value.trim();

  if (!search) {
    clearGallery();
    return;
  }

  if (search !== searchState) {
    searchState = search;
    pageState = 1;

    if (!btn.classList.contains('visually-hidden')) {
      btn.classList.add('visually-hidden');
    }

    clearGallery();

    try {
      const response = await getImages(search, pageState);

      if (response.data.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      Notiflix.Notify.success(
        `Hooray! We found ${response.data.totalHits} images.`
      );

      if (response.data.totalHits > 40) {
        btn.classList.remove('visually-hidden');
      }

      renderGallery(response.data.hits);

      lightbox.refresh();

      pageState += 1;
    } catch (error) {
      console.log(error);
    }
  }
}

// function onLoadMoreBtnClick() {
//   const search = document.querySelector('#search-form > input').value.trim();

//   if (pageState > totalPages) {
//     btn.classList.add('visually-hidden');

//     Notiflix.Notify.info(
//       "We're sorry, but you've reached the end of search results."
//     );
//   }

//   getImages(search, pageState)
//     .then(response => {
//       renderGallery(response.hits);
//       lightbox.refresh();

//       pageState += 1;
//     })
//     .catch(error => console.log(error));
// }

async function onLoadMoreBtnClick() {
  const search = document.querySelector('#search-form > input').value.trim();

  if (pageState > totalPages) {
    btn.classList.add('visually-hidden');

    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }

  try {
    const response = await getImages(search, pageState);
    renderGallery(response.data.hits);

    lightbox.refresh();

    pageState += 1;
  } catch (error) {
    console.log(error);
  }
}
