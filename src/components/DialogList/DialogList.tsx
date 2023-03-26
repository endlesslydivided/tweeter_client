import { MailOutlined, SoundOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, List, Radio, Space, Typography } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ChatServerEvent, SocketContext } from '../SocketProvider/SocketProvider';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useObserver } from '../../hooks/useObserver';
import { CHAT_ROUTE } from '../../utils/consts';
import { fDateTime } from '../../utils/formatTime';
import './DialogList.scss'

interface DialogListsProps
{

}

const initialFilters = {
    search: "",
    createdAt: "",
    limit: 15,
    orderBy: "createdAt",
    orderDirection: "desc",
};

const DialogList:React.FC<DialogListsProps> = ({}) =>
{
    const navigate = useNavigate();

    const socket:any = useContext(SocketContext);
    const dialogs = useAppSelector((state:any) => state.dialogs);
    const user = useAppSelector((state:any) => state.auth.user);

    const [filters, setFilters] = useState({...initialFilters});
    const [isMore,setIsMore] = useState(false);
    const [isLoading,setIsLoading] = useState(false);

    const lastItemRef = useRef(null);

    useEffect(() =>
    {
        if(socket)
        {
            socket.emit(ChatServerEvent.CLIENT_GET_DIALOGS,{filters,userId:user.id,auth:{id:user.id}});
            setIsLoading(true);
        }     
    },[!!socket])

    const loadMoreHandler =  () =>
    {
        setFilters((p:any) => {return {...p,createdAt: dialogs[dialogs?.length-1]?.createdAt }});
        socket.emit(ChatServerEvent.CLIENT_GET_DIALOGS,{filters,userId:user.id,auth:{id:user.id}});
        setIsLoading(true);
    }

    useEffect(() =>
    {
        setIsMore(dialogs.count > filters.limit);
        setIsLoading(false);
    },[dialogs]);

    useObserver({ref:lastItemRef,canLoad:isMore,isLoading,callback:loadMoreHandler});
    

    return (
        <Space direction="vertical" size='small' className='dialog-space'>
            <List className="dialogs-list" dataSource={dialogs.dialogs || []} loading={isLoading}
                renderItem={(item:any) => (
                    <List.Item key={item.id} onClick={(e) => navigate(`${CHAT_ROUTE}/${item.id}`)}>
                        <List.Item.Meta
                        avatar={<Avatar size={45} icon={<UserOutlined/>} />}
                        title=
                        {
                            <div className='title'>
                                <Typography.Text>
                                    {item.users[0] && item.users[0].firstname + ' ' + item.users[0].surname}
                                </Typography.Text>
                                <Typography.Text type='secondary'>
                                    {item.messages[0] && fDateTime(item.messages[0]?.createdAt)}
                                </Typography.Text>
                            </div>
                        }
                        description={
                            <Typography.Text>
                                {item.messages[0] ? item.messages[0].messageTweet ? 'User sent a tweet' : item.messages[0]?.text:'No messages' }
                            </Typography.Text>}
                        />
                </List.Item>
                )}
            />
            <div ref={lastItemRef}></div>
        </Space>
    )
}

export default DialogList