import { Col, Typography } from 'antd';
import React from 'react'
import useMediaQuery from '../../../hooks/useMediaQuery';

interface PostStatsProps
{
    post: any;
    isOriginalDeleted: boolean;
}

const PostStats:React.FC<PostStatsProps> = ({post,isOriginalDeleted}) =>
{
    const xs = useMediaQuery('(max-width:576px)')
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

            {
                xs &&
                <Col>
                    <Typography.Text className='post-item-stats-saved' type="secondary">{post.counts.likesCount} likes</Typography.Text>
                </Col>
            }
            
        </> : null
  
}

export default PostStats