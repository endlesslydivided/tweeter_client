import { CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Card, ConfigProvider, List } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux'
import { removeWatchedDialog } from '../../store/slices/DialogsSlice';
import { CHAT_ROUTE } from '../../utils/consts';
import { emptyDialogsListRender } from '../EmptyListRender/EmptyListRender';
import "./WatchedDialogsList.scss"

interface WatchedDialogsListProps
{

}
const WatchedDialogsList:React.FC<WatchedDialogsListProps> = ({}) => {

    const lastDialogs = useAppSelector((state:any) => state.dialogs.watchedDialogs);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id:dialogId} = useParams();
    const onDeleteLastDialogHandler = (id:string) =>
    {
        if(id ===dialogId)
        navigate(`${CHAT_ROUTE}`)
        dispatch(removeWatchedDialog({id}));
    }

    return (
        <Card className="last-dialogs-list-card">
        <ConfigProvider renderEmpty={emptyDialogsListRender}>      
            <List 
                itemLayout="horizontal" 
                className={`last-dialogs-list`}  
                split={true} 
                size={"small"} 
                dataSource={lastDialogs}
                renderItem={(item:any) => 
                (
                    <List.Item actions={[
                        <Button type={'link'} danger onClick={() => onDeleteLastDialogHandler(item.id)} icon={<CloseOutlined/>}/>
                        ]}>
                    <div  onClick={() => navigate(`${CHAT_ROUTE}/${item.id}`)} style={{cursor:'pointer',width:'100%'}}>
                        <List.Item.Meta
                       
                         title={item.users[0] && `${item.users[0].firstname} ${item.users[0].surname}`}/>
                    </div>
                    </List.Item>
                )}/>
        </ConfigProvider>      
        </Card>
)
}

export default WatchedDialogsList