import React from 'react';
import { useState, useContext } from 'react';
import axios from 'axios';
import { MoviesContext } from './Context/MoviesContext';


const API_KEY = "124471754942997e76b157aefcfb80c2";


const client = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjQ0NzE3NTQ5NDI5OTdlNzZiMTU3YWVmY2ZiODBjMiIsIm5iZiI6MTc0NTU2MzU3Ny43NzYsInN1YiI6IjY4MGIyZmI5MjcxZWNiM2FlMDhhNGZhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JSd3qb4D4v6RrzaLYw9Mp-FE0fFNVTxygmHT2T5eAzE'
      }
});


export const fetchMovieList = (category, page, moviesMap, setMoviesMap) => {

    if (moviesMap[category] && moviesMap[category][page]) {
        console.log(moviesMap[category][page]);
        return Promise.resolve(moviesMap[category][page]);
    } else {
        console.log("Fetching Movies...");
        return fetch(
            `https://api.themoviedb.org/3/movie/${category}?&page=${page}&api_key=${API_KEY}`
        )
        .then((resp) => {
            if (resp.ok) {
                return resp.json();
            }
        })
        .then((data) => {
            console.log(data);
            setMoviesMap((map) => {
                return {
                  ...map,
                  [category]: {
                    ...map[category],
                    [page]: data
                  }
                };
              })
            return data;
        });
    }
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

export const login = async (values) => {

    const username = values.username;
    const password = values.password;

    try {
        const { data: { request_token } } = await client.get(`/authentication/token/new`);
        await client.post('/authentication/token/validate_with_login', {username, password, request_token});
        console.log(request_token);
        const {data: {session_id}} = await client.post(`/authentication/session/new`, {request_token});
        client.defaults.params = {...client.defaults.params, session_id}
        const { data } = await client.get('/account');
        const userData = {
            username,
            accountId: data.id,
            sessionId: session_id,
            request_token: request_token
        };
        localStorage.setItem('user', JSON.stringify(userData));
        console.log(userData); 
        return userData;       
    }
    catch (e) {
        console.log("Error at api.jsx");
        throw(e);
    }
}

export const toggleFavorite = async (params) => {
    const user = localStorage.getItem("user");
    const media_type = "movie";
    const media_id = params.movieId;
    const favorite = params.isFavorite;
    const account_id = JSON.parse(user).accountId;

    try {
        const response = await client.post(`/account/${account_id}/favorite`, {media_type, media_id, favorite});
        console.log(response);
    }
    catch(e) {
        console.log("toggleFavorite error: " + e);
    }
    console.log("Success! " + account_id + " " + media_id + " " + favorite);
    
}

export const fetchFavorites = async () => {
    const user = localStorage.getItem("user");
    const account_id = JSON.parse(user).accountId;

    try {
        const { data } = await client.get(`/account/${account_id}/favorite/movies`);
        return data;
    }
    catch (e) {
        console.log('fetchFavorites Error: ' + e);
    }
}