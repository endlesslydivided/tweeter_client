import { FrownOutlined } from '@ant-design/icons';
import { Empty, Typography,Image } from 'antd';
import React from 'react'


interface PostItemCotnentProps
{
    post: any;
    isOriginalDeleted: boolean;
}

const PostItemContent:React.FC<PostItemCotnentProps> = ({post,isOriginalDeleted}) =>
{
    const isRetweet = post.parentRecord && !post.isComment;

    if(isOriginalDeleted)
    {
        return (
            <Empty 
            image={<FrownOutlined size={200}/>} 
            style={{backgroundColor:"rgba(0,0,0,0.05)",borderRadius:'5px',padding:'25px'}} 
            imageStyle={{height:"100%"}} 
            description={<Typography.Text>Original post is deleted</Typography.Text>}/>
        )
    }

    return(
    <>
        {
            isRetweet ? 
            post.parentRecord.text && <Typography.Text>{post.parentRecord.text}</Typography.Text>
            :
            post.text              && <Typography.Text>{post.text}</Typography.Text>
        }

        <div className='post-item-images-container'>
            <Image.PreviewGroup >
                {
                    post.parentRecord && !post.isComment?  
                        post.parentRecord.tweetMedia?.map((item:any) => <Image style={{padding:3}}
                        src={process.env.REACT_APP_BACK_SERVER + item?.path} alt={item.id}/>)
                    :
                        post.tweetMedia?.map((item:any) => <Image style={{padding:3}}
                        src={process.env.REACT_APP_BACK_SERVER + item?.path} alt={item.id}/>)
                }         
            </Image.PreviewGroup>
        </div>
    </>
    )

}

export default PostItemContent;