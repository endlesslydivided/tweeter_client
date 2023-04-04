import { UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, notification, Row, Typography } from 'antd';
import React, { createContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { useLazyGetDialogQuery } from '../../services/ChatApiSlice';
import { appendDialogsPage, pushDialog, swapDialog } from '../../store/slices/DialogsSlice';
import { appendMessagesPage, deleteMessages, pushMessage, setMessagesLoading } from '../../store/slices/MessagesSlice';
import { CHAT_ROUTE } from '../../utils/consts';
import './SocketProvider.scss'

const io:any = require('socket.io-client');

export enum ChatClientEvent 
{
    SERVER_SENDS_MESSAGE = 'SERVER_SENDS_MESSAGE',
    SERVER_SENDS_TWEET = 'SERVER_SENDS_TWEET',
    SERVER_SENDS_DIALOGS= 'SERVER_SENDS_DIALOGS',
    SERVER_SENDS_DIALOG_MESSAGES = 'SERVER_SENDS_DIALOG_MESSAGES',
    SERVER_RETURNS_MESSAGE = 'SERVER_RETURNS_MESSAGE',
    SERVER_SENDS_DIALOG = 'SERVER_SENDS_DIALOG',
    SERVER_SENDS_DELETED_MESSAGES = 'SERVER_SENDS_DELETED_MESSAGES',
}

export enum ChatServerEvent 
{
    CLIENT_SEND_MESSAGE = 'CLIENT_SEND_MESSAGE',
    CLIENT_SEND_TWEET = 'CLIENT_SEND_TWEET',
    CLIENT_GET_DIALOG_MESSAGES = 'CLIENT_GET_DIALOG_MESSAGES',
    CLIENT_GET_DIALOGS = 'CLIENT_GET_DIALOGS',
    CLIENT_GET_DIALOG = 'CLIENT_GET_DIALOG',
    CLIENT_DELETE_MESSAGES = 'CLIENT_DELETE_MESSAGES',
}
interface SocketProviderProps
{
    auth: any;
    children: string | JSX.Element | JSX.Element[]
}

export const SocketContext:any = createContext(null);

export const SocketProvider:React.FC<SocketProviderProps> = ({auth,children}) => {

    const [socket,setSocket]:any = useState(null);
    const dispatch = useDispatch();
    const [api, contextHolder] = notification.useNotification();
    const openNotification = ({message,description,key}:any) => {
        api.open({
          message,
          description,
          className: 'socket-notify',
          placement:'bottomLeft',
          duration:300,
          key
        });
      };
    const dialogs:any = useAppSelector((state:any) => state.dialogs?.dialogs);
    const navigate = useNavigate();
    const [getDialog] = useLazyGetDialogQuery();
                

    useEffect(() =>
    {
        if (!socket) 
        {
            setSocket(io.connect(process.env.REACT_APP_BACK_SERVER_API_WS, 
                {
                    path: '/chat',
                    withCredentials: true,
                    auth,
                }));
        }
        else
        {
            socket.on(ChatClientEvent.SERVER_SENDS_DIALOGS, (dialogs: any) => {
                dispatch(appendDialogsPage(dialogs));
            });

            socket.on(ChatClientEvent.SERVER_SENDS_DELETED_MESSAGES, (message: any) => {
                dispatch(deleteMessages({messagesIds:message.messagesIds,dialogId:message.dialogId}));
            });



            socket.on(ChatClientEvent.SERVER_SENDS_TWEET,async (data: any) => {
                const {message, dialogId,user} = data;
                if(!dialogs?.includes((d:any) => d.id === dialogId))
                {
                    const {data,error} = await getDialog({id:dialogId});
                    if(data)
                    {
                        dispatch(pushDialog({dialog:data}));  
                    }
                    else
                    {
                        notification.error({message:'Some error occured',placement:'bottomLeft',duration:30})
                    }
                }
                dispatch(pushMessage({dialogId,message,user}));
                dispatch(swapDialog({dialogId}));
                if(!window.location.pathname.match(CHAT_ROUTE))   
                {
                    api.destroy(dialogId);
                    openNotification(
                    {
                        key:dialogId,
                        message:(
                            <Row gutter={[10,10]} style={{flexWrap:'nowrap',cursor:'pointer'}} onClick={() => {
                                navigate(`${CHAT_ROUTE}/${dialogId}`)
                                api.destroy(dialogId);
                            }}>
                                <Col style={{marginBottom:'auto',marginTop:'auto'}}>
                                    <Avatar icon={<UserOutlined />} src={process.env.REACT_APP_BACK_SERVER + user?.mainPhoto?.path} size={50} shape="circle" />
                                </Col>
                                <Col>
                                    <Typography.Title level={5}>New message</Typography.Title>
                                    <Typography.Text>{`${user.firstname} ${user.surname} sent you a tweet`}</Typography.Text>
                                </Col>
                            </Row>
                        )
                    })
                }
            });
    
            socket.on(ChatClientEvent.SERVER_SENDS_MESSAGE,async (data: any) => {
                const {message, dialogId,user} = data;
                if(!dialogs?.includes((d:any) => d.id === dialogId))
                {
                    const {data,error} = await getDialog({id:dialogId});
                    if(data)
                    {
                        dispatch(pushDialog({dialog:data}));  
                    }
                    else
                    {
                        notification.error({message:'Some error occured',placement:'bottomLeft',duration:30})
                    }
                }
                dispatch(pushMessage({dialogId,message,user}));
                dispatch(swapDialog({dialogId}));
                if(!window.location.pathname.match(CHAT_ROUTE))   
                {
                    api.destroy(dialogId);
                    openNotification(
                    {
                        key:dialogId,
                        message:(
                            <Row gutter={[10,10]} style={{flexWrap:'nowrap',cursor:'pointer'}} onClick={() => {
                                navigate(`${CHAT_ROUTE}/${dialogId}`)
                                api.destroy(dialogId);
                            }}>
                                <Col style={{marginBottom:'auto',marginTop:'auto'}}>
                                    <Avatar icon={<UserOutlined />} src={process.env.REACT_APP_BACK_SERVER + user?.mainPhoto?.path} size={50} shape="circle" />
                                </Col>
                                <Col>
                                    <Typography.Title level={5}>New message</Typography.Title>
                                    <Typography.Text>{`${user.firstname} ${user.surname} sent you a message`}</Typography.Text>
                                </Col>
                            </Row>
                        )
                    })
                }
            });
    
            socket.on(ChatClientEvent.SERVER_RETURNS_MESSAGE, (data: any) => {
                const {message, dialogId,user} = data;
                dispatch(pushMessage({dialogId,message,user}));   
                dispatch(swapDialog({dialogId}));   

            });

            socket.on(ChatClientEvent.SERVER_SENDS_DIALOG_MESSAGES, (data: any) => {
                const {messages, dialogId} = data;
                dispatch(appendMessagesPage({dialogId,messages}));  
                dispatch(setMessagesLoading(false));       
            });

            socket.on(ChatClientEvent.SERVER_SENDS_DIALOG, (dialog: any) => {
                dispatch(pushDialog({dialog}));  
            });
    
        }       
    },[socket])

  return (<>
    {contextHolder}
    <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>
    </>
  )
}




 
  
  