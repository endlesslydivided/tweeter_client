import { CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { List,Image, UploadFile, Button } from 'antd';
import {FC} from 'react';
import './MediaEntityLists.scss'

interface IMediaEntityListProps {
    files: any[]
}

const MediaEntityList: FC<IMediaEntityListProps> = ({files}) => {

    const renderGrid = () =>
    {
        switch(files.length)
        {
            case 1: return {xs: 1,sm: 2,md: 2,lg: 2,xl: 2,xxl: 5}
            case 2: return {xs: 2,sm: 2,md: 2,lg: 2,xl: 3,xxl: 5}
            case 3: return {xs: 2,sm: 3,md: 3,lg: 3,xl: 3,xxl: 5}
            case 4: return {xs: 2,sm: 2,md: 2,lg: 2,xl: 4,xxl: 5}
            case 5: return {xs: 2,sm: 3,md: 3,lg: 3,xl: 5,xxl: 5}
            case 6: return {xs: 3,sm: 3,md: 3,lg: 3,xl: 3,xxl: 3}
            case 7: return {xs: 3,sm: 3,md: 3,lg: 3,xl: 3,xxl: 5}
            case 8: return {xs: 4,sm: 4,md: 4,lg: 4,xl: 4,xxl: 4}
            case 9: return {xs: 3,sm: 3,md: 3,lg: 3,xl: 3,xxl: 3}
            case 10: return {xs: 5,sm: 5,md: 5,lg: 5,xl: 5,xxl: 5}

        }

    }
    if(files?.length !== 0)
    return (
        
        <List           
            className='media-list'
            grid={renderGrid()}
            dataSource={files}
            renderItem={(item) => (
            <List.Item key={item.id} className='media-list-item'>
                {
                    item.type === "image" ?
                    <Image src={process.env.REACT_APP_BACK_SERVER + item.path}/> :
                    item.type === "video"
                    && <video preload="none" controls src={process.env.REACT_APP_BACK_SERVER + item.path}/>

                }
            </List.Item>
            )}
        />
    )

    return null;
}

export default MediaEntityList