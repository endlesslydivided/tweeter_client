import { CommentOutlined, DeleteOutlined, EllipsisOutlined, HeartFilled, HeartOutlined, RetweetOutlined, StopOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Dropdown, Empty, Image, MenuProps, Row, Space, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDeletePost } from "../../hooks/useDeletePost";
import { useLike } from "../../hooks/useLike";
import useMediaQuery from "../../hooks/useMediaQuery";
import { useRetweet } from "../../hooks/useRetweet";
import { decrementCommentLikes, decrementCommentRetweets, incrementCommentLikes, incrementCommentRetweets } from "../../store/slices/CommentsSlice";
import { decrementPostComments, incrementPostComments } from "../../store/slices/PostsSlice";
import { PAGES } from "../../utils/consts";
import { fDateTime } from "../../utils/formatTime";
import { fDataFormat } from "../../utils/uploadFormats";
import { PostListContext } from "../AppRouter/AppRouter";
import AudioEntityList from "../MediaEntitiesList/AudioEntityList";
import DocumentsEntityList from "../MediaEntitiesList/DocumentsEntityList";
import MediaEntityList from "../MediaEntitiesList/MediaEntityList";
import "./ReplyListItem.scss";


interface ReplyListItemProps
{
    reply: any;
    parentComment: any;
    setReplyPost:Function;
    activeReply:any;
    setActiveReply:any;
}

const ReplyListItem:React.FC<ReplyListItemProps> = ({reply,parentComment,setReplyPost,activeReply,setActiveReply}) =>
{

    const hasMedia = reply.parentRecord?.tweetMedia?.length !== 0  || reply.tweetMedia?.length !== 0;
    const {page}:any = useContext(PostListContext);

    const xs = useMediaQuery("(max-width:576px)");

    const {isLiked,onLikeClickHandler} = useLike({
        entity:reply,
        incrementLikes:incrementCommentLikes({parentId: parentComment.id,id:reply.id}),
        decrementLikes:decrementCommentLikes({parentId: parentComment.id,id:reply.id}),
    })
    
    const {isRetweeted,onRetweetClickHandler} = useRetweet({
        entity:reply,
        incrementRetweets:incrementCommentRetweets({parentId: parentComment.id,id:reply.id}),
        isCurrentUserPage: page === PAGES.USER_TWEETS ||  page === PAGES.USER_REPLIES 
    })

    const {onDeleteClickHandler,onRestoreClickHandler,isDeleted} = useDeletePost({
        entity:reply,
        decrementComments:decrementPostComments(parentComment.id),
        decrementRetweets:decrementCommentRetweets({parentId: parentComment.id,id:reply.id}),
        incrementComments:incrementPostComments(parentComment.id),
        incrementRetweets:incrementCommentRetweets({parentId: parentComment.id,id:reply.id})
    })

    const items: MenuProps['items'] = [
        {
          label: 'Delete reply',
          onClick: onDeleteClickHandler,
          key: '0',
          icon: <DeleteOutlined />,
          danger: true
        }
    ];

    return (
        <Card className={`${activeReply === reply.id ? 'reply-item-card active' : 'reply-item-card'}`}>
            <Space 
                direction="vertical" 
                className={"reply-item-card-space " + (!hasMedia ? 'reply-item-display-none' : '')} 
                size={[10,10]}
            >
                {
                isDeleted ?
                <Empty 
                image={<StopOutlined size={200}/>} 
                style={{backgroundColor:"rgba(0,0,0,0.05)",borderRadius:'5px',padding:'15px'}} 
                imageStyle={{height:"100%"}} 
                description={
                    <Typography.Text>Reply is deleted.<Button type="link" onClick={() =>onRestoreClickHandler()}>Restore?</Button>
                    </Typography.Text>}
                />
                    :
                    <>
                        {
                            parentComment.id !== reply.parentRecordId &&
                            <a href={`#${reply.parentRecordId}`} onClick={() => setActiveReply(reply.parentRecordId)}  className={'reply-item-anchor'} >
                                <Typography.Text type="secondary" style={{cursor:"pointer !important"}}>
                                        ▌ Reply to {`${reply.parentRecord?.author?.firstname} ${reply.parentRecord?.author?.surname} `}                               
                                </Typography.Text>
                            </a>
                        }
                        <Row gutter={[10,0]} className={'reply-content-row'}>
                            <Col>
                                <Avatar icon={<UserOutlined />} src={process.env.REACT_APP_BACK_SERVER + reply?.author?.mainPhoto?.path} size={'large'} shape="square" />
                            </Col>

                            <Col flex={'auto'}>
                                <Space direction='vertical' size={[0,0]} className="reply-content-space">
                                    <Space direction='horizontal' className="reply-meta-space">
                                        <Typography.Text  strong>{reply.author?.firstname + ' ' + reply.author?.surname}</Typography.Text> 
                                        <Typography.Text style={{fontSize:'13px'}}  type="secondary">{xs ? fDateTime(reply.createdAt,'dd.MM.yy HH:mm') : fDateTime(reply.createdAt)}</Typography.Text>   

                                        <Dropdown menu={{ items }} arrow={false} placement={'bottom'}>
                                            <Button type="text" size="middle" shape="circle" >
                                                <EllipsisOutlined/>
                                            </Button>
                                        </Dropdown>
                                    </Space>

                                    <Typography.Text >
                                        {reply.text}
                                    </Typography.Text>   

                                    <div className='reply-item-images-container'>

                                        <MediaEntityList files={reply.tweetMedia?.filter((i:any) => fDataFormat(i.originalName)=== 'video' || fDataFormat(i.originalName) === 'image')}/>
                                        <AudioEntityList files={reply.tweetMedia?.filter((i:any) => fDataFormat(i.originalName)=== 'audio')}/>
                                        <DocumentsEntityList files={reply.tweetMedia?.filter((i:any) => fDataFormat(i.originalName)=== 'document')}/>

                                    </div>
                                </Space>

                                <Row gutter={[5,0]} justify='start'  className='reply-item-stats'>
                                    <Col>
                                        <Typography.Text className={`like-button  ${isLiked && 'active'}`} onClick={()=> onLikeClickHandler()} type="secondary" >
                                            {isLiked ? <HeartFilled/> : <HeartOutlined/>} {xs ?  reply.counts.likesCount:'Like' }
                                        </Typography.Text>
                                    </Col>

                                    <Col> 
                                        <Typography.Text type="secondary">•</Typography.Text>
                                    </Col>

                                    <Col>
                                        <Typography.Text className={`retweet-button ${isRetweeted && 'active'}`} onClick={()=> onRetweetClickHandler()}  type="secondary" >
                                            <RetweetOutlined/> {xs ? reply.counts.retweetsCount:'Retweet' }
                                        </Typography.Text>
                                    </Col>

                                    <Col> 
                                        <Typography.Text type="secondary">•</Typography.Text>
                                    </Col>

                                    <Col>
                                        <Typography.Text className={`reply-button`} onClick={() => setReplyPost(reply)}  type="secondary" >
                                            <CommentOutlined/> Reply
                                        </Typography.Text>
                                    </Col>

                                    {!xs &&

                                    <>
                                        <Col> 
                                            <Typography.Text type="secondary">•</Typography.Text>
                                        </Col>

                                        <Col><Typography.Text className='reply-item-stats-likes' type="secondary">{reply.counts.likesCount} likes</Typography.Text></Col>


                                        <Col> 
                                            <Typography.Text type="secondary">•</Typography.Text>
                                        </Col>

                                        <Col><Typography.Text className='reply-item-stats-retweets' type="secondary">{reply.counts.retweetsCount} retweets</Typography.Text></Col>
                                    </>
                                    }

                                   
                                                            
                                </Row> 
                            </Col>
                        </Row>
                    </>
                }
                
            </Space>
        </Card>
    )
}

export default ReplyListItem;


