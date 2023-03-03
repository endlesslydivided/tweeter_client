
import { GlobalOutlined, PictureOutlined, SendOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Divider,Image, Input, List, notification, Popover, Radio, Row, Space, Tooltip, Typography, Upload, UploadFile, UploadProps } from "antd";
import React, { useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import { useCreateTweetMutation } from "../../services/TweetApiSlice";
import PostFormImages from "../ImageList/PostFormImages";
import './ReplyForm.scss'

interface ReplyFormProps {
	parentPost: any;
}

const initialPost = {
	text: '',
	isPublic: true,
	authorId: null,
	isComment: true
}


const ReplyForm: React.FC<ReplyFormProps> = ({parentPost})  =>
{
	const [postValues,setPostValues] = useState(initialPost);
	const [files, setFiles] : any = useState([]);
	const userState: any = useAppSelector(state => state.auth.user);


	const [createComment, result] = useCreateTweetMutation();


	const onTextAreaChange= (e:any) =>  setPostValues(previous => ({...previous,text:e.target.value}));
	const onPublicChange= (e:any) =>  setPostValues(previous => ({...previous,isPublic:e.target.value}));
	const onCreatePostSubmit= async (e:any) =>  
	{
		const formData = new FormData();
        files.forEach((file:any) => {
            formData.append('files', file, file.name);
        })

        formData.append('text', postValues.text);
        formData.append('isComment', postValues.isComment.toString());
		formData.append('isPublic', postValues.isPublic.toString());
		formData.append('parentRecordAuthorId', parentPost.author.id.toString());
		formData.append('parentRecordId',  parentPost.id.toString());
        formData.append('authorId', userState.user.id);

        const result:any = await createComment(formData);

        if(result.data)
		{
			setPostValues((previous:any) => initialPost);
			setFiles([]);
		}
		else if(result.error)
		{
			notification.error({message:result.error.message,placement:'topRight',duration:2})
		}
	};

	const props: UploadProps = {
		name: 'file',
		maxCount: 2,
		itemRender:(originNode, file) => { return <></>},
		multiple:true,
		beforeUpload: (file,fileList) => {
			if(fileList.length > 1)
				setFiles([...files,...fileList]);
			else
				setFiles([...files,file]);

			return false;
		},
	};

    return (
		<div className="reply-form-container">
            <Row className="reply-form-row" gutter={[10,0]}>

				<Col className="reply-form-avatar" md={{flex:1}}>
					<Avatar icon={<UserOutlined />} size={'large'} shape="square" />
				</Col>
				
				<Col flex='auto' className="reply-form-textarea-col">

					<Space 
					direction='horizontal' 
					className="reply-form-space">
						<Input.TextArea 
							autoSize={true} 
							value={postValues.text}
							onChange={(e) => onTextAreaChange(e)}
							maxLength={1000}  
							className='reply-form-textarea'
							placeholder="Tweet your reply"
							/>

						<div className='reply-form-textarea-content'>

								<Tooltip  title="Add photo">
									<Upload {...props} fileList={files} accept="image/*">
										<Button type="text" shape='circle'  icon={<PictureOutlined />} />
									</Upload>
								</Tooltip>									

								<Button  
								type="primary" 
								icon={<SendOutlined/>} 
								shape="circle" 
								onClick={(e) => onCreatePostSubmit(e)} />

						</div>
					</Space>

				</Col>

				<PostFormImages files={files} setFiles={setFiles}/>

			</Row>
		</div>
    )
}

export default ReplyForm;

