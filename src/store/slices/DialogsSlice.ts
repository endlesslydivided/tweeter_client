import { createSlice } from "@reduxjs/toolkit";


export const dialogsSlice: any = createSlice({
  initialState: {dialogs:<any>[],count: 0,watchedDialogs:<any>[]},
  name: "dialogsSlice",
  reducers: {
    addWatchedDialog: (state:any,action:any) =>
    {
      const data = action.payload;
      let newState = [...state.watchedDialogs];
      const retrievedEntries = newState.filter((d:any) => d.id !== data.id);

      state.watchedDialogs = [data,...retrievedEntries];
      return state;
    },
    removeWatchedDialog: (state:any,action:any) =>
    {
      const {id} = action.payload;
      state.watchedDialogs = state.watchedDialogs.filter((d:any) => d.id !== id);
      return state;
    },
    appendDialogsPage:(state:any,action:any) =>
    {
      const {rows,count} = action.payload;

      let newState = [...state.dialogs];


      const retrievedEntries = rows.filter((c:any) => !newState?.includes(c));

      const editedEntries = retrievedEntries.filter((r:any) => newState?.some((c:any) => c.id === r.id));

      const newEntries = retrievedEntries.filter((c:any) => !newState?.some((r:any) => c.id === r.id));

      const appliedEntries = [...newState?.map((c:any) => editedEntries.map((e:any) => c.id === e.id ? e : c)[0] || c)];

      newState = appliedEntries ? [...appliedEntries,...newEntries]: [...newEntries];

      state.dialogs = newState;
      state.count = count;
      return state;
    },
    pushPage:(state:any,action:any) =>
    {
      const {rows,count} = action.payload;
      state.dialogs = [...rows,...state.dialogs];
      state.count = count;
      return state;
    },
    pushDialog:(state:any,action:any) =>
    {
      const {dialog} = action.payload;
      state.dialogs = [dialog,...state.dialogs]
      return state;
    },
    deleteDialog:(state:any,action:any) =>
    {
      const {dialogId} = action.payload;
      state.dialogs =[...state.dialogs.filter((d:any) => d.id !== dialogId)];
      return state;
    },
    incrementIncomeMessages:(state:any,action:any) =>
    {
      const {dialogId,message} = action.payload;
      const dialog = state.dialogs.find((d:any) => d.id === dialogId);
      dialog.lastMessage = message;
      dialog.unread += 1;
      state.dialogs = [...state.dialogs.map((d:any) =>d.id === dialogId ? dialog :d)]
      return state;
    },
    decrementIncomeMessages:(state:any,action:any) =>
    {
      const {dialogId,messageCount} = action.payload;
      const dialog = state.dialogs.find((d:any) => d.id === dialogId);
      dialog.unread -= messageCount;
      state.dialogs = [...state.dialogs.map((d:any) =>d.id === dialogId ? dialog :d)]
      return state;
    },
    swapDialog:(state:any,action:any) =>
    {
      const {dialogId} = action.payload;
      const dialog = state.dialogs.find((d:any) => d.id === dialogId);
      state.dialogs = [dialog,...state.dialogs.filter((d:any) => d.id !== dialogId)]
      return state;
    },
    
    resetDialogs: () => {return {dialogs:<any>[], count: 0,watchedDialogs:<any>[]}},
  },
});

export const {
  appendDialogsPage,
  pushPage,
  pushDialog,
  deleteDialog,
  incrementIncomeMessages,
  decrementIncomeMessages,
  swapDialog,
  resetDialogs,
  addWatchedDialog,
  removeWatchedDialog

} = dialogsSlice.actions;

export default dialogsSlice.reducer;
