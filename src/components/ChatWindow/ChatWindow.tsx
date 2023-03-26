

import { ArrowLeftOutlined, MailOutlined, PictureOutlined, SendOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Empty, Input, List, Skeleton, theme, Tooltip, Typography } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../Loader';
import { ChatServerEvent, SocketContext } from '../SocketProvider/SocketProvider';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useObserver } from '../../hooks/useObserver';
import { setMessagesLoading } from '../../store/slices/MessagesSlice';
import { CHAT_ROUTE, PROFILE_ROUTE } from '../../utils/consts';
import { fDateTime } from '../../utils/formatTime';
import './ChatWindow.scss'
import MessageForm from './MessageForm';
import MessagesList from './MessageList/MessagesList';

const initialFilters = {
    search: "",
    createdAt: "",
    limit: 15,
    orderBy: "createdAt",
    orderDirection: "desc",
};


interface ChatWindowProps
{
}

const ChatWindow :React.FC<ChatWindowProps> = ({}) =>
{
    const socket:any = useContext(SocketContext);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {id}:any = useParams();

    const user = useAppSelector((state:any) => state.auth.user);
    const isLoading:any = useAppSelector((state:any) => state.messages.isLoading);
    const dialogs:any = useAppSelector((state:any) => state.dialogs?.dialogs);


    const [filters, setFilters] = useState({...initialFilters});
    const [dialog,setDialog]:any = useState(dialogs?.find((d:any) => d.id === id));

    useEffect(()=>
    {
        setDialog(dialogs?.find((d:any) => d.id === id));
    },[dialogs])

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


    if(isLoading && !dialog)
    {
        return <Loader/>;
    }
 
    return( 
    <div className="chat-window">

        <section className="header">

            <Button icon={<ArrowLeftOutlined/>} onClick={() => navigate(CHAT_ROUTE)} shape={'circle'} size={'large'} ghost ></Button>
            
            <Typography.Title 
                type="secondary" 
                level={3} 
                onClick={() => navigate(`${PROFILE_ROUTE}/${dialog?.users[0]?.id}`)}>
                    {`${dialog?.users[0]?.firstname} ${dialog?.users[0]?.surname}`}
            </Typography.Title>

            <Avatar onClick={() => 
                navigate(`${PROFILE_ROUTE}/${dialog?.users[0]?.id}`)} 
                size={45} 
                src={ dialog?.users[0]?.mainPhoto?process.env.REACT_APP_BACK_SERVER + dialog?.users[0]?.mainPhoto?.path : null} 
                icon={<UserOutlined/>} />
        </section>

        <section className="messages-list">
            <MessagesList filters={filters} setFilters={setFilters}/>
        </section>


        <section className="message-form">
            <MessageForm dialog={dialog}/>
        </section>
    </div>
    )
}

export default ChatWindow;