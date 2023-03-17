
import { Button, List, Space } from "antd";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useCollection } from "../../hooks/useCollection";
import { useGetCommentsQuery } from "../../services/TweetApiSlice";
import { appendCommentPage, resetComments } from "../../store/slices/CommentsSlice";
import CommentItem from "./CommentsItem/CommentItem";
import "./CommentsList.scss";


interface CommentsListProps
{
    parentPost:any;
    setReplyPost:Function;
}

const CommentsList:React.FC<CommentsListProps> = ({parentPost,setReplyPost}) =>
{
    const comments = useAppSelector((state:any) => state.comments[parentPost.id]);
    const dispatch = useAppDispatch();

    const {isMore,loadMoreHandler,getContentResult} = useCollection({
      entities:comments,
      appendPage: appendCommentPage,
      getContentCB: useGetCommentsQuery,
      getContentParams:{id:parentPost.id},
      parentEntity:parentPost
    })

    useEffect(() =>
    {
      dispatch(resetComments(parentPost.id));
    },[])
   

    return (
      <>
        <List 
        className="comments-list"
        split={false}
        loading={getContentResult.isFetching}
        itemLayout="vertical"
        dataSource={comments || []}
        renderItem={(item:any) => (
            <List.Item key={item.id} className={"comment-list-item"}>           
              <Space direction="vertical">
                <CommentItem setReplyPost={setReplyPost} comment={item} parentPost={parentPost}/>
              </Space>          
          </List.Item>)
        }/>
        {
          isMore && <Button type="link" block onClick={() => loadMoreHandler()}>Show more</Button>
        }
      </>
    )
}

export default CommentsList;


