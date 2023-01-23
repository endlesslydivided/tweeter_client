import {Outlet} from 'react-router-dom';
import {FC, useState} from 'react';
import {Col, Image, Layout, Menu, Row } from 'antd';
import type { MenuProps } from 'antd';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BOOKMARKS_ROUTE, EXPLORE_ROUTE } from '../../utils/consts';
import {UserOutlined} from '@ant-design/icons'
const logo = require('../../assets/headerLogo.png');

const { Header,Content} = Layout;



const items: MenuProps['items'] = [
    {
        label: (<NavLink to={`../`}>Home</NavLink>),
        key: 'home',
    },
    {
        label: (<NavLink to={`../${EXPLORE_ROUTE}`}>Explore</NavLink>),
        key: 'explore',
    },
    {
      label: (<NavLink to={`../${BOOKMARKS_ROUTE}`}>Bookmarks</NavLink> 
      ),
      key: 'bookmarks',
    },
  ];


export default function UserSmMdLayout() 
{

    const [current, setCurrent] = useState('home');
    const navigate = useNavigate();

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);

    };
    
    return (
        <Layout>
            <Header  style={{display:'flex'}}>
                <div>
                    <Image preview={false} width={120} src={logo}/>
                </div>
                <div className='header-col header-nav'>
                    <Menu onClick={onClick} 
                    selectedKeys={[current]} mode="horizontal"
                    items={items} defaultSelectedKeys={['0']}/>
                </div>
                <div style={{whiteSpace: 'nowrap'}}>
                <Link to="/sign-in" >
                    <UserOutlined />
                    <span>Sign in</span>
                </Link>
                </div>
            </Header>
            <Content>
                <Outlet/>
            </Content>
        </Layout>
    );
}