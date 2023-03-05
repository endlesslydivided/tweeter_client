
import { RetweetOutlined } from "@ant-design/icons";
import { Button, List, notification, Skeleton, Space, Typography } from "antd";
import { useEffect, useState } from "react";
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
        if(comments.length === 0)
        {
          getCommentsResult.refetch();
        }
        else
          setFilters((p:any) => {return {...p,createdAt: comments[comments.length-1].createdAt }});
    }

    useNotify(getCommentsResult,undefined,() => 
    {
        const {rows,count} = getCommentsResult.data;
        setIsMore(count > filters.limit);

        const retrievedComments = rows.filter((c:any) => !comments.includes(c));

        const editedComments = retrievedComments.filter((r:any) => comments.some((c:any) => c.id === r.id));

        const newComments = retrievedComments.filter((c:any) => !comments.some((r:any) => c.id === r.id));

        const appliedComments = [...comments.map((c:any) => editedComments.map((e:any) => c.id === e.id ? e : c)[0] || c),...newComments];

        setComments(appliedComments);

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
        loading={getCommentsResult.isFetching}
        itemLayout="vertical"
        dataSource={comments || []}
        renderItem={(item:any) => (
            <List.Item key={item.id}>
            
              <Space direction="vertical">
                <CommentItem comment={item} popComment={popComment} currentUser={currentUser} />
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


