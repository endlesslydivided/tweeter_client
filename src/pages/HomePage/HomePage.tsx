import { Card, Col, Image, MenuProps, Row, Space, Typography } from "antd";
import { useState } from "react";
import VerticalSideMenu from "../../components/VerticalSideMenu/VerticalSideMenu";
import { useAppSelector } from "../../hooks/redux";
import PostForm from "../../sections/feedPostsSections/PostForm";
import UserCard from "../../sections/homeUserDataSections/UserCard";
import './HomePage.scss';
import ContentSection from "../../sections/contentSections/ContentSection";
import { useGetLikedTweetsQuery, useGetMediaQuery, useGetUserTweetsQuery } from "../../services/UserTweetsSlice";

const BgProfile = require('../../assets/abstractBG/colorfulWaves.jpg');


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

    const userState:any = useAppSelector(state => state.auth.user);

    const renderPostsList = () => {
        switch(content)
        {
            case 'tweets':{return (<><PostForm/> 
                    <ContentSection  
                    params={{id:userState.user.id}}
                    fetchCB={useGetUserTweetsQuery} 
                    errorMessage={'Server error occured during getting user tweets'}/>
                </>)};
            case 'tweetsReplies':{return (
                    <ContentSection
                    params={{id:userState.user.id}}
                    fetchCB={useGetUserTweetsQuery} 
                    errorMessage={'Server error occured during getting user tweets and replies'}/>
                )};
            case 'media':{ return (
                    <ContentSection  
                    params={{id:userState.user.id}}
                    fetchCB={useGetMediaQuery} 
                    errorMessage={'Server error occured during getting user media'}/>
                )};
            case 'likes':{ return (
                    <ContentSection  
                    params={{id:userState.user.id}}
                    fetchCB={useGetLikedTweetsQuery} 
                    errorMessage={'Server error occured during getting user liked tweets'}/>
                )};
        }
    }

    return (
        <div className='home-page-container'>
            <Image src={BgProfile} className="profile-bg-image"/>
            <Space direction="vertical" size='middle' className="home-page-space">
                
                <Row className="home-page-usercard-row">

                    <Col span={24}>
                        <UserCard userData={userState}/>
                    </Col>

                </Row>

                <Row gutter={[20,0]} className="home-page-feed-row">

                    <Col span={6}>        
                        <Card 
                        bordered={false} 
                        bodyStyle={{ display: "none" }} 
                        headStyle={{paddingLeft:'0px'}} 
                        title=
                        {
                            <VerticalSideMenu selectedKey={content} setSelecteKey={setContent} items={items}/>
                        }/>
                    </Col>

                    <Col span={18}>
                        <Space direction="vertical" style={{width:'100%'}} size='small'>                           
                            {
                                renderPostsList()
                            }
                        </Space>
                    </Col>
    
                </Row>
            </Space>
        </div>
    );
};

export default HomePage;

