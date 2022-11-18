import { createSlice } from "@reduxjs/toolkit";
export const searchTermSlice = createSlice({
  initialState: "",
  name: "searchTerm",
  reducers: {
    addSearchTerm: (state, action) => action.payload.toLowerCase(),
    clearSearchTerm: (state) => "",
  },
});
export const selectSearchTerm = (state) => state.searchTerm;

export const { addSearchTerm, clearSearchTerm } = searchTermSlice.actions;
export default searchTermSlice.reducer;
