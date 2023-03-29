import { CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { List,Image, UploadFile, Button } from 'antd';
import {FC} from 'react';
import './MediaEntityLists.scss'

interface IAudioEntityListProps {
    files: any[]

}

const AudioEntityList: FC<IAudioEntityListProps> = ({files}) => {

    if(files?.length !== 0)
    return (
        <List    
            className='audio-list'
            grid={{xs: 24}}
            dataSource={files}
            renderItem={(item) => (
            <List.Item key={item.id} className='audio-list-item'>
                <audio className='audio-list-audio' controls src={process.env.REACT_APP_BACK_SERVER + item.path}/>
            </List.Item>
            )}
        />
    )

    return null;
}

export default AudioEntityList