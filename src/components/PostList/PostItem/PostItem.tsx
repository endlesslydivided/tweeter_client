import { DeleteOutlined, EllipsisOutlined, StopOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Divider, Dropdown, Empty, MenuProps, Row, Space, Typography } from "antd";
import { useState } from "react";
import { useDeletePost } from "../../../hooks/useDeletePost";
import { decrementPostRetweets, incrementPostRetweets } from "../../../store/slices/PostsSlice";
import { fDateTime } from "../../../utils/formatTime";
import CommentsList from "../../CommentsList/CommentsList";
import ReplyForm from "../../ReplyForm/ReplyForm";
import PostActions from "../PostActions/PostActions";
import "./PostItem.scss";
import PostItemContent from "./PostItemContent";
import PostItemStats from "./PostItemStats";

interface PostItemProps
{
    post: any;
}

const PostItem:React.FC<PostItemProps> = ({post}) =>
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

    const deletedRender = ( 
    <Empty 
        image={<StopOutlined size={200}/>} 
        style={{backgroundColor:"rgba(0,0,0,0.05)",borderRadius:'5px',padding:'15px'}} 
        imageStyle={{height:"100%"}} 
        description={
            <Typography.Text>Post is deleted.
                <Button type="link" onClick={() =>onRestoreClickHandler()}>Restore?</Button>
            </Typography.Text>}
    />)
    
    const extraRender = (
        <Dropdown menu={{ items }} arrow={false} placement={'bottom'}>
            <Button type="text" size="middle" shape="circle" >
                <EllipsisOutlined/>
            </Button>
        </Dropdown>
    )

    const metaCardProps = {
        avatar: (<Avatar icon={<UserOutlined />} src={process.env.REACT_APP_BACK_SERVER + post?.author?.mainPhoto?.path} size={36} shape="square" />),
        title:(<Typography.Text className="post-item-card-title" strong>{post.author?.firstname + ' ' + post.author?.surname}</Typography.Text>),
        description:(<Typography.Text  className="post-item-card-description" type="secondary">{fDateTime(post.createdAt)}</Typography.Text>)
    }

    const spaceClassNames = "post-item-card-space " +(!hasMedia ? 'post-media-display-none' : '')+(!isCommentOpen ? 'post-??omments-display-none' : '');

    return (
        <Card className="post-item-card" extra={!isDeleted && extraRender}>
            {
                isDeleted ? deletedRender :         
                <Space direction="vertical" className={spaceClassNames} size='middle'>
                    
                    <Card.Meta className="post-item-card-meta" {...metaCardProps}/>  
                    
                    <PostItemContent post={post} isOriginalDeleted={isOriginalDeleted}/>
                             
                    <Row gutter={[10,0]} justify='end'  className='post-item-stats'>
                        <PostItemStats post={post} isOriginalDeleted={isOriginalDeleted}/>
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
                    
                    <Row className={"comment-list-row"}>
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


