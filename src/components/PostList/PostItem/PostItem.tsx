import { BookFilled, BookOutlined, CommentOutlined, DeleteOutlined, EllipsisOutlined, FileImageOutlined, HeartFilled, HeartOutlined, InfoCircleOutlined, LikeFilled, LikeOutlined, PictureOutlined, RetweetOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Divider, Dropdown, Input, MenuProps, notification, Row, Space, theme, Tooltip, Typography } from "antd";
import { Image } from 'antd';
import { useState } from "react";
import { useNotify } from "../../../hooks/useNotify";
import { useObserver } from "../../../hooks/useObserver";
import { useLikeTweetMutation, useSaveTweetMutation, useUnlikeTweetMutation, useUnsaveTweetMutation } from "../../../services/TweetActionsApiSlice";
import { useCreateTweetMutation, useDeleteTweetMutation, useGetCommentsQuery, useLazyGetCommentsQuery, useLazyGetOneTweetQuery } from "../../../services/TweetApiSlice";
import { fDateTime } from "../../../utils/formatTime";
import CommentsList from "../../CommentsList/CommentsList";
import ReplyForm from "../../ReplyForm/ReplyForm";
import PostActions from "../PostActions/PostActions";
import "./PostItem.scss"
const { useToken } = theme;


interface PostItemProps
{
    post: any;
    currentUser: any;
}


const initialFilters = {
    search: "",
    createdAt: "",
    limit: 5,
    orderBy: "createdAt",
    orderDirection: "desc",
  };

const PostItem:React.FC<PostItemProps> = ({post,currentUser}) =>
{
	const [deleteTweet, deleteTweetResult] = useDeleteTweetMutation();
    const [getComment] = useLazyGetOneTweetQuery();

    const [comments,setComments] = useState<any>([]);
    const [filters,setFilters] = useState(initialFilters)
    const [isCommentOpen,setIsCommentOpen] = useState(false);

    const appendToComments = async (id:any) =>
    {
        const {data,error}:any = await getComment({id});
        if(data)
        {
            setComments((p:any) => [data,...p]);
        }
        else if(error)
        {
            notification.error({message:error.message,placement:'topRight',duration:2})
        }
    }

    const hasMedia = post.parentRecord?.tweetMedia?.length !== 0  || post.tweetMedia?.length !== 0;   

    const onDeleteClickHandler = () => deleteTweet({id:post.id});
    useNotify(deleteTweetResult,undefined,()=> setComments((p:any) => [...p.filter((i:any) => i.id !== post.id)]),'Some error occured on server');
    
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
        extra={
            <Dropdown menu={{ items }} arrow={false} placement={'bottom'}>
                 <Button type="text" size="middle" shape="circle" >
                        <EllipsisOutlined/>
                </Button>
            </Dropdown>
        }>
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
                    post.parentRecord?                     
                    post.parentRecord.text &&<Typography.Text>{post.parentRecord.text}</Typography.Text>
                    :
                    post.text &&<Typography.Text>{post.text}</Typography.Text>
                }
                
                <div className='post-item-images-container'>
                    <Image.PreviewGroup >
                        {
                            post.parentRecord?  
                                post.parentRecord.tweetMedia?.map((item:any) => <Image style={{padding:3}}
                                src={process.env.REACT_APP_BACK_SERVER + item?.path} alt={item.id}/>)
                            :
                                post.tweetMedia?.map((item:any) => <Image style={{padding:3}}
                                src={process.env.REACT_APP_BACK_SERVER + item?.path} alt={item.id}/>)
                        }         
                    </Image.PreviewGroup>
                </div>
                
                <Row gutter={[10,0]} justify='end'  className='post-item-stats'>
                    <Col><Typography.Text className='post-item-stats-comments' type="secondary" >{post.counts.commentsCount} comments</Typography.Text></Col>
                    <Col><Typography.Text className='post-item-stats-retweets' type="secondary">{post.counts.retweetsCount} retweets</Typography.Text></Col>
                    <Col><Typography.Text className='post-item-stats-saved' type="secondary">{post.counts.savesCount} saved</Typography.Text></Col>
                </Row> 

                <Divider type="horizontal" className={'stats-actions-divider'}/>
                
                <Row className={'action-row'}>
                   <PostActions 
                        post={post} 
                        currentUser={currentUser}
                        setIsCommentsOpen={setIsCommentOpen}
                        isCommentOpen={isCommentOpen}/>
                </Row>

                <Divider type="horizontal" className={'actions-form-divider'}/>
            
                <Row className={"reply-form-row"}>
                    <ReplyForm appendToComments={appendToComments} parentPost={post}/>        
                </Row>

                <Divider type="horizontal"  className={'form-comments-divider'}/>
                
                <Row >
                    {isCommentOpen &&
                    <CommentsList 
                        filters={filters}
                        setFilters={setFilters}
                        comments={comments}
                        setComments={setComments}
                        currentUser={currentUser}
                        post={post}
                    />  }   
                </Row>
                
            

                
            </Space>
        </Card>
    )
}

export default PostItem;


