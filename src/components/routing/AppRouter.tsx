import React from 'react'
import {Navigate, Route, Routes, useLocation} from 'react-router-dom'
import {useDispatch} from 'react-redux';

import UserSmMdLayout from '../../layouts/userSmMdLayout/UserSmMdLayout';
import ProfilePage from '../../pages/ProfilePage';
import { BOOKMARKS_ROUTE, EXPLORE_ROUTE, HOME_ROUTE, PROFILE_ROUTE, SETTINGS_ROUTE } from '../../utils/consts';
import HomePage from '../../pages/HomePage';
import ExplorePage from '../../pages/ExplorePage';
import BookmarksPage from '../../pages/BookmarksPage';
import SettingsPage from '../../pages/SettignsRoute';
import UserPage from '../../pages/UserPage';
import { useAppSelector } from '../../hooks/redux';
import { useGetMeQuery } from '../../services/AuthApiSlice';
import Loader from '../Loader';
import UnathorizedPage from '../../pages/UnathorizedPage';

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
                <Route path={`/${BOOKMARKS_ROUTE}`} element={<BookmarksPage/>}/>
                <Route path={`/${EXPLORE_ROUTE}`} element={<ExplorePage/>}/>
                <Route path={`/${PROFILE_ROUTE}`} element={<ProfilePage/>}/>
                <Route path={`/${SETTINGS_ROUTE}`} element={<SettingsPage/>}/>
                <Route path={`/${PROFILE_ROUTE}/:id`} element={<UserPage/>}/>
            </Route>
            <Route path="*" element={<Navigate to={"/"} replace/>}/>
        </Routes>
         :
         <Routes>
             <Route path="/">
                 <Route index element={<UnathorizedPage/>}/>
             </Route>
             <Route path="*" element={<Navigate to="/" replace/>}/>
         </Routes>
    )
};

export default AppRouter