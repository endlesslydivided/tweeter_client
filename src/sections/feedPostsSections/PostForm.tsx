
import { GlobalOutlined, PictureOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Divider, Input, Popover, Radio, Row, Space, Tooltip, Typography } from "antd";
import React, { useState } from "react";

interface PostFormProps {

}


const PostForm: React.FC<PostFormProps> = ({})  =>
{

	const [replyRule,setReplyRule] = useState(false);

    return (
        <Card className='post-form-card'>
            <Card.Meta className="post-form-card-meta" title={<Typography.Text className="post-form-card-title" strong>Tweet something</Typography.Text>}/>

            <Divider type="horizontal" style={{margin:'7.5px 0px'}}/>

            <Space direction="vertical" className="post-form-card-space" size='middle'>

                <Row >

                    <Col>
                        <Avatar icon={<UserOutlined />} size={36} shape="square" />
                    </Col>

                    <Col flex={22} >
                        <Space direction='vertical' style={{width:'100%'}}>
                            <Input.TextArea autoSize={true} showCount maxLength={1000}  className='post-form-textarea'placeholder="What's happening?"/>
                            <div style={{display:'flex'}} >

                                <Tooltip  title="Add photo">
                                    <Button type="link" shape='circle'  icon={<PictureOutlined />} />
                                </Tooltip>

                                <Popover id='replyPopover' placement="bottomRight"
									title=
									{
										<div>
											<Typography.Title style={{margin:0,fontSize:'14px'}} level={5}>Who can reply?</Typography.Title>
											<Typography.Text  style={{ color: 'rgba(0,0,0,.45)',fontWeight:'normal',fontSize:'12px' }} type="secondary">
												Choose who can reply to this tweet.
											</Typography.Text>
										</div>
									}
									content=
									{
										<Space direction='vertical' className='post-form-popover-content'>
											<Radio.Group onChange={e => setReplyRule(e.target.value)} defaultValue={false}>
												<Radio.Button className='post-form-button-everyone' value={false} style={{width:'100%',border:'none'}}>
													<Space>
														<GlobalOutlined /> Everyone
													</Space>
												</Radio.Button>
												<Radio.Button className='post-form-button-follow' value={true} style={{width:'100%',border:'none'}}>
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
										replyRule ? <Button type="link" shape='circle'icon={<TeamOutlined/>}>People you follow</Button>
										: <Button type="link" shape='circle'icon={<GlobalOutlined />}>Everyone</Button>
									}
                                   
                                </Popover>

                                <Button style={{marginLeft:'auto'}} type="primary" >Tweet</Button>

                            </div>

                        </Space>
                    </Col>
                </Row>
            </Space>


        </Card>
    )
}

export default PostForm;

