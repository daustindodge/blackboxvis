import { createSlice } from '@reduxjs/toolkit'

export const ArraySortSlice = createSlice({
    name: 'sortArray',
    initialState: {
        value: [],
        size: '75',
        width: '0',
        sorting: false,
    },
    reducers: {
        create: (state) =>
        {
            let bars = [];
            let w = state.width / state.size;

            for(let i = 0; i < state.size; i++)
            {
                let h = Math.floor(Math.random() * (70 - 6) + 5);

                bars.push({height: h, width: w});
            }

            state.value = [...bars];
        },
        update: (state, action) =>
        {
            state.value = [...action.payload];
        },
        size: (state, action) =>
        {
            state.size = action.payload;
        },
        width: (state, action) =>
        {
            state.width = action.payload;
        },
        sorting: (state, action) =>
        {
            state.sorting = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { update, create, size, width, sorting } = ArraySortSlice.actions

export default ArraySortSlice.reducer