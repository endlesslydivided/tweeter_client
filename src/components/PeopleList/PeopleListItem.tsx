import { CheckOutlined, UserOutlined,UserAddOutlined, MailFilled } from '@ant-design/icons'
import { Avatar, Button, List, Skeleton, Space } from 'antd'
import React from 'react'
import { useSubscribe } from '../../hooks/useSubscribe'
import { PROFILE_ROUTE } from '../../utils/consts'
import { Link } from "react-router-dom";
import useMediaQuery from '../../hooks/useMediaQuery'

interface PeopleListItemProps
{
    entity:any,
    isFetching:boolean,
}



const PeopleListItem:React.FC<PeopleListItemProps> = ({entity,isFetching}) => {

    const {onCreateClickHandler,onDeleteClickHandler,isSubscribed} = useSubscribe({
        entity:entity
      })

    const xs = useMediaQuery('(max-width:576px)')


    const listItemMeta = (item:any) => {return {
    avatar:(<Avatar size={xs ? 40 : 80} shape={'circle'} icon={<UserOutlined />} 
                    src={ item?.mainPhoto? process.env.REACT_APP_BACK_SERVER + item?.mainPhoto?.path:null}/>),
    title:(<Link to={`${PROFILE_ROUTE}/${item.id}`}>{ item.firstname + ' ' + item.surname }</Link>),
    description:(`${item.country}, ${item.city}`)
    }}

    return (
        <List.Item   className={'people-list-item'}>
            
                <List.Item.Meta  {...listItemMeta(entity)}/>
                <div style={{display:'flex', gap:'5px',flexDirection:'column'}}>
                    <Button 
                        size={xs ? 'small': 'middle'}
                        onClick={() => isSubscribed ? onDeleteClickHandler() : onCreateClickHandler()}
                        type={isSubscribed ? "primary" : "default"} 
                        icon={isSubscribed ? <CheckOutlined/> :<UserAddOutlined/>}>
                        {isSubscribed ? 'Unfollow' : 'Follow'}
                    </Button>
                    <Button 
                        icon={<MailFilled/>} size={xs ? 'small': 'middle'}
                        disabled={(!isSubscribed || entity.isSubscribed.length === 0) && entity.isFollower.length === 0}
                    >
                    Send message
                    </Button>
                </div>

        </List.Item>
    )
}

export default PeopleListItem