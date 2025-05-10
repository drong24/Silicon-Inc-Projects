import React, {useState, useEffect} from "react";
import { fetchMovieList } from "./api";
import { CATAGORIES } from "./constants";
import MovieCard from "./MovieCard";


export default function Home() {

    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [category, setCategory] = useState(CATAGORIES.NOW_PLAYING.value);


    useEffect(() => {
        fetchMovieList(category, currentPage).then((data) => {
            setTotalPages(data.total_pages);
            setMovies(data.results);
        });
    }, []);

    console.log(movies);
    return (
        <div>
            {movies.map((movie) => {
                console.log(movie);
                return (
                    <MovieCard key={movie.id} movie={movie}/>  
                );
        })}
        </div>
    );

}

