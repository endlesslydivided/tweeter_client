import { CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { List,Image, UploadFile, Button } from 'antd';
import {FC} from 'react';
import './MediaFormLists.scss'

interface IAudioFormListProps {
    files: any[]
    setFiles: Function;
}

const AudioFormList: FC<IAudioFormListProps> = ({files, setFiles}) => {

    if(files?.length !== 0)
    return (
        <List    
            className='audio-form-list'
            grid={{xs: 24}}
            dataSource={files}
            renderItem={(item) => (
            <List.Item className='audio-form-list-item'>
                <audio className='audio-form-list-audio' controls src={URL.createObjectURL(item.file)}/>
                <Button 
                    icon={<CloseOutlined/>} 
                    danger 
                    type='text'
                    size="large"
                    onClick={() => setFiles((p:any) => p.filter((x:any) => item.id !== x.id) || [])}/>
            </List.Item>
            )}
        />
    )

    return null;
}

export default AudioFormList