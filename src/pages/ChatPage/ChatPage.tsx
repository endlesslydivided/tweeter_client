
import { StarFilled } from "@ant-design/icons";
import { Button, Card, Col, Row, theme } from "antd";
import { useState } from "react";
import ChatWindow from "../../components/ChatWindow/ChatWindow";
import SideChatButtons from "../../components/SideChatButtons/SideChatButtons";
import WatchedDialogsList from "../../components/WatchedDialogsList/WatchedDialogsList";
import './ChatPage.scss';

const { useToken } = theme;

const ChatPage = () => {

    
    const token = useToken();

    return (
        <div  className='chat-page-container'>
            <Row gutter={[20,20]} className='chat-page-row' >
                <Col md={{span:12,offset:3}}
                    sm={{span:12}}
                    xs={{span:24}}  className='chat-page-col'>
                    <ChatWindow />                 
                </Col>
                <Col md={{span:6}}
                    sm={{span:12}}
                    xs={{span:0}}  className='watched-dialogs-col'>
                    <div className='side-chat-menu'>
                    <WatchedDialogsList />     
                    </div>
            
                </Col>
            </Row>
        </div>
    );
};

export default ChatPage;

