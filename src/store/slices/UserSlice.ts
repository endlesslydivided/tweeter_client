import { createSlice } from "@reduxjs/toolkit";


export const userSlice: any = createSlice({
  initialState: null,
  name: "userSlice",
  reducers: {
    setUser:(state:any,action:any) =>
    {
        const data = action.payload;
        return data;
    },
    incrementFollowers:(state:any,action:any) =>
    {
        return {...state,counts:{...state?.counts,followersCount:(Number.parseInt(state?.counts?.followersCount) + 1).toString()}};
    },
    decrementFollowers:(state:any,action:any) =>
    {
        return {...state,counts:{...state?.counts,followersCount:(Number.parseInt(state?.counts?.followersCount) - 1 ).toString()}};
    },
    reset: () => null
  },
});

export const {

  setUser,
  reset:resetUser,
  incrementFollowers,
  decrementFollowers

} = userSlice.actions;

export default userSlice.reducer;
