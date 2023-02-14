import { BookOutlined, CommentOutlined, HeartOutlined, MailOutlined, PictureOutlined, RetweetOutlined, SendOutlined, SoundOutlined, StarOutlined, UserOutlined } from "@ant-design/icons";

import { Avatar, Button, Col,theme, List, Radio, Row, Space, Typography, Empty, Input, Tooltip } from "antd";
import { useState } from "react";
import styled from "styled-components";
import SearchBar from "../sections/exploreSections/SearchBar";
import PostForm from "../sections/feedPostsSections/PostForm";

const { useToken } = theme;




const ChatPage = () => {

    const [replyRule,setReplyRule] = useState('all');
    const [selectedDialog,setselectedDialog] = useState("");

    const token = useToken();
    const GradientColumn = styled(Col)`
    --theme-color:${token.token.colorPrimary}; 

    
    `

    const dialogs = [
        {
            id:'1',
            name:'Name',
            surname:'Surname',
            lastMessage:'Hello!'
        },
        {
            id:'2',
            name:'Name',
            surname:'Surname',
            lastMessage:'Hello!'
        },
        {
            id:'3',
            name:'Name',
            surname:'Surname',
            lastMessage:'Hello!'
        },
    ]
    const messages = [
        {
            id:'1',
            name:'Name',
            surname:'Surname',
            lastMessage:'Hello!',
            time:'10 January 10:02'
        },
        {
            id:'2',
            name:'NoName',
            surname:'NoSurname',
            lastMessage:`Hello! Hello!Hello!Hello!Hello!Hello!Hello!
            Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!Hello!`,
            time:'10 January 10:03'
        },
        {
            id:'1',
            name:'Name',
            surname:'Surname',
            lastMessage:'Hello!',
            time:'10 January 10:04'
        },
        {
            id:'1',
            name:'Name',
            surname:'Surname',
            lastMessage:'Hello!',
            time:'10 January 10:04'
        },
        {
            id:'1',
            name:'Name',
            surname:'Surname',
            lastMessage:'Hello!',
            time:'10 January 10:04'
         },
        {
            id:'1',
            name:'Name',
            surname:'Surname',
            lastMessage:'Hello!',
            time:'10 January 10:04'
        },
        {
            id:'1',
            name:'Name',
            surname:'Surname',
            lastMessage:'Hello!',
            time:'10 January 10:04'
        },
        {
            id:'1',
            name:'Name',
            surname:'Surname',
            lastMessage:'Hello!',
            time:'10 January 10:04'
        },
    ]
    return (
        <div  className='chat-page-container'>
            <Row  style={{color:'white'}} >
                <GradientColumn span={6} className='dialogs-col'>
                <Space direction="vertical" size='small' style={{width: '100%',justifySelf:'center'}}>
                <Radio.Group className="dialogs-radio-group" onChange={e => setReplyRule(e.target.value)} defaultValue={replyRule}>
                    <Radio.Button  value={'all'}>
                            <MailOutlined/>
                    </Radio.Button>
                    <Radio.Button  value={'new'}>
                            <SoundOutlined/>
                    </Radio.Button>
                    <Radio.Button  value={'favorite'}>
                            <StarOutlined />
                    </Radio.Button>
                    
                </Radio.Group>
                <List className="dialogs-list"
                    dataSource={dialogs}
                    renderItem={(item) => (
                    <List.Item
                    key={item.id}
                    style={{cursor:'pointer'}}
                    onClick={(e) => setselectedDialog(item.id)}
                    className={item.id === selectedDialog ?"ant-list-item-active": ""}
                    >
                        <List.Item.Meta
                        avatar={<Avatar size={45} icon={<UserOutlined/>} />}
                        title={<Typography.Text>{item.name + ' ' + item.surname}</Typography.Text>}
                        description={<Typography.Text>{item.lastMessage}</Typography.Text>}
                        />
                    </List.Item>
                    )}
                />
                </Space>
                
                </GradientColumn>
                <Col span={18}>
                    {
                        selectedDialog?
                        <div className="chat-window">
                            <section className="header">
                                <Typography.Title type="secondary" level={3}>Name Surname</Typography.Title>
                                <Avatar size={45} icon={<UserOutlined/>} />
                            </section>
                            <section className="messages-list">
                            <List className="messages"
                                
                                dataSource={messages}
                                split={false}
                                renderItem={(item) => (
                                <List.Item
                                key={item.id}
                                style={{cursor:'pointer'}}
                                >
                                    <List.Item.Meta
                                    avatar={<Avatar size={45} icon={<UserOutlined/>} />}
                                    title={
                                    <>
                                        <Typography.Text>{item.name + ' ' + item.surname}</Typography.Text> 
                                        <Typography.Text type="secondary" style={{margin:10}}>{item.time}</Typography.Text>
                                    </>}
                                    description={<Typography.Text>{item.lastMessage}</Typography.Text>}
                                    />
                                </List.Item>
                                )}
                            />
                            </section>
                            <section className="message-form">
                                <Input.TextArea autoSize={{minRows:2,maxRows:4}}  maxLength={2000} className='textarea'  
                                placeholder="Text a message..."/>
                                <div style={{display:'flex',alignItems:'center',margin:'0 10px 0 10px',width:'auto'}} >

                                    <Tooltip  title="Add photo">
                                        <Button type="link" shape='circle'  icon={<PictureOutlined />} />
                                    </Tooltip>

                                    <Button style={{marginLeft:'auto'}} type="text" icon={<SendOutlined />}/>

                                </div>

                            </section>
                        </div>
                        :
                        <Empty
                        style={{color:token.token.colorPrimary}}
                        className="empty-chat-window"
                        image={<MailOutlined style={{fontSize:'55px'}}/>}
                        description={
                          <span>
                            Select a dialog
                          </span>
                        }>

                        </Empty>
                        
                    }
                    
                </Col>
            </Row>
        </div>
    );
};

export default ChatPage;

