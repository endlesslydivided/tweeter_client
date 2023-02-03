import { Col, Row, Space } from "antd";
import PostList from "../components/PostList";
import PostForm from "../sections/feedPostsSections/PostForm";
import ToFollowSection from "../sections/feedPostsSections/ToFollowSection";
import TrendsSection from "../sections/feedPostsSections/TrendsSection";


const HomeFeedPage = () => {
   
    return (
        <div style={{display:'grid'}} className='home-feed-page-container'>
            <Row gutter={[25,10]} style={{width: '75vw',justifySelf:'center'}}>
                <Col span={18}>
                    <Space direction="vertical" size='large' style={{width: '100%',justifySelf:'center'}}>
                        <PostForm/>
                        <PostList/>
                    </Space>
                </Col>
                <Col span={6}>
                    <Space direction="vertical" size='large' style={{width: '100%',justifySelf:'center'}}>
                        <TrendsSection/>
                        <ToFollowSection/>
                    </Space>
                </Col>
            </Row>
        </div>
    );
};

export default HomeFeedPage;

