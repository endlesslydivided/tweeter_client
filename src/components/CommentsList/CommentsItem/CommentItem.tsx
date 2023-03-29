import {
  CommentOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  HeartFilled,
  HeartOutlined,
  RetweetOutlined,
  StopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Dropdown,
  Empty,
  Image,
  MenuProps,
  Row,
  Space,
  Typography,
} from "antd";
import { useContext, useState } from "react";
import { useDeletePost } from "../../../hooks/useDeletePost";
import { useLike } from "../../../hooks/useLike";
import useMediaQuery from "../../../hooks/useMediaQuery";
import { useRetweet } from "../../../hooks/useRetweet";
import {
  decrementCommentLikes,
  decrementCommentRetweets,
  incrementCommentLikes,
  incrementCommentRetweets,
} from "../../../store/slices/CommentsSlice";
import {
  decrementPostComments,
  incrementPostComments,
} from "../../../store/slices/PostsSlice";
import { PAGES } from "../../../utils/consts";
import { fDateTime } from "../../../utils/formatTime";
import { fDataFormat } from "../../../utils/uploadFormats";
import { PostListContext } from "../../AppRouter/AppRouter";
import AudioEntityList from "../../MediaEntitiesList/AudioEntityList";
import DocumentsEntityList from "../../MediaEntitiesList/DocumentsEntityList";
import MediaEntityList from "../../MediaEntitiesList/MediaEntityList";
import ReplyList from "../../ReplyList/ReplyList";
import "./CommentItem.scss";

interface CommentItemProps {
  comment: any;
  parentPost: any;
  setReplyPost: Function;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  parentPost,
  setReplyPost,
}) => {
  const hasMedia =
    comment.parentRecord?.tweetMedia?.length !== 0 ||
    comment.tweetMedia?.length !== 0;
  const { page }: any = useContext(PostListContext);
  const [isRepliesOpen, setIsRepliesOpen] = useState(false);
  const xs = useMediaQuery("(max-width:576px)");
  const { isLiked, onLikeClickHandler } = useLike({
    entity: comment,
    incrementLikes: incrementCommentLikes({
      parentId: parentPost.id,
      id: comment.id,
    }),
    decrementLikes: decrementCommentLikes({
      parentId: parentPost.id,
      id: comment.id,
    }),
  });

  const { isRetweeted, onRetweetClickHandler } = useRetweet({
    entity: comment,
    incrementRetweets: incrementCommentRetweets({
      parentId: parentPost.id,
      id: comment.id,
    }),
    isCurrentUserPage:
      page === PAGES.USER_TWEETS || page === PAGES.USER_REPLIES,
  });

  const { onDeleteClickHandler, onRestoreClickHandler, isDeleted } =
    useDeletePost({
      entity: comment,
      decrementComments: decrementPostComments(parentPost.id),
      decrementRetweets: decrementCommentRetweets({
        parentId: parentPost.id,
        id: comment.id,
      }),
      incrementComments: incrementPostComments(parentPost.id),
      incrementRetweets: incrementCommentRetweets({
        parentId: parentPost.id,
        id: comment.id,
      }),
    });

  const items: MenuProps["items"] = [
    {
      label: "Delete comment",
      onClick: onDeleteClickHandler,
      key: "0",
      icon: <DeleteOutlined />,
      danger: true,
    },
  ];

  return (
    <Card className="comment-item-card">
      <Space
        direction="vertical"
        className={
          "comment-item-card-space " +
          (!hasMedia ? "comment-item-display-none" : "")
        }
        size="small"
      >
        {isDeleted ? (
          <Empty
            image={<StopOutlined size={200} />}
            style={{
              backgroundColor: "rgba(0,0,0,0.05)",
              borderRadius: "5px",
              padding: "15px",
            }}
            imageStyle={{ height: "100%" }}
            description={
              <Typography.Text>
                Comment is deleted.
                <Button type="link" onClick={() => onRestoreClickHandler()}>
                  Restore?
                </Button>
              </Typography.Text>
            }
          />
        ) : (
          <>
            <Row gutter={[10, 0]} className={"comment-content-row"}>
              <Col>
                <Avatar
                  icon={<UserOutlined />}
                  src={
                    process.env.REACT_APP_BACK_SERVER +
                    comment?.author?.mainPhoto?.path
                  }
                  size={"large"}
                  shape="square"
                />
              </Col>

              <Col flex={"auto"}>
                <Space
                  direction="vertical"
                  size={[0, 0]}
                  className="comment-content-space"
                >
                  <Space direction="horizontal" className="comment-meta-space">
                    <Typography.Text strong>
                      {comment.author?.firstname +
                        " " +
                        comment.author?.surname}
                    </Typography.Text>
                    <Typography.Text
                      style={{ fontSize: "13px" }}
                      type="secondary"
                    >
                      {xs
                        ? fDateTime(comment.createdAt, "dd.MM.yy HH:mm")
                        : fDateTime(comment.createdAt)}
                    </Typography.Text>

                    <Dropdown
                      menu={{ items }}
                      arrow={false}
                      placement={"bottom"}
                    >
                      <Button type="text" size="middle" shape="circle">
                        <EllipsisOutlined />
                      </Button>
                    </Dropdown>
                  </Space>

                  <Typography.Text>{comment.text}</Typography.Text>

                  <div className="comment-item-images-container">

                  <MediaEntityList files={comment.tweetMedia?.filter((i:any) => fDataFormat(i.originalName)=== 'video' || fDataFormat(i.originalName) === 'image')}/>
                  <AudioEntityList files={comment.tweetMedia?.filter((i:any) => fDataFormat(i.originalName)=== 'audio')}/>
                  <DocumentsEntityList files={comment.tweetMedia?.filter((i:any) => fDataFormat(i.originalName)=== 'document')}/>
                  
                  </div>
                </Space>

                <Row
                  gutter={[5, 0]}
                  justify="start"
                  className="comment-item-stats"
                >
                  <Col>
                    <Typography.Text
                      className={`like-button  ${isLiked && "active"}`}
                      onClick={() => onLikeClickHandler()}
                      type="secondary"
                    >
                      {isLiked ? <HeartFilled /> : <HeartOutlined />}{xs ?  comment.counts.likesCount:'Like' }
                    </Typography.Text>
                  </Col>

                  <Col>
                    <Typography.Text type="secondary">•</Typography.Text>
                  </Col>

                  <Col>
                    <Typography.Text
                      className={`retweet-button ${isRetweeted && "active"}`}
                      onClick={() => onRetweetClickHandler()}
                      type="secondary"
                    >
                      <RetweetOutlined /> {xs ? comment.counts.retweetsCount:'Retweet' }
                    </Typography.Text>
                  </Col>

                  <Col>
                    <Typography.Text type="secondary">•</Typography.Text>
                  </Col>

                  <Col>
                    <Typography.Text
                      className={`reply-button`}
                      onClick={() => setReplyPost(comment)}
                      type="secondary"
                    >
                      <CommentOutlined /> Reply
                    </Typography.Text>
                  </Col>

                    {!xs &&
                    <>
                        <Col>
                            <Typography.Text type="secondary">•</Typography.Text>
                        </Col>

                        <Col>
                            <Typography.Text
                            className="comment-item-stats-likes"
                            type="secondary"
                            >
                            {comment.counts.likesCount} likes
                            </Typography.Text>
                        </Col>

                        <Col>
                            <Typography.Text type="secondary">•</Typography.Text>
                        </Col>

                        <Col>
                            <Typography.Text
                            className="comment-item-stats-retweets"
                            type="secondary"
                            >
                            {comment.counts.retweetsCount} retweets
                            </Typography.Text>
                        </Col>
                    </>
                    }
                  <Col className="reply-show-col">
                    <Typography.Text
                      className="reply-show-button"
                      onClick={() => setIsRepliesOpen((p: any) => !p)}
                      type="secondary"
                    >
                      Show replies
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
            </Row>
            {isRepliesOpen && (
              <Row className={"comment-replies-row"}>
                <ReplyList
                  setReplyPost={setReplyPost}
                  parentComment={comment}
                />
              </Row>
            )}
          </>
        )}
      </Space>
    </Card>
  );
};

export default CommentItem;
