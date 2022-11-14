import React from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../assets/nav.svg";
import SearchIcon from "@mui/icons-material/Search";
import MonochromePhotosSharpIcon from "@mui/icons-material/MonochromePhotosSharp";
import HomeIcon from "@mui/icons-material/Home";
import ImageSearchSharpIcon from "@mui/icons-material/ImageSearchSharp";
const Nav = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <HomeIcon></HomeIcon>
            </Link>
          </li>
          <li>
            <Link to="/search">
              <ImageSearchSharpIcon sx={{ mr: 1 }}></ImageSearchSharpIcon>
            </Link>
          </li>
          <li>
            <Link to="/myphotos">
              <MonochromePhotosSharpIcon></MonochromePhotosSharpIcon>
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};
export default Nav;
