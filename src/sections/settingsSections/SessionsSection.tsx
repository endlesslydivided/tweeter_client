
import { UserOutlined, WindowsFilled } from "@ant-design/icons";
import { Avatar, Card, Form, List, Space, Typography } from "antd";


interface SessionSectionProps 
{

}

const SessionSection: React.FC<SessionSectionProps> = ({})  =>
{

    const dialogs = [
        {
            id:'1',
            name:'Name',
            surname:'Surname',
            message:
            {
                text: 'Hello!',
                createdAt:'4:30'
            }
        },
        {
            id:'2',
            name:'Name',
            surname:'Surname',
            message:
            {
                text: 'Hello!',
                createdAt:'14:30'
            }
        },
        {
            id:'3',
            name:'Name',
            surname:'Surname',
            message:
            {
                text: 'Hello!',
                createdAt:'20:45'
            }
        },
    ]

    return (
            <Card>
                <Space direction="vertical" size='small' style={{width: '100%',justifySelf:'center'}}>
                    
                    <Typography.Title level={3}>Manage sessions</Typography.Title>

                    <Typography.Text type='secondary'>
                        View and delete sessions
                    </Typography.Text>
                    
                    <List className="session-list" dataSource={dialogs}
                    renderItem={(item) => (
                        <List.Item key={item.id}
                        >
                            <List.Item.Meta
                            avatar={<Avatar size={65} icon={<WindowsFilled/>} />}
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
            </Card>  
    )
}

export default SessionSection