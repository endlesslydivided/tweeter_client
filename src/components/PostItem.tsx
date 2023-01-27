import { UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Space, theme, Typography } from "antd";
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
        <Card style={{width:'100%'}}  className="post-item-card" actions={[

        ]}>
            <Space direction="vertical" size='middle'>
                <Card.Meta className="post-item-card-meta"
                    avatar={<Avatar icon={<UserOutlined />} size={36} shape="square" />}
                    title={<Typography.Text className="post-item-card-title" strong>Name Surname</Typography.Text>}
                    description={<Typography.Text  className="post-item-card-description" type="secondary">24 August at 20:43</Typography.Text>}
                />  
                <Typography.Text>
                    Travelling - it leaves you speechless, then turns you into storyteller.
                </Typography.Text>
                <Image.PreviewGroup>
                    <Image                  
                    src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
                    />
                </Image.PreviewGroup>     
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


