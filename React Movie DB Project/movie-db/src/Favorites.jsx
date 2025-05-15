import React from "react";
import { useState, useEffect } from "react";
import { fetchFavorites } from "./api";
import { useUser } from "./App";
import MovieCard from "./MovieCard";


export default function Favorites() {

    const user = useUser();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if (user) {
            fetchFavorites().then((data) => {
                setFavorites(data.results);
            });
        }
        console.log(favorites);
    },[]);
    

    return (
        <div className="favorites_container">
            <h2>Favorite Movies</h2>
            <div className="movie-list">
                {favorites.map((movie) => {
                    return (
                        <MovieCard key={movie.id} movie={movie}/>
                    );
                })}
            </div>
        </div>
        
    );
}