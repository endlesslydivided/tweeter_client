import { List, Space } from 'antd';
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useCollection } from '../../hooks/useCollection';
import { useGetCommentsQuery, useGetRepliesQuery } from '../../services/TweetApiSlice';
import { appendCommentPage, appendRepliesPage, resetComments } from '../../store/slices/CommentsSlice';
import CommentItem from '../CommentsList/CommentsItem/CommentItem';
import "./ReplyList.scss"
import ReplyListItem from './ReplyListItem';

interface ReplyListProps
{
    parentComment:any;
    setReplyPost:Function;
}


const ReplyList:React.FC<ReplyListProps> = ({parentComment,setReplyPost}) => {
    
    const replies = useAppSelector((state:any) => state.comments[parentComment.id]);
    const dispatch = useAppDispatch();

    const [activeReply,setActiveReply]:any = useState(null);

    const {getContentResult} = useCollection({
      entities:replies,
      filtersProps:{limit:null,orderDirection: "asc"},
      appendPage: appendRepliesPage,
      getContentCB: useGetRepliesQuery,
      getContentParams:{id:parentComment.id},
      parentEntity:parentComment
    })

    useEffect(() =>
    {
      dispatch(resetComments(parentComment.id));
    },[])
   

    return (
      <>
        <List 
        className="reply-list"
        split={false}
        loading={getContentResult.isFetching}
        itemLayout="vertical"
        dataSource={replies || []}
        renderItem={(item:any) => (
            <List.Item key={item.id} id={item.id} className={"reply-list-item"}>           
             
                <ReplyListItem 
                  setReplyPost={setReplyPost} 
                  reply={item} 
                  parentComment={parentComment}
                  activeReply={activeReply}
                  setActiveReply={setActiveReply}/>
             
            </List.Item>)         
        }/>
      </>
    )
}

export default ReplyList