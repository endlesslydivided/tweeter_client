import { StarFilled } from '@ant-design/icons';
import { Button, Card, Modal } from 'antd';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import FavoriteMessagesList from '../FavoriteMessagesList';
import './SideChatButtons.scss'
const SideChatButtons = () => {

  const [isFavoriteOpen, setIsFavoriteOpen] = useState(false);

  const currentUser:any = useAppSelector((state:any) => state.auth.user);
   
  return (
    <>
        <Modal
            destroyOnClose={true}
            className="modal"
            title={`Your favorite messages`}
            centered
            onCancel={() => setIsFavoriteOpen(false)}
            open={isFavoriteOpen}
        >
            <FavoriteMessagesList/>
        </Modal>
        <Card className='side-chat-menu-buttons-card'> 
          <Button type={'link'} size={'large'} onClick={() => setIsFavoriteOpen(true)}  icon={<StarFilled/>}>Favorite messages</Button>  
        </Card> 
    </>
  
  )
}

export default SideChatButtons