import { UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Menu, MenuProps, Space, theme, Typography } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import PostItem from "./PostItem";

const { useToken } = theme;


interface PostListProps
{
    post: object;
    currentUser: object;
}

const PostList:React.FC = ({}) =>
{



    return (
        <Space direction="vertical" className="post-list">

            <PostItem />
            <PostItem />
            <PostItem />

        </Space>
    )
}

export default PostList;


