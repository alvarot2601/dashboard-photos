import React from "react";
import { Link } from "react-router-dom";
import ImageSearchSharpIcon from '@mui/icons-material/ImageSearchSharp';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';

const Home = () => {
  return (
    <>
      <h1>Choose and download any photo you like from Unsplash</h1>
      <main className="main__home">
          <Link to="/search">
            <Fab variant="extended" color="primary" aria-label="add">
                <ImageSearchSharpIcon sx={{ mr: 1 }}></ImageSearchSharpIcon>
                Search Photos
            </Fab>
          </Link>
      </main>
    </>
  );
};

export default Home;
