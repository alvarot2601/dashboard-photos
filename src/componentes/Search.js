import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  addSearchTerm,
  selectSearchTerm,
  clearSearchTerm,
} from "../features/searchTerm/searchTermSlice";
import { addPhotos, selectPhotos } from "../features/allPhotos/allPhotosSlice";
import {
  addFavoritePhoto,
  selectFavoritePhotos,
} from "../features/favoritePhotos/favoritePhotosSlice";

import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import SearchIcon from "@mui/icons-material/Search";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";

const Search = () => {
  const searchTerm = useSelector(selectSearchTerm);
  const favoritePhotos = useSelector(selectFavoritePhotos);
  const photos = useSelector(selectPhotos);
  const dispatch = useDispatch();
  const [repeatPhoto, setRepeatPhoto] = useState([]);
  useEffect(() => {
    let repeatPhotosArr = [];
    let sw = false;
    photos.forEach((photo) => {
      sw = false;
      for (let i = 0; i < favoritePhotos.length; i++) {
        if (photo.id === favoritePhotos[i].id) sw = true;
      }
      if (sw === true) repeatPhotosArr.push(true);
      else repeatPhotosArr.push(false);
      setRepeatPhoto(repeatPhotosArr);
    });
  }, [photos]);

  ////EVENT HANDLERS
  const onChangeHandler = (e) => {
    dispatch(addSearchTerm(e.target.value));
  };

  const onClickHandler = async (e) => {
    if (e.keyCode !== 13 && e.type !== "click") {
      return;
    }
    const response = await fetch(
      "https://api.unsplash.com/search/photos/?query=" +
        searchTerm +
        "&client_id=68CyGDmE1a7FiglE6ufSenlEKv-mqBbqy5lvRv4owGU"
    );
    const data = await response.json();
    dispatch(addPhotos(data.results));
    dispatch(clearSearchTerm());
  };
  const onSaveImageHandler = (e, id) => {
    const actualDateTime = new Date();
    const [img] = photos.filter((img) => img.id === id);
    let sw = false;
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
    for (let i = 0; i < favoritePhotos.length; i++) {
      if (favoritePhotos[i].id === img.id) sw = true;
    }
    if (sw === false) {
      dispatch(addFavoritePhoto(properties));
    }
    e.target.style.backgroundColor = "#1C6758";
  };
  return (
    <>
      <main className="main__search">
        <Grid container spacing={1}>
          <Grid xs={9} sm={11}>
            <TextField
              id="filled-basic"
              variant="filled"
              size="small"
              fullWidth
              label="Search photos from Unsplash"
              onChange={onChangeHandler}
              onKeyUp={(e) => onClickHandler(e)}
              value={searchTerm}
            />
          </Grid>
          <Grid xs={3} sm={1}>
            <Button
              variant="outlined"
              size="large"
              onClick={(e) => onClickHandler(e)}
              sx={{ color: "white", outline: "1px solid white" }}
            >
              <SearchIcon onClick={onClickHandler}></SearchIcon>
            </Button>
          </Grid>
        </Grid>
        <div className="images-container">
          <Grid container spacing={2} columns={{ xs: 1, sm: 1, md: 8, lg: 12 }}>
            {photos.map((img, index) => {
              return (
                <Grid xs={4} key={img.id}>
                  <Card sx={{ maxWidth: 345, margin: "auto" }}>
                    <CardMedia component="img" src={img.urls.regular} />
                    <CardActions>
                      {repeatPhoto[index] === false ? (
                        <Button
                          variant="contained"
                          onClick={(e) => onSaveImageHandler(e, img.id)}
                          fullWidth
                        >
                          Add to my photos
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          onClick={(e) => onSaveImageHandler(e, img.id)}
                          sx={{ backgroundColor: "#1C6758" }}
                          fullWidth
                        >
                          Added to my photos
                        </Button>
                      )}
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
