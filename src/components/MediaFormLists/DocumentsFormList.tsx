import { CloseOutlined, DeleteOutlined, FileOutlined } from '@ant-design/icons';
import { List,Image, UploadFile, Button } from 'antd';
import {FC} from 'react';
import './MediaFormLists.scss'

interface IDocumentsFormListProps {
    files: any[]
    setFiles: Function;
}

const DocumentsFormList: FC<IDocumentsFormListProps> = ({files, setFiles}) => {

    if(files?.length !== 0)
    return (
        <List    
            className='document-form-list'
            grid={{xs: 24}}
            dataSource={files}
            renderItem={(item) => (
            <List.Item className='document-form-list-item'>
                <a href={URL.createObjectURL(item.file)}>
                    <List.Item.Meta title={item.file.name} avatar={<FileOutlined color='black'/>}/>
                </a>
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

export default DocumentsFormList