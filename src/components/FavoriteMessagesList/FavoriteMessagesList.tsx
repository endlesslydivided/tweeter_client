import { Card, ConfigProvider, List } from "antd";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/redux";
import { useCollection } from "../../hooks/useCollection";
import { useObserver } from "../../hooks/useObserver";
import { useGetFavoriteMessagesQuery } from "../../services/UserTweetsApiSlice";
import { appendFavoriteMessagesPage, resetFavoriteMessages } from "../../store/slices/FavoriteMessagesSlice";
import FavoriteMessageListItem from "./FavoriteMessagesListItem";
import "./FavoriteMessagesList.scss";
import { emptyDialogsListRender } from "../EmptyListRender/EmptyListRender";


interface FavoriteMessagesListProps
{

}



const FavoriteMessagesList:React.FC<FavoriteMessagesListProps> = ({}) =>
{
    const favoriteMessages:any = useAppSelector((state:any) => state.favoriteMessages.messages);
    const lastItemRef = useRef(null);
    const dispatch = useDispatch();
    const currentUser:any = useAppSelector((state:any) => state.auth.user)
    
     
    const {isMore, getContentResult:{isFetching},loadMoreHandler} = useCollection({
      entities:favoriteMessages,
      getContentParams:{id:currentUser.id},
      getContentCB:useGetFavoriteMessagesQuery,
      appendPage: appendFavoriteMessagesPage,
      filtersProps:{limit:15},
    });
  
    useObserver({ref:lastItemRef,canLoad:isMore,isLoading:isFetching,callback:loadMoreHandler});

    useEffect(() =>
    {
      dispatch(resetFavoriteMessages());
    },[])

    return (
      <Card className="favorite-messages-list-card">
        <ConfigProvider renderEmpty={emptyDialogsListRender}>      
        <List 
          itemLayout="horizontal" 
          loading={isFetching} 
          className="favorite-messages-list" 
          split={true} 
          bordered={false}
          size={"small"} 
          dataSource={favoriteMessages}
          renderItem={(item:any) => <FavoriteMessageListItem message={item}/> }/>
        </ConfigProvider>
        <div ref={lastItemRef}></div>
      </Card>
    )

}

export default FavoriteMessagesList;


