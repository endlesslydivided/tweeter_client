import { UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Divider, List, Space, Typography } from "antd";
import React from "react";

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
                split={false}
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
                    <List.Item style={{margin:0}}>
                       <Card style={{width:'100%',overflow:'hidden'}} bordered={false} className="follow-section-item-card">
                            <Space direction="vertical" className="follow-section-item-card-space" size='middle'>
                                <Card.Meta className="follow-section-card-meta"
                                    avatar={<Avatar icon={<UserOutlined />} size={36} shape="square" />}
                                    title={<Typography.Text className="follow-section-card-title" strong>Name Surname</Typography.Text>}
                                    description={<Typography.Text  className="follow-section-card-description" type="secondary">24 August at 20:43</Typography.Text>}
                                />  

                                <Typography.Text>
                                    Travelling - it leaves you speechless, then turns you into storyteller.
                                </Typography.Text>

                                
                            </Space>
                        </Card>
                       
                    </List.Item>
                )}
            />


        </Card>
    )
}

export default ToFollowSection;

