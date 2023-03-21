
import { UserOutlined, WindowsFilled } from "@ant-design/icons";
import { Avatar, Button, Card, Form, List, notification, Space, Typography } from "antd";
import Fingerprint2 from "fingerprintjs2";
import { useState } from "react";
import { useNotify } from "../../../hooks/useNotify";
import { useDeleteAllSessionsMutation, useDeleteSessionMutation, useGetSessionsQuery } from "../../../services/AuthApiSlice";
import { fDateTime } from "../../../utils/formatTime";
import { matchUserAgent,os,browser } from "../../../utils/formatUserAgent";


interface SessionSectionProps 
{

}

const SessionSection: React.FC<SessionSectionProps> = ({})  =>
{
    const [sessions,setSessions]:any = useState([]);
    const [currentFingerpring,setCurrentFingerpring]:any = useState(null);
    const [modalOpen,setModalOpen]:any = useState(false);

    const sessionsResult = useGetSessionsQuery({});
    const [deleteAllSessions] = useDeleteAllSessionsMutation();
    const [deleteSession] = useDeleteSessionMutation();

    Fingerprint2.getV18( async (fingerprint, components) => {
        setCurrentFingerpring(fingerprint);
    }) 

    const deleteSessionHandler = async(id:any) =>
    {
        const {data,error}:any = await deleteSession({id});

        if(error)
        {
            notification.error({message:error.data.message,placement:'topRight', duration:2});
        }
        else
        {
            notification.success({message:'Session is deleted',placement:'topRight', duration:2});
            setSessions((p:any) => p.filter((s:any) => s.id !== id))
        }
    }

    useNotify(sessionsResult,undefined,() =>
    {
        let {data} = sessionsResult;
        data = data.map((d:any) => {return {
            ...d,
            userAgent: 
            {
                os: matchUserAgent(d.userAgent,os),
                browser:matchUserAgent(d.userAgent,browser)
            }
        }});
        setSessions(data);
        console.log(data);  
    })

    return (
            <Card>
                <Space direction="vertical" size='small' style={{width: '100%',justifySelf:'center'}}>
                    
                    <Typography.Title level={3}>Manage sessions</Typography.Title>

                    <Typography.Text type='secondary'>
                        View and delete sessions
                    </Typography.Text>
                    
                    <List className="session-list" dataSource={sessions} renderItem={(item:any) => 
                    (
                        <List.Item key={item.id} actions={
                            currentFingerpring !== item.fingerprint ?
                            [<Button danger type={'primary'}  onClick={() => deleteSessionHandler(item.id)}>Delete session</Button>] : 
                            [<Typography.Text>Current session</Typography.Text>]
                        }>
                            <List.Item.Meta
                            avatar={<Avatar size={65} icon={item.userAgent.os.icon} />}
                            title={<div className='title'>
                                        <Typography.Title level={5} style={{margin:0}}>
                                            OS: {item.userAgent.os.name}
                                        </Typography.Title>
                                        <Typography.Title level={5} style={{margin:0}}>
                                            Browser: {item.userAgent.browser.name}
                                        </Typography.Title>
                                    </div>
                                }
                            description={<Typography.Text>{fDateTime(item.createdAt)}</Typography.Text>}
                            />
                        </List.Item>
                    )}/>
                    {
                        modalOpen? 
                        <div style={{display:'flex', gap:'2px',flexDirection:'column'}}>
                            <Typography.Title level={5}>Are you sure?</Typography.Title>
                            <Typography.Paragraph >All sessions will be deleted and you will be signed out!</Typography.Paragraph>
                            <div style={{display:'flex', gap:'10px'}}>
                                <Button block danger type={'primary'} onClick={() => deleteAllSessions({})}>
                                    Yes, delete all sessions
                                </Button>
                                <Button block  type={'primary'}  onClick={() => setModalOpen((p:any) => !p)}>
                                    No, come back
                                </Button>
                            </div>
                        </div>:
                        <Button block danger onClick={() => setModalOpen((p:any) => !p)}>Delete all sessions</Button>
                    }
                </Space>
            </Card>  
    )
}

export default SessionSection