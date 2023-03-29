import { createSlice } from "@reduxjs/toolkit";


export const favoriteMessages: any = createSlice({
  initialState: {messages:<any>[]},
  name: "favoriteMessages",
  reducers: {
    removeFavoriteMessage: (state:any,action:any) =>
    {
      const {id} = action.payload;
      state.messages = state.messages.filter((d:any) => d.id !== id);
      return state;
    },
    appendFavoriteMessagesPage:(state:any,action:any) =>
    {
      const rows = action.payload;

      let newState = [...state.messages];


      const retrievedEntries = rows.filter((c:any) => !newState?.includes(c));

      const editedEntries = retrievedEntries.filter((r:any) => newState?.some((c:any) => c.id === r.id));

      const newEntries = retrievedEntries.filter((c:any) => !newState?.some((r:any) => c.id === r.id));

      const appliedEntries = [...newState?.map((c:any) => editedEntries.map((e:any) => c.id === e.id ? e : c)[0] || c)];

      newState = appliedEntries ? [...appliedEntries,...newEntries]: [...newEntries];

      state.messages = newState;
      return state;
    },
    resetFavoriteMessages: (state:any,action:any) => {return {messages:<any>[]}}
    
  },
});

export const {
  removeFavoriteMessage,
  appendFavoriteMessagesPage,
  resetFavoriteMessages
} = favoriteMessages.actions;

export default favoriteMessages.reducer;
