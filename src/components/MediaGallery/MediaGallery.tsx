import { Image, List, Skeleton, Space, theme } from "antd";
import { useAppSelector } from "../../hooks/redux";
import "./MediaGallery.scss"
import Gallery from "react-photo-gallery"
import { useCallback } from "react";
const { useToken } = theme;

interface MediaGalleryProps
{
    result: any;
}

const MediaGallery:React.FC<MediaGalleryProps> = ({result}) =>
{
   
        
    return (
        <List 
        className="media-list"
        grid={{xs: 1,sm: 2,md: 2,lg: 4,xl: 3,xxl: 4}}
        split={false}
        dataSource={result.data?.rows}
        renderItem={(item:any) => (
            <List.Item key={item.id}>
            <Skeleton loading={result.loading}  active>
              <Image style={{padding:3}}  src={process.env.REACT_APP_BACK_SERVER + item?.path} alt={item.id}/>
            </Skeleton>
          </List.Item>)
        }/>

    )
}

export default MediaGallery;


