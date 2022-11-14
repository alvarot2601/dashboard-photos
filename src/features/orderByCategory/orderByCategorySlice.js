import {createSlice} from '@reduxjs/toolkit';
import React from 'react';

export const orderByCategorySlice = createSlice({
    name: 'orderByCategory',
    initialState: 'date',
    reducers: {
        changeCategory: (state, action) => action.payload
    }
});

export const selectCategory = (state) => state.orderByCategory;
export const {changeCategory} = orderByCategorySlice.actions;
export default orderByCategorySlice.reducer;