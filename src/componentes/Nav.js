import React from "react";
import {NavLink, Outlet } from "react-router-dom";
import MonochromePhotosSharpIcon from "@mui/icons-material/MonochromePhotosSharp";
import HomeIcon from "@mui/icons-material/Home";
import ImageSearchSharpIcon from "@mui/icons-material/ImageSearchSharp";
import { createTheme } from "@mui/material/styles";
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
            <NavLink exact activeClassName="active" to="/">
              <HomeIcon
                sx={{
                  [theme.breakpoints.up("laptop")]: {
                    fontSize: 50,
                  },
                  fontSize: 36,
                }}
              ></HomeIcon>
            </NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="active" to="/search">
              <ImageSearchSharpIcon
                sx={{
                  [theme.breakpoints.up("laptop")]: {
                    fontSize: 50,
                  },
                  fontSize: 36,
                }}
              ></ImageSearchSharpIcon>
            </NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="active" to="/myphotos">
              <MonochromePhotosSharpIcon
                sx={{
                  [theme.breakpoints.up("laptop")]: {
                    fontSize: 50,
                  },
                  fontSize: 36,
                }}
              ></MonochromePhotosSharpIcon>
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};
export default Nav;
