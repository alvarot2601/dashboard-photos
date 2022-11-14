import React from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../assets/nav.svg";
import SearchIcon from "@mui/icons-material/Search";
import MonochromePhotosSharpIcon from "@mui/icons-material/MonochromePhotosSharp";
import HomeIcon from "@mui/icons-material/Home";
import ImageSearchSharpIcon from "@mui/icons-material/ImageSearchSharp";
import { createTheme } from '@mui/material/styles';
const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
    },
  },
});
const Nav = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <HomeIcon sx={{[theme.breakpoints.up('laptop')]: {
      fontSize: 50
    }, fontSize:36}}></HomeIcon>
            </Link>
          </li>
          <li>
            <Link to="/search">
              <ImageSearchSharpIcon sx={{[theme.breakpoints.up('laptop')]: {
      fontSize: 50
    }, fontSize:36}}></ImageSearchSharpIcon>
            </Link>
          </li>
          <li>
            <Link to="/myphotos">
              <MonochromePhotosSharpIcon sx={{[theme.breakpoints.up('laptop')]: {
      fontSize: 50
    }, fontSize:36}}></MonochromePhotosSharpIcon>
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};
export default Nav;
