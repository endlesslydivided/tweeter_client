import { Card, Col, Image, MenuProps, Modal, Row, Space, Typography } from "antd";
import { useState } from "react";
import FollowersList from "../../components/FollowersList";
import UserCard from "../../components/UserCard/UserCard";
import VerticalSideMenu from "../../components/VerticalSideMenu/VerticalSideMenu";
import { useAppSelector } from "../../hooks/redux";
import ContentSection from "../../sections/contentSections/ContentSection";
import PostForm from "../../sections/feedPostsSections/PostForm";
import UserMedia from "../../sections/userTweetsSections/UserMedia";
import { useGetUserFollowersQuery, useGetUserSubscriptionsQuery } from "../../services/SubsriptionsApiSlice";
import { useGetLikedTweetsQuery, useGetTweetsAndRepliesQuery, useGetUserTweetsQuery } from "../../services/UserTweetsApiSlice";
import { decrementCurrentUserFollowers, incrementCurrentUserFollowers } from "../../store/slices/AuthSlice";
import { PAGES } from "../../utils/consts";
import './ProfilePage.scss';

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

const ProfilePage = () => {

    const [isFollowersOpen, setIsFollowersOpen] = useState(false);
    const [isFollowingsOpen, setIsFollowingsOpen] = useState(false);
   
    const [content, setContent] = useState('tweets');

    const userState:any = useAppSelector((state:any) => state.auth.user);

    const renderPostsList = () => {
        switch(content)
        {
            case 'tweets':{return (<>
                    <PostForm/> 
                    <ContentSection  
                    page={PAGES.USER_TWEETS}
                    params={{id:userState?.id}}
                    fetchCB={useGetUserTweetsQuery} 
                    errorMessage={'Server error occured during getting user tweets'}/>
                </>)};
            case 'tweetsReplies':{return (
                    <ContentSection
                    page={PAGES.USER_REPLIES}
                    params={{id:userState?.id}}
                    fetchCB={useGetTweetsAndRepliesQuery} 
                    errorMessage={'Server error occured during getting user tweets and replies'}/>
                )};
            case 'media':{ return (
                    <UserMedia userId={userState?.id}/>
                )};
            case 'likes':{ return (
                    <ContentSection  
                    page={PAGES.USER_LIKES}
                    params={{id:userState?.id}}
                    fetchCB={useGetLikedTweetsQuery} 
                    errorMessage={'Server error occured during getting user liked tweets'}/>
                )};
        }
    }

    return (
        <>
        <Modal
            destroyOnClose={true}
            className="modal"
            title={`Your subscribers`}
            centered
            onCancel={() => setIsFollowersOpen(false)}
            open={isFollowersOpen}
        >
            <FollowersList userId={userState?.id} fetchCB={useGetUserFollowersQuery}/>
        </Modal>
        <Modal
            destroyOnClose={true}
            className="modal"
            title={`You follows`}
            centered
            onCancel={() => setIsFollowingsOpen(false)}
            open={isFollowingsOpen}
        >
            <FollowersList userId={userState?.id} fetchCB={useGetUserSubscriptionsQuery}/>
        </Modal>
        <div className='profile-page-container'>
            <Image src={BgProfile} className="profile-bg-image"/>
            <Space direction="vertical" size='middle' className="profile-page-space">
                
                <Row className="profile-page-usercard-row">

                    <Col span={24}>
                        <UserCard 
                        userData={userState} 
                        setIsFollowingsOpen={setIsFollowingsOpen} 
                        setIsFollowersOpen={setIsFollowersOpen}
                        incrementFollowers={incrementCurrentUserFollowers}
                        decrementFollowers={decrementCurrentUserFollowers}/>
                    </Col>

                </Row>

                <Row gutter={[20,20]} className="profile-page-feed-row">

                    <Col xs={{span:24}} md={{span:24}} xl={{span:6}} >        
                        <Card 
                        bordered={false} 
                        bodyStyle={{ display: "none" }} 
                        headStyle={{paddingLeft:'0px'}} 
                        title=
                        {
                            <VerticalSideMenu selectedKey={content} setSelecteKey={setContent} items={items}/>
                        }/>
                    </Col>

                    <Col xs={{span:24}} md={{span:24}} xl={{span:18}} >
                        <Space direction="vertical" style={{width:'100%'}} size='small'>                           
                            {
                                renderPostsList()
                            }
                        </Space>
                    </Col>
    
                </Row>
            </Space>
        </div>
        </>
    );
};

export default ProfilePage;

