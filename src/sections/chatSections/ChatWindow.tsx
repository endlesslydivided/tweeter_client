

import { MailOutlined, PictureOutlined, SendOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Empty, Input, List, theme, Tooltip, Typography } from 'antd';
import React from 'react'
import './ChatWindow.scss'

const { useToken } = theme;

interface ChatWindowProps
{
    selectedDialog: object | null;
}

const ChatWindow :React.FC<ChatWindowProps> = ({selectedDialog}) =>
{

    const token = useToken();
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

    if(selectedDialog)
    {
       return( 
        <div className="chat-window">

            <section className="header">

                <Typography.Title type="secondary" level={3}>Name Surname</Typography.Title>
                <Avatar size={45} icon={<UserOutlined/>} />

            </section>

            <section className="messages-list">

            <List className="messages" dataSource={messages} split={false}        
                  renderItem={(item) => 
                    (
                        <List.Item className='message' key={item.id}>
                            <List.Item.Meta avatar={<Avatar size={45} icon={<UserOutlined/>}/>}
                            title={
                                <>
                                    <Typography.Text>{item.name + ' ' + item.surname}</Typography.Text> 
                                    <Typography.Text type="secondary" >{item.time}</Typography.Text>
                                </>
                            }
                            description={<Typography.Text>{item.lastMessage}</Typography.Text>}
                            />
                        </List.Item>
                    )}      
            />

            </section>

            <section className="message-form">

                <Input.TextArea autoSize={{minRows:2,maxRows:4}}  maxLength={2000} className='message-form-textarea' placeholder="Text a message..."/>
                
                <div className='message-form-tooltip-container'>

                    <Tooltip  title="Add photo">
                        <Button type="link" shape='circle'  icon={<PictureOutlined />} />
                    </Tooltip>

                    <Button type="text" icon={<SendOutlined />}/>

                </div>

            </section>

        </div>
        )
    }

  return (
    <Empty  style={{color:token.token.colorPrimary}} 
            className="empty-chat-window"
            image={<MailOutlined />}
            description={<span>Select a dialog</span>}/>
    )
}

export default ChatWindow;