import { useState, useEffect } from "react";
import styled from 'styled-components';

const baseURL = 'https://image.tmdb.org/t/p/original'

const StyledMovieList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;

  .movie-item {
    width: 200px; 
    height: auto;
      img {
        width: 100%; 
        height: auto;
        border-radius: 10px;
      }
      img.hovered{
        filter: brightness(50%);
      }
  }
`

const MovieList = ({movies}) => {

  const [hoveredId, setHoveredId] = useState(null);

  const handleMouseOver = (id) => {
    setHoveredId(id);
  };

  const handleMouseOut = () => {
    setHoveredId(null);
  };

  return (
    <StyledMovieList>
      {movies.map((movie)=>(
        <div 
          key={movie.id} 
          className="movie-item"
        >
          <img 
            className={hoveredId === movie.id ? 'hovered' : ''}
            src={`${baseURL}${movie.backdrop_path}`}
            alt={movie.title}
            onMouseOver={() => handleMouseOver(movie.id)}
            onMouseOut={handleMouseOut}
          />
        </div>
      ))}
    </StyledMovieList>
  );
}


export default MovieList;