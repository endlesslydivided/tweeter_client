import { Card, Col, Image, MenuProps, Modal, Row, Space, Typography } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import FollowersList from "../../components/FollowersList";
import Loader from "../../components/Loader";
import UserCard from "../../components/UserCard/UserCard";
import VerticalSideMenu from "../../components/VerticalSideMenu/VerticalSideMenu";
import { useAppSelector } from "../../hooks/redux";
import { useNotify } from "../../hooks/useNotify";
import ContentSection from "../../sections/contentSections/ContentSection";
import PostForm from "../../sections/feedPostsSections/PostForm";
import UserMedia from "../../sections/userTweetsSections/UserMedia";
import { useGetUserFollowersQuery, useGetUserSubscriptionsQuery } from "../../services/SubsriptionsApiSlice";
import { useGetUserQuery } from "../../services/UsersApiSlice";
import { useGetLikedTweetsQuery, useGetTweetsAndRepliesQuery, useGetUserTweetsQuery } from "../../services/UserTweetsApiSlice";
import { decrementFollowers, incrementFollowers, setUser } from "../../store/slices/UserSlice";
import { PAGES } from "../../utils/consts";
import './UserPage.scss';

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


const UserPage = () => {

    const [isFollowersOpen, setIsFollowersOpen] = useState(false);
    const [isFollowingsOpen, setIsFollowingsOpen] = useState(false);
    const [content, setContent] = useState('tweets');

    const profile = useAppSelector((state:any) => state.user);
    const dispatch = useDispatch();

    const {id} = useParams();
    const getUserResult = useGetUserQuery({id});


    useNotify(getUserResult,undefined,() => dispatch(setUser(getUserResult.data)));

    const renderPostsList = () => {
        switch(content)
        {
            case 'tweets':{return (<>
                    <PostForm/> 
                    <ContentSection  
                    page={PAGES.USER_TWEETS}
                    params={{id:profile?.id}}
                    fetchCB={useGetUserTweetsQuery} 
                    errorMessage={'Server error occured during getting user tweets'}/>
                </>)};
            case 'tweetsReplies':{return (
                    <ContentSection
                    page={PAGES.USER_REPLIES}
                    params={{id:profile?.id}}
                    fetchCB={useGetTweetsAndRepliesQuery} 
                    errorMessage={'Server error occured during getting user tweets and replies'}/>
                )};
            case 'media':{ return (
                    <UserMedia userId={profile?.id}/>
                )};
            case 'likes':{ return (
                    <ContentSection  
                    page={PAGES.USER_LIKES}
                    params={{id:profile?.id}}
                    fetchCB={useGetLikedTweetsQuery} 
                    errorMessage={'Server error occured during getting user liked tweets'}/>
                )};
        }
    }

    if(!profile)
    {
        return <Loader/>
    }

    return (
        <>
            <Modal 
                destroyOnClose={true}
                className="modal"
                title={`Subsribers of ${profile.firstname} ${profile.surname}`}
                centered
                onCancel={() => setIsFollowersOpen(false)}
                open={isFollowersOpen}
            >
                <FollowersList userId={profile?.id} fetchCB={useGetUserFollowersQuery}/>
            </Modal>
            <Modal 
                destroyOnClose={true}
                className="modal"
                title={`${profile.firstname} ${profile.surname} is following`}
                centered
                onCancel={() => setIsFollowingsOpen(false)}
                open={isFollowingsOpen}
            >
                <FollowersList userId={profile?.id} fetchCB={useGetUserSubscriptionsQuery}/>
            </Modal>
            
            <div className='profile-page-container'>
                <Image  
                src={profile?.profilePhoto ? process.env.REACT_APP_BACK_SERVER + profile?.profilePhoto?.path : BgProfile}  
                className="profile-bg-image"/>
                <Space direction="vertical" size='middle' className="profile-page-space">
                    
                    <Row className="profile-page-usercard-row">

                        <Col span={24}>
                            <UserCard 
                            userData={profile} 
                            setIsFollowingsOpen={setIsFollowingsOpen} 
                            setIsFollowersOpen={setIsFollowersOpen}                  
                            incrementFollowers={incrementFollowers}
                            decrementFollowers={decrementFollowers}
                            />
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

export default UserPage;

