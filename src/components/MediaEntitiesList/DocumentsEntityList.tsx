import { CloseOutlined, DeleteOutlined, FileOutlined } from '@ant-design/icons';
import { List,Image, UploadFile, Button, Avatar } from 'antd';
import {FC} from 'react';
import './MediaLists.scss'

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
            <List.Item className='document-list-item'>
                <a href={process.env.REACT_APP_BACK_SERVER + item.path}>
                    <List.Item.Meta title={item.originalName} avatar={<Avatar icon={<FileOutlined style={{color:'black',padding:'5px'}}/>} />}/>
                </a>
            </List.Item>
            )}
        />
    )

    return null;
}

export default DocumentsEntityList