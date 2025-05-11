
import React from "react";
import { Link } from "react-router";


export default function MovieCard(props) {
    return (
        <div className="movie-card">
            <div className="movie-card-img">
                <img src={`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`} alt="" />
            </div>
        <h3 className="movie-card-title">{props.movie.title}</h3>
        <div className="movie-card-info">
            <div className="movie-card-rating">
                <i className="ion-md-star rating-icon"></i>
                <span>{props.movie.vote_average}</span>
            </div>
            <i className="ion-md-heart-empty"></i>
        </div>

        </div>
    );
}