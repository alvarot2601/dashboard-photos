import { React, useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { saveAs } from "file-saver";
import DownloadIcon from "@mui/icons-material/Download";
import Container from "@mui/material/Container";
import Grid2 from "@mui/material/Unstable_Grid2"; // Grid version 2
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

import {
  selectFavoritePhotos,
  addFavoritePhoto,
  removeFavoritePhoto,
  editFavoritePhotoDescription,
  selectPhotoDescription,
  searchFavoritePhoto,
  selectFilteredPhotos,
} from "../features/favoritePhotos/favoritePhotosSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSearchTerm,
  addSearchTerm,
  clearSearchTerm,
} from "../features/searchTerm/searchTermSlice";
import {
  changeCategory,
  selectCategory,
} from "../features/orderByCategory/orderByCategorySlice";

const MyPhotos = (props) => {
  useEffect(() => {
    dispatch(clearSearchTerm());
  }, []);

  const dispatch = useDispatch();
  const favoritePhotos = useSelector(selectFilteredPhotos);
  const searchTerm = useSelector(selectSearchTerm);
  const sortCategory = useSelector(selectCategory);

  const [description, setDescription] = useState("");

  //event Handler
  const onDeletePhotoHandler = (e) => {
    const photoId = e.target.name;
    for (let i = 0; i < localStorage.length; i++) {
      //si la key de los elementos de localstorage contiene 'saved_images_' entonces pushea la imagen al array
      if (localStorage.key(i).search(photoId) !== -1) {
        localStorage.removeItem(localStorage.key(i));
        break;
      }
    }
    dispatch(removeFavoritePhoto(photoId));
  };

  const onEditDescriptionHandler = (id) => {
    const key = "saved_images_" + id;
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key("saved_images_" + id)) {
        const image = JSON.parse(localStorage.getItem("saved_images_" + id));
        image.description = description;
        localStorage.setItem(key, JSON.stringify(image));
        dispatch(
          editFavoritePhotoDescription({ id: id, description: description })
        );
      }
    }
  };
  const downloadImage = (link, id) => {
    saveAs(link, `${id}.png`);
  };
  const onChangeHandler = (e) => {
    setDescription(e.target.value);
  };
  const onSearchByDescription = (e) => {
    dispatch(addSearchTerm(e.target.value));
  };

  const onSortByCategory = (event: SelectChangeEvent) => {
    dispatch(changeCategory(event.target.value));
  };

  return (
    <div className="savedImages-container">
      <TextField
        label="Search by Description"
        
        onChange={onSearchByDescription}
        sx={{ width: "78%", marginRight: "2%" }}
      />
      <FormControl sx={{ width: "20%", marginBottom: 7 }}>
        <InputLabel id="order-by-label">Order By</InputLabel>
        <Select
          labelId="order-by-label"
          id="order-by"
          value={sortCategory === undefined ? "date" : sortCategory}
          label="order By"
          onChange={onSortByCategory}
          sx={{
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "#1976d2",
            },
            ".MuiSvgIcon-root ": {
              fill: "#1976d2 !important",
            },
          }}
        >
          <MenuItem value="date">Date</MenuItem>
          <MenuItem value="width">Width</MenuItem>
          <MenuItem value="height">Height</MenuItem>
          <MenuItem value="likes">Likes</MenuItem>
        </Select>
      </FormControl>

      <Grid container spacing={2} columns={{ xs: 1, sm: 1, md: 8, lg: 12 }}>
        {favoritePhotos
          .filter(
            (img) =>
              (img.description === null && searchTerm === "") ||
              (img.description !== null &&
                img.description
                  .toLowerCase()
                  .search(searchTerm.toLowerCase()) !== -1)
          )
          .sort((a, b) => {
            if (sortCategory === "date") {
              return new Date(a[sortCategory]) - new Date(b[sortCategory]);
            }
            return a[sortCategory] - b[sortCategory];
          })
          .map((img) => {
            return (
              <Grid xs={4} key={img.id}>
                <Card sx={{ maxWidth: 345, margin: "auto" }}>
                  <CardMedia
                    component="img"
                    src={img.src}
                    alt={img.description}
                    likes={img.likes}
                    widthprop={img.width}
                    heightprop={img.height}
                    date={img.date}
                    id={img.id}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {img.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <TextField
                      fullWidth
                      label="Change Description"
                      size="small"
                      variant="standard"
                      onChange={onChangeHandler}
                    />
                    <ButtonGroup
                      orientation="vertical"
                      aria-label="vertical contained button group"
                      variant="contained"
                    >
                      <Button
                        variant="outlined"
                        size="small"
                        color="success"
                        onClick={() => downloadImage(img.urls[0], img.id)}
                      >
                        <DownloadIcon></DownloadIcon>
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="success"
                        name={img.id}
                        value={description}
                        onClick={() => onEditDescriptionHandler(img.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        name={img.id}
                        onClick={onDeletePhotoHandler}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
};
export default MyPhotos;
