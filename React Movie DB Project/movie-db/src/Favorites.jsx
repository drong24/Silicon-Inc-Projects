import React from "react";
import { useState, useEffect, useContext } from "react";
import { fetchFavorites } from "./api";
import { useUser } from "./Context/UserContext";
import MovieCard from "./MovieCard";
import { FavoritesContext } from './Context/FavoritesContext';


export default function Favorites() {

    const user = useUser();
    const { favoritesMap } = useContext(FavoritesContext);
    console.log(favoritesMap);
    return (
        <div className="favorites_container">
            <h2>Favorite Movies</h2>
            <div className="movie-list">
                {favoritesMap.map((movie) => {
                    return (
                        <MovieCard key={movie.id} movie={movie}/>
                    );
                })}
            </div>
        </div>
        
    );
}