
import { RetweetOutlined } from "@ant-design/icons";
import { List, Skeleton, Space, Typography } from "antd";
import { useFilterFetch } from "../../hooks/useFilterFetch";
import { useGetCommentsQuery } from "../../services/TweetApiSlice";
import CommentItem from "./CommentsItem/CommentItem";
import "./CommentsList.scss"


interface CommentsListProps
{
    post: any;
    currentUser: any;
}

const CommentsList:React.FC<CommentsListProps> = ({post,currentUser}) =>
{

    const [result,totalPages,setFilters] = useFilterFetch(
      {
        fetchCB: useGetCommentsQuery,
        params:{id:post.id},
        errorMessage:'Some error occured during fetching tweet comments'
      }
    );

    return (
        <List 
        className="comments-list"
        split={false}
        dataSource={result.data?.rows}
        renderItem={(item:any) => (
            <List.Item key={item.id}>
            <Skeleton loading={result.loading}  active avatar>
              <Space direction="vertical">
                <CommentItem comment={item} currentUser={currentUser}/>
              </Space>          
            </Skeleton>
          </List.Item>)
        }/>
    )
}

export default CommentsList;


