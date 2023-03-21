import React, { createContext, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import UserSmMdLayout from '../../layouts/SmMdLayout/SmMdLayout';
import BookmarksPage from '../../pages/BookmarksPage';
import ChatPage from '../../pages/ChatPage/ChatPage';
import DialogsPage from '../../pages/DialogsPage';
import ExplorePage from '../../pages/ExplorePage/ExplorePage';
import HomeFeedPage from '../../pages/HomeFeedPage';
import ProfilePage from '../../pages/ProfilePage';
import SettingsPage from '../../pages/SettingsPage/SettingsPage';
import UnathorizedPage from '../../pages/UnauthorizedPage/UnathorizedPage';
import UserPage from '../../pages/UserPage';
import { useGetMeQuery } from '../../services/AuthApiSlice';
import { BOOKMARKS_ROUTE, CHAT_ROUTE, EXPLORE_ROUTE, HOME_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, SETTINGS_ROUTE } from '../../utils/consts';
import Loader from '../Loader/Loader';
import { SocketProvider } from '../SocketProvider/SocketProvider';


interface AppRouterProps {

}

export const PostListContext:any = createContext(null);

const AppRouter: React.FC<AppRouterProps>= () => {

    const {data: userData, isFetching, isError} = useGetMeQuery();
    const user: any = useAppSelector((state:any) => state?.auth?.user);
    

    if (isFetching) {
        return <Loader/>
    }

 
    return (
        user ?
        <SocketProvider auth={user}>
            <Routes>
                <Route path="/" element={<UserSmMdLayout/>}>

                    <Route index element={<ProfilePage/>}/>

                    <Route path={`${HOME_ROUTE}`} element={<HomeFeedPage/>}/>

                    <Route path={`${PROFILE_ROUTE}`} element={<ProfilePage/>}/>
                    <Route path={`${PROFILE_ROUTE}/:id`} element={<UserPage/>}/>

                    <Route path={`${BOOKMARKS_ROUTE}`} element={<BookmarksPage/>}/>

                    <Route path={`${EXPLORE_ROUTE}`} element={<ExplorePage/>}/>

                    <Route path={`${SETTINGS_ROUTE}`} element={<SettingsPage/>}/>
                    
                    <Route path={`${CHAT_ROUTE}`} element={<DialogsPage/>}/>
                    <Route path={`${CHAT_ROUTE}/:id`} element={<ChatPage/>}/>

                </Route>
                <Route path="*" element={<Navigate to={`${PROFILE_ROUTE}`}  replace={true}/>}/>
            </Routes>
        </SocketProvider>
         :
         <Routes>
            <Route path={`${LOGIN_ROUTE}`} element={<UnathorizedPage/>}/>
            <Route path={`${REGISTRATION_ROUTE}`} element={<UnathorizedPage/>}/>
            <Route path="*" element={<Navigate to={`${LOGIN_ROUTE}`} replace/>}/>
         </Routes>
    )
};

export default AppRouter