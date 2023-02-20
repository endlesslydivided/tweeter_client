import { Col, Row, Space } from "antd";
import PostList from "../../components/PostList/PostList";
import PostForm from "../../sections/feedPostsSections/PostForm";
import ToFollowSection from "../../sections/feedPostsSections/ToFollow";
import TrendsSection from "../../sections/feedPostsSections/TrendsSection";
import './HomeFeedPage.scss'

const HomeFeedPage = () => {
   
    return (
        <div className='home-feed-page-container'>
            <Row gutter={[25,10]} className='home-feed-row'>

                <Col span={18}>
                    <Space direction="vertical" size='large'>
                        <PostForm/>
                        <PostList/>
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

