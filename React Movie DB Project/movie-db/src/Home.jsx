import React, {useState, useEffect, useContext} from "react";
import { fetchMovieList } from "./api";
import { CATAGORIES } from "./constants";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import CategorySelector from "./CategorySelector";
import { MoviesContext } from "./Context/MoviesContext";


export default function Home() {

    const { moviesMap, setMoviesMap } = useContext(MoviesContext);
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [category, setCategory] = useState(CATAGORIES.NOW_PLAYING.value);


    useEffect(() => {
        fetchMovieList(category, currentPage, moviesMap, setMoviesMap).then((data) => {
            setTotalPages(data.total_pages);
            setMovies(data.results);
        });
    }, [moviesMap, currentPage, category]);

    const onPrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const onNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    const handleCategoryChange = (value) => {
        setCategory(value);
        setCurrentPage(1);
    };

    return (
        <div className="home">
            <div className="home_nav_bar">
                <Pagination
                className="pagination"
                currentPage={currentPage}
                totalPages={totalPages}
                onPrev={onPrev}
                onNext={onNext}
                >
                </Pagination>
                <CategorySelector
                category={category}
                onCategoryChange={handleCategoryChange}>
                </CategorySelector>
            </div>
            {
                moviesMap ? 
                (
                    <div className="movie-list">
                    {movies.map((movie) => {
                        return (
                            <MovieCard key={movie.id} movie={movie}/>
                        );
                    })}
                    </div>
                ) :
                (<p>Loading...</p>)
            }
        </div>
    );

}

