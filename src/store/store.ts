import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "../services/ApiSlice";
import authReducer from "./slices/AuthSlice";
import postsReducer from "./slices/PostsSlice";
import commentsReducer from "./slices/CommentsSlice";
import usersReducer from "./slices/UsersSlice";
import userReducer from "./slices/UserSlice";
import subscriptionsReducer from "./slices/SubscriptionsSlice";


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        posts: postsReducer,
        comments: commentsReducer,
        users:usersReducer,
        user:userReducer,
        subscriptions: subscriptionsReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({serializableCheck: false}).concat(apiSlice.middleware),
    devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
  