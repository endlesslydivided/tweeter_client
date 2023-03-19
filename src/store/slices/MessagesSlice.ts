import { createSlice } from "@reduxjs/toolkit";


export const messagesSlice: any = createSlice({
  initialState: {messages:{},isLoading:false,},
  name: "messagesSlice",
  reducers: {
    setMessagesLoading: (state: any, action) => {
      const data = action.payload;
      state.isLoading = data;
      return state;
    },
    pushMessage: (state: any, action) => {
      const { dialogId, message,user } = action.payload;
      message.user = user;
      const newState = state.messages ? {...state.messages} : {};
      if(!newState[dialogId])
      {
        newState[dialogId]= {entries:[],count:0};
      }
      newState[dialogId]['entries'] = newState[dialogId] ? [message, ...newState[dialogId]['entries']] :[message];
      state.messages = newState;
      return state;
    },
    deleteMessage: (state: any, action) => {
      const { dialogId, messageId } = action.payload;
      const newState = {...state.messages};
      newState[dialogId]['entries'] = [...newState[dialogId].filter((m: any) => m.id !== messageId)];
      state.messages = newState;
      return state;
    },
    appendMessagesPage:(state:any,action:any) =>
    {
      const {dialogId,messages} = action.payload;
      const {rows,count} = messages;
      
      const newState = {...state.messages};

      const stateMessages = state.messages[dialogId]?.entries;

      if(stateMessages)
      {
        const retrievedEntries = rows.filter((c:any) => !stateMessages.includes(c));

        const editedEntries = retrievedEntries.filter((r:any) => stateMessages.some((c:any) => c.id === r.id));
  
        const newEntries = retrievedEntries.filter((c:any) => !stateMessages.some((r:any) => c.id === r.id));
  
        const appliedEntries = [...stateMessages.map((c:any) => editedEntries.map((e:any) => c.id === e.id ? e : c)[0] || c)];
  
        const finalList = appliedEntries ? [...appliedEntries,...newEntries]: [...newEntries];
  
        newState[dialogId]['entries'] = finalList;
      }
      else
      {
        newState[dialogId]= {entries:[],count:0};
        newState[dialogId].entries = rows;
      }

      newState[dialogId]['count'] = count;

      state.messages = newState;
      return state;
    },
    resetMessages: (state:any,action:any) => {
      const dialogId = action.payload;
      const newState = {...state.messages};
      newState[dialogId]= {entries:[],count:0};
      state.messages = newState;
      return state;
    }
  },
});

export const {
    pushMessage,
    deleteMessage,
    appendMessagesPage,
    resetMessages,
    setMessagesLoading
} = messagesSlice.actions;

export default messagesSlice.reducer;
