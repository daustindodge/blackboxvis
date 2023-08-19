import { configureStore } from '@reduxjs/toolkit';
import ArraySortReducer from "./slices/ArraySortSlice.js";

export default configureStore({
    reducer: {
        sortArray: ArraySortReducer,
        // sortSpeed: SpeedReducer,
        // sortIsSorting: IsSortingReducer,
    },
})