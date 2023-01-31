import { Space, theme } from "antd";
import PostItem from "./PostItem";

const { useToken } = theme;


interface PostListProps
{
    post: object;
    currentUser: object;
}

const PostList:React.FC = ({}) =>
{



    return (
        <Space direction="vertical" className="post-list">

            <PostItem />
            <PostItem />
            <PostItem />

        </Space>
    )
}

export default PostList;


