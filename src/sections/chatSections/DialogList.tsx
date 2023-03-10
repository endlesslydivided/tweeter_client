import { MailOutlined, SoundOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, List, Radio, Space, Typography } from 'antd';
import React, { useState } from 'react'
import './DialogList.scss'

interface DialogListsProps
{
    dialogs: any[];
    setSelectedDialog: Function;
    selectedDialog: any | null;
}


const DialogList:React.FC<DialogListsProps> = ({dialogs,setSelectedDialog,selectedDialog}) =>
{
    const [dialogGroup,setDialogGroup] = useState('all');


    return (
        <Space direction="vertical" size='small' className='dialog-space'>
            <Radio.Group className="dialogs-radio-group" onChange={e => setDialogGroup(e.target.value)} defaultValue={dialogGroup}>
                <Radio.Button  value={'all'}>
                        <MailOutlined/>
                </Radio.Button>
                <Radio.Button  value={'new'}>
                        <SoundOutlined/>
                </Radio.Button>
                <Radio.Button  value={'favorite'}>
                        <StarOutlined />
                </Radio.Button>
                
            </Radio.Group>
            <List className="dialogs-list" dataSource={dialogs}
                renderItem={(item) => (
                    <List.Item key={item.id} onClick={(e) => setSelectedDialog(item)}
                    className={selectedDialog && item.id === selectedDialog.id ?"ant-list-item-active": ""}
                    >
                        <List.Item.Meta
                        avatar={<Avatar size={45} icon={<UserOutlined/>} />}
                        title={<div className='title'>
                                    <Typography.Text>
                                        {item.name + ' ' + item.surname}
                                    </Typography.Text>
                                    <Typography.Text type='secondary'>
                                        {item.message.createdAt}
                                    </Typography.Text>
                                </div>
                            }
                        description={<Typography.Text>{item.message.text}</Typography.Text>}
                        />
                </List.Item>
                )}
            />
        </Space>
    )
}

export default DialogList