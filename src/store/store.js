import { applyMiddleware } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';

import favoritePhotosReducer from '../features/favoritePhotos/favoritePhotosSlice';
import searchTermReducer from '../features/searchTerm/searchTermSlice';
import allPhotosReducer from '../features/allPhotos/allPhotosSlice';
import orderByCategoryReducer from '../features/orderByCategory/orderByCategorySlice';
const store =  configureStore({
    reducer: {
        searchTerm: searchTermReducer,
        favoritePhotos: favoritePhotosReducer,
        allPhotos: allPhotosReducer,
        orderByCategory: orderByCategoryReducer
    }
});
export default store;