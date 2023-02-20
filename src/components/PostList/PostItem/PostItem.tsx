import { BookOutlined, CommentOutlined, FileImageOutlined, HeartOutlined, InfoCircleOutlined, LikeFilled, LikeOutlined, PictureOutlined, RetweetOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Divider, Input, Row, Space, theme, Tooltip, Typography } from "antd";
import { Image } from 'antd';
import "./PostItem.scss"
const { useToken } = theme;


interface PostItemProps
{
    post: object;
    currentUser: object;
}

const PostItem:React.FC = ({}) =>
{



    return (
        <Card className="post-item-card">
            <Space direction="vertical" className="post-item-card-space" size='middle'>
                <Card.Meta className="post-item-card-meta"
                    avatar={<Avatar icon={<UserOutlined />} size={36} shape="square" />}
                    title={<Typography.Text className="post-item-card-title" strong>Name Surname</Typography.Text>}
                    description={<Typography.Text  className="post-item-card-description" type="secondary">24 August at 20:43</Typography.Text>}
                />  

                <Typography.Text>
                    Travelling - it leaves you speechless, then turns you into storyteller.
                </Typography.Text>

                <Image.PreviewGroup >
                    <Image src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"/>
                </Image.PreviewGroup>

                <Row gutter={[10,0]} justify='end'  className='post-item-stats'>
                    <Col><Typography.Text className='post-item-stats-comments' type="secondary" >499 comments</Typography.Text></Col>
                    <Col><Typography.Text className='post-item-stats-retweets' type="secondary">59k retweets</Typography.Text></Col>
                    <Col><Typography.Text className='post-item-stats-saved' type="secondary">234 saved</Typography.Text></Col>
                </Row> 

                <Divider type="horizontal"/>
                
                <Row>
                    <Col flex={1}>
                        <Button icon={<CommentOutlined/>} type="text" block>
                            Comment
                        </Button>
                    </Col>
                    <Col flex={1}>
                        <Button icon={<RetweetOutlined/>}  type="text" block>
                            Retweet
                        </Button>
                    </Col>
                    <Col flex={1}>
                        <Button icon={<HeartOutlined/>} type="text" block>
                            Like
                        </Button>
                    </Col>
                    <Col flex={1}>
                        <Button icon={<BookOutlined/>}  type="text" block>
                            Save
                        </Button>
                    </Col>
                </Row>

                <Divider type="horizontal"/>

                <Row className={'reply-row'}>
                    <Avatar icon={<UserOutlined />} size={36} shape="square" />
                    <Input placeholder="Tweet your reply"
                    suffix={
                            <Tooltip title="Add photo">
                                <PictureOutlined />
                            </Tooltip>
                        }
                        />
                        
                    
                </Row>
            </Space>
        </Card>
    )
}

export default PostItem;


