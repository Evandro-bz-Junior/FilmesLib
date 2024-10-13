import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../../../components/MovieCard/MovieCard';

import './Search.scss';

function Search() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);  
  const [isLoadingMore, setIsLoadingMore] = useState(false);  
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (query) {
      searchMovies();
    }
  }, [query]);

  const searchMovies = async () => {
    setIsLoading(true);  
    setMovies([]);  
    setPage(1);   
    try {
      const response = await axios({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/search/movie',
        params: {
          api_key: 'bcca6b957b100ca5154d4459e33679ec',
          language: 'pt-BR',
          query: query,
          sort_by: 'popularity.desc',
          include_adult: false,
          region: 'USA',
          page: 1  
        }
      });
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    } finally {
      setIsLoading(false);  
    }
  };

  const loadMoreMovies = async () => {
    if (page < totalPages) {
      setIsLoadingMore(true);  
      setPage(prevPage => prevPage + 1);  
      try {
        const response = await axios({
          method: 'GET',
          url: 'https://api.themoviedb.org/3/search/movie',
          params: {
            api_key: 'bcca6b957b100ca5154d4459e33679ec',
            language: 'pt-BR',
            query: query,
            sort_by: 'popularity.desc',
            include_adult: false,
            region: 'USA',
            page: page + 1  
          }
        });
        setMovies(prevMovies => [...prevMovies, ...response.data.results]);  
      } catch (error) {
        console.error("Erro ao buscar mais filmes:", error);
      } finally {
        setIsLoadingMore(false);  
      }
    }
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
      {movies.length > 0 ? (
        <div>
          <h1 className='title'>Resultados para: {query}</h1>
          <ul className="movie-list">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </ul>
          {page < totalPages && (
            <div>
              {isLoadingMore ? (
                <ReactLoading type='spin' color='#6046ff' height={'5%'} width={'5%'} />
              ) : (
                <button onClick={loadMoreMovies} className='load-more'>Carregar mais</button>
              )}
            </div>
          )}
        </div>
      ) : (
        <h1 className="no-results">Nenhum filme encontrado para "{query}".</h1>
      )}
    </div>
  );
}

export default Search;
