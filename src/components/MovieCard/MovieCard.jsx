import StarRating from '../StarRating/StarRating';
import { Link } from 'react-router-dom';
import './MovieCard.scss'

function MovieCard({ movie }) {
    return (
        <Link to={`/movie/${movie.id}`}>
        <li className='movie-card'>
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
            </div>

            <div className="movie-infos">
                <p className='movie-title'>
                    {movie.title}
                </p>
                {movie.vote_average > 0 &&
                    <StarRating
                        rating={movie.vote_average}
                    />
                }

                <div className="hidden-content">
                    {movie.overview &&
                        <p className='description'>
                            {movie.overview.length > 100
                                ? `${movie.overview.substring(0, 100)}...`
                                : movie.overview}
                        </p>
                    }

                    <Link to={`/movie/${movie.id}`}><button className='btn-default'>
                        Ver mais
                    </button></Link>
                </div>

            </div>

        </li>
        </Link>
    );
}

export default MovieCard;