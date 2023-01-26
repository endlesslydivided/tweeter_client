import { Menu, MenuProps, theme, Typography } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const { useToken } = theme;


interface VerticalSideMenuProps
{
    isLeftSided?: boolean;
    items: MenuProps['items'];
}

const VerticalSideMenu:React.FC<VerticalSideMenuProps> = ({isLeftSided = true,items}) =>
{
    const token = useToken();
    const ThemedVerticalMenu = styled(Menu)`--theme-color:${token.token.colorPrimary}`

    const [current, setCurrent] = useState('home');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);

    };

    return (
        <ThemedVerticalMenu 
        className="vertical-menu"
        onClick={onClick}  
        selectedKeys={[current]} mode='vertical'
        items={items} defaultSelectedKeys={['0']}/>
    )
}

export default VerticalSideMenu;


