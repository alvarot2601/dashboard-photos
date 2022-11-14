import React, { useState, useContext, createContext } from "react";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  addSearchTerm,
  selectSearchTerm,
  clearSearchTerm
} from "../features/searchTerm/searchTermSlice";
import { addPhotos, selectPhotos } from "../features/allPhotos/allPhotosSlice";
import {addFavoritePhoto, selectFavoritePhotos} from '../features/favoritePhotos/favoritePhotosSlice';

import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import SearchIcon from '@mui/icons-material/Search';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const Search = (props) => {
  //const [searchTerm, setSearchTerm] = useState('');--
  //const selectSearchTerm = useSelector(state => state.searchTerm);
  const searchTerm = useSelector(selectSearchTerm);
  const favoritePhotos = useSelector(selectFavoritePhotos);
  const photos = useSelector(selectPhotos);
  console.log("photos: " + photos[0])
  const dispatch = useDispatch();

  //const searchTerm = useSelector(selectSearchTerm);

  const handleChange = (e) => {
    dispatch(addSearchTerm(e.target.value));
    //setSearchTerm(e.target.value);--
  };
  const handleClick = async () => {
    const response = await fetch(
      "https://api.unsplash.com/search/photos/?query=" +
        searchTerm +
        "&client_id=68CyGDmE1a7FiglE6ufSenlEKv-mqBbqy5lvRv4owGU"
    );
    const data = await response.json();
    //props.setImages(data.results);
    dispatch(addPhotos(data.results));
    dispatch(clearSearchTerm());
    console.log("data.results" + data.results[0].urls.regular);
  };
  console.log(photos)
  const saveImage = (e, id) => {
    const actualDateTime = new Date();
    const [img] = photos.filter((img) => img.id === id);
    let sw=false;
    const properties = {
      id: img.id,
      description: img.description,
      width: img.width,
      height: img.height,
      likes: img.likes,
      urls: [img.urls.full, img.urls.thumb],
      src: img.urls.regular,
      date: actualDateTime.toString(),
    };
    localStorage.setItem(
      "saved_images_" + properties.id,
      JSON.stringify(properties)
    );
    for(let i=0;i<favoritePhotos.length;i++){
      if(favoritePhotos[i].id === img.id)
        sw=true;
    }
    if(sw===false){
      dispatch(addFavoritePhoto(properties));
    }
    console.log("src: " + properties.src)
  };

  return (
    <>
      <main className="main__search">
        <Grid container spacing={1} style={{textAlign:'center'}}>
          <Grid xs={10}>
            <TextField
              label="Search Photos"
              size="small"
              fullWidth
              onChange={handleChange}
              value={searchTerm}
            />
          </Grid>
          <Grid xs={2}>
            <Button
              variant="outlined"
              size="medium"
              color="success"
              onClick={handleClick}
            >
              <SearchIcon ></SearchIcon>
            </Button>
          </Grid>
        </Grid>

        <div className="images-container">
          <Grid container spacing={2} columns={{ xs: 1, sm: 1, md: 8, lg: 12 }}>
          {photos.map((img, index) => {
            return (
              <Grid xs={4} key={img.id}>
                <Card sx={{ maxWidth: 345, margin: "auto" }}>
                  <CardMedia
                    component="img"
                    src={img.urls.regular}
                  />
                  <CardActions>
                  <Button variant="contained" onClick={(e) => saveImage(e, img.id)} fullWidth>
                  Add to my photos
                </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
          </Grid>
        </div>
      </main>
    </>
  );
};
export default Search;
/*<div key={img.id}>
                <Button variant="contained" onClick={saveImage} name={img.id}>
                  Add to my photos
                </Button>
                <img src={img.urls.full} />
              </div> */