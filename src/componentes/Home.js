import React from "react";
import { Link } from "react-router-dom";
import ImageSearchSharpIcon from '@mui/icons-material/ImageSearchSharp';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';

const Home = () => {
  return (
    <>
      
      <main className="main__home">
        <div>
          <h1>Choose and download any photo you like from Unsplash</h1>
          <Link to="/search">
            <Fab variant="extended" color="primary" aria-label="add">
                <ImageSearchSharpIcon sx={{ mr: 1 }}></ImageSearchSharpIcon>
                Search Photos
            </Fab>
          </Link>
        </div>
      </main>
    </>
  );
};
export default Home;
