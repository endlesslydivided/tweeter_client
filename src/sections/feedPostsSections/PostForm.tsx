
import { GlobalOutlined, PictureOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Divider,Image, Input, List, Popover, Radio, Row, Space, Tooltip, Typography, Upload, UploadFile, UploadProps } from "antd";
import React, { useState } from "react";
import PostFormImages from "../../components/ImageList/PostFormImages";
import './PostForm.scss'

interface PostFormProps {

}

const initialPost = {
	text: '',
	isComment: false,
	isPublic: true,
	authorId: null
}


const PostForm: React.FC<PostFormProps> = ({})  =>
{
	const [postValues,setPostValues] = useState(initialPost);
	const [files, setFiles] : any = useState([]);

	const onTextAreaChange= (e:any) =>  setPostValues(previous => ({...previous,text:e.target.value}));
	const onPublicChange= (e:any) =>  setPostValues(previous => ({...previous,isPublic:e.target.value}));

	const handleChange: UploadProps['onChange'] = (info) => {
		let newFileList = [...info.fileList];
	
		newFileList = newFileList.map((file) => {
		  if (file.response) {
			file.url = file.response.url;
		  }
		  return file;
		});
		setFiles(newFileList);
	};

	const props: UploadProps = {
		name: 'file',
		maxCount: 10,
		onChange: handleChange,
		itemRender:(originNode, file) => { return <></>},
		multiple:true
	  };
	
	
	

    return (
        <Card className='post-form-card'>

            <Card.Meta className="post-form-card-meta" title=
			{<Typography.Text className="post-form-card-title" strong>Tweet something</Typography.Text>}
			/>

            <Divider type="horizontal"/>

            <Space 
			direction="vertical" 
			className="post-form-card-space" 
			size='middle'>

                <Row >

                    <Col 
					className="post-form-avatar"
					md={{flex:1}}>
                        <Avatar icon={<UserOutlined />} size={36} shape="square" />
                    </Col>

                    <Col flex='auto'>

                        <Space 
						direction='vertical' 
						className="post-form-space">

                            <Input.TextArea 
							autoSize={true} 
							onChange={(e) => onTextAreaChange(e)}
							showCount maxLength={1000}  
							className='post-form-textarea'
							placeholder="What's happening?"/>

                            <Row className='post-form-textarea-content'>

								<Col >
									<Tooltip  title="Add photo">
										<Upload {...props} fileList={files} accept="image/*">
											<Button type="link" shape='circle'  icon={<PictureOutlined />} />
										</Upload>
									</Tooltip>

									<Popover id='replyPopover' placement="bottomRight"
										title=
										{
											<>
												<Typography.Title className="post-form-popover-title" level={5}>
													Who can reply?
												</Typography.Title>
												<Typography.Text className="post-form-popover-description" type="secondary">
													Choose who can reply to this tweet.
												</Typography.Text>
											</>
										}
										content=
										{
											<Space direction='vertical' className='post-form-popover-content'>
												<Radio.Group onChange={e => onPublicChange(e)} defaultValue={false}>
													<Radio.Button className='post-form-button-everyone' value={false}>
														<Space>
															<GlobalOutlined /> Everyone
														</Space>
													</Radio.Button>
													<Radio.Button className='post-form-button-follow' value={true}>
														<Space>
															<TeamOutlined/> People you follow
														</Space>
													</Radio.Button>
												</Radio.Group>

											</Space>
										} 
										trigger="click"
									>
										{
											postValues.isPublic ? <Button type="link" shape='circle'icon={<TeamOutlined/>}>People you follow</Button>
											: <Button type="link" shape='circle'icon={<GlobalOutlined />}>Everyone</Button>
										}
									
									</Popover>
								</Col>

								<Col className="post-form-tweet-col">		
                                	<Button  type="primary" >Tweet</Button>
								</Col>
                            </Row>

 							
                        </Space>
                    </Col>
                </Row>

				<Row>
					<PostFormImages files={files} setFiles={setFiles}/>
                </Row>
            </Space>
        </Card>
    )
}

export default PostForm;

