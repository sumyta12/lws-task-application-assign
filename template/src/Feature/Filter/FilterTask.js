import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterarr: [],
  search: "",
};

const FilterTask = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterTask: (state, action) => {
      state.filterarr = action.payload;
    },
    searchTask: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { filterTask , searchTask} = FilterTask.actions
export default FilterTask.reducer
