
import React from "react";
import { useEffect } from "react";
import { useState, useContext } from "react";
import { Link } from "react-router";
import { toggleFavorite } from "./api";
import { FavoritesContext } from "./Context/FavoritesContext";
import { useUser } from "./Context/UserContext";

export default function MovieCard(props) {

    const { user } = useUser();
    const { favoritesMap, setFavoritesMap } = useContext(FavoritesContext);
    const [favorite, setFavorite] = useState();
    useEffect(() => {
        if (favoritesMap) {
            const found = favoritesMap.find((obj) => obj.id === props.movie.id);
            setFavorite(found);
        }
    },[favoritesMap]);

    const handleClick = () => {
        if (user) {
            const newFavorite = !favorite
            setFavorite(newFavorite);
            console.log(props.movie.id);
            toggleFavorite({movieId:props.movie.id, isFavorite:newFavorite});
            if (newFavorite) {
                setFavoritesMap([...favoritesMap, props.movie]);
            } else {
                const newFavoritesMap = favoritesMap.filter((movie) => {
                    return movie.id !== props.movie.id;
                });
                setFavoritesMap(newFavoritesMap);
            }
        }
    }

    return (
        <div className="movie-card">
            <div className="movie-card-img">
                <img src={`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`} alt="" />
            </div>
            <h3 className="movie-card-title">
                <Link to={`/moviedetails/${props.movie.id}`}>{props.movie.title}</Link>
            </h3>
            <div className="movie-card-info">
                <div className="movie-card-rating">
                    <i className="ion-md-star rating-icon"></i>
                    <span>{props.movie.vote_average}</span> {props.movie.rating ? (<span>/{props.movie.rating}</span>) : (<></>)}
                </div>
                <div onClick={handleClick}>
                    <i
                    className={`like-icon icon 
                    ${favorite ? "ion-md-heart" : "ion-md-heart-empty"}`}
                    >
                    </i>
                </div>
            </div>
        </div>
    );
}