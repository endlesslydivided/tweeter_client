import React, { createContext, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import UserSmMdLayout from '../../layouts/SmMdLayout/SmMdLayout';
import BookmarksPage from '../../pages/BookmarksPage';
import ChatPage from '../../pages/ChatPage/ChatPage';
import ExplorePage from '../../pages/ExporePage/ExplorePage';
import HomeFeedPage from '../../pages/HomeFeedPage';
import HomePage from '../../pages/HomePage';
import SettingsPage from '../../pages/SettingsPage/SettingsPage';
import UnathorizedPage from '../../pages/UnauthorizedPage/UnathorizedPage';
import { useGetMeQuery } from '../../services/AuthApiSlice';
import { BOOKMARKS_ROUTE, CHAT_ROUTE, EXPLORE_ROUTE, FEED_PAGE, LOGIN_ROUTE, REGISTRATION_ROUTE, SETTINGS_ROUTE } from '../../utils/consts';
import Loader from '../Loader/Loader';


interface AppRouterProps {

}

export const PostListContext:any = createContext(null);

const AppRouter: React.FC<AppRouterProps>= () => {

    const {data: userData, isFetching, isError} = useGetMeQuery();
    const user: any = useAppSelector((state:any) => state?.auth?.user);

    useEffect(() => {},[isFetching]);
    

    if (isFetching || (!user && !isError)) {
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
            <Route path="*" element={<Navigate to={"/"} relative={'route'} replace={true}/>}/>
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