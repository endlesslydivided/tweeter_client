import { createSlice } from "@reduxjs/toolkit";


export const SubscriptionsSlice: any = createSlice({
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

} = SubscriptionsSlice.actions;

export default SubscriptionsSlice.reducer;
