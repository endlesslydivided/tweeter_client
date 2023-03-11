import { createSlice } from "@reduxjs/toolkit";


export const usersSlice: any = createSlice({
  initialState: <any>[],
  name: "usersSlice",
  reducers: {
    appendPage:(state:any,action:any) =>
    {
      const data = action.payload;
      return [...state,...data];
    },
    reset: () => [],
  },
});

export const {

  appendPage:appendUsersPage,
  reset:resetUsers

} = usersSlice.actions;

export default usersSlice.reducer;
