import {useNavigate} from 'react-router-dom';
import * as S from './Category.styles';
import nowPlayingImg from '../../assets/img/category/nowPlaying.jpg';
import popularImg from '../../assets/img/category/popular.jpg';
import topRatedImg from '../../assets/img/category/topRated.jpg';
import upcomingImg from '../../assets/img/category/upcoming.jpg';

export const Category = () => {

  const navigate = useNavigate();

  const categories = [
    { id: 1, label: "현재 상영중인", image: nowPlayingImg, category: "now_playing" },
    { id: 2, label: "인기있는", image: popularImg, category: "popular" },
    { id: 3, label: "높은 평가를 받은", image: topRatedImg, category: "top_rated" },
    { id: 4, label: "개봉 예정인", image: upcomingImg, category: "upcoming" }
  ];

  return (
   <>
      <S.Title>카테고리</S.Title>
      <S.CardList>
        {categories.map((category) => (
          <S.Card 
            key={category.id} 
            onClick={() => navigate(`/categories/${category.category}`, {
              replace: false,
            })}
          >
            <S.CardImg 
              src={category.image} 
              alt={category.label}
            />
            <S.CardLabel>{category.label}</S.CardLabel>
          </S.Card>
        ))}
      </S.CardList>
   </>
  )
}
