import { UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Row, Space, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";
import { PROFILE_ROUTE } from "../../../utils/consts";
import { fDateTime } from "../../../utils/formatTime";
import PostContent from "../../PostList/PostItem/PostContent";
import PostStats from "../../PostList/PostItem/PostStats";
import "./MessagePost.scss"
interface MessagePostProps {
  post: any;
}

const MessagePost: React.FC<MessagePostProps> = ({ post }) => {

    const navigate = useNavigate();
  
    const hasMedia =
    post.parentRecord?.tweetMedia?.length !== 0 ||
    post.tweetMedia?.length !== 0;
  
    const isOriginalDeleted =
    post.parentRecord === null && post.parentRecordAuthorId;

    const spaceClassNames =
    "message-post-item-card-space " +
    (!hasMedia ? "message-post-media-display-none" : "");

    const metaCardProps = {
        avatar: (
        <Avatar icon={<UserOutlined />} 
        src={ post?.author?.mainPhoto ? process.env.REACT_APP_BACK_SERVER + post?.author?.mainPhoto?.path : null} 
        size={36} shape="square"/>
        ),
        title: (
        <Typography.Text className="message-post-item-card-title" onClick={() => navigate(`${PROFILE_ROUTE}/${post.author.id}`)} strong >
            {post.author?.firstname + " " + post.author?.surname}
        </Typography.Text>
        ),
        description: (
        <Typography.Text className="message-post-item-card-description" type="secondary">
            {fDateTime(post.createdAt)}
        </Typography.Text>
        ),
    };

  return (
    <Card className="message-post-item-card" >
      
        <Space direction="vertical" className={spaceClassNames} size="middle">
          <Link to={`${PROFILE_ROUTE}/${post.author.id}`}>
            <Card.Meta className="message-post-item-card-meta" {...metaCardProps} />
          </Link>
          <PostContent post={post} isOriginalDeleted={isOriginalDeleted} />

          <Row gutter={[10, 0]} justify="end" className="message-post-item-stats">
            <PostStats post={post} isOriginalDeleted={isOriginalDeleted} />
          </Row>

        </Space>
      
    </Card>
  );
};

export default MessagePost;
