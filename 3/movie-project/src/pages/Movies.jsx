import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';

const baseURL = 'https://image.tmdb.org/t/p/original'

const StyledCardList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
`
const StyledCard = styled.div`
  width: 120px;
  height: auto;
  cursor: pointer;
  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 5px;
    transition: filter 0.3s ease;
    &:hover {
    filter: brightness(0.5);
    }
  }
  .title{
    font-weight: bold;
    font-size: 0.9rem;
    margin-top: 0.5rem;
  }
  .releaseDate{
    font-size: 0.7rem;
  }
`;

export const Movies = () => {
  const { category } = useParams();
  const [movies, setMovies] = useState([]);

  const selectedCategory = category || 'popular';

  const getMovies = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${selectedCategory}?language=ko&page=1&region=KR`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
        }
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error("영화 포스터 가져오기 실패", error);
    }
  };

  useEffect(() => {
    getMovies();
  }, [selectedCategory]);

  // useEffect(() => {
  //   console.log(movies);
  // }, [movies]);

  
  return (
    <StyledCardList>
        {movies?.map((movie) => (
          <StyledCard key={movie.id} className="card">
            <img 
              src={`${baseURL}${movie.poster_path}`}
              alt={movie.title}
            />
            <div className='title'>{movie.title}</div>
            <div className='releaseDate'>{movie.release_date}</div>
            </StyledCard>
        ))}
    </StyledCardList>
  );
}

export default Movies;