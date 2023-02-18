import React from 'react'
import {Navigate, Route, Routes, useLocation} from 'react-router-dom'
import {useDispatch} from 'react-redux';

import UserSmMdLayout from '../../layouts/userSmMdLayout/UserSmMdLayout';
import ProfilePage from '../../pages/ProfilePage';
import { BOOKMARKS_ROUTE, CHAT_ROUTE, EXPLORE_ROUTE, FEED_PAGE, HOME_ROUTE, PROFILE_ROUTE, SETTINGS_ROUTE } from '../../utils/consts';
import HomePage from '../../pages/HomePage';
import HomeFeedPage from '../../pages/HomeFeedPage';
import BookmarksPage from '../../pages/BookmarksPage';
import SettingsPage from '../../pages/SettignsPage';
import UserPage from '../../pages/UserPage';
import { useAppSelector } from '../../hooks/redux';
import { useGetMeQuery } from '../../services/AuthApiSlice';
import Loader from '../Loader';
import UnathorizedPage from '../../pages/UnathorizedPage';
import ExplorePage from '../../pages/ExplorePage';
import ChatPage from '../../pages/ChatPage';
import styled from 'styled-components';

interface AppRouterProps {

}

const AppRouter: React.FC<AppRouterProps>= () => {

    const {data: userData, isLoading, isError} = useGetMeQuery();
    const dispatch = useDispatch();
    const user: any = useAppSelector(state => state?.auth?.user);

    
    const location = useLocation();

    if (isLoading || (!user && !isError)) {
        return <Loader/>
    }

    return (
        !user ?
        <Routes>
            <Route path="/" element={<UserSmMdLayout/>}>
                <Route index element={<HomePage/>}/>
                <Route path={`/${FEED_PAGE}`} element={<HomeFeedPage/>}/>
                <Route path={`/${BOOKMARKS_ROUTE}`} element={<BookmarksPage/>}/>
                <Route path={`/${EXPLORE_ROUTE}`} element={<ExplorePage/>}/>
                <Route path={`/${PROFILE_ROUTE}`} element={<ProfilePage/>}/>
                <Route path={`/${SETTINGS_ROUTE}`} element={<SettingsPage/>}/>
                <Route path={`/${PROFILE_ROUTE}/:id`} element={<UserPage/>}/>
                <Route path={`/${CHAT_ROUTE}`} element={<ChatPage/>}/>
                <Route path={`/${CHAT_ROUTE}/:id`} element={<ChatPage/>}/>

            </Route>
            <Route path="*" element={<Navigate to={"/"} replace/>}/>
        </Routes>
         :
         <Routes>
            <Route path="/signIn" element={<UnathorizedPage/>}/>
            <Route path="/signUp" element={<UnathorizedPage/>}/>
            <Route path="*" element={<Navigate to="/signIn" replace/>}/>
         </Routes>
    )
};

export default AppRouter