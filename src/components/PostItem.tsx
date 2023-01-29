import { BookOutlined, CommentOutlined, FileImageOutlined, HeartOutlined, InfoCircleOutlined, LikeFilled, LikeOutlined, PictureOutlined, RetweetOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Divider, Input, Row, Space, theme, Tooltip, Typography } from "antd";
import { Image } from 'antd';

const { useToken } = theme;


interface PostItemProps
{
    post: object;
    currentUser: object;
}

const PostItem:React.FC = ({}) =>
{



    return (
        <Card style={{width:'100%'}}  className="post-item-card">
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
                    <Image width={'25%'}                 
                    src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
                    />
                </Image.PreviewGroup>

                <Space align="start" className='post-item-stats'  direction="horizontal">
                    <Typography.Text className='post-item-stats-comments' type="secondary" >499 comments</Typography.Text>
                    <Typography.Text className='post-item-stats-retweets' type="secondary">59k retweets</Typography.Text>
                    <Typography.Text className='post-item-stats-saved' type="secondary">234 saved</Typography.Text>
                </Space> 

                <Divider type="horizontal" style={{marginTop: '-13px', marginBottom: 0}}/>
                
                <Row style={{marginTop: '-25px',flexWrap:'nowrap'}}>
                    <Button icon={<CommentOutlined/>} type="text" block>
                        Comment
                    </Button>
                    <Button icon={<RetweetOutlined/>}  type="text" block>
                        Retweet
                    </Button>
                    <Button icon={<HeartOutlined/>} type="text" block>
                        Like
                    </Button>
                    <Button icon={<BookOutlined/>}  type="text" block>
                        Save
                    </Button>
                </Row>

                <Divider type="horizontal" style={{marginTop: '-13px', marginBottom: 0}}/>

                <Row  style={{marginTop: '-15px',flexWrap:'nowrap'}}>
                    <Avatar icon={<UserOutlined />} size={36} shape="square" />
                    <Input style={{marginLeft:'10px'}} 
                        placeholder="Tweet your reply"
                        suffix={
                            <Tooltip title="Extra information">
                            <PictureOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                            </Tooltip>
                        }
                        />
                        
                    
                </Row>
            </Space>
            {/* <Card.Grid hoverable={false}  className="post-item-header">
                <Avatar.Group>
                    
                    
                </Avatar.Group>
            </Card.Grid>
            <Card.Grid hoverable={false}   className="post-item-text">
            Content
            </Card.Grid>
            <Card.Grid hoverable={false}   className="post-item-gallery">
            Content
            </Card.Grid>
            <Card.Grid hoverable={false}   className="post-item-stats">
            Content
            </Card.Grid>
            <Card.Grid hoverable={false} className="post-item-buttons">
            Content
            </Card.Grid>
            <Card.Grid hoverable={false}   className="post-item-comment-box">
            Content
            </Card.Grid>
            <Card.Grid hoverable={false}   className="post-item-comments">
            Content
            </Card.Grid> */}
        </Card>
    )
}

export default PostItem;


