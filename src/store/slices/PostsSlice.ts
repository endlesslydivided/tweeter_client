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
} from "./PostActionsReducers";

export const postsSlice: any = createSlice({
  initialState: <any>[],
  name: "postsSlice",
  reducers: {
    setPosts: (state: any, action) => {
      const posts = action.payload;
      return [...posts];
    },
    appendPost: (state: any, action) => {
      const data = action.payload;
      return [data, ...state];
    },
    appendPosts: (state: any, action) => {
      const data = action.payload;
      return [...data, ...state];
    },
    deletePost: (state: any, action) => {
      const id = action.payload;
      return [...state.filter((i: any) => i.id !== id)];
    },
    deleteRetweets: (state: any, action) => {
      const id = action.payload;
      return [...state.filter((i: any) => i.parentRecordId !== id)];
    },
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
    incrementPostLikes: incrementLikes,
    decrementPostLikes: decrementLikes,
    incrementPostSaves: incrementSaves,
    decrementPostSaves: decrementSaves,
    incrementPostRetweets: incrementRetweets,
    decrementPostRetweets: decrementRetweets,
    incrementPostComments: incrementComments,
    decrementPostComments: decrementComments,
  },
});

export const {
  setPosts,
  appendPost,
  appendPosts,
  deletePost,
  appendPage:appendPostPage,
  deleteRetweets,
  reset: resetPosts,

  decrementPostLikes,
  incrementPostLikes,

  decrementPostSaves,
  incrementPostSaves,

  decrementPostComments,
  incrementPostComments,

  decrementPostRetweets,
  incrementPostRetweets,
} = postsSlice.actions;

export default postsSlice.reducer;
