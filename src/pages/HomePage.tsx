import { Card, Col, Image, MenuProps, Row, Space, Typography } from "antd";
import { useState } from "react";
import PostList from "../components/PostList";
import VerticalSideMenu from "../components/VerticalSideMenu";
import UserCard from "../sections/homeUserDataSection/UserCard";

const BgProfile = require('../assets/abstractBG/colorfulWaves.jpg');


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
                <Row style={{marginTop:'-40px'}}>
                    <Col span={24}>
                        <UserCard/>
                    </Col>
                </Row>
                <Row gutter={[20,0]}>
                    <Col span={6}>        
                        <Card bordered={false} bodyStyle={{ display: "none" }} headStyle={{paddingLeft:'0px'}} title=
                        {
                            <VerticalSideMenu selectedKey={content} setSelecteKey={setContent} items={items}/>
                        }/>
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

