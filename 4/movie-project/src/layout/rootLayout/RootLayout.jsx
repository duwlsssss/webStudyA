import React from "react";
import { Outlet } from "react-router-dom";
import {Navbar, SideBar} from "../../components";
import style from './RootLayout.module.css';

const RootLayout = () => {
  return (
      <>
        <Navbar/>
        <div className={style.contentContainer}>
          <SideBar />
          <div className={style.outletContianer}>
            <Outlet />
          </div>
        </div>
      </>
  )
}

export default RootLayout;

