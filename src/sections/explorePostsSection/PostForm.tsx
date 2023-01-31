
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useSignInMutation} from '../../services/AuthApiSlice';
import {useDispatch} from 'react-redux';
import React, { Component } from "react";
import {Layout,Menu,Button,Row,Col,Typography,Form,Input,Switch, Card, Space, Divider, Tooltip, Avatar, Popover, Radio,} from "antd";
import {DribbbleOutlined,TwitterOutlined,InstagramOutlined, UserOutlined, PictureOutlined, GlobalOutlined, TeamOutlined} from "@ant-design/icons";
import ButtonGroup from 'antd/es/button/button-group';

interface PostFormProps {

}


const PostForm: React.FC<PostFormProps> = ({})  =>
{

    return (
        <Card className='post-form-card'>
            <Card.Meta className="post-form-card-meta"
                title={<Typography.Text className="post-form-card-title" strong>Tweet something</Typography.Text>}
            />  
            <Divider type="horizontal" style={{marginTop:'5px'}}/>
            <Space direction="vertical" className="post-form-card-space" size='middle'>
               

                <Row style={{marginTop: '-18px'}}>
                    <Col>
                        <Avatar icon={<UserOutlined />} size={36} shape="square" />
                    </Col>
                    <Col flex={22} >
                        <Space direction='vertical' style={{width:'100%'}}>
                            <Input.TextArea autoSize={true} showCount
                            maxLength={1000}  className='post-form-textarea'
                            placeholder="What's happening?"
                            />  
                            <div style={{display:'flex'}} >
                                <Tooltip  title="Add photo">
                                    <Button type="link" shape='circle'  icon={<PictureOutlined />} />
                                </Tooltip>   
                                <Popover id='replyPopover' placement="bottomRight" 
                                title={
                                    <div>
                                        <Typography.Title style={{margin:0}} level={5}>Who can reply?</Typography.Title>
                                        <Typography.Text  style={{ color: 'rgba(0,0,0,.45)',fontWeight:'normal' }} type="secondary">
                                            Choose who can reply to this tweet.
                                        </Typography.Text>
                                    </div>
                                } 
                                content={
                                    <Space direction='vertical' className='post-form-popover-content'>
                                        <Radio.Group defaultValue={false}>
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
                                } trigger="click">
                                    <Button type="link" shape='circle'  icon={<GlobalOutlined />} />                                
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

