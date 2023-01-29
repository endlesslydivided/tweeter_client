import { UserOutlined } from "@ant-design/icons";
import { Card,Row,Col,Avatar,Image, Typography, MenuProps, Space } from "antd";
import { useState } from "react";
import styled from "styled-components";
import PostItem from "../components/PostItem";
import PostList from "../components/PostList";
import VerticalSideMenu from "../components/VerticalSideMenu";

const BgProfile = require('../assets/abstractBG/colorfulWaves.jpg');

const ProfileBackground = styled(Image)`
background: url(${BgProfile}) center center no-repeat;
background-size: cover;
height:100%;
`
const UserCard = styled(Card)`
justify-self: center;
margin: -30px 0 0 0
`
const UserAvatar= styled(Avatar)`
background: gainsboro;
margin: -40px -10px 0px;
border: solid white 4px;
`
const items: MenuProps['items'] = [
    {
        label: (<Typography.Text strong type='secondary'>
                    Tweets
                </Typography.Text>),
        className:'vertical-menu-item',
        key: 'tweets',
    },
    {
        label: (<Typography.Text strong type='secondary'>
                    Tweets & replies
                </Typography.Text>),
        className:'vertical-menu-item',
        key: 'tweetsReplies',
    },
    {
        label: (<Typography.Text strong type='secondary'>
                    Media
              </Typography.Text>),
        className:'vertical-menu-item',
        key: 'media',
    },
    {
        label: (<Typography.Text strong type='secondary'>
                      Likes
                </Typography.Text>),
        className:'vertical-menu-item',
        key: 'likes',
      },
];
const HomePage = () => {
   
    const [content, setContent] = useState('tweets');

    return (
        <div style={{display:'grid'}} className='home-page-container'>
            <Image src={BgProfile} className="profile-bg-image"> </Image>
            <Space direction="vertical" size='middle' style={{width: '75vw',justifySelf:'center'}}>
                    <UserCard bordered={false} bodyStyle={{ display: "none" }} title=
                    {
                        <Row  className='profile-card-row'>
                            <Col span={6} className='profile-card-avatar'>
                                <UserAvatar size={120} shape="square"
                                icon={<UserOutlined/>}/>
                            </Col>
                            <Col span={24} className='profile-card-info-col'>
                                <Row gutter={[20,0]} className='profile-card-info-row'>
                                    <Col>
                                        <Typography.Title level={4}>Name Surname</Typography.Title>                             
                                    </Col>
                                    <Col >
                                        <Typography.Text type="secondary"><Typography.Text>12</Typography.Text> Following</Typography.Text>
                                    </Col>
                                    <Col >
                                        <Typography.Text type="secondary"><Typography.Text>3312</Typography.Text> Followers</Typography.Text>
                                    </Col>
                                    <Col span={18}>
                                        <Typography.Paragraph className="profile-card-description" type="secondary" >
                                            Приветики всем! Меня зовут Name Surname. Я занимаюсь программированием, интересуюсь фотографией и ищу новых друзей)
                                        </Typography.Paragraph>
                                    </Col >
                                </Row>
                                    
                            </Col>

                        </Row>
                    }>              
                    </UserCard>
                <Row gutter={[20,0]}>
                    <Col span={6}>
               
                        <Card bordered={false} bodyStyle={{ display: "none" }} headStyle={{paddingLeft:'0px'}} title={
                            <VerticalSideMenu selectedKey={content} setSelecteKey={setContent} items={items}/>
                        }>
                        </Card>
                    </Col>
                    <Col span={18}>
                        <PostList/>
                    </Col>
                </Row>
            </Space>
        </div>
    );
};

export default HomePage;

