
import { CloseOutlined, PictureOutlined, SendOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Input, notification, Row, Space, Tooltip, Typography, Upload, UploadProps } from "antd";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useCreateTweetMutation, useLazyGetOneTweetQuery } from "../../services/TweetApiSlice";
import { appendComment } from "../../store/slices/CommentsSlice";
import { incrementPostComments } from "../../store/slices/PostsSlice";
import PostFormImages from "../ImageList/PostFormImages";
import './ReplyForm.scss';

interface ReplyFormProps {
	parentPost: any;
	setReplyPost:Function;
	replyPost:any;
}

const initialPost = {
	text: '',
	isPublic: true,
	authorId: null,
	isComment: true
}


const ReplyForm: React.FC<ReplyFormProps> = ({parentPost,setReplyPost,replyPost})  =>
{
	const [postValues,setPostValues] = useState(initialPost);
	const [files, setFiles]:any = useState([]);

	const [getComment] = useLazyGetOneTweetQuery();
	const [createComment] = useCreateTweetMutation();

	const userState: any = useAppSelector((state:any) => state.auth.user);

	const dispatch = useAppDispatch();

	const appendToComments = async (id:any) =>
    {
        const {data,error}:any = await getComment({id});
        if(data)
        {
            dispatch(appendComment({parentId:replyPost.id,data}));
			dispatch(incrementPostComments(replyPost.id));
        }
        else if(error)
        {
            notification.error({message:error.message,placement:'topRight',duration:2})
        }
    }

	const onTextAreaChange= (e:any) =>  setPostValues(previous => ({...previous,text:e.target.value}));
	const onCreatePostSubmit= async (e:any) =>  
	{
		const formData = new FormData();
        files.forEach((file:any) => {
            formData.append('files', file, file.name);
        })

        formData.append('text', postValues.text);
        formData.append('isComment', postValues.isComment.toString());
		formData.append('isPublic', postValues.isPublic.toString());
		formData.append('parentRecordAuthorId', replyPost.author.id.toString());
		formData.append('parentRecordId',  replyPost.id.toString());
        formData.append('authorId', userState.id);

        const {data,error}:any = await createComment(formData);

        if(data)
		{
			setPostValues((previous:any) => initialPost);
			setFiles([]);
			appendToComments(data.id);			
		}
		else if(error)
		{
			notification.error({message:error.message,placement:'topRight',duration:2})
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
            <Row className="reply-form-row" gutter={[10,5]}>

				{
					replyPost.isComment 
					&&
					<Col md={{span:24}}>				
						<Typography.Text className={`close-reply-button`} onClick={() => {setReplyPost(parentPost);}} type="secondary" >
							<CloseOutlined/>
							Reply to {`${replyPost.author.firstname} ${replyPost.author.surname}`}
						</Typography.Text>
					</Col>
				}

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

