import { useState, useEffect } from "react";
import * as S from './Search.styles.js';
import { Button, SearchMovieList } from '../../components/index.js';
import { useSearchParams, useNavigate } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce.js';

export const Search = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mq = searchParams.get('mq') || '';
  const [searchValue, setSearchValue] = useState<string>(mq);

  const debouncedSearchValue = useDebounce(searchValue, 200); //200ms로 설정된 debounce

  const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value);

  useEffect(() => {
    if (mq === debouncedSearchValue) return;
    navigate(`/search/?mq=${debouncedSearchValue}`);
  }, [debouncedSearchValue, mq, navigate]); //debouncedSearchValue가 변경될 때마다 검색 수행

  const handleSearchMovieWithKeyboard = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      navigate(`/search/?mq=${searchValue}`); //즉시 검색
    }
  };

  return (
    <S.SearchContainer>
      <S.SearchHeader>
        <input 
          value={searchValue}
          placeholder={"영화 제목을 입력해주세요"}
          onChange={onChangeSearchValue}
          onKeyDown={handleSearchMovieWithKeyboard}
        />
        <Button color='pink' shape='block' onClick={() => navigate(`/search/?mq=${searchValue}`)}>
          검색
        </Button>
      </S.SearchHeader>
      <SearchMovieList/>
    </S.SearchContainer>
  );
};
