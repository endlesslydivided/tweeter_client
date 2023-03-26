
import { List, Skeleton } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useObserver } from '../../../hooks/useObserver';
import { setMessagesLoading } from '../../../store/slices/MessagesSlice';
import { ChatServerEvent, SocketContext } from '../../SocketProvider/SocketProvider';
import '../ChatWindow.scss';
import MessageItem from './MessageItem';

interface MessagesListProps
{
    filters:any,
    setFilters:Function
}



const MessagesList:React.FC<MessagesListProps> = ({filters,setFilters}) => {

    const dispatch = useAppDispatch();

    const socket:any = useContext(SocketContext);

    const {id}:any = useParams();

    const [isMore,setIsMore] = useState(false);

    const messages:any = useAppSelector((state:any) => state.messages.messages[id]);
    const isLoading:any = useAppSelector((state:any) => state.messages.isLoading);
    const user = useAppSelector((state:any) => state.auth.user);



    const lastItemRef = useRef(null);

    const loadMoreHandler =  () =>
    {
        setFilters((p:any) => {return {...p,createdAt: messages?.entries[messages?.entries?.length - 1]?.createdAt }});
    }

    useObserver({ref:lastItemRef,canLoad:isMore,isLoading,callback:loadMoreHandler});

    useEffect(() =>
    {
        if(!isLoading) 
        {
            setIsMore(messages?.count > filters.limit);
            const scrollTo = document.querySelector(`#lastElement`);
            if(scrollTo)
            {
                scrollTo.scrollIntoView();
            }
        }
    },[isLoading]);

    useEffect(()=>
    {
        if(socket)
        {
            socket.emit(ChatServerEvent.CLIENT_GET_DIALOG_MESSAGES,{filters,userId:user.id,auth:{id:user.id},dialogId:id});
            dispatch(setMessagesLoading(true));
        }
    },[filters])

  return (
    <>
        <div ref={lastItemRef}></div>
        <Skeleton avatar paragraph={{rows:2}} loading={isLoading}/>
        <List itemLayout='horizontal' className="messages" dataSource={messages?.entries} split={false}        
            renderItem={(message:any) => 
            (
                <MessageItem message={message} />
            )}      
        />
    </>
  )
}

export default MessagesList