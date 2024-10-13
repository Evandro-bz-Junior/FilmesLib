
import GenreMovies from '../components/GenreMovies/GenreMovies';
import MovieList from '../components/MovieList/MovieList'; 

function Home() {
    return (
        <div>
            
            <MovieList />
            <GenreMovies/>
        </div>
    );
}

export default Home;