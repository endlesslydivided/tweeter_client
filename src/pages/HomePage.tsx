import { UserOutlined } from "@ant-design/icons";
import { Card,Row,Col,Avatar, Typography } from "antd";
import styled from "styled-components";

const BgProfile = require('../assets/abstractBG/colorfulWaves.jpg');

const ProfileBackground = styled.div`
    background: url(${BgProfile}) center center no-repeat;
    background-size: cover;
    height:40vh;
`
const UserCard = styled(Card)`
justify-self: center;
width: 80vw;
margin: -30px 0 0 0
`

const UserAvatar= styled(Avatar)`
background: gainsboro;
margin: -35px -10px 0px;
border: solid white 4px;
`
const HomePage = () => {
   
    return (
        <>
            <ProfileBackground></ProfileBackground>

            <UserCard bodyStyle={{ display: "none" }} title=
            {
                <Row className='profile-card-row'>
                    <Col span={6} className='profile-card-avatar'>
                            <UserAvatar size={110} shape="square"
                            icon={<UserOutlined/>}/>
                    </Col>
                    <Col span={18} className='profile-card-info-col'>
                        <Row gutter={[80,0]} className='profile-card-info-row'>
                            <Col>
                                <Typography.Title level={4}>Name Surname</Typography.Title>                             
                            </Col>
                            <Col >
                                <Typography.Text type="secondary">Following</Typography.Text>
                            </Col>
                            <Col >
                                <Typography.Text type="secondary">Followers</Typography.Text>
                            </Col>
                            <Col span={24}>
                                <Typography.Paragraph className="profile-card-description" type="secondary" >
                                    Приветики всем! Меня зовут Name Surname. Я занимаюсь программированием, интересуюсь фотографией и ищу новых друзей)
                                </Typography.Paragraph>
                            </Col >
                        </Row>
                            
                    </Col>

                </Row>
            }>              
            </UserCard>
        </>
    );
};

export default HomePage;

