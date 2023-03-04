import { BookFilled, BookOutlined, CommentOutlined, DeleteOutlined, EllipsisOutlined, FileImageOutlined, HeartFilled, HeartOutlined, InfoCircleOutlined, LikeFilled, LikeOutlined, PictureOutlined, RetweetOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Divider, Dropdown, Input, MenuProps, notification, Row, Space, theme, Tooltip, Typography } from "antd";
import { Image } from 'antd';
import { useState } from "react";
import { useNotify } from "../../../hooks/useNotify";
import { useLikeTweetMutation, useSaveTweetMutation, useUnlikeTweetMutation, useUnsaveTweetMutation } from "../../../services/TweetActionsApiSlice";
import { useCreateTweetMutation, useDeleteTweetMutation } from "../../../services/TweetApiSlice";
import { fDateTime } from "../../../utils/formatTime";
import "./CommentItem.scss"
const { useToken } = theme;


interface CommentItemProps
{
    comment: any;
    currentUser: any;
}

const CommentItem:React.FC<CommentItemProps> = ({comment,currentUser}) =>
{

    /*#region CommentItem state control*/
    const [like,likeResult] = useLikeTweetMutation();
    const [unlike,unlikeResult] = useUnlikeTweetMutation();
	const [retweet, retweetResult] = useCreateTweetMutation();
	const [deleteTweet, deleteTweetResult] = useDeleteTweetMutation();
 
    const [isLiked,setIsLiked] = useState(comment.isLiked && comment.isLiked?.length !== 0)
    const [isRetweeted,setIsRetweeted] = useState(!!comment.isRetweeted)

    const hasMedia = comment.parentRecord?.tweetMedia?.length !== 0  || comment.tweetMedia?.length !== 0;

    useNotify(likeResult,undefined,() => {setIsLiked(true)},'Some error occured on server');
    useNotify(unlikeResult,undefined,() => {setIsLiked(false)},'Some error occured on server');
    useNotify(retweetResult,undefined,() => {setIsRetweeted(true)},'Some error occured on server');
    useNotify(deleteTweetResult,undefined,undefined,'Some error occured on server');

    const onLikeClickHandler =() => isLiked ? unlike({tweetId:comment.id,userId:currentUser.user?.id}):
                                            like({tweetId:comment.id,userId:currentUser.user?.id});

    const onDeleteClickHandler = () => deleteTweet({id:comment.id});
    const onRetweetClickHandler =() => 
    retweet(
        {
            isComment:false,
            isPublic:true,
            parentRecordAuthorId: comment.author?.id,
            parentRecordId: comment.id,
            authorId:currentUser.user.id
        }
    );;
    /*#endregion*/
    
    const items: MenuProps['items'] = [
        {
          label: 'Delete comment',
          onClick: onDeleteClickHandler,
          key: '0',
          icon: <DeleteOutlined />,
          danger: true
        }
    ];

    return (
        <Card className="comment-item-card">
            <Space direction="vertical" className={"comment-item-card-space " + 
            (!hasMedia ? 'comment-item-display-none' : '')} size='middle'>
                <Row gutter={[10,0]} className={'comment-content-row'}>
                    <Col>
                        <Avatar icon={<UserOutlined />} src={process.env.REACT_APP_BACK_SERVER + comment?.author?.mainPhoto?.path} size={'large'} shape="square" />
                    </Col>

                    <Col flex={'auto'}>
                        <Space direction='vertical' size={[0,0]} className="comment-content-space">
                            <Space direction='horizontal' className="comment-meta-space">
                                <Typography.Text  strong>{comment.author?.firstname + ' ' + comment.author?.surname}</Typography.Text> 
                                <Typography.Text style={{fontSize:'13px'}}  type="secondary">{fDateTime(comment.createdAt)}</Typography.Text>   

                                <Dropdown menu={{ items }} arrow={false} placement={'bottom'}>
                                    <Button type="text" size="middle" shape="circle" >
                                        <EllipsisOutlined/>
                                    </Button>
                                </Dropdown>
                            </Space>

                            <Typography.Text >
                                {comment.text}
                            </Typography.Text>   

                            <div className='comment-item-images-container'>
                                <Image.PreviewGroup >
                                    {
                                        comment.tweetMedia?.map((item:any) => <Image style={{padding:3}}
                                        src={process.env.REACT_APP_BACK_SERVER + item?.path} alt={item.id}/>)
                                    }         
                                </Image.PreviewGroup>
                            </div>
                        </Space>

                        <Row gutter={[5,0]} justify='start'  className='comment-item-stats'>
                            <Col>
                                <Typography.Text className={`like-button  ${isLiked && 'active'}`} onClick={()=> onLikeClickHandler()} type="secondary" >
                                    {isLiked ? <HeartFilled/> : <HeartOutlined/>} Like 
                                </Typography.Text>
                            </Col>

                            <Col> 
                                <Typography.Text type="secondary">•</Typography.Text>
                            </Col>

                            <Col>
                                <Typography.Text className={`retweet-button ${isRetweeted && 'active'}`} onClick={()=> onRetweetClickHandler()}  type="secondary" >
                                    <RetweetOutlined/> Retweet
                                </Typography.Text>
                            </Col>

                            <Col> 
                                <Typography.Text type="secondary">•</Typography.Text>
                            </Col>

                            <Col><Typography.Text className='comment-item-stats-likes' type="secondary">{comment.counts.likesCount} likes</Typography.Text></Col>


                            <Col> 
                                <Typography.Text type="secondary">•</Typography.Text>
                            </Col>

                            <Col><Typography.Text className='comment-item-stats-retweets' type="secondary">{comment.counts.retweetsCount} retweets</Typography.Text></Col>
                                                    
                        </Row> 
                    </Col>
                </Row>
            </Space>
        </Card>
    )
}

export default CommentItem;


