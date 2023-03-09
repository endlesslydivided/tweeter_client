import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "../services/ApiSlice";
import authReducer from "./slices/AuthSlice";
import postsReducer from "./slices/PostsSlice";
import commentsReducer from "./slices/CommentsSlice";


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        posts: postsReducer,
        comments: commentsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({serializableCheck: false}).concat(apiSlice.middleware),
    devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
  