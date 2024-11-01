import React from "react";
import {Link} from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { PiFilmSlate } from "react-icons/pi";
import style from './Sidebar.module.css';

export const SideBar = () => {
  return (
    <div className={style.sidebarContainer}>
      <Link className={style.sidebarLink} to='/search'>
        <div className={style.sidebarLinkInner}><IoSearch size={25}/> 찾기</div>
      </Link>
      <Link className={style.sidebarLink} to='/categories'>
        <div className={style.sidebarLinkInner}><PiFilmSlate size={25}/> 영화</div>
      </Link>
    </div>
  );
};