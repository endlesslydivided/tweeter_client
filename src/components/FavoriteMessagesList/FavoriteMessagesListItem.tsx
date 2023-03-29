import { StarFilled, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, List, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/redux';
import { useNotify } from '../../hooks/useNotify';
import { useUnmarkFavoriteMessageMutation } from '../../services/ChatApiSlice';
import { removeFavoriteMessage } from '../../store/slices/FavoriteMessagesSlice';
import { fDateTime } from '../../utils/formatTime';
import MessagePost from '../ChatWindow/MessagePost/MessagePost';


interface FavoriteMessageListItemProps
{
    message:any;
}


const FavoriteMessageListItem:React.FC<FavoriteMessageListItemProps> = ({message}) => {

    const [unmarkFavorite,unmarkFavoriteResult] = useUnmarkFavoriteMessageMutation();
    const dispatch = useDispatch();
    const currentUser = useAppSelector((state:any) => state.auth.user);

    useNotify(unmarkFavoriteResult,undefined,() => 
    {
        dispatch((removeFavoriteMessage({id:message.id})));
    },'Some error occured on server');
      
    return (  
        <List.Item 
            className={`message selected-message`}
            extra=
            {
                <Button type='text' 
                        onClick={(e:any) => {e.stopPropagation();unmarkFavorite({messageId:message.id,userId:currentUser.id})}}
                        className={`favorite-button active'}`} 
                        icon={<StarFilled/>}
                />
            }
            key={message.id}  id={message.id}>
            <List.Item.Meta 
            avatar={
                <Avatar size={45} 
                src={message?.user?.mainPhoto? process.env.REACT_APP_BACK_SERVER + message?.user?.mainPhoto?.path : null} 
                icon={<UserOutlined/>}/>
            }
            title={
                <>
                    <Typography.Text>{message.user.firstname + ' ' + message.user.surname}</Typography.Text> 
                    <Typography.Text type="secondary" >{fDateTime(message.createdAt)}</Typography.Text>
                </>
            }
            description={           
                    message.messageTweet ?
                    <MessagePost post={message.messageTweet}/>
                    :<Typography.Text>{message.text}</Typography.Text>              
                }
            />
            
        </List.Item>
    )
}

export default FavoriteMessageListItem