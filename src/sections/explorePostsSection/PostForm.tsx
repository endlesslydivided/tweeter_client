
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useSignInMutation} from '../../services/AuthApiSlice';
import {useDispatch} from 'react-redux';
import React, { Component } from "react";
import {Layout,Menu,Button,Row,Col,Typography,Form,Input,Switch, Card, Space, Divider, Tooltip, Avatar,} from "antd";
import {DribbbleOutlined,TwitterOutlined,InstagramOutlined, UserOutlined, PictureOutlined, GlobalOutlined} from "@ant-design/icons";
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
            <Space direction="vertical" className="post-form-card-space" size='middle'>
               
                <Divider type="horizontal" />

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
                            <div style={{display:'flex'}}>
                                <Tooltip  title="Add photo">
                                    <Button type="link" shape='circle'  icon={<PictureOutlined />} />
                                </Tooltip>   
                                <Button type="link" shape='circle'  icon={<GlobalOutlined />} />
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

