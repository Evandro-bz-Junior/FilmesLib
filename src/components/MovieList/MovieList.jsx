// src/components/MovieList/MovieList.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../MovieCard/MovieCard';
import ReactLoading from 'react-loading';
import './MovieList.scss';

function MovieList() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getPopularMovies();
    }, []);

    const getPopularMovies = async () => {
        await axios({
            method: 'GET',
            url: 'https://api.themoviedb.org/3/trending/movie/week', 
            params: {
                api_key: 'bcca6b957b100ca5154d4459e33679ec',
                language: 'pt-BR'
            }
        }).then(response => {
            setMovies(response.data.results);
            setIsLoading(false);
        });
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <ReactLoading type='spin' color='#6046ff' height={'5%'} width={'5%'} />
            </div>
        );
    }

    return (
        <div>
            <h1 className='title'>Filmes Populares</h1>
            <div className="movie-list-container">

                <ul className="movie-list">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default MovieList;
