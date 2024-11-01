import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import forest from '../assets/forest.jpg';

const StyledTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const CategoryCardList = styled.div`
  display: flex;
  flex-basis:0;
  flex-grow:1;
  gap: 2rem;
  align-items: center;
  flex-wrap: wrap;
`;

const CategoryCard = styled(Link)`
  width: 280px;
  height: 130px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
    transition: filter 0.3s ease;
    &:hover {
      filter: brightness(50%);
    }
  }

  .label {
    position: absolute;
    bottom: 10px;
    left: 10px;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 0.4rem;
    border-radius: 5px;
    font-size: 0.8rem;
    color: white;
  }
`;

const Category = () => {

  const categories = [
    { id: 1, label: "현재 상영중인", image: forest, category: "now_playing" },
    { id: 2, label: "인기있는", image: forest, category: "popular" },
    { id: 3, label: "높은 평가를 받은", image: forest, category: "top_rated" },
    { id: 4, label: "개봉 예정중인", image: forest, category: "upcoming" }
  ];

  return (
   <>
      <StyledTitle>카테고리</StyledTitle>
      <CategoryCardList>
        {categories.map((category)=>
          <CategoryCard key={category.id} to={`/movies/${category.category}`}>
            <img src={category.image} alt={category.label}/>
            <div className='label'>{category.label}</div>
          </CategoryCard>
        )}
      </CategoryCardList>
   </>
  )
}

export default Category;