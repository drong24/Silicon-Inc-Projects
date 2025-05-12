import React, {useState, useEffect} from "react";
import { fetchMovieList } from "./api";
import { CATAGORIES } from "./constants";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import CategorySelector from "./CategorySelector";


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
    }, [category, currentPage]);

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

    console.log(movies);
    return (
        <div className="home">
            <Pagination 
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
            <div className="movie-list">
                {movies.map((movie) => {
                    return (
                        <MovieCard key={movie.id} movie={movie}/>
                    );
                })}
            </div>
        </div>
    );

}

