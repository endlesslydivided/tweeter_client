import { Card, Col, MenuProps, Row, Space, Typography } from "antd";
import { useState } from "react";
import PostList from "../../components/PostList/PostList";
import VerticalSideMenu from "../../components/VerticalSideMenu/VerticalSideMenu";
import './BookmarksPage.scss'
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

const BookmarksPage = () => {

    const [content, setContent] = useState('tweets');

   
    return (
        <div className='bookmarks-page-container'>
            <Row gutter={[25,10]} className='bookmarks-row'>              
                <Col span={6} className='bookmarks-verticalmenu-col'>
                    <Card   bordered={false} 
                            bodyStyle={{ display: "none" }} 
                            headStyle={{paddingLeft:'0px'}} title=
                        {
                            <VerticalSideMenu selectedKey={content} setSelecteKey={setContent} items={items}/>
                        }/>
                </Col>
                <Col span={18} className='bookmarks-postlist-col'>
                    <Space direction="vertical" size='large'>
                        <PostList/>
                    </Space>
                </Col>
            </Row>
        </div>
    );
};

export default BookmarksPage;

