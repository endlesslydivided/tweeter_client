import { CheckOutlined, MailFilled, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Row, Space, Typography } from "antd";
import { useParams } from "react-router-dom";
import { useSubscribe } from "../../hooks/useSubscribe";
import './UserCard.scss';

interface UserCardProps
{
    userData: any;
    setIsFollowingsOpen:Function;
    setIsFollowersOpen:Function;
    decrementFollowers:Function;
    incrementFollowers:Function;
}

const UserCard: React.FC<UserCardProps> = ({userData,setIsFollowingsOpen,setIsFollowersOpen,decrementFollowers,incrementFollowers}) => {

    const {onCreateClickHandler,onDeleteClickHandler,isSubscribed} = useSubscribe({
        entity:userData,
        decrementFollowers:decrementFollowers(),
        incrementFollowers:incrementFollowers()
    })
   
    const renderButtons = (item:any) => (
    <Space direction="horizontal">
        <Button 
            onClick={() => isSubscribed ? onDeleteClickHandler() : onCreateClickHandler()}
            type={isSubscribed ? "primary" : "default"} 
            icon={isSubscribed ? <CheckOutlined/> :<UserAddOutlined/>}>
            Follow
        </Button>
        <Button icon={<MailFilled/>} disabled={
            (!isSubscribed || item.isSubscribed.length === 0) && item.isFollower.length === 0
        }>Send message</Button>
    </Space>
    )

    const {id} = useParams();

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
                    src={userData?.mainPhoto?.path || process.env.REACT_APP_BACK_SERVER + userData?.mainPhoto?.path} 
                    icon={<UserOutlined/>}/>
                </Col>
                <Col span={24} className='user-card-info-col'>
                    <Row gutter={[20,0]} className='user-card-info-row'>
                        <Col>
                            <Typography.Title level={4}>{`${userData?.firstname} ${userData?.surname}`}</Typography.Title>                             
                        </Col>
                        <Col >
                            <Typography.Text type="secondary" onClick={() => setIsFollowingsOpen(true)}><Typography.Text>{userData?.counts?.subscriptionsCount}</Typography.Text> Following</Typography.Text>
                        </Col>
                        <Col >
                            <Typography.Text type="secondary" onClick={() => setIsFollowersOpen(true)}><Typography.Text>{userData?.counts?.followersCount}</Typography.Text> Followers</Typography.Text>
                        </Col>
                        <Col style={{marginLeft:'auto',marginRight:'0'}}>
                            {id &&  renderButtons(userData)}
                        </Col>
                        <Col span={18}>
                            <Typography.Paragraph className="user-card-description" type="secondary" >
                                {userData.description}
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
