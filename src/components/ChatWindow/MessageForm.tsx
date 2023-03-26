import { PictureOutlined, SendOutlined } from '@ant-design/icons';
import { Button, Input, notification, Tooltip, Upload, UploadProps } from 'antd';
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import PostFormImages from '../MediaFormLists/MediaFormList';
import { ChatServerEvent, SocketContext } from '../SocketProvider/SocketProvider';
import './ChatWindow.scss';


interface MessageFormProps
{
    dialog:any;
}

const initialMessage =
{
    text:'',
}

const MessageForm:React.FC<MessageFormProps> = ({dialog}) => {

    const socket:any = useContext(SocketContext);
    const user = useAppSelector((state:any) => state.auth.user);
    const [messageContent,setMessageContent]:any = useState(initialMessage)

    const {id}:any = useParams();

    const [files, setFiles] : any = useState([]);

    const sendMessage =  () =>
    {

        const formData = new FormData();
        files.forEach((file:any) => {
            formData.append('files', file, file.name);
        })

        formData.append('text', messageContent.text);

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

    const props: UploadProps = {
        name: 'file',
        maxCount: 10,
        itemRender:(originNode:any, file:any) => { return <></>},
        multiple:true,
        beforeUpload: (file:any,fileList:any) => {
            if(fileList.length > 1)
                setFiles([...files,...fileList]);
            else
                setFiles([...files,file]);

            return false;
        },
	};
										


    
    return(
        <>
            <Input.TextArea 
                value={messageContent.text}
                onChange={(e:any) => setMessageContent((p:any) => {return {...p, text:e.target.value}})}
                autoSize={{minRows:2,maxRows:4}}  
                maxLength={2000} 
                className='message-form-textarea' 
                placeholder="Text a message..."
            />
            
            <div className='message-form-tooltip-container'>

                <Tooltip  title="Add photo">
                    <Upload {...props} fileList={files} accept="image/*">
                        <Button type="link" shape='circle'  icon={<PictureOutlined />} />
                    </Upload>
                </Tooltip>

                <Button type="text" onClick={() => sendMessage()} icon={<SendOutlined />}/>

            </div>
            <PostFormImages files={files} setFiles={setFiles}/>
            <div id={'lastElement'}></div>
        </>
    )
}

export default MessageForm