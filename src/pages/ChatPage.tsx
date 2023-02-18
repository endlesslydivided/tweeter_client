import { BookOutlined, CommentOutlined, HeartOutlined, MailOutlined, PictureOutlined, RetweetOutlined, SendOutlined, SoundOutlined, StarOutlined, UserOutlined } from "@ant-design/icons";

import { Avatar, Button, Col,theme, List, Radio, Row, Space, Typography, Empty, Input, Tooltip } from "antd";
import { useState } from "react";
import styled from "styled-components";
import ChatWindowsSection from "../sections/chatSections/ChatWindowsSection";
import DialogsListSection from "../sections/chatSections/DialogsListSection";


const { useToken } = theme;

const ChatPage = () => {

    const [selectedDialog,setSelectedDialog] = useState(null);

    const token = useToken();

    const dialogs = [
        {
            id:'1',
            name:'Name',
            surname:'Surname',
            message:
            {
                text: 'Hello!',
                createdAt:'4:30'
            }
        },
        {
            id:'2',
            name:'Name',
            surname:'Surname',
            message:
            {
                text: 'Hello!',
                createdAt:'14:30'
            }
        },
        {
            id:'3',
            name:'Name',
            surname:'Surname',
            message:
            {
                text: 'Hello!',
                createdAt:'20:45'
            }
        },
    ]
 
    return (
        <div  className='chat-page-container'>
            <Row  style={{color:'white'}} >
                <Col span={6} style={{background:token.token.colorPrimary}} className='dialogs-col'>
                    <DialogsListSection dialogs={dialogs} selectedDialog={selectedDialog} setSelectedDialog={setSelectedDialog}/>            
                </Col>
                <Col span={18}>
                    <ChatWindowsSection selectedDialog={selectedDialog}/>                 
                </Col>
            </Row>
        </div>
    );
};

export default ChatPage;

