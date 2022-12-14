import { createSlice } from "@reduxjs/toolkit";
import { selectSearchTerm } from "../searchTerm/searchTermSlice";

let savedImagesArr = [];
for (let i = 0; i < localStorage.length; i++) {
  //si la key de los elementos de localstorage contiene 'saved_images_' entonces pushea la imagen al array
  if (localStorage.key(i).search("saved_images_") !== -1) {
    savedImagesArr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
  }
};

export const favoritePhotosSlice = createSlice({
  name: "favoritePhotos",
  initialState: savedImagesArr,
  reducers: {
    addFavoritePhoto: (state, action) => {
      return [...state, action.payload];
    },
    removeFavoritePhoto: (state, action) => {
      return state.filter((img) => img.id !== action.payload);
    },
    editFavoritePhotoDescription: (state, action) =>
      state.map((img) => {
        if (img.id === action.payload.id)
          return { ...img, description: action.payload.description };
        return img;
      }),
  },
});
export const selectFavoritePhotos = (state) => state.favoritePhotos;
export const selectFilteredPhotos = (state) => {
  const allPhotos = selectFavoritePhotos(state);
  const searchTerm = selectSearchTerm(state);
  return allPhotos.filter((img) => {
    if (img.description !== null) {
      return img.description.toLowerCase().search(searchTerm) !== -1;
    }else if(img.description === null && searchTerm === '')
    {
      return img;
    }
    return false;
  });
};
export const {
  addFavoritePhoto,
  removeFavoritePhoto,
  editFavoritePhotoDescription,
  searchFavoritePhoto,
} = favoritePhotosSlice.actions;
export default favoritePhotosSlice.reducer;
