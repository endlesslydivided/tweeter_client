
import { MoreOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, Row, Space, theme } from "antd";
import { useState } from "react";
import DialogList from "../../sections/chatSections/DialogList";
import SearchBar from "../../sections/exploreSections/SearchBar";
import './DialogsPage.scss';

const { useToken } = theme;

const DialogsPage = () => {
    
    const token = useToken();

    return (
        <div  className='dialogs-page-container'>
            <Row className='dialogs-page-row' >
                <Col 
                    md={{span:12,offset:6}}
                    sm={{span:12,offset:6}}
                    xs={{span:24}} 
                    className='dialogs-col'>
                    
                    <Space.Compact block className="dialogs-space">
                        <Input.Search 
                        enterButton={null}  
                        className='dialogs-search-bar-input' placeholder="Search" /> 
                        
                        <Button icon={<MoreOutlined/>} type={'link'}/>
                    </Space.Compact>
                   
                    <DialogList/>            
   
                </Col>
            </Row>
        </div>
    );
};

export default DialogsPage;

