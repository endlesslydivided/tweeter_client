
import { Col, Row, theme } from "antd";
import { useState } from "react";
import ChatWindow from "../../sections/chatSections/ChatWindow";
import './ChatPage.scss';

const { useToken } = theme;

const ChatPage = () => {

    
    const token = useToken();

    return (
        <div  className='chat-page-container'>
            <Row className='chat-page-row' >
                <Col span={24} className='chat-page-col'>
                    <ChatWindow />                 
                </Col>
            </Row>
        </div>
    );
};

export default ChatPage;

