import { Col, Row, Space } from "antd";
import PostList from "../../components/PostList/PostList";
import { useAppSelector } from "../../hooks/redux";
import PostForm from "../../sections/feedPostsSections/PostForm";
import ToFollowSection from "../../sections/feedPostsSections/ToFollow";
import TrendsSection from "../../sections/feedPostsSections/TrendsSection";
import UserFeed from "../../sections/contentSections/UserFeed";
import './HomeFeedPage.scss'

const HomeFeedPage = () => {

    const userState:any = useAppSelector(state => state.auth.user);

   
    return (
        <div className='home-feed-page-container'>
            <Row gutter={[25,10]} className='home-feed-row'>

                <Col span={18}>
                    <Space direction="vertical" size='large'>
                        <PostForm/>
                        <UserFeed userId={userState.user.id}/>
                    </Space>
                </Col>

                <Col span={6}>
                    <Space direction="vertical" size='large'>
                        <TrendsSection/>
                        <ToFollowSection/>
                    </Space>
                </Col>

            </Row>
        </div>
    );
};

export default HomeFeedPage;

