import { useState, useEffect, useContext } from "react";
import { fetchMovieDetails, rateMovie } from "./api";
import { useParams, Link } from "react-router";
import { RatedContext } from "./Context/RatedContext";


export default function MovieDetails() {

    const { ratedMap, setRatedMap } = useContext(RatedContext);
    const [rated, setRated] = useState();
    const [movie, setMovie] = useState(null);
    const [rateValue, setRateValue] = useState("1");
    const params = useParams();

    useEffect(() => {
        fetchMovieDetails(params.movieId).then((data) => {
            setMovie(data);
            const found = ratedMap.find((movie) => {
                return movie.id === data.id;
            })
            if (found) {
                console.log(found.rating);
                setRated(found.rating);
            }
        });
    },[ratedMap])

    const handleRate = () => {
        rateMovie(movie.id, rateValue).then(() => {
            const found = ratedMap.find((m) => {
                return m.id === movie.id;
            })
            if (!found) {
                setRatedMap([ ...ratedMap, movie ]);
            }
            setRated(rateValue);
        });
        console.log(ratedMap);
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
                <br />
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
                    {rated ? rated : "Not Yet"}
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