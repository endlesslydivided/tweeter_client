import { DeleteOutlined, EllipsisOutlined, FrownOutlined, StopOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Divider, Dropdown, Empty, Image, MenuProps, Row, Space, Typography } from "antd";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useDeletePost } from "../../../hooks/useDeletePost";
import { useNotify } from "../../../hooks/useNotify";
import { useDeleteTweetMutation } from "../../../services/TweetApiSlice";
import { decrementPostRetweets, deletePost, incrementPostRetweets, setPosts } from "../../../store/slices/PostsSlice";
import { fDateTime } from "../../../utils/formatTime";
import CommentsList from "../../CommentsList/CommentsList";
import ReplyForm from "../../ReplyForm/ReplyForm";
import PostActions from "../PostActions/PostActions";
import "./PostItem.scss";

interface PostItemProps
{
    post: any;
    currentUser: any;
}



const PostItem:React.FC<PostItemProps> = ({post,currentUser}) =>
{
    
    const [isCommentOpen,setIsCommentOpen] = useState(false);
    
    const {onDeleteClickHandler,isDeleted,onRestoreClickHandler} = useDeletePost({
        entity:post,
        decrementRetweets:decrementPostRetweets(post.parentRecordId),
        incrementRetweets:incrementPostRetweets(post.parentRecordId)

    });

    const hasMedia = post.parentRecord?.tweetMedia?.length !== 0  || post.tweetMedia?.length !== 0;   
    const isOriginalDeleted =  post.parentRecord === null && post.parentRecordAuthorId;

    const items: MenuProps['items'] = [
        {
          label: 'Delete tweet',
          onClick: onDeleteClickHandler,
          key: '0',
          icon: <DeleteOutlined />,
          danger: true
        }
    ];

    return (
        <Card className="post-item-card"
        extra={!isDeleted &&
            <Dropdown menu={{ items }} arrow={false} placement={'bottom'}>
                 <Button type="text" size="middle" shape="circle" >
                        <EllipsisOutlined/>
                </Button>
            </Dropdown>
        }>
            {
                isDeleted ?
                <Empty 
                image={<StopOutlined size={200}/>} 
                style={{backgroundColor:"rgba(0,0,0,0.05)",borderRadius:'5px',padding:'15px'}} 
                imageStyle={{height:"100%"}} 
                description={
                    <Typography.Text>Post is deleted.
                        <Button type="link" onClick={() =>onRestoreClickHandler()}>Restore?</Button>
                    </Typography.Text>}
                />:
            <Space 
                direction="vertical" 
                className=
                {
                    "post-item-card-space " +(!hasMedia ? 'post-media-display-none' : '')+(!isCommentOpen ? 'post-сomments-display-none' : '')
                } 
                size='middle'>
                <Card.Meta className="post-item-card-meta"
                    avatar={<Avatar icon={<UserOutlined />} src={process.env.REACT_APP_BACK_SERVER + post?.author?.mainPhoto?.path} size={36} shape="square" />}
                    title={<Typography.Text className="post-item-card-title" strong>{post.author?.firstname + ' ' + post.author?.surname}</Typography.Text>}
                    description={<Typography.Text  className="post-item-card-description" type="secondary">{fDateTime(post.createdAt)}</Typography.Text>}
                />  
                
                {
                    isOriginalDeleted ?   
                    <Empty image={<FrownOutlined size={200}/>} style={{backgroundColor:"rgba(0,0,0,0.05)",borderRadius:'5px',padding:'25px'}} imageStyle={{height:"100%"}} description={
                        <Typography.Text>Original post is deleted</Typography.Text>}/>
                    :
                    (
                        <>
                        
                        {
                            post.parentRecord && !post.isComment?                     
                            post.parentRecord.text &&<Typography.Text>{post.parentRecord.text}</Typography.Text>
                            :
                            post.text &&<Typography.Text>{post.text}</Typography.Text>
                        }
                        <div className='post-item-images-container'>
                            <Image.PreviewGroup >
                                {
                                    post.parentRecord && !post.isComment?  
                                        post.parentRecord.tweetMedia?.map((item:any) => <Image style={{padding:3}}
                                        src={process.env.REACT_APP_BACK_SERVER + item?.path} alt={item.id}/>)
                                    :
                                        post.tweetMedia?.map((item:any) => <Image style={{padding:3}}
                                        src={process.env.REACT_APP_BACK_SERVER + item?.path} alt={item.id}/>)
                                }         
                            </Image.PreviewGroup>
                        </div>
                        </>
                    )
                   
                }
               
                
                
                <Row gutter={[10,0]} justify='end'  className='post-item-stats'>
                    <Col><Typography.Text className='post-item-stats-comments' type="secondary" >{post.counts.commentsCount} comments</Typography.Text></Col>
                    {!isOriginalDeleted &&<Col><Typography.Text className='post-item-stats-retweets' type="secondary">{post.parentRecord?.counts?.retweetsCount || post.counts.retweetsCount} retweets</Typography.Text></Col>}
                    <Col><Typography.Text className='post-item-stats-saved' type="secondary">{post.counts.savesCount} saved</Typography.Text></Col>
                </Row> 

                <Divider type="horizontal" className={'stats-actions-divider'}/>
                
                <Row className={'action-row'}>
                   <PostActions isOriginalDeleted={isOriginalDeleted} post={post} setIsCommentsOpen={setIsCommentOpen} isCommentOpen={isCommentOpen}/>
                </Row>

                <Divider type="horizontal" className={'actions-form-divider'}/>
            
                <Row className={"reply-form-row"}>
                    <ReplyForm parentPost={post} isCommentsOpen={isCommentOpen}/>        
                </Row>

                <Divider type="horizontal"  className={'form-comments-divider'}/>
                
                <Row >
                {
                    isCommentOpen && <CommentsList parentPost={post}/>
                }   
                </Row>
                             
            </Space>
            }
        </Card>
    )
}

export default PostItem;


