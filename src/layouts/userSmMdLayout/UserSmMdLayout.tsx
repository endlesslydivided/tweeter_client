import {Outlet} from 'react-router-dom';
import {FC, useState} from 'react';
import {Avatar, Col, Image, Layout, Menu, Row, Typography } from 'antd';
import type { MenuProps } from 'antd';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BOOKMARKS_ROUTE, EXPLORE_ROUTE } from '../../utils/consts';
import {UserOutlined} from '@ant-design/icons'
import styled from "styled-components";

const logo = require('../../assets/headerLogo.png');
const { Header,Content,Footer} = Layout;

const StyledMenu = styled(Menu)`
.ant-menu-item-selected.ant-menu-item-only-child::after, 
.ant-menu-item-active.ant-menu-item-only-child:hover::after
{
    border-bottom-width: 3px;
    rotate: 180deg;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}`

const items: MenuProps['items'] = [
    {
        label: (<Typography.Text strong type='secondary'>
                    <NavLink to={`../`}>Home</NavLink>
                </Typography.Text>),
        key: 'home',
    },
    {
        label: (<Typography.Text strong type='secondary'>
                    <NavLink to={`../${EXPLORE_ROUTE}`}>Explore</NavLink>
                </Typography.Text>),
        key: 'explore',
    },
    {
      label: (<Typography.Text strong type='secondary'>
                <NavLink to={`../${BOOKMARKS_ROUTE}`}>Bookmarks</NavLink>
              </Typography.Text>),
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
        <Layout style={{ background: "#F2F2F2"}}>
            <Header  style={{display:'flex'}}>
                <div>
                    <Image preview={false} width={120} src={logo}/>
                </div>
                <div className='header-col header-nav'>
                    <StyledMenu             
                    onClick={onClick}  
                    selectedKeys={[current]} mode="horizontal"
                    items={items} defaultSelectedKeys={['0']}/>
                </div>
                <div style={{whiteSpace: 'nowrap'}}>
                    <Link to="/sign-in" >
                    <Avatar.Group>
                        <Avatar icon={<UserOutlined />} shape="square" />
                        <Typography.Text style={{margin: '5px 0px 0px 10px'}} strong>Name Surname</Typography.Text>
                    </Avatar.Group>
                    </Link>
                </div>
            </Header>
            <Content style={{display:'grid',width:'100vw'}}>
                <Outlet/>
            </Content>
            <Footer style={{ background: "#F2F2F2",position:'sticky',height:'100%',textAlign:'center'}}>
                <Typography.Title disabled level={5}> created by endlesslydivided, 2023</Typography.Title>
            </Footer>
        </Layout>
    );
}