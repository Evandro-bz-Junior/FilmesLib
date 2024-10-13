 
import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../MovieCard/MovieCard';

function GenreMovies() {
    const genres = [
        { id: 28, name: 'Ação' },
        { id: 12, name: 'Aventura' },
        { id: 16, name: 'Animação' },
        { id: 35, name: 'Comédia' },
        { id: 27, name: 'Terror' },
        { id: 10749, name: 'Romance' },
        { id: 99, name: 'Documentário' },
    ]; 

    const [moviesByGenre, setMoviesByGenre] = useState({});

    useEffect(() => {
        genres.forEach(genre => {
            getMoviesByGenre(genre.id);
        });
    }, []);

    const getMoviesByGenre = async (genreId) => {
        await axios({
            method: 'GET',
            url: 'https://api.themoviedb.org/3/discover/movie',
            params: {
                api_key: 'bcca6b957b100ca5154d4459e33679ec',
                language: 'pt-BR',
                include_adult: false,
                region: 'BR',
                with_genres: genreId,
                year: '2024',
                sort_by: 'popularity.desc',
            }
        }).then(response => {
            setMoviesByGenre(prev => ({
                ...prev,
                [genreId]: response.data.results
            }));
        });
    };

   

    return (
        <div>
            {genres.map((genre) => (
                <div key={genre.id}>
                    <h2 className='title'>Filmes de {genre.name}</h2>
                    <ul className="movie-list">
                        {moviesByGenre[genre.id]?.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default GenreMovies;
