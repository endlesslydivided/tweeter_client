

import { ArrowLeftOutlined, CloseOutlined, DeleteFilled, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, ConfigProvider, Typography } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setMessagesLoading } from '../../store/slices/MessagesSlice';
import { CHAT_ROUTE, PROFILE_ROUTE } from '../../utils/consts';
import { emptyMessagesListRender } from '../EmptyListRender/EmptyListRender';
import Loader from '../Loader';
import { ChatServerEvent, SocketContext } from '../SocketProvider/SocketProvider';
import './ChatWindow.scss';
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
    const [selectedMessages,setSelectedMessages] = useState([]);
    const messages:any = useAppSelector((state:any) => state.messages);

    useEffect(()=>
    {
        const currentDialog = dialogs?.find((d:any) => d.id === id);
        setDialog(currentDialog);
    },[dialogs,id])

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

    const deleteMessages =  () =>
    {
        const messagesIds = selectedMessages.map((m:any) => m.id);
        socket.emit(ChatServerEvent.CLIENT_DELETE_MESSAGES,
        {
            toUserId:dialog?.users[0]?.id,
            messagesIds,
            dialogId:dialog.id,
            auth:{id:user.id},
        });
        setSelectedMessages([]);
    }

    const bodyHeight =  document?.querySelector("body")?.clientHeight || 0;
    const messageListHeight =  document?.querySelector(".messages-list-container")?.clientHeight || 0;


    if(isLoading && !dialog && dialog.id !== id)
    {
        return <Loader/>;
    }
 
    return( 
        <>
            <Card className="chat-window">

                <section className="header">
                    <div className="cover-div">

                    </div>
                    <div className='header-div'>
                    {
                        selectedMessages.length === 0 ?
                        <>
                            <Button icon={<ArrowLeftOutlined/>} onClick={() => navigate(CHAT_ROUTE)} shape={'circle'} size={'large'} ></Button>
                        
                            <Typography.Text 
                                style={{fontSize:'15px',textAlign:'center'}}
                                type="secondary" 
                                onClick={() => navigate(`${PROFILE_ROUTE}/${dialog?.users[0]?.id}`)}>
                                    {`${dialog?.users[0]?.firstname} ${dialog?.users[0]?.surname}`}
                            </Typography.Text>

                            <Avatar onClick={() => 
                                navigate(`${PROFILE_ROUTE}/${dialog?.users[0]?.id}`)} 
                                size={45} 
                                src={ dialog?.users[0]?.mainPhoto?process.env.REACT_APP_BACK_SERVER + dialog?.users[0]?.mainPhoto?.path : null} 
                                icon={<UserOutlined/>} />
                        </>
                        :
                        <>
                            <Button 
                                type="text"  
                                onClick={() => {setSelectedMessages([])}}
                            > 
                                <CloseOutlined/>
                                {`${ selectedMessages.length === 1 ? `1 message is choosen`:   `${selectedMessages.length} messages are choosen`} `}
                            </Button>
                            <Button icon={<DeleteFilled/>} onClick={() => deleteMessages()} >Delete messages</Button>

                        </>

                    }
                    
                    </div>
                </section>

                <section className={`messages-list `}>
                

                <div style={{color:'red',height:bodyHeight - messageListHeight}}></div>


                <ConfigProvider renderEmpty={emptyMessagesListRender}>
                    <MessagesList selectedMessages={selectedMessages} setSelectedMessages={setSelectedMessages} filters={filters} setFilters={setFilters}/>
                </ConfigProvider>
                </section>


                <section className="message-form">
                <div className="message-form-cover-div">

                </div>
                <div className='message-form-div'>
                    <MessageForm dialog={dialog}/>
                </div>
                </section>
            </Card>
    </>
    )
}

export default ChatWindow;