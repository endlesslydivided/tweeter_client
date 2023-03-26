import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, List, Space, Typography } from 'antd';
import React, { useContext, useRef, useState } from 'react'
import { useAppSelector } from '../../../hooks/redux';
import { useNotify } from '../../../hooks/useNotify';
import { useObserver } from '../../../hooks/useObserver';
import { useGetDialogsQuery } from '../../../services/UserTweetsApiSlice';
import { ChatServerEvent, SocketContext } from '../../SocketProvider/SocketProvider';
import './RetweetDialogList.scss'
interface RetweetDialogListProps
{
    post: any;
    setModalOpen: Function;
}

const initialFilters = {
    search: "",
    createdAt: "",
    limit: 15,
    orderBy: "createdAt",
    orderDirection: "desc",
};

const RetweetDialogList:React.FC<RetweetDialogListProps> = ({post,setModalOpen}) => {

    const socket:any = useContext(SocketContext);
    const currentUser = useAppSelector((state:any) => state.auth.user);

    const [filters, setFilters] = useState({...initialFilters});
    const [isMore,setIsMore] = useState(false);
    const [dialogs,setDialogs]:any = useState(null);

    const dialogsResult = useGetDialogsQuery({id:currentUser.id,filters});

    useNotify(dialogsResult,undefined,() =>
    {
        const {rows,count} = dialogsResult.data;
		setIsMore((previous:any) => count > filters.limit);
        setDialogs(rows);
    })      

    const onSendTweetHandler = (dialog:any) =>
    {
        socket.emit(ChatServerEvent.CLIENT_SEND_TWEET,
            {
                dto:
                {
                    dialogId:dialog.id,
                    messageTweetId:post.id,
                    userId:currentUser.id,
                },
                toUserId:dialog?.users[0]?.id,
                fromUserId:currentUser.id,
                auth:{id:currentUser.id},
            });
        setModalOpen(false);
    }
        
         
    const lastItemRef = useRef(null);

    const loadMoreHandler =  () =>
    {
        setFilters((p:any) => {return {...p,createdAt: dialogs[dialogs?.length-1]?.createdAt }});
    }

        
    useObserver({ref:lastItemRef,canLoad:isMore,isLoading:dialogsResult.isFetching,callback:loadMoreHandler});

    return(
    <Space direction="vertical" size='small' className='dialog-space'>
        <List className="retweet-dialogs-list" itemLayout='horizontal' dataSource={dialogs || []} loading={dialogsResult.isFetching}
            renderItem={(item:any) => (
                <List.Item key={item.id}>
                    <List.Item.Meta
                    className='retweet-dialogs-list-meta'
                    avatar={<Avatar 
                        size={45} 
                        icon={<UserOutlined/>} 
                        src={ item?.users[0]?.mainPhoto?process.env.REACT_APP_BACK_SERVER + item?.users[0]?.mainPhoto?.path : null} />}
                    title=
                    {
                        <div className='title'>
                            <Typography.Text>
                                {item.users[0] && item.users[0].firstname + ' ' + item.users[0].surname}
                            </Typography.Text>
                        </div>
                    }
                    
                    />
                    <Button type="primary" onClick={(e) => onSendTweetHandler(item)} >Retweet</Button>
            </List.Item>
            )}
        />
        <div ref={lastItemRef}></div>
    </Space>)
}

export default RetweetDialogList