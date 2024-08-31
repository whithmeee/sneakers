import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Paginate {
  pageCurrent: number;
}

const initialState: Paginate = {
  pageCurrent: 1,
};

const paginationSlice = createSlice({
  name: "paginate",
  initialState,
  reducers: {
    setPageCurrent: (state, action: PayloadAction<number>) => {
      state.pageCurrent = action.payload;
    },
  },
});

export const { setPageCurrent } = paginationSlice.actions;
export default paginationSlice.reducer;
