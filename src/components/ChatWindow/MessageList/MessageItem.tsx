import { StarFilled, StarOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, List, Typography } from 'antd';
import { fDateTime } from '../../../utils/formatTime';
import MessagePost from '../MessagePost/MessagePost';
import '../ChatWindow.scss';
import { useFavorite } from '../../../hooks/useFavorite';
import { removeFavoriteMessage } from '../../../store/slices/FavoriteMessagesSlice';
import { useState } from 'react';
import MediaEntityList from '../../MediaEntitiesList/MediaEntityList';
import { fDataFormat } from '../../../utils/uploadFormats';
import AudioEntityList from '../../MediaEntitiesList/AudioEntityList';
import DocumentsEntityList from '../../MediaEntitiesList/DocumentsEntityList';


interface MessageItemProps
{
    message:any;
    selectedMessages:any;
    setSelectedMessages: Function;
}


const MessageItem:React.FC<MessageItemProps> = ({message,selectedMessages,setSelectedMessages}) => {

    const {isFavorite,onFavoriteClickHandler} = useFavorite({
        entity:message,
        unmarkFavoriteAction: removeFavoriteMessage({id:message.id})
    });

    const isSelected = selectedMessages.some((m:any) => m.id === message.id) 
    const selectedClassName = isSelected ? 'selected-message' : '';
    const onSelectMessageHandler = () =>
    {
        setSelectedMessages((p:any) => 
        {
            if(p.some((m:any) => m.id === message.id))
            {
                return p.filter((m:any) => m.id !== message.id);
            }
            return[...p,message];
        })
    }
    
      
    return (  
        <List.Item 
            className={`message ${selectedClassName}`}
            onClick={() => onSelectMessageHandler()}
            extra=
            {
                <Button type='text' 
                        onClick={(e:any) => {e.stopPropagation();onFavoriteClickHandler()}}
                        className={`favorite-button ${isFavorite?'active' : ''}`} 
                        icon={isFavorite ? <StarFilled/> :<StarOutlined/>}
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
                    :<>
                        <Typography.Text>{message.text}</Typography.Text>
                        <div>
                            <MediaEntityList files={message.messageMedia.filter((i:any) => fDataFormat(i.originalName)=== 'video' || fDataFormat(i.originalName) === 'image')}/>
                            <AudioEntityList files={message.messageMedia.filter((i:any) => fDataFormat(i.originalName)=== 'audio')}/>
                            <DocumentsEntityList files={message.messageMedia.filter((i:any) => fDataFormat(i.originalName)=== 'document')}/>

                        </div>
                    </>
                
                }
            />
            
        </List.Item>
    )
}

export default MessageItem