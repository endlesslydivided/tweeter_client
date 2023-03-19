
import { Col, Row, theme } from "antd";
import { useState } from "react";
import DialogList from "../../sections/chatSections/DialogList";
import './DialogsPage.tsx';

const { useToken } = theme;

const DialogsPage = () => {
    
    const token = useToken();

    return (
        <div  className='dialogs-page-container'>
            <Row className='dialogs-page-row' >
                <Col md={{span:12,offset:6}} style={{background:token.token.colorPrimary}} className='dialogs-col'>
                    <DialogList/>            
                </Col>
            </Row>
        </div>
    );
};

export default DialogsPage;

