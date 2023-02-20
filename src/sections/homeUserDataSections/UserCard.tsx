import { UserOutlined } from "@ant-design/icons";
import { Card,Row,Col,Avatar,Image, Typography, MenuProps, Space } from "antd";
import './UserCard.scss'

interface UserCardProps
{
    userData?: any;
}

const UserCard: React.FC<UserCardProps> = ({userData}) => {
   

    return(
        <Card 
        className='user-card'
        bordered={false} 
        bodyStyle={{ display: "none" }} 
        title=
        {
            <Row  className='user-card-row'>
                <Col span={6} className='user-card-avatar-container'>
                    <Avatar 
                    size={120} 
                    shape="square" 
                    className="user-avatar"
                    icon={<UserOutlined/>}/>
                </Col>
                <Col span={24} className='user-card-info-col'>
                    <Row gutter={[20,0]} className='user-card-info-row'>
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
                            <Typography.Paragraph className="user-card-description" type="secondary" >
                                Приветики всем! Меня зовут Name Surname. Я занимаюсь программированием, интересуюсь фотографией и ищу новых друзей)
                            </Typography.Paragraph>
                        </Col >
                    </Row>
                        
                </Col>

            </Row>
        }>              
        </Card>
    )
}


export default UserCard;
