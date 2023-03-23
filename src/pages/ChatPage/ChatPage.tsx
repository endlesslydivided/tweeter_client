
import { Col, Row, theme } from "antd";
import { useState } from "react";
import ChatWindow from "../../components/ChatWindow/ChatWindow";
import './ChatPage.scss';

const { useToken } = theme;

const ChatPage = () => {

    
    const token = useToken();

    return (
        <div  className='chat-page-container'>
            <Row className='chat-page-row' >
                <Col md={{span:12,offset:6}}
                    sm={{span:24}}
                    xs={{span:24}}  className='chat-page-col'>
                    <ChatWindow />                 
                </Col>
            </Row>
        </div>
    );
};

export default ChatPage;

