import React from 'react';
import { useParams } from 'react-router-dom';
import {NowPlaying} from './movie-categories/NowPlaying';
import {Popular} from './movie-categories/Popular';
import {TopRated} from './movie-categories/TopRated';
import {Upcoming} from './movie-categories/Upcoming';
import {Error} from '../../components';

export const MoviesCategory = () => {
  const { category } = useParams();

  const renderComponent = () => {
    switch (category) {
      case 'now_playing':
        return <NowPlaying category={'now_playing'}/>;
      case 'popular':
        return <Popular category={'popular'}/>;
      case 'top_rated':
        return <TopRated category={'top_rated'}/>;
      case 'upcoming':
        return <Upcoming categiry={'upcoming'}/>;
      default:
        return <Error message="카테고리를 찾을 수 없습니다." />;
    }
  };

  return <>{renderComponent()}</>;
};
