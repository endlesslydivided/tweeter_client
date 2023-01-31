import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Divider, Image, List, Row, Typography } from "antd";
import React from "react";
const BgProfile = require('../assets/abstractBG/colorfulWaves.jpg');

interface ToFollowSectionProps {

}


const ToFollowSection: React.FC<ToFollowSectionProps> = ({})  =>
{

    return (
        <Card className='follow-section-card'>
            <Card.Meta className="follow-section-card-meta" 
            title={<Typography.Text className="follow-section-card-title" strong>Trends for you</Typography.Text>}/>

            <Divider type="horizontal"style={{margin:'7.5px 0px'}}/>

            <List className="follow-section-card-list"
                itemLayout="vertical"
                dataSource={[
                    {   
                        userPhotoPath:'123',
                        userName:'Name',
                        userSurname:'Surname',
                        userFollowers:'123',
                        description:'Приветики всем! Меня зовут Name Surname. Я занимаюсь программированием, интересуюсь фотографией и ищу новых друзей)',
                        profilePhoto:'321'
                    },
                    {   
                        userPhotoPath:'123',
                        userName:'Name',
                        userSurname:'Surname',
                        userFollowers:'123',
                        description:'Приветики всем! Меня зовут Name Surname. Я занимаюсь программированием, интересуюсь фотографией и ищу новых друзей)',
                        profilePhoto:'321'
                    },
                ]}
                renderItem={(item) => (
                    <List.Item  className="follow-section-item">
                        <Row wrap align='middle'>
                            <Col span={18}>
                                <Avatar.Group >
                                    <Avatar icon={<UserOutlined />} size={36} shape="square" />
                                    <div className="follow-section-item-header" >
                                        <Typography.Text className="follow-section-item-title" strong>Name Surname</Typography.Text>
                                        <Typography.Text  className="follow-section-item-description" type="secondary">24 August at 20:43</Typography.Text>
                                    </div>
                                </Avatar.Group>
                            </Col>
                            <Col span={6}>
                                <Button type="primary" size="small" style={{fontSize:'10px'}} icon={<PlusOutlined/>}>Follow</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Typography.Text className="follow-section-item-text">
                                Travelling - it leaves you speechless, then turns you into storyteller.
                            </Typography.Text>
                        </Row>
                        <Row>
                            <Image src={BgProfile} className="profile-bg-image"> </Image>

                        </Row>
                      
                    </List.Item>
                )}
            />


        </Card>
    )
}

export default ToFollowSection;

