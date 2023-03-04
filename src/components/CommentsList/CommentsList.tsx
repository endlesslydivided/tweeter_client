
import { RetweetOutlined } from "@ant-design/icons";
import { List, Skeleton, Space, Typography } from "antd";
import { useState } from "react";
import { useFilterFetch } from "../../hooks/useFilterFetch";
import { useNotify } from "../../hooks/useNotify";
import { useGetCommentsQuery, useLazyGetCommentsQuery } from "../../services/TweetApiSlice";
import CommentItem from "./CommentsItem/CommentItem";
import "./CommentsList.scss"


interface CommentsListProps
{
    currentUser: any;
    post:any;
    comments:any;
    setComments:Function;
    filters:any;
    setFilters:Function
}





const CommentsList:React.FC<CommentsListProps> = ({post,currentUser,comments,setComments,filters,setFilters}) =>
{
      
      const [isMore,setIsMore] = useState(false);
      const getCommentsResult = useGetCommentsQuery({id:post.id,filters});
      const loadMoreHandler = async () =>
      {
          setFilters((p:any) => {return {...p,page: p.page + 1}});
      }

      useNotify(getCommentsResult,undefined,() => 
      {
          setIsMore(filters.page < Math.ceil(getCommentsResult.data.count / filters.limit));
          setComments((p:any) => [...p,...getCommentsResult.data.rows]);
      },'Some error occured on server');

      const popComment = (id:any) =>
      {
        setComments((p:any) => [...p.filter((i:any) => i.id != id)]);
      }

    return (
      <>
        <List 
        className="comments-list"
        split={false}
        itemLayout="vertical"
        dataSource={comments || []}
        renderItem={(item:any) => (
            <List.Item key={item.id}>
            <Skeleton loading={getCommentsResult.isLoading}  active avatar>
              <Space direction="vertical">
                <CommentItem comment={item} popComment={popComment} currentUser={currentUser} setFilters={setFilters}/>
              </Space>          
            </Skeleton>
          </List.Item>)
        }/>
        {
          isMore && <Typography.Title onClick={() => loadMoreHandler()}>Show more</Typography.Title>
        }
      </>
    )
}

export default CommentsList;


