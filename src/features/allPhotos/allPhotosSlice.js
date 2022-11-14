import {createSlice} from '@reduxjs/toolkit';
export const allPhotosSlice = createSlice({
    initialState: [],
    name: 'allPhotos',
    reducers: {
        addPhotos: ((state, action) => action.payload)
    }
});
export const selectPhotos = state => state.allPhotos;
export const {addPhotos} = allPhotosSlice.actions;
export default allPhotosSlice.reducer;