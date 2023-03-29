import { CloseOutlined, DeleteOutlined, FileOutlined } from '@ant-design/icons';
import { List,Image, UploadFile, Button, Avatar } from 'antd';
import {FC} from 'react';
import './MediaEntityLists.scss'

interface IDocumentsEntityListProps {
    files: any[]
}

const DocumentsEntityList: FC<IDocumentsEntityListProps> = ({files}) => {

    if(files?.length !== 0)
    return (
        <List    
            className='document-list'
            grid={{xs: 24}}
            dataSource={files}
            renderItem={(item) => (
            <List.Item key={item.id} className='document-list-item'>
                <a href={process.env.REACT_APP_BACK_SERVER + item.path} style={{width:'100%'}}>
                    
                    <List.Item.Meta title={
                    <><Avatar className='document-list-item-avatar' size={"small"} icon={<FileOutlined style={{color:'black'}}/>} />
                    {item.originalName}</>} 
                    />
                </a>
            </List.Item>
            )}
        />
    )

    return null;
}

export default DocumentsEntityList