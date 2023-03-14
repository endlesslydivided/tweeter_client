import { Col, Row, Space } from "antd";
import { useAppSelector } from "../../hooks/redux";
import ContentSection from "../../sections/contentSections/ContentSection";
import PostForm from "../../sections/feedPostsSections/PostForm";
import ToFollowSection from "../../sections/feedPostsSections/ToFollow";
import TrendsSection from "../../sections/feedPostsSections/TrendsSection";
import { useGetFeedQuery } from "../../services/UserTweetsApiSlice";
import { PAGES } from "../../utils/consts";
import './HomeFeedPage.scss';

const HomeFeedPage = () => {

    const userState:any = useAppSelector((state:any) => state.auth.user);

   
    return (
        <div className='home-feed-page-container'>
            <Row gutter={[25,10]} className='home-feed-row'>

                <Col span={18}>
                    <Space direction="vertical" size='large'>
                        <PostForm/>
                        <ContentSection
                        page={PAGES.USER_FEED}  
                        fetchCB={useGetFeedQuery} 
                        params={{id:userState?.id}}
                        errorMessage={'Server error occured during getting user feed'}/>
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

