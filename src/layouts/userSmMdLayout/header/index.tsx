import {FC, useState} from 'react';
import {Col, Image, Layout, Menu, Row } from 'antd';
import type { MenuProps } from 'antd';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BOOKMARKS_ROUTE, EXPLORE_ROUTE } from '../../../utils/consts';
const logo = require('../../../assets/headerLogo.png');

const { Header} = Layout;

interface IHeaderProps 
{
    props?: any
}

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

const SmMdHeader: FC<IHeaderProps> = (props) => {

    const [current, setCurrent] = useState('home');
    const navigate = useNavigate();

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);

    };


    return (
    <>
      <Header>
        <Row justify="center" align="middle">
            <Col span={4} style={{justifyContent:"center",display:'flex'}}>
                <Image preview={false} width={120} src={logo}/>
            </Col>
            <Col span={16}>
                <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} defaultSelectedKeys={['0']}/>
            </Col>

            <Col span={4}>        
            </Col>

        </Row>
      </Header>
    </>
    );
}

export default SmMdHeader;