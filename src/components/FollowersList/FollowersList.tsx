import { CheckOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, List, Skeleton, Typography } from "antd";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { useCollection } from "../../hooks/useCollection";
import { useObserver } from "../../hooks/useObserver";
import { useSubscribe } from "../../hooks/useSubscribe";
import { appendSubscriptionsPage, resetSubscriptions } from "../../store/slices/SubscriptionsSlice";
import { PROFILE_ROUTE } from "../../utils/consts";
import "./FollowersList.scss";
import FollowersListItem from "./FollowersListItem";


interface FollowersListProps
{
  userId:string;
  fetchCB:Function;
}



const FollowersList:React.FC<FollowersListProps> = ({userId,fetchCB}) =>
{
    const subscriptions:any = useAppSelector(state => state.subscriptions);
    const lastItemRef = useRef(null);
    const dispatch = useDispatch();
    
    
     
    const {isMore, getContentResult:{isFetching},loadMoreHandler} = useCollection({
      entities:subscriptions,
      getContentParams:{id:userId},
      getContentCB: fetchCB,
      appendPage: appendSubscriptionsPage,
      filtersProps:{limit:15}
    });
  
    useObserver({ref:lastItemRef,canLoad:isMore,isLoading:isFetching,callback:loadMoreHandler});

    useEffect(() =>
    {
      dispatch(resetSubscriptions());
    },[])

    return (
      <Card className="followers-list-card">
        <List 
          itemLayout="horizontal" 
          loading={isFetching} 
          className="followers-list" 
          split={true} 
          size={"small"} 
          dataSource={subscriptions}
          renderItem={(item:any) => <FollowersListItem entity={item} isFetching={isFetching}/> }/>
        <div ref={lastItemRef}></div>
      </Card>
    )

}

export default FollowersList;


