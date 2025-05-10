

const API_KEY = "124471754942997e76b157aefcfb80c2";
const BASE_URL = "https://api.themoviedb.org/3/movie/";

export const fetchMovieList = (category, page) => {
    return fetch(
        `https://api.themoviedb.org/3/movie/${category}?&page=${page}&api_key=${API_KEY}`
    )
    .then((resp) => {
        if (resp.ok) {
            return resp.json();
        }
    })
    .then((data) => {
        return data;
    });
};