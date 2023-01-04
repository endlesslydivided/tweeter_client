import {useState} from 'react';
import {Outlet} from 'react-router-dom';
import Header from './header';
import {Layout} from 'antd';

const { Content} = Layout;


export default function UserSmMdLayout() 
{
    return (
        <>
            <Header/>
            <Content>
                <Outlet/>
            </Content>
        </>
    );
}