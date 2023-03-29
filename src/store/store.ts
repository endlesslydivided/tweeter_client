import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "../services/ApiSlice";
import authReducer from "./slices/AuthSlice";
import postsReducer from "./slices/PostsSlice";
import commentsReducer from "./slices/CommentsSlice";
import usersReducer from "./slices/UsersSlice";
import userReducer from "./slices/UserSlice";
import subscriptionsReducer from "./slices/SubscriptionsSlice";
import dialogsReduce from "./slices/DialogsSlice";
import messagesReducer from "./slices/MessagesSlice";
import favoriteMessagesReducer from "./slices/FavoriteMessagesSlice";


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        posts: postsReducer,
        comments: commentsReducer,
        users:usersReducer,
        user:userReducer,
        dialogs:dialogsReduce,
        messages:messagesReducer,
        subscriptions: subscriptionsReducer,
        favoriteMessages: favoriteMessagesReducer

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({serializableCheck: false}).concat(apiSlice.middleware),
    devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
  