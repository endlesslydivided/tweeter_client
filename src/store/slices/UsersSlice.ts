import { createSlice } from "@reduxjs/toolkit";


export const usersSlice: any = createSlice({
  initialState: <any>[],
  name: "usersSlice",
  reducers: {
    appendPage:(state:any,action:any) =>
    {
      const data = action.payload;
      const retrievedEntries = data.filter((c:any) => !state?.includes(c));

      const editedEntries = retrievedEntries.filter((r:any) => state?.some((c:any) => c.id === r.id));

      const newEntries = retrievedEntries.filter((c:any) => !state?.some((r:any) => c.id === r.id));

      const appliedEntries = [...state?.map((c:any) => editedEntries.map((e:any) => c.id === e.id ? e : c)[0] || c)];

      const finalList = appliedEntries ? [...appliedEntries,...newEntries]: [...newEntries];

      return finalList;

    },
    
    reset: () => [],
  },
});

export const {

  appendPage:appendUsersPage,
  reset:resetUsers

} = usersSlice.actions;

export default usersSlice.reducer;
