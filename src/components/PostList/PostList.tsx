import { RetweetOutlined } from "@ant-design/icons";
import { List, Skeleton, Space, theme, Typography } from "antd";
import { useAppSelector } from "../../hooks/redux";
import PostItem from "./PostItem/PostItem";
import "./PostList.scss"

const { useToken } = theme;

interface PostListProps
{
    result: any;
}

const PostList:React.FC<PostListProps> = ({result}) =>
{

    const userState:any = useAppSelector(state => state.auth.user);

    return (
        <List 
        className="post-list"
        split={false}
        dataSource={result.data?.rows}
        renderItem={(item:any) => (
            <List.Item key={item.id}>
            <Skeleton loading={result.loading}  active avatar>
              <Space direction="vertical">
              {item.parentRecord && 
              <>      
                <Typography.Text type={"secondary"}>
                  <RetweetOutlined/> {item.author?.firstname + ' ' + item.author?.surname + ' Retweeted'}
                </Typography.Text>
              </>}
              <PostItem post={item} currentUser={userState}/>
              </Space>          
            </Skeleton>
          </List.Item>)
        }/>

    )
}

export default PostList;


