import { Col, ConfigProvider, Row, Space } from "antd";
import { useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import ContentSection from "../../components/ContentSection/ContentSection";
import { useGetSavedTweetsQuery } from "../../services/UserTweetsApiSlice";
import { PAGES } from "../../utils/consts";
import './BookmarksPage.scss';
import { emptyPostListRender, emptySavedListRender } from "../../components/EmptyListRender/EmptyListRender";

const BookmarksPage = () => {

    const userState:any = useAppSelector((state:any) => state.auth.user);

   
    return (
        <div className='bookmarks-page-container'>
            <Row gutter={[25,10]} className='bookmarks-row'>              
                <Col span={24} className='bookmarks-postlist-col'>
                    <Space direction="vertical" size='large'>
                    <ConfigProvider renderEmpty={emptySavedListRender}>      

                        <ContentSection 
                        page={PAGES.USER_SAVES}
                        params={{id:userState?.id,filters:{orderBy: 'createdAt',orderDirection: 'asc'}}}
                        fetchCB={useGetSavedTweetsQuery} 
                        errorMessage={'Server error occured during getting user liked tweets'}/>
                    </ConfigProvider>
                    </Space>
                </Col>
            </Row>
        </div>
    );
};

export default BookmarksPage;

