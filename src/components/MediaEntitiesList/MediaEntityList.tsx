import { CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { List,Image, UploadFile, Button } from 'antd';
import {FC} from 'react';
import './MediaLists.scss'

interface IMediaEntityListProps {
    files: any[]
}

const MediaEntityList: FC<IMediaEntityListProps> = ({files}) => {

    if(files?.length !== 0)
    return (
        
        <List           
            className='media-form-list'
            grid={{xs: 1,sm: 2,md: 2,lg: 2,xl: 2,xxl: 5}}
            dataSource={files}
            renderItem={(item) => (
            <List.Item className='media-form-list-item'>
                {
                    item.type === "image" ?
                    <Image src={process.env.REACT_APP_BACK_SERVER + item.path}/> :
                    item.type === "video"
                    && <video controls src={process.env.REACT_APP_BACK_SERVER + item.path}/>

                }
            </List.Item>
            )}
        />
    )

    return null;
}

export default MediaEntityList