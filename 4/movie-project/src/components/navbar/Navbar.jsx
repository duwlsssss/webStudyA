import React from "react";
import {Link} from "react-router-dom";
import { LoginBtn, SignUpBtn } from "../button/Button";
import { MdLocalMovies } from "react-icons/md";
import style from './NAvbar.module.css'; 


export const Navbar = () => {
  return (
    <div className={style.navbarContainer}>
      <Link className={style.textLogo} to={'/'}>YOUNGCHA</Link>
      <Link className={style.iconLogo}to={'/'}>
        <MdLocalMovies size={25}/>
      </Link>
      <div className={style.navRight}>
        <LoginBtn/>
        <SignUpBtn/>
      </div>
    </div>
  );
};

