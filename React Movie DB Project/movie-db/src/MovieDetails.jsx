import { useState, useEffect, useContext } from "react";
import { fetchMovieDetails, rateMovie } from "./api";
import { useParams, Link } from "react-router";
import { RatedContext } from "./Context/RatedContext";
import { useUser } from "./Context/UserContext";

export default function MovieDetails() {

    const { ratedMap, setRatedMap } = useContext(RatedContext);
    const [rated, setRated] = useState();
    const [movie, setMovie] = useState(null);
    const [rateValue, setRateValue] = useState("1");
    const { movieId } = useParams();
    const { user } = useUser();

    useEffect(() => {
        fetchMovieDetails(movieId).then((data) => {
            setMovie(data);
        });
    },[fetchMovieDetails, movieId, ratedMap])

    const handleRate = () => {
        if(!user) {
            return;
        }

        rateMovie(movie.id, rateValue).then(() => {
            const foundMovie = ratedMap.find((m) => {
                return m.id === movie.id;
            })
            console.log(foundMovie);
            if (!foundMovie) {
                const updatedMovie = { ...movie, rating: rateValue };
                setRatedMap([ ...ratedMap, updatedMovie ]);
            }
            else {
                const updatedMovie = { ...movie, rating: rateValue };
                const updatedMap = ratedMap.map((m) => {
                    return m.id === movie.id ? {...m, ...updatedMovie} : m
                });
                setRatedMap(updatedMap);
            }
            setRated(rateValue);
        });
    };

    if (!movie) {
        return null;
    }

    return (
        <div className="movie_details">
            <div className="movie_details_img">
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="movie img" />
            </div>
            <div className="details_container">
                <h2>{movie.title}</h2>
                <h3>Release Date</h3>
                <p>{movie.release_date}</p>
                <h3>Overview</h3>
                <p>{movie.overview}</p>
                <h3>Genres</h3>
                <ul className="movie_genre_list">
                {
                    movie.genres.map((genre) => {
                        return (
                        <li className="genre_li" key={genre.id}>{genre.name}</li>
                        );
                    })
                }
                </ul>
                <h3>Average Rating</h3>
                <div className="movie_rating_avg">
                    <i className="ion-md-star rating-icon"></i>
                    <p>{movie.vote_average}</p>
                </div>
                <h3>Your Rating</h3>
                <div>
                    {
                    ratedMap.find((m) => m.id === movie.id)?.rating ?? 'Not yet'
                    }
                </div>
                <div>
                    <select name="rating" className="movie_rating_select" value={rateValue} onChange={e => setRateValue(e.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                    <button onClick={handleRate}>RATE IT!</button>
                </div>
                <h3>Production Companies</h3>
                <ul className="movie_company_list">
                    {
                        movie.production_companies.map((company) => {
                            return (
                            <li className="company_li" key={company.id}>
                                <img src={`https://image.tmdb.org/t/p/w500/${company.logo_path}`} alt={company.name} />
                            </li>
                            );
                        })
                    }
                </ul>
                <Link to="/">To home</Link>
            </div> 
        </div>
    );
}