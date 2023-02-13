import {Outlet, useLocation} from 'react-router-dom';
import {FC, useState} from 'react';
import {Avatar, Button, Col, Divider, Image, Layout, Menu, Popover, Row, Space, Typography } from 'antd';
import type { MenuProps } from 'antd';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BOOKMARKS_ROUTE, CHAT_ROUTE, EXPLORE_ROUTE, HOME_ROUTE, PROFILE_ROUTE, SETTINGS_ROUTE } from '../../utils/consts';
import {ArrowDownOutlined, CaretDownOutlined, GlobalOutlined, ImportOutlined, MailFilled, MailOutlined, ProfileOutlined, SettingFilled, UserOutlined} from '@ant-design/icons'
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
        key: HOME_ROUTE,
    },
    {
        label: (<Typography.Text strong type='secondary'>
                    <NavLink to={`../${EXPLORE_ROUTE}`}>Explore</NavLink>
                </Typography.Text>),
        key: EXPLORE_ROUTE,
    },
    {
      label: (<Typography.Text strong type='secondary'>
                <NavLink to={`../${BOOKMARKS_ROUTE}`}>Bookmarks</NavLink>
              </Typography.Text>),
      key: BOOKMARKS_ROUTE,
    },
  ];


export default function UserSmMdLayout() 
{
    const location = useLocation();
    const [current, setCurrent] = useState(location.pathname);
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
                    items={items}/>
                </div>
                <div style={{whiteSpace: 'nowrap'}}>
                    <Avatar.Group>
                        <Avatar icon={<UserOutlined />} shape="square" />
                        <Popover id='headerPopover' placement="bottomRight"
                            content=
                            {   <>
                                    <Space direction='vertical' size={0} className='user-header-popover-content'>
                                        <Button block className='user-header-button-profile'  onClick={() => navigate(`${PROFILE_ROUTE}`)} type='text' icon={<UserOutlined/>}>
                                            My profile
                                        </Button>
                                        <Button block className='user-header-button-chat'  onClick={() => navigate(`${CHAT_ROUTE}`)}  type='text' icon={<MailFilled/>}>
                                            Group chat
                                        </Button>
                                        <Button block className='user-header-button-settings'  onClick={() => navigate(`${SETTINGS_ROUTE}`)}  type='text' icon={<SettingFilled/>}>
                                            Settings
                                        </Button>
                                    </Space>
                                    <Divider type='horizontal' style={{margin:'10px 0px'}}/>
                                    <Space direction='vertical' className='user-header-popover-content'>
                                        <Button block danger className='user-header-button-logout'  type='text' color='red' icon={<ImportOutlined/>} >
                                            Logout 
                                        </Button>
                                    </Space>
                                </>
                            } 
                            trigger="click"
                        >
                            <Typography.Text style={{margin: '5px 0px 0px 10px'}} strong>Name Surname <CaretDownOutlined/></Typography.Text>  
                        </Popover>

                    </Avatar.Group>
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