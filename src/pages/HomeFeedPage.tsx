import { Col, Row, Space } from "antd";
import PostList from "../components/PostList";
import PostForm from "../sections/explorePostsSection/PostForm";


const HomeFeedPage = () => {
   
    return (
        <div style={{display:'grid'}} className='home-feed-page-container'>
            <Row style={{width: '75vw',justifySelf:'center'}}>
                <Col span={18}>
                    <Space direction="vertical" style={{width: '100%',justifySelf:'center'}}>
                        <PostForm/>
                        <PostList/>
                    </Space>
                </Col>
                <Col span={6}>
                </Col>
            </Row>
        </div>
    );
};

export default HomeFeedPage;

