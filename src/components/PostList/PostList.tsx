import { CommentOutlined, RetweetOutlined } from "@ant-design/icons";
import { List, Skeleton, Space, theme, Typography } from "antd";
import { useAppSelector } from "../../hooks/redux";
import { postsSlice } from "../../store/slices/PostsSlice";
import PostItem from "./PostItem/PostItem";
import "./PostList.scss"


interface PostListProps
{
    isFetching:boolean;
    lastItemRef?:any;
}

const PostList:React.FC<PostListProps> = ({lastItemRef,isFetching}) =>
{
    const posts:any = useAppSelector((state:any) => state.posts)

    return (
      <>
        <List 
        className="post-list"
        split={false}
        size={"small"}
        dataSource={posts || []}
        renderItem={(item:any) => (
            <>
              <List.Item key={item.id} className={'post-list-item'}>
                    {item.parentRecord && !item.isComment &&
                    <>      
                      <Typography.Text className={'post-action-note'} type={"secondary"}>
                        <RetweetOutlined/> {item.author?.firstname + ' ' + item.author?.surname + ' Retweeted'}
                      </Typography.Text>
                    </>}
                    {item.isComment &&
                    <>      
                      <Typography.Text className={'post-action-note'} type={"secondary"}>
                        <CommentOutlined/> {item.author?.firstname + ' ' + item.author?.surname + ' Replied'}
                      </Typography.Text>
                    </>}
                    <PostItem post={item}/>
              </List.Item>
              {item.id === posts[posts.length - 1].id &&<div ref={lastItemRef}></div>}
            </>
          )
        }/>
          <Skeleton loading={isFetching} paragraph={{rows:5}} title={true} active avatar>
          </Skeleton>
      </>
    )

}

export default PostList;


