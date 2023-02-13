import { Card, Col, MenuProps, Row, Space, Typography } from "antd";
import { useState } from "react";
import PostList from "../components/PostList";
import VerticalSideMenu from "../components/VerticalSideMenu";
import SearchBar from "../sections/exploreSections/SearchBar";
import PostForm from "../sections/feedPostsSections/PostForm";
import ToFollowSection from "../sections/feedPostsSections/ToFollowSection";
import TrendsSection from "../sections/feedPostsSections/TrendsSection";

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

const ExplorePage = () => {

    const [content, setContent] = useState('tweets');

    return (
        <div style={{display:'grid'}} className='explore-page-container'>
            <Row gutter={[25,10]} style={{width: '75vw',justifySelf:'center'}}>              
                <Col span={6}>
                <Card bordered={false} bodyStyle={{ display: "none" }} headStyle={{paddingLeft:'0px'}} title=
                        {
                            <VerticalSideMenu selectedKey={content} setSelecteKey={setContent} items={items}/>
                        }/>
                </Col>
                <Col span={18}>
                    <Space direction="vertical" size='middle' style={{width: '100%',justifySelf:'center'}}>
                        <SearchBar/>
                        <PostList/>
                    </Space>
                </Col>
            </Row>
        </div>
    );
};

export default ExplorePage;

