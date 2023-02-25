import { CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { List,Image, UploadFile, Button } from 'antd';
import {FC} from 'react';


interface IPostFormImagesProps {
    files: any[]
    setFiles: Function;
}

const PostFormImages: FC<IPostFormImagesProps> = ({files, setFiles}) => {

    if(files?.length !== 0)
    return (
        <List 
            
            grid={{xs: 1,sm: 2,md: 4,lg: 4,xl: 3,xxl: 3}}
            dataSource={files}
            renderItem={(item) => (
            <List.Item >
                <Image src={URL.createObjectURL(item.originFileObj)}/>
                <Button 
                    icon={<CloseOutlined/>} 
                    danger block
                    onClick={() => setFiles(files.filter((x:any) => item.uid !== x.uid) || [])}
                    type='primary'             
                    style={{zIndex:'1',margin:0, borderRadius:'0px 0px 5px 5px',height:'1%',padding:0}}/>
            </List.Item>
            )}
        />
    )

    return null;
}

export default PostFormImages