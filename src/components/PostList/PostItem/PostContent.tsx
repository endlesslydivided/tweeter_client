import { FrownOutlined } from '@ant-design/icons';
import { Empty, Typography,Image } from 'antd';
import React from 'react'
import { fDataFormat } from '../../../utils/uploadFormats';
import AudioEntityList from '../../MediaEntitiesList/AudioEntityList';
import DocumentsEntityList from '../../MediaEntitiesList/DocumentsEntityList';
import MediaEntityList from '../../MediaEntitiesList/MediaEntityList';


interface PostContentProps
{
    post: any;
    isOriginalDeleted: boolean;
}

const PostContent:React.FC<PostContentProps> = ({post,isOriginalDeleted}) =>
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

    const media = post.parentRecord && !post.isComment?  
    post.parentRecord.tweetMedia :
    post.tweetMedia;

    return(
    <>
        {
            isRetweet ? 
            post.parentRecord.text && <Typography.Text>{post.parentRecord.text}</Typography.Text>
            :
            post.text              && <Typography.Text>{post.text}</Typography.Text>
        }

        <div className='post-item-images-container'>
            <MediaEntityList files={media.filter((i:any) => fDataFormat(i.originalName)=== 'video' || fDataFormat(i.originalName) === 'image')}/>
			<AudioEntityList files={media.filter((i:any) => fDataFormat(i.originalName)=== 'audio')}/>
			<DocumentsEntityList files={media.filter((i:any) => fDataFormat(i.originalName)=== 'document')}/>

        </div>
    </>
    )

}

export default PostContent;