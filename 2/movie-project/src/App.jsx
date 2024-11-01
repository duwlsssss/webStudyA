import MovieList from './components/MovieList';
import { MOVIES } from './mocks/movie';
import "./App.css"

function App() {
  return (
    <MovieList movies={MOVIES.results}/>
  );
}

export default App;