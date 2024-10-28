import React from 'react';
import { useParams } from 'react-router-dom';
import {NowPlaying} from './movie-categories/NowPlaying';
import {Popular} from './movie-categories/Popular';
import {TopRated} from './movie-categories/TopRated';
import {Upcoming} from './movie-categories/Upcoming';

export const MoviesCategory = () => {
  const { category } = useParams();

  const renderComponent = () => {
    switch (category) {
      case 'now_playing':
        return <NowPlaying />;
      case 'popular':
        return <Popular />;
      case 'top_rated':
        return <TopRated />;
      case 'upcoming':
        return <Upcoming />;
      default:
        return <div>카테고리를 찾을 수 없습니다.</div>;
    }
  };

  return (
    <>
      {renderComponent()}
    </>
  );
};
