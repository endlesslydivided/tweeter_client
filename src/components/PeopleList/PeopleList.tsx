import { CommentOutlined, MailFilled, RetweetOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, List, Skeleton, Space, theme, Typography } from "antd";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { useCollection } from "../../hooks/useCollection";
import { useObserver } from "../../hooks/useObserver";
import { useGetUsersQuery } from "../../services/UsersApiSlice";
import { appendUsersPage, resetUsers } from "../../store/slices/UsersSlice";
import { HOME_ROUTE, PROFILE_ROUTE } from "../../utils/consts";
import "./PeopleList.scss"


interface PeopleListProps
{
}

const listItemMeta = (item:any) => {return {
  avatar:(<Avatar size={80} shape={'circle'} icon={<UserOutlined />} src={process.env.REACT_APP_BACK_SERVER + item?.mainPhoto?.path}/>),
  title:(<Link to={`${PROFILE_ROUTE}/${item.id}`}>{item.surname + ' ' + item.firstname }</Link>),
  description:(`${item.country}, ${item.city}`)
}}

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

    const listItemActions = (item:any) => [
    
      <Button icon={<UserAddOutlined/>}>Follow</Button>,
      <Button icon={<MailFilled/>}>Send message</Button>

    ]
    

    return (
      <Card className="people-list-card">
        <List itemLayout="horizontal" className="people-list" split={true} size={"small"} dataSource={users}
        renderItem={(item:any) => (
          <List.Item className={'people-list-item'} actions={listItemActions(item)} >
          <Skeleton avatar title={false} loading={isFetching} active>
            <List.Item.Meta {...listItemMeta(item)}/>
          </Skeleton>
        </List.Item>
        )}/>
        <div ref={lastItemRef}></div>
      </Card>
    )

}

export default PeopleList;


