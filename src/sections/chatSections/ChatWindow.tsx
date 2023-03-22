

import { ArrowLeftOutlined, MailOutlined, PictureOutlined, SendOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Empty, Input, List, Skeleton, theme, Tooltip, Typography } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import { ChatServerEvent, SocketContext } from '../../components/SocketProvider/SocketProvider';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useObserver } from '../../hooks/useObserver';
import { setMessagesLoading } from '../../store/slices/MessagesSlice';
import { CHAT_ROUTE, PROFILE_ROUTE } from '../../utils/consts';
import { fDateTime } from '../../utils/formatTime';
import './ChatWindow.scss'

const initialFilters = {
    search: "",
    createdAt: "",
    limit: 15,
    orderBy: "createdAt",
    orderDirection: "desc",
};

const initialMessage =
{
    text:'',
}

interface ChatWindowProps
{
}

const ChatWindow :React.FC<ChatWindowProps> = ({}) =>
{
    const socket:any = useContext(SocketContext);

    const {id}:any = useParams();

    const messages:any = useAppSelector((state:any) => state.messages.messages[id]);
    const isLoading:any = useAppSelector((state:any) => state.messages.isLoading);
    const dialogs:any = useAppSelector((state:any) => state.dialogs?.dialogs);

    const [dialog,setDialog]:any = useState(dialogs?.find((d:any) => d.id === id));

    const user = useAppSelector((state:any) => state.auth.user);
    const dispatch = useAppDispatch();
    
    const [filters, setFilters] = useState({...initialFilters});
    const [isMore,setIsMore] = useState(false);
    const [messageContent,setMessageContent]:any = useState(initialMessage)
    const lastItemRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() =>
    {
        if(!isLoading) 
        {
            setIsMore(messages?.count > filters.limit);
            const scrollTo = document.querySelector(`#lastElement`);
            if(scrollTo)
                scrollTo.scrollIntoView();
        }
    },[isLoading]);

    useEffect(()=>
    {
        setDialog(dialogs?.find((d:any) => d.id === id));
    },[dialogs])

    useEffect(()=>
    {
        if(socket)
        {
            socket.emit(ChatServerEvent.CLIENT_GET_DIALOG_MESSAGES,{filters,userId:user.id,auth:{id:user.id},dialogId:id});
            dispatch(setMessagesLoading(true));
        }
    },[filters])

    useEffect(() =>
    {
        if(socket)
        {
            socket.emit(ChatServerEvent.CLIENT_GET_DIALOG_MESSAGES,{filters,userId:user.id,auth:{id:user.id},dialogId:id});
            dispatch(setMessagesLoading(true));
            if(!dialog)
            {
                socket.emit(ChatServerEvent.CLIENT_GET_DIALOG,{filters,userId:user.id,auth:{id:user.id},dialogId:id});
            }
        }     
    },[!!socket])

    const loadMoreHandler =  () =>
    {
        setFilters((p:any) => {return {...p,createdAt: messages?.entries[messages?.entries?.length - 1]?.createdAt }});
    }

    const sendMessage =  () =>
    {
        socket.emit(ChatServerEvent.CLIENT_SEND_MESSAGE,
        {
            dto:
            {
                dialogId:id,
                text: messageContent.text,
                userId:user.id,
            },
            toUserId:dialog?.users[0]?.id,
            fromUserId:user.id,
            auth:{id:user.id},
        });
        setMessageContent(initialMessage)
    }

    

    useObserver({ref:lastItemRef,canLoad:isMore,isLoading,callback:loadMoreHandler});

    if(isLoading && !dialog)
    {
        return <Loader/>;
    }
 
    return( 
    <div className="chat-window">

        <section className="header">
            <Button icon={<ArrowLeftOutlined/>} onClick={() => navigate(CHAT_ROUTE)} shape={'circle'} size={'large'} ghost ></Button>
            <Typography.Title type="secondary" level={3} onClick={() => navigate(`${PROFILE_ROUTE}/${dialog?.users[0]?.id}`)}>{`${dialog?.users[0]?.firstname} ${dialog?.users[0]?.surname}`}</Typography.Title>
            <Avatar onClick={() => navigate(`${PROFILE_ROUTE}/${dialog?.users[0]?.id}`)} size={45} src={process.env.REACT_APP_BACK_SERVER + dialog?.users[0]?.mainPhoto?.path} icon={<UserOutlined/>} />
        </section>

        <section className="messages-list">

        <div ref={lastItemRef}></div>
        <Skeleton avatar paragraph={{rows:2}} loading={isLoading}/>
        <List className="messages" dataSource={messages?.entries} split={false}        
                renderItem={(item:any) => 
                (
                    <List.Item className='message' key={item.id}  id={item.id}>
                        <List.Item.Meta 
                        avatar={
                            <Avatar size={45} 
                            src={process.env.REACT_APP_BACK_SERVER + item?.user?.mainPhoto?.path} 
                            icon={<UserOutlined/>}/>
                        }
                        title={
                            <>
                                <Typography.Text>{item.user.firstname + ' ' + item.user.surname}</Typography.Text> 
                                <Typography.Text type="secondary" >{fDateTime(item.createdAt)}</Typography.Text>
                            </>
                        }
                        description={<Typography.Text>{item.text}</Typography.Text>}
                        />
                    </List.Item>
                )}      
        />

        </section>


        <section className="message-form">

                <Input.TextArea 
                    value={messageContent.text}
                    onChange={(e) => setMessageContent((p:any) => {return {...p, text:e.target.value}})}
                    autoSize={{minRows:2,maxRows:4}}  
                    maxLength={2000} 
                    className='message-form-textarea' 
                    placeholder="Text a message..."
                />
                
                <div className='message-form-tooltip-container'>

                    <Tooltip  title="Add photo">
                        <Button type="link" shape='circle'  icon={<PictureOutlined />} />
                    </Tooltip>

                    <Button type="text" onClick={() => sendMessage()} icon={<SendOutlined />}/>

                </div>
            <div id={'lastElement'}></div>
        </section>
    </div>
    )
}

export default ChatWindow;