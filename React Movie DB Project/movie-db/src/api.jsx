import axios from 'axios';

const API_KEY = "124471754942997e76b157aefcfb80c2";
const BASE_URL = "https://api.themoviedb.org/3/movie/";

const client = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjQ0NzE3NTQ5NDI5OTdlNzZiMTU3YWVmY2ZiODBjMiIsIm5iZiI6MTc0NTU2MzU3Ny43NzYsInN1YiI6IjY4MGIyZmI5MjcxZWNiM2FlMDhhNGZhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JSd3qb4D4v6RrzaLYw9Mp-FE0fFNVTxygmHT2T5eAzE'
      }
});

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

export const fetchMovieDetails = (movieId) => {
    return fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
    )
    .then((resp) => {
        if (resp.ok) {
            return resp.json();
        }
    })
    .then((data) => {
        return data;
    })
} 

export const login = async () => {
    try {
        const { data: { request_token } } = await client.get(`/authentication/token/new`);
        console.log(request_token);
    }
    catch (e) {
        console.log(e);
    }
}