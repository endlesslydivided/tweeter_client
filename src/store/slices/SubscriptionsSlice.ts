import { createSlice } from "@reduxjs/toolkit";


export const subscriptionsSlice: any = createSlice({
  initialState: <any>[],
  name: "subscriptionSlice",
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

  appendPage:appendSubscriptionsPage,
  reset:resetSubscriptions

} = subscriptionsSlice.actions;

export default subscriptionsSlice.reducer;
