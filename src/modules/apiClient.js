import axios from 'axios';

// export function getImages(search, page) {
//   const params = new URLSearchParams({
//     key: '34807421-5d72157add84c9708a89e40b8',
//     q: search,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//     page,
//     per_page: 40,
//   });

//   return fetch(`https://pixabay.com/api/?${params.toString()}`).then(
//     response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     }
//   );
// }

// export function getImages(search, page) {
//   const params = new URLSearchParams({
//     key: '34807421-5d72157add84c9708a89e40b8',
//     q: search,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//     page,
//     per_page: 40,
//   });

//   return axios.get(`https://pixabay.com/api/?${params.toString()}`);
// }

export async function getImages(search, page) {
  const params = new URLSearchParams({
    key: '34807421-5d72157add84c9708a89e40b8',
    q: search,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 40,
  });

  try {
    const response = await axios.get(
      `https://pixabay.com/api/?${params.toString()}`
    );

    console.log(response);

    return response;
  } catch (error) {
    console.log(error);
  }
}
