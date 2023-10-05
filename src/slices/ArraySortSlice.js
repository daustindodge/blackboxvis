import { createSlice } from '@reduxjs/toolkit'

export const ArraySortSlice = createSlice({
    name: 'sortArray',
    initialState: {
        value: [],
        size: '75',
        speed: 100,
        width: '0',
        status: 'waiting',
        index: 0,
    },
    reducers: {
        create: (state) =>
        {
            let bars = [];
            let w = state.width / state.size;

            for(let i = 0; i < state.size; i++)
            {
                let h = Math.floor(Math.random() * (70 - 6) + 5);

                bars.push({height: h, width: w, color: "#a6a6a6"});
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
        setSpeed: (state, action) =>
        {
            state.speed = action.payload;
        },
        width: (state, action) =>
        {
            state.width = action.payload;
        },
        setStatus: (state, action) =>
        {
            state.status = action.payload;
        },
        updateIndex: (state) =>
        {
            state.index++;
        },
        reset: (state) =>
        {
            state.index = 0;

            this.create();
        },
    },
})

// Action creators are generated for each case reducer function
export const { update, create, size, setSpeed, width, setStatus, updateIndex, reset } = ArraySortSlice.actions

export default ArraySortSlice.reducer