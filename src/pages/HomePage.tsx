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
width: 80%;
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
                <Row justify="space-between" align="middle" gutter={[24, 0]}>
                    <Col span={6} style={{position:'absolute'}} >
                            <UserAvatar size={110} shape="square"
                            icon={<UserOutlined/>}/>
                            
                    </Col>

                    <Col span={12} style={{paddingLeft: '129px',paddingTop: '20px'}} >
                        <Row align="middle">
                            <Col span={12}>
                                <Typography.Title level={4}>Name Surname</Typography.Title>                             
                            </Col>
                            <Col span={6}>
                                <Typography.Text type="secondary">Followers</Typography.Text>
                            </Col>
                            <Col span={6}>
                                <Typography.Text type="secondary">Following</Typography.Text>
                            </Col>
                        </Row>
                        <Row>
                            <Typography.Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }} type="secondary" >Приветики всем! Меня зовут Name Surname. Я занимаюсь программированием, интересуюсь фотографией и ищу новых друзей)
                            </Typography.Paragraph>
                        </Row>
                    </Col>
                    <Col span={6}></Col>
                </Row>
            }>              
            </UserCard>
        </>
    );
};

export default HomePage;

