import { useState, useEffect } from "react";
import { fetchMovieDetails } from "./api";
import { useParams, Link } from "react-router";


export default function MovieDetails() {

    const [movie, setMovie] = useState(null);
    const params = useParams();

    useEffect(() => {
        fetchMovieDetails(params.movieId).then((data) => {
            console.log(data);
            setMovie(data);
        });
    },[])

    if (!movie) {
        return null;
    }

    return (
        <div className="movie_details">
            <div className="movie_details_img">
                <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt="movie img" />
            </div>
            <div className="details_container">
                <h2>{movie.title}</h2>
                <br />
                <h3>Overview</h3>
                <p>{movie.overview}</p>
                <h3>Genres</h3>
                <ul>
                {
                    movie.genres.map((genre) => {
                        return (
                        <li key={genre.id}>{genre.name}</li>
                        );
                    })
                }
                </ul>
                <h3>Rating</h3>
                <p>{movie.vote_average}</p>
                <h3>Production Companies</h3>
                <ul>
                    {
                        movie.production_companies.map((company) => {
                            return (
                            <li key={company.id}>
                                <img src={`https://image.tmdb.org/t/p/w500/${company.logo_path}`} alt="company img" />
                            </li>
                            );
                        })
                    }
                </ul>
            </div> 
            <Link to="/">To home</Link>
        </div>
    );
}