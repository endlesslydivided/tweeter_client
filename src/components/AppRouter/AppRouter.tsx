import React from 'react'
import {Navigate, Route, Routes, useLocation} from 'react-router-dom'
import {useDispatch} from 'react-redux';
import UserSmMdLayout from '../../layouts/SmMdLayout/SmMdLayout';
import { BOOKMARKS_ROUTE, CHAT_ROUTE, EXPLORE_ROUTE, FEED_PAGE, HOME_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, SETTINGS_ROUTE } from '../../utils/consts';
import HomePage from '../../pages/HomePage';
import HomeFeedPage from '../../pages/HomeFeedPage';
import BookmarksPage from '../../pages/BookmarksPage';
import SettingsPage from '../../pages/SettingsPage/SettingsPage';
import { useAppSelector } from '../../hooks/redux';
import { useGetMeQuery } from '../../services/AuthApiSlice';
import Loader from '../Loader/Loader';
import UnathorizedPage from '../../pages/UnauthorizedPage/UnathorizedPage';
import ExplorePage from '../../pages/ExporePage/ExplorePage';
import ChatPage from '../../pages/ChatPage/ChatPage';

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
        user ?
        <Routes>
            <Route path="/" element={<UserSmMdLayout/>}>

                <Route index element={<HomePage/>}/>
                <Route path={`/:id`} element={<HomePage/>}/>
                <Route path={`${FEED_PAGE}`} element={<HomeFeedPage/>}/>
                <Route path={`${BOOKMARKS_ROUTE}`} element={<BookmarksPage/>}/>
                <Route path={`${EXPLORE_ROUTE}`} element={<ExplorePage/>}/>
                <Route path={`${SETTINGS_ROUTE}`} element={<SettingsPage/>}/>
                <Route path={`${CHAT_ROUTE}`} element={<ChatPage/>}/>
                <Route path={`${CHAT_ROUTE}/:id`} element={<ChatPage/>}/>

            </Route>
            <Route path="*" element={<Navigate to={"/"} replace/>}/>
        </Routes>
         :
         <Routes>
            <Route path={`${LOGIN_ROUTE}`} element={<UnathorizedPage/>}/>
            <Route path={`${REGISTRATION_ROUTE}`} element={<UnathorizedPage/>}/>
            <Route path="*" element={<Navigate to={`${LOGIN_ROUTE}`} replace/>}/>
         </Routes>
    )
};

export default AppRouter