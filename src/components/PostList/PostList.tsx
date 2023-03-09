import { CommentOutlined, RetweetOutlined } from "@ant-design/icons";
import { List, Skeleton, Space, theme, Typography } from "antd";
import { useAppSelector } from "../../hooks/redux";
import PostItem from "./PostItem/PostItem";
import "./PostList.scss"

const { useToken } = theme;

interface PostListProps
{
    isFetching:boolean;
    lastItemRef?:any;
}

const PostList:React.FC<PostListProps> = ({lastItemRef,isFetching}) =>
{

    const userState:any = useAppSelector((state:any) => state.auth.user);
    const posts:any = useAppSelector((state:any) => state.posts)

    return (
      <>
        <List 
        className="post-list"
        split={false}
        size={"small"}
        dataSource={posts || []}
        renderItem={(item:any) => (
            <List.Item key={item.id}>
              <Space direction="vertical">
              {item.parentRecord && !item.isComment &&
              <>      
                <Typography.Text type={"secondary"}>
                  <RetweetOutlined/> {item.author?.firstname + ' ' + item.author?.surname + ' Retweeted'}
                </Typography.Text>
              </>}
              {item.isComment &&
              <>      
                <Typography.Text type={"secondary"}>
                  <CommentOutlined/> {item.author?.firstname + ' ' + item.author?.surname + ' Replied'}
                </Typography.Text>
              </>}
                <PostItem  post={item} currentUser={userState}/>
              </Space>          
          </List.Item>)
        }/>
          <Skeleton loading={isFetching} active avatar/>
          <div ref={lastItemRef}></div>
      </>
    )

}

export default PostList;


