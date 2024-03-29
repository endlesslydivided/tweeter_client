import { CaretDownOutlined, ImportOutlined, MailFilled, SettingFilled, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Button, Divider, Image, Layout, Menu, Popover, Space, Typography } from 'antd';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { useSignOutMutation } from '../../services/AuthApiSlice';
import { BOOKMARKS_ROUTE, CHAT_ROUTE, EXPLORE_ROUTE, HOME_ROUTE, PROFILE_ROUTE, SETTINGS_ROUTE } from '../../utils/consts';
import './SmMdLayout.scss';

const logo = require('../../assets/headerLogo.png');
const { Header,Content,Footer} = Layout;

const items: MenuProps['items'] = [
    {
        label: (<Typography.Text strong type='secondary'>
                    <NavLink to={`../${HOME_ROUTE}`}>Home</NavLink>
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


export default function SmMdLayout() 
{

    const [signOut, result] = useSignOutMutation(); 

    const navigate = useNavigate();
    const userState:any = useAppSelector((state:any) => state.auth.user);

    const currentPath = window.location.pathname !== EXPLORE_ROUTE && window.location.pathname  !== BOOKMARKS_ROUTE ? HOME_ROUTE : window.location.pathname;

    const signOutHandler:Function = () =>
    {
        signOut();
    }
    return (
        <Layout className={`smMd-layout ${!!window.location.pathname.match(CHAT_ROUTE) ? 'chat-layout' : ''}`}>
            <Header>
                <div onClick={() => navigate(PROFILE_ROUTE)} style={{cursor:'pointer'}}>
                    <Image preview={false} width={120} src={logo}/>
                </div>
                <div className='header-nav-container'>
                    <Menu selectedKeys={[currentPath]} mode="horizontal" items={items}/>
                </div>
                <div className='header-popover-container'>
                    <Avatar.Group>
                        <Avatar 
                        style={{cursor:'pointer'}}
                        icon={<UserOutlined />}
                        size={'large'} 
                        src={ userState?.mainPhoto ?  process.env.REACT_APP_BACK_SERVER + userState?.mainPhoto?.path : null} 
                        onClick={() => navigate(`${PROFILE_ROUTE}`)}  shape="square" />
                        <Popover id='headerPopover' placement="bottomRight"
                            content=
                            {<>
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

                                <Divider type='horizontal'/>

                                <Space direction='vertical' className='user-header-popover-content'>
                                    <Button block danger className='user-header-button-logout' onClick={() => signOutHandler()}  type='text' color='red' icon={<ImportOutlined/>} >
                                        Logout 
                                    </Button>
                                </Space>
                            </>
                            } 
                            trigger="click"
                        >
                            <Typography.Text strong>{`${userState?.firstname} ${userState?.surname}`}<CaretDownOutlined/></Typography.Text>  
                        </Popover>

                    </Avatar.Group>
                </div>
            </Header>
            <Content>
                <Outlet/>
            </Content>
            {/* <Footer style={{ background: "#F2F2F2",position:'sticky',height:'100%',textAlign:'center'}}>
                <Typography.Title disabled level={5}> created by endlesslydivided, 2023</Typography.Title>
            </Footer> */}
        </Layout>
    );
}