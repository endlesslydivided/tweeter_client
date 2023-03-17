import { Card, List } from "antd";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/redux";
import { useCollection } from "../../hooks/useCollection";
import { useObserver } from "../../hooks/useObserver";
import { useGetUsersQuery } from "../../services/UsersApiSlice";
import { appendUsersPage, resetUsers } from "../../store/slices/UsersSlice";
import "./PeopleList.scss";
import PeopleListItem from "./PeopleListItem";


interface PeopleListProps
{
}



const PeopleList:React.FC<PeopleListProps> = ({}) =>
{
    const users:any = useAppSelector(state => state.users);
    const lastItemRef = useRef(null);
    const dispatch = useDispatch();
    
    const {filters,isMore, setFilters,getContentResult:{isFetching},loadMoreHandler} = useCollection({
      entities:users,
      getContentCB: useGetUsersQuery,
      appendPage: appendUsersPage,
      filtersProps:{limit:15}
    });
  
    useObserver({ref:lastItemRef,canLoad:isMore,isLoading:isFetching,callback:loadMoreHandler});

    useEffect(() =>
    {
      dispatch(resetUsers());
    },[])

    

    return (
      <Card className="people-list-card">
        <List itemLayout="horizontal" className="people-list" split={true} size={"small"} dataSource={users}
        renderItem={(item:any) => (<PeopleListItem entity={item} isFetching={isFetching}/>)}/>
        <div ref={lastItemRef}></div>
      </Card>
    )

}

export default PeopleList;


