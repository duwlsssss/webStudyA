import { IoSearch } from "react-icons/io5";
import { PiFilmSlate } from "react-icons/pi";
import * as S from './Sidebar.styles';

export const SideBar = () => {
  return (
    <S.SidebarContainer>
      <S.SidebarLink to='/search'>
        <S.SidebarLinkInner>
          <IoSearch size={25} /> 찾기
        </S.SidebarLinkInner>
      </S.SidebarLink>
      <S.SidebarLink to='/categories'>
        <S.SidebarLinkInner>
          <PiFilmSlate size={25} /> 영화
        </S.SidebarLinkInner>
      </S.SidebarLink>
    </S.SidebarContainer>
  );
};