import { Card, Col, MenuProps, Row, Space, Typography } from "antd";
import { useState } from "react";
import PostList from "../../components/PostList/PostList";
import VerticalSideMenu from "../../components/VerticalSideMenu/VerticalSideMenu";
import LatestSection from "../../sections/contentSections/LatestSection";
import MediaSection from "../../sections/contentSections/MediaSection";
import PeopleSection from "../../sections/contentSections/PeopleSection";
import TopTweets from "../../sections/contentSections/TopTweets";
import SearchBar from "../../sections/exploreSections/SearchBar";
import './ExplorePage.scss'

const items: MenuProps['items'] = [
    {
        label: (<Typography.Text strong type='secondary'>
                    Top
                </Typography.Text>),
        className:'vertical-menu-item',
        key: 'top',
    },
    {
        label: (<Typography.Text strong type='secondary'>
                    Latest
                </Typography.Text>),
        className:'vertical-menu-item',
        key: 'latest',
    },
    {
        label: (<Typography.Text strong type='secondary'>
                    People
              </Typography.Text>),
        className:'vertical-menu-item',
        key: 'people',
    },
    {
        label: (<Typography.Text strong type='secondary'>
                      Media
                </Typography.Text>),
        className:'vertical-menu-item',
        key: 'media',
      },
];

const ExplorePage = () => {

    const [content, setContent] = useState('tweets');

    const renderPostsList = () => {
        switch(content)
        {
            case 'top':{return <TopTweets/>};
            case 'latest':{return <LatestSection/>};
            case 'people':{return <PeopleSection/>};
            case 'media':{return <MediaSection/>};
        }
    }

    return (
        <div className='explore-page-container'>
            <Row gutter={[25,10]} className='explore-page-row'>     

                <Col span={6} className='explore-page-verticalmenu-col'>
                    <Card 
                    bordered={false} 
                    bodyStyle={{ display: "none" }} 
                    headStyle={{paddingLeft:'0px'}} 
                    title=
                    {
                        <VerticalSideMenu selectedKey={content} setSelecteKey={setContent} items={items}/>
                    }/>
                </Col>

                <Col span={18} className='explore-page-feed-col'>
                    <Space direction="vertical" size='middle'>
                        <SearchBar/>
                        {
                            renderPostsList()
                        }
                    </Space>
                </Col>

            </Row>
        </div>
    );
};

export default ExplorePage;

