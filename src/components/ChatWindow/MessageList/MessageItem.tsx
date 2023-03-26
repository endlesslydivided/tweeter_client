import { UserOutlined } from '@ant-design/icons';
import { Avatar, List, Typography } from 'antd';
import { fDateTime } from '../../../utils/formatTime';
import MessagePost from '../MessagePost/MessagePost';
import '../ChatWindow.scss';


interface MessageItemProps
{
    message:any;
}


const MessageItem:React.FC<MessageItemProps> = ({message}) => {
  return (  
    <List.Item className='message' key={message.id}  id={message.id}>
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

export default MessageItem