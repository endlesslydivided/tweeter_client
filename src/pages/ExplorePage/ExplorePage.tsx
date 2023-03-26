import { Card, Col, MenuProps, Row, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ContentSection from "../../components/ContentSection/ContentSection";
import PeopleList from "../../components/PeopleList";
import VerticalSideMenu from "../../components/VerticalSideMenu/VerticalSideMenu";
import useMediaQuery from "../../hooks/useMediaQuery";
import { useGetAllTweetsQuery, useGetMediaTweetsQuery, useGetTopTweetsQuery } from "../../services/TweetApiSlice";
import { useGetFeedQuery, useGetMediaQuery } from "../../services/UserTweetsApiSlice";
import { resetPosts } from "../../store/slices/PostsSlice";
import { PAGES } from "../../utils/consts";
import './ExplorePage.scss';

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

    const [content, setContent] = useState('top');
    
    const renderPostsList = () => {
        switch(content)
        {
            case 'top':{ 
                return (
                    <ContentSection
                    filtersProps={{limit:15}}
                    page={PAGES.TOP_TWEETS}  
                    fetchCB={useGetTopTweetsQuery} 
                    errorMessage={'Server error occured during getting top tweets'}/>
                )};
            case 'latest':{
                return (
                    <ContentSection
                    filtersProps={{limit:15}}
                    page={PAGES.LAST_TWEETS}  
                    fetchCB={useGetAllTweetsQuery} 
                    errorMessage={'Server error occured during getting latest tweets'}/>
                )};
            case 'people':{ return <PeopleList/>};
            case 'media':{ return (
                    <ContentSection
                    filtersProps={{limit:20}}
                    page={PAGES.MEDIA_TWEETS}  
                    fetchCB={useGetMediaTweetsQuery} 
                    errorMessage={'Server error occured during getting media'}/>
                )};
        }
    }

    const xs = useMediaQuery('(max-width:576px)');



    return (
        <div className='explore-page-container'>
            <Row gutter={[25,10]} className='explore-page-row'>     

                <Col 
                    lg={{span:6}}
                    md={{span:24}}
                    sm={{span:24}}
                    xs={{span:24}}  className='explore-page-verticalmenu-col'>
                    <Card 
                    bordered={false} 
                    bodyStyle={{ display: "none" }} 
                    headStyle={{paddingLeft:'0px'}} 
                    title=
                    {
                        <VerticalSideMenu selectedKey={content} setSelecteKey={setContent} items={items}/>
                    }/>
                </Col>

                <Col 
                    lg={{span:18}}                    
                    md={{span:24}}
                    sm={{span:24}}
                    xs={{span:24}} className='explore-page-feed-col'>
                    <Space direction="vertical" className={`${xs ? 'xs-space-margin' : ''}`} size='middle'>
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

