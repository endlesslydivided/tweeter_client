import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Divider, Image, List, Row, Typography } from "antd";
import React from "react";
import './ToFollow.scss'

const BgProfile = require('../../assets/abstractBG/colorfulWaves.jpg');

interface ToFollowProps {

}


const ToFollow: React.FC<ToFollowProps> = ({})  =>
{

    return (
        <Card className='follow-section-card'>
            <Card.Meta className="follow-section-card-meta" 
            title={<Typography.Text className="follow-section-card-title" strong>Who to follow</Typography.Text>}/>

            <Divider className="follow-section-title-divider" type="horizontal"/>

            <List className="follow-section-card-list"
                itemLayout="vertical"
                size="large"
                split={false}
                dataSource={[
                    {   id:'1',
                        userPhotoPath:'123',
                        userName:'Name',
                        userSurname:'Surname',
                        userFollowers:'123',
                        description:'Приветики всем! Меня зовут Name Surname. Я занимаюсь программированием, интересуюсь фотографией и ищу новых друзей)',
                        profilePhoto:'321'
                    },
                    {   
                        id:'2',
                        userPhotoPath:'123',
                        userName:'Name',
                        userSurname:'Surname',
                        userFollowers:'123',
                        description:'Приветики всем! Меня зовут Name Surname. Я занимаюсь программированием, интересуюсь фотографией и ищу новых друзей)',
                        profilePhoto:'321'
                    },
                    {   id:'1',
                        userPhotoPath:'123',
                        userName:'Name',
                        userSurname:'Surname',
                        userFollowers:'123',
                        description:'Приветики всем! Меня зовут Name Surname. Я занимаюсь программированием, интересуюсь фотографией и ищу новых друзей)',
                        profilePhoto:'321'
                    },
                    {   id:'1',
                        userPhotoPath:'123',
                        userName:'Name',
                        userSurname:'Surname',
                        userFollowers:'123',
                        description:'Приветики всем! Меня зовут Name Surname. Я занимаюсь программированием, интересуюсь фотографией и ищу новых друзей)',
                        profilePhoto:'321'
                    },
                ]}
                renderItem={(item,index) => (
                    <List.Item key={item.id}  className="follow-section-item">
                        <Row wrap align='middle' gutter={[0,10]}>

                            <Col flex={18}>
                                <Avatar.Group >
                                    <Avatar icon={<UserOutlined />} size={36} shape="square" />
                                    <div className="follow-section-item-header" >
                                        <Typography.Text className="follow-section-item-title" strong>Name Surname</Typography.Text>
                                        <Typography.Text  className="follow-section-item-description" type="secondary">24 August at 20:43</Typography.Text>
                                    </div>
                                </Avatar.Group>
                            </Col>

                            <Col flex={6}>
                                <Button type="primary" size="small" className="follow-section-item-button" icon={<PlusOutlined/>}>Follow</Button>
                            </Col>
                            
                            <Col flex={24}>
                                <Typography.Text className="follow-section-item-text">
                                    Travelling - it leaves you speechless, then turns you into storyteller.
                                </Typography.Text>
                            </Col>

                            <Col  flex={24} className="follow-image-row">
                                <Image src={BgProfile} className="follow-image"> </Image>
                            </Col>
                            
                            {
                                index <= 2 && <Divider type='horizontal' className="follow-list-item-divider"/>
                            }
                        </Row>
                        
                      
                    </List.Item>
                )}
            />


        </Card>
    )
}

export default ToFollow;

