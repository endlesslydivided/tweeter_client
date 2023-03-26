import { Card, List, Skeleton, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/redux";
import { useCollection } from "../../hooks/useCollection";
import { useObserver } from "../../hooks/useObserver";
import { useGetUsersQuery } from "../../services/UsersApiSlice";
import { appendUsersPage, resetUsers } from "../../store/slices/UsersSlice";
import SearchBar from "../SearchBar/SearchBar";
import PeopleFilters from "./PeopleFilters";
import "./PeopleList.scss";
import PeopleListItem from "./PeopleListItem";


interface PeopleListProps
{
}

const initialUsersFilters = {
  sex: "",
  country: "",
  havePhoto: false,
};

const PeopleList:React.FC<PeopleListProps> = ({}) =>
{
    const users:any = useAppSelector(state => state.users);
    const lastItemRef = useRef(null);
    const dispatch = useDispatch();
    
    const {filters,isMore, setFilters,getContentResult:{isFetching},loadMoreHandler,setIninitialFilters} = useCollection({
      entities:users,
      getContentCB: useGetUsersQuery,
      appendPage: appendUsersPage,
      filtersProps:{limit:15,...initialUsersFilters}
    });
  
    useObserver({ref:lastItemRef,canLoad:isMore,isLoading:isFetching,callback:loadMoreHandler});

    useEffect(() =>
    {
      dispatch(resetUsers());
    },[])

    useEffect(() =>
    {
      dispatch(resetUsers());
    },[filters])
    

    return (
      <Space direction="vertical">
        <SearchBar search={filters.search} setSearch={setFilters}/>
        <PeopleFilters filters={filters} setFilters={setFilters} setInitialFilters={setIninitialFilters}/>     
        <Card className="people-list-card">
          <List itemLayout="horizontal" className="people-list" split={true} size={"small"} dataSource={users}
          renderItem={(item:any) => (<PeopleListItem entity={item} isFetching={isFetching}/>)}/>
          <div ref={lastItemRef}></div>
          <Skeleton avatar title={false} loading={isFetching} active>
            </Skeleton>
        </Card>
      </Space>
    )

}

export default PeopleList;


