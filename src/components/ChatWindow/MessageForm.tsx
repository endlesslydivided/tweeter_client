import { FileTwoTone, SendOutlined } from '@ant-design/icons';
import { Button, Col, Input, notification, Row, Tooltip, Upload, UploadProps } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { fDataFormat } from '../../utils/uploadFormats';
import AudioFormList from '../MediaFormLists/AudioFormList';
import DocumentsFormList from '../MediaFormLists/DocumentsFormList';
import MediaFormList from '../MediaFormLists/MediaFormList';
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

    const {id}:any = useParams();

    const [files, setFiles] : any = useState([]);
    const [messageContent,setMessageContent]:any = useState(initialMessage)
 
    const sendMessage =  () =>
    {

        const sentFiles = files.map((file:any) =>
        {
            return {...file,originalname:file.file.name};
        })

        try
        {
            socket.emit(ChatServerEvent.CLIENT_SEND_MESSAGE,
                {
                    dto:
                    {
                        dialogId:id,
                        text: messageContent.text,
                        userId:user.id,
                    },
                    files:sentFiles,
                    toUserId:dialog?.users[0]?.id,
                    fromUserId:user.id,
                    auth:{id:user.id},
                },(response:any) =>
                {
                    console.log(response)
                });
        }
        catch(error:any)
        {
            console.log(error);
        }
        
        setMessageContent(initialMessage);
        setFiles([]);
    }

    const props: UploadProps = {
        name: 'file',
        maxCount: 10,
        itemRender:(originNode:any, file:any) => { return <></>},
        multiple:true,
        beforeUpload: (file, fileList) => {
            if (10 - files.length < fileList.length) 
            {
              notification.error({message: "Max files count: 10 files",placement: "topRight",duration: 2,});
              const filesToSet = fileList.splice(10 - files.length);
              setFiles([...files,...filesToSet.map((file: any) => {return { file, id: file.uid, type: fDataFormat(file.name)}})]);
            } 
            else 
            {
              setFiles([...files,...fileList.map((file: any) => {return { file, id: file.uid, type: fDataFormat(file.name) };})]);
            }
      
            return false;
          },
	};
								
    return(
        <Row style={{width:'100%'}} className="message-form-row">
            <Col span={24} style={{display:'flex'}} className="message-form-input-col">
               <MessageFormTextarea 
                    messageContent={messageContent} 
                    setMessageContent={setMessageContent} 
                    sendMessage={sendMessage}/>
                
                <div className='message-form-tooltip-container'>

                    <Tooltip  title="Add fille">
                        <Upload {...props} fileList={files} >
                            <Button type="link" shape='circle'  icon={<FileTwoTone />} />
                        </Upload>
                    </Tooltip>

                    <Button type="text" disabled={messageContent.text.length === 0} onClick={() => sendMessage()} icon={<SendOutlined />}/>

                </div>
            </Col>
            <Col span={24} className="message-form-media-col">
                <MediaFormList files={files.filter((i: any) => i.type === "video" || i.type === "image")} setFiles={setFiles}/>
                <AudioFormList files={files.filter((i: any) => i.type === "audio")} setFiles={setFiles} />
                <DocumentsFormList files={files.filter((i: any) => i.type === "document")} setFiles={setFiles} />
            </Col>
         
            <div id={'lastElement'}></div>
        </Row>
    )
}

const MessageFormTextarea = ({messageContent,setMessageContent,sendMessage}:any) =>
{
    const [keys,setKeys]:any = useState([]);
    useEffect(() =>
       {
           window.addEventListener("keydown",
               (e) =>
               {
                   setKeys([...keys,e.key])
               },
           false);
   
           window.addEventListener('keyup',
               (e) => 
               {
                   setKeys(keys.filter((k:any) => k !== e.key));
               },
           false);
   
           return () =>
           {
               window.removeEventListener('keyup', (e) =>
               {
                   setKeys([...keys,e.key])
               },);
               window.removeEventListener('keydown', (e) => 
               {
                   setKeys(keys.filter((k:any) => k !== e.key));
               },);
           }
       },[])

    const onPressEnterHandler = (e:any) =>
    {
        e.preventDefault();
        if(messageContent.text.length !== 0)
        {
            sendMessage() 
        }
        if(keys.includes("Control") && e.key === "Enter"){
            setKeys([])
            setMessageContent((p:any) => {return {...p,text: p.text + '\n'}})
        }
    }

    const onInputChangeHandler =(e:any) =>
    {
        setMessageContent((p:any) => {return {...p, text:e.target.value}})
    }

    return(
        <Input.TextArea 
        onPressEnter={(e:any) => onPressEnterHandler(e)}
        value={messageContent.text}
        onInput={(e:any) => onInputChangeHandler(e)}
        autoSize={{minRows:2,maxRows:4}}  
        maxLength={2000} 
        className='message-form-textarea' 
        placeholder="Text a message..."
    />
    )
}

export default MessageForm