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
    selectedKey: string;
    setSelecteKey:Function;
}

const VerticalSideMenu:React.FC<VerticalSideMenuProps> = ({isLeftSided = true,items,selectedKey,setSelecteKey}) =>
{
    const token = useToken();
    const ThemedVerticalMenu = styled(Menu)`--theme-color:${token.token.colorPrimary}`

    const onClick: MenuProps['onClick'] = e => setSelecteKey(e.key);


    return (
        <ThemedVerticalMenu className="vertical-menu" onClick={onClick}  
        selectedKeys={[selectedKey]} mode='vertical'
        items={items} defaultSelectedKeys={[`0`]}/>
    )
}

export default VerticalSideMenu;


