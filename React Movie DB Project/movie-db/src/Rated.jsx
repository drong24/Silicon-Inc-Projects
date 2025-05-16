import React from "react";
import { useUser } from "./Context/UserContext";
import { RatedContext } from "./Context/RatedContext";
import { useState, useContext } from "react";
import MovieCard from "./MovieCard";

export default function Rated(props) {

    const { ratedMap } = useContext(RatedContext);

    return (
        <div className="rated_container">
            <h2>Rated Movies</h2>
            <div className="movie-list">
                {ratedMap.map((movie) => {
                    return (
                        <MovieCard key={movie.id} movie={movie}/>
                    );
                })}
            </div>
        </div>
    );
}