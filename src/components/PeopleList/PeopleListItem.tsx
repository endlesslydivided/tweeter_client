import { CheckOutlined, UserOutlined,UserAddOutlined, MailFilled } from '@ant-design/icons'
import { Avatar, Button, List, Skeleton } from 'antd'
import React from 'react'
import { useSubscribe } from '../../hooks/useSubscribe'
import { PROFILE_ROUTE } from '../../utils/consts'
import { Link } from "react-router-dom";

interface PeopleListItemProps
{
    entity:any,
    isFetching:boolean,
}

const listItemMeta = (item:any) => {return {
    avatar:(<Avatar size={80} shape={'circle'} icon={<UserOutlined />} src={process.env.REACT_APP_BACK_SERVER + item?.mainPhoto?.path}/>),
    title:(<Link to={`${PROFILE_ROUTE}/${item.id}`}>{item.surname + ' ' + item.firstname }</Link>),
    description:(`${item.country}, ${item.city}`)
  }}

const PeopleListItem:React.FC<PeopleListItemProps> = ({entity,isFetching}) => {

    const {onCreateClickHandler,onDeleteClickHandler,isSubscribed} = useSubscribe({
        entity:entity
      })
  
    const listItemActions = (item:any) => [
        <Button 
            onClick={() => isSubscribed ? onDeleteClickHandler() : onCreateClickHandler()}
            type={isSubscribed ? "primary" : "default"} 
            icon={isSubscribed ? <CheckOutlined/> :<UserAddOutlined/>}>
            Follow
        </Button>,
        <Button icon={<MailFilled/>} disabled={
            (!isSubscribed || item.isSubscribed.length === 0) && item.isFollower.length === 0
        }>Send message</Button>
    ]
      
    return (
        <List.Item className={'people-list-item'} actions={listItemActions(entity)} >
            <Skeleton avatar title={false} loading={isFetching} active>
                <List.Item.Meta {...listItemMeta(entity)}/>
            </Skeleton>
        </List.Item>
    )
}

export default PeopleListItem