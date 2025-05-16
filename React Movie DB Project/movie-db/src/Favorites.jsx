import React from "react";
import { useContext } from "react";
import { useUser } from "./Context/UserContext";
import MovieCard from "./MovieCard";
import { FavoritesContext } from './Context/FavoritesContext';


export default function Favorites() {

    const { favoritesMap } = useContext(FavoritesContext);

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