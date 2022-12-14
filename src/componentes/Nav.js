import React from "react";
import {NavLink, Outlet } from "react-router-dom";
import MonochromePhotosSharpIcon from "@mui/icons-material/MonochromePhotosSharp";
import HomeIcon from "@mui/icons-material/Home";
import ImageSearchSharpIcon from "@mui/icons-material/ImageSearchSharp";
import {theme} from "../App.js";
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
