import { CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { List,Image, UploadFile, Button } from 'antd';
import {FC} from 'react';
import './MediaFormLists.scss'

interface IMediaFormListProps {
    files: any[]
    setFiles: Function;
}

const MediaFormList: FC<IMediaFormListProps> = ({files, setFiles}) => {

    if(files?.length !== 0)
    return (
        
        <List           
            className='media-form-list'
            grid={{xs: 1,sm: 2,md: 4,lg: 4,xl: 4,xxl: 5}}
            dataSource={files}
            renderItem={(item) => (
            <List.Item className='media-form-list-item'>
                {
                    item.type === "image" ?
                    <Image src={URL.createObjectURL(item.file)}/> :
                    item.type === "video"
                    && <video controls preload="false" src={URL.createObjectURL(item.file)}/>

                }
                <Button 
                    icon={<CloseOutlined/>} 
                    ghost type="link" 
                    className="delete-media-button"
                    onClick={() => setFiles((p:any) => p.filter((x:any) => item.id !== x.id) || [])}
                    />
            </List.Item>
            )}
        />
    )

    return null;
}

export default MediaFormList