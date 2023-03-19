import { Col, Typography } from 'antd';
import React from 'react'

interface PostItemCotnentProps
{
    post: any;
    isOriginalDeleted: boolean;
}

const PostItemStats:React.FC<PostItemCotnentProps> = ({post,isOriginalDeleted}) =>
{
  return !isOriginalDeleted ?
    <>        
        <Col>
            <Typography.Text className='post-item-stats-comments' type="secondary" >{post.counts.commentsCount} comments</Typography.Text>
        </Col>
        
            <Col>
                <Typography.Text className='post-item-stats-retweets' type="secondary">
                    {post.parentRecord?.counts?.retweetsCount || post.counts.retweetsCount} retweets
                </Typography.Text>
            </Col>
        
        <Col>
            <Typography.Text className='post-item-stats-saved' type="secondary">{post.counts.savesCount} saved</Typography.Text>
        </Col>
        
    </> : null
  
}

export default PostItemStats