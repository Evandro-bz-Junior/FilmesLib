import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import StarRating from '../../components/StarRating/StarRating';
import ReactLoading from 'react-loading'
import axios from 'axios';
import ReactPlayer from 'react-player'

import './Movie.scss'


function Movie() {

  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [trailerUrl, setTrailerUrl] = useState()
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    getMovie();
  }, [id]);

  useEffect(() => {
    if (movie) {
      getTrailer(movie);
    }
  }, [movie]);

  const getMovie = async () => {
    setIsLoading(true);
    await axios({
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${id}`,
      params: {
        api_key: 'bcca6b957b100ca5154d4459e33679ec',
        language: 'pt-BR',
      }
    }).then(response => {
      setMovie(response.data);
      console.log(response.data)
      setIsLoading(false);
    }).catch(error => {
      console.error("Erro ao buscar filmes:", error);
      setIsLoading(false);
    });
  };

  const getTrailer = (movie) => {
    axios.get(`https://www.googleapis.com/youtube/v3/search`, {
      params: {
        q: `${movie.title} official trailer pt-br`,
        key: 'AIzaSyBEVPIIt5PSGyoL9baJY6AVDupjHWBcqJM',
        order: 'rating'
      }
    }).then(response => {
      if (response.data.items && response.data.items.length > 0) {
        const trailerUrl = `https://www.youtube.com/watch?v=${response.data.items[0].id.videoId}`;
        setTrailerUrl(trailerUrl);
      } else {
        console.log('Nenhum trailer encontrado');
      }
    }).catch(error => console.log("Erro ao buscar o trailer: ", error));
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <ReactLoading type='spin' color='#6046ff' height={'5%'} width={'5%'} />
      </div>
    );
  }

  function formatCurrency(value) {
    return value ? value.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' }) : '-';
  }

  return (
    <div className="movie-page">
      {movie && (
        <>
          <div className="movie">
            <div className='movie-content'>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <div className="movie-info">
                <h1>{movie.title}</h1>
                <p className="tagline">{movie.tagline}</p>
                <div className="info">
                  <h3>Data de Lançamento:</h3>
                  <p>{movie.release_date ? movie.release_date : "Data de Lançamento indisponível"}</p>
                </div>
                <div className="info">
                  <h3>Duração:</h3>
                  <p>{movie.runtime ? `${movie.runtime} minutos` : "Duração indisponível"}</p>
                </div>
                <div className="info">
                  <h3>Orçamento:</h3>
                  <p>{movie.budget ? formatCurrency(movie.budget) : "Orçamento não informado"}</p>
                </div>
                <div className="info">
                  <h3>Receita:</h3>
                  <p>{movie.revenue ? formatCurrency(movie.revenue) : "Receita não informada"}</p>
                </div>
                <div className="info">
                  <h3>Avaliação:</h3>
                  <p>{movie.vote_average > 0 ?
                    <StarRating rating={movie.vote_average} />
                    : "Avaliação indisponível"}</p>
                </div>
                <div className="info-description">
                  <h3>Descrição:</h3>
                  <p>{movie.overview ? movie.overview : "Descrição indisponível"}</p>
                </div>
              </div>

            </div>
            <div className="movie-player-container">
              {trailerUrl &&
                <ReactPlayer url={trailerUrl} controls={true} className="react-player" />
              }
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Movie;