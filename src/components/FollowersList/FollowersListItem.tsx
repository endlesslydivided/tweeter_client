import { CheckOutlined ,UserAddOutlined,UserOutlined} from '@ant-design/icons';
import { Button,Typography,List,Skeleton,Avatar } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux'
import { useSubscribe } from '../../hooks/useSubscribe';
import { PROFILE_ROUTE } from '../../utils/consts';

interface FollowersListItemProps
{
    entity:any;
    isFetching:boolean;
}

const listItemMeta = (item:any) => {return {
    avatar:(<Avatar size={40} shape={'square'} icon={<UserOutlined />} src={process.env.REACT_APP_BACK_SERVER + item?.mainPhoto?.path}/>),
    title:(<Link to={`${PROFILE_ROUTE}/${item.id}`}>{item.firstname   + ' ' + item.surname}</Link>),
    description:(`${item.counts.followersCount} followers`)
  }}

const FollowersListItem:React.FC<FollowersListItemProps> = ({entity,isFetching}) => {
    
    const userState = useAppSelector((state:any) => state.auth.user);
    

    const {onCreateClickHandler,onDeleteClickHandler,isSubscribed} = useSubscribe({entity});

    const renderActions =  userState.id === entity?.subscriber?.id ? [<Typography.Text>It's you</Typography.Text>]:
    [
        <Button 
            onClick={() => isSubscribed ? onDeleteClickHandler() : onCreateClickHandler()}
            type={isSubscribed ? "primary" : "default"} 
            icon={isSubscribed ? <CheckOutlined/> :<UserAddOutlined/>}>
            {isSubscribed ? 'Unfollow' : 'Follow'}
        </Button>
    ]
    
    
    return (<List.Item className={'followers-list-item'}actions={renderActions}>
                <Skeleton avatar title={false} loading={isFetching} active>
                    <List.Item.Meta {...listItemMeta(entity.subscriber || entity.subscribedUser)}/>
                    {entity.description}
                </Skeleton> 
            </List.Item>)
    
}

export default FollowersListItem