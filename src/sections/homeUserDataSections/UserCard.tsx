import { UserOutlined } from "@ant-design/icons";
import { Card,Row,Col,Avatar,Image, Typography, MenuProps, Space } from "antd";
import styled from "styled-components";


const UserDataCard = styled(Card)`
justify-self: center;
margin: -30px 0 0 0
width:100%
`
const UserAvatar= styled(Avatar)`
background: gainsboro;
margin: -40px -10px 0px;
border: solid white 4px;
`

interface UserCardProps
{
    userData?: any;
}

const UserCard: React.FC<UserCardProps> = ({userData}) => {
   

    return(
        <UserDataCard bordered={false} bodyStyle={{ display: "none" }} title=
        {
            <Row  className='profile-card-row'>
                <Col span={6} className='profile-card-avatar'>
                    <UserAvatar size={120} shape="square"
                    icon={<UserOutlined/>}/>
                </Col>
                <Col span={24} className='profile-card-info-col'>
                    <Row gutter={[20,0]} className='profile-card-info-row'>
                        <Col>
                            <Typography.Title level={4}>Name Surname</Typography.Title>                             
                        </Col>
                        <Col >
                            <Typography.Text type="secondary"><Typography.Text>12</Typography.Text> Following</Typography.Text>
                        </Col>
                        <Col >
                            <Typography.Text type="secondary"><Typography.Text>3312</Typography.Text> Followers</Typography.Text>
                        </Col>
                        <Col span={18}>
                            <Typography.Paragraph className="profile-card-description" type="secondary" >
                                Приветики всем! Меня зовут Name Surname. Я занимаюсь программированием, интересуюсь фотографией и ищу новых друзей)
                            </Typography.Paragraph>
                        </Col >
                    </Row>
                        
                </Col>

            </Row>
        }>              
        </UserDataCard>
    )
}


export default UserCard;