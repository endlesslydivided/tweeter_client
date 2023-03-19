import { createSlice } from "@reduxjs/toolkit";
import {
  decrementComments,
  decrementLikes,
  decrementRetweets,
  decrementSaves,
  incrementComments,
  incrementLikes,
  incrementRetweets,
  incrementSaves,
} from "./CommentActionsReducers";

export const commentsSlice: any = createSlice({
  initialState: {},
  name: "commentsSlice",
  reducers: {
    setComments: (state: any, action) => {
      const { parentId, comments } = action.payload;
      const newState = state ? {...state} : {};
      newState[parentId] = comments;
      return newState;
    },
    appendComment: (state: any, action) => {
      const { parentId, data } = action.payload;
      const newState = state ? {...state} : {};
      newState[parentId] = [data, ...newState[parentId]];
      return newState;
    },
    appendComments: (state: any, action) => {
      const { parentId, data } = action.payload;
      const newState = state ? {...state} : {};
      newState[parentId] = [...data, ...newState[parentId]];
      return newState;
    },
    deleteComment: (state: any, action) => {
      const { parentId, id } = action.payload;
      const newState = {...state};
      newState[parentId] = [...newState[parentId].filter((i: any) => i.id !== id)];
      return newState;
    },
    appendPage:(state:any,action:any) =>
    {
      const {parentId,data} = action.payload;
      
      const newState = {...state};

      const stateComments = state[parentId];

      if(stateComments)
      {
        const retrievedEntries = data.filter((c:any) => !stateComments.includes(c));

        const editedEntries = retrievedEntries.filter((r:any) => stateComments.some((c:any) => c.id === r.id));
  
        const newEntries = retrievedEntries.filter((c:any) => !stateComments.some((r:any) => c.id === r.id));
  
        const appliedEntries = [...stateComments.map((c:any) => editedEntries.map((e:any) => c.id === e.id ? e : c)[0] || c)];
  
        const finalList = appliedEntries ? [...appliedEntries,...newEntries]: [...newEntries];
  
        newState[parentId] = finalList;
      }
      else
      {
        newState[parentId] = data;
      }

      return newState;
    },
    appendRepliesPage:(state:any,action:any) =>
    {
      const {parentId,data} = action.payload;
      
      const newState = {...state};

      const stateComments = state[parentId];

      if(stateComments)
      {
        const retrievedEntries = data.filter((c:any) => !stateComments.includes(c));

        const editedEntries = retrievedEntries.filter((r:any) => stateComments.some((c:any) => c.id === r.id));
  
        const newEntries = retrievedEntries.filter((c:any) => !stateComments.some((r:any) => c.id === r.id));
  
        const appliedEntries = [...stateComments.map((c:any) => editedEntries.map((e:any) => c.id === e.id ? e : c)[0] || c)];
  
        const finalList = appliedEntries ? [...newEntries,...appliedEntries]: [...newEntries];
  
        newState[parentId] = finalList;
      }
      else
      {
        newState[parentId] = data;
      }

      return newState;
    },
    reset: (state:any,action:any) => {
      const parentId = action.payload;
      const newState = {...state};
      newState[parentId] = [];
      return newState;
    },
    incrementCommentLikes: incrementLikes,
    decrementCommentLikes: decrementLikes,
    incrementCommentSaves: incrementSaves,
    decrementCommentSaves: decrementSaves,
    incrementCommentRetweets: incrementRetweets,
    decrementCommentRetweets: decrementRetweets,
    incrementCommentComments: incrementComments,
    decrementCommentComments: decrementComments,
  },
});

export const {
  setComments,
  appendComment,
  deleteComment,
  appendPage:appendCommentPage,
  appendRepliesPage,
  reset: resetComments,

  decrementCommentLikes,
  incrementCommentLikes,

  decrementCommentSaves,
  incrementCommentSaves,

  decrementCommentComments,
  incrementCommentComments,

  decrementCommentRetweets,
  incrementCommentRetweets,
} = commentsSlice.actions;

export default commentsSlice.reducer;
