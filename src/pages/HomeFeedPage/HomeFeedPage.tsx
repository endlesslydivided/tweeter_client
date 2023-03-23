import { Col, Row, Space } from "antd";
import PostForm from "../../components/PostForm/PostForm";
import { useAppSelector } from "../../hooks/redux";
import useMediaQuery from "../../hooks/useMediaQuery";
import ContentSection from "../../components/ContentSection/ContentSection";
import { useGetFeedQuery } from "../../services/UserTweetsApiSlice";
import { PAGES } from "../../utils/consts";
import './HomeFeedPage.scss';

const HomeFeedPage = () => {

    const userState:any = useAppSelector((state:any) => state.auth.user);

   const xs = useMediaQuery('(max-width:576px)');
    return (
        <div className='home-feed-page-container'>
            <Row gutter={[25,10]} className='home-feed-row'>

                <Col 
                    lg={{span:24}}
                    md={{span:24}}
                    sm={{span:24}}
                    xs={{span:24}} >
                    <Space direction="vertical" className={`${xs ? 'xs-space-margin' : ''}`} size='large'>
                        <PostForm/>
                        <ContentSection
                        page={PAGES.USER_FEED}  
                        fetchCB={useGetFeedQuery} 
                        params={{id:userState?.id}}
                        errorMessage={'Server error occured during getting user feed'}/>
                    </Space>
                </Col>


            </Row>
        </div>
    );
};

export default HomeFeedPage;

