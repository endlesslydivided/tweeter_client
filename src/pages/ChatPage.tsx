import { BookOutlined, CommentOutlined, HeartOutlined, RetweetOutlined, StarOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, List, Radio, Row, Space, Typography } from "antd";
import { useState } from "react";


const ChatPage = () => {

    const [replyRule,setReplyRule] = useState(false);

   
    return (
        <div style={{display:'grid',height:'100vh'}} className='chat-page-container'>
            <Row  style={{color:'white'}} >
                <Col flex={3} style={{backgroundColor:'blue'}}>
                <Space direction="vertical" size='large' style={{width: '100%',justifySelf:'center'}}>
                   <Radio.Group onChange={e => setReplyRule(e.target.value)} defaultValue={false}>
                    <Radio.Button className='post-form-button-everyone' value={false} style={{width:'100%',border:'none'}}>
                        <Space>
                            <StarOutlined />
                        </Space>
                    </Radio.Button>
                    <Radio.Button className='post-form-button-follow' value={true} style={{width:'100%',border:'none'}}>
                        <Space>
                            <UserOutlined/>
                        </Space>
                    </Radio.Button>
                </Radio.Group>

                <List
                    dataSource={[
                        {
                            name:'Name',
                            surname:'Surname',
                            lastMessage:'Hello!'
                        },
                        {
                            name:'Name',
                            surname:'Surname',
                            lastMessage:'Hello!'
                        },
                        {
                            name:'Name',
                            surname:'Surname',
                            lastMessage:'Hello!'
                        },
                    ]}
                    renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                        avatar={<Avatar size={45} icon={<UserOutlined/>} />}
                        title={<Typography.Text>{item.name + ' ' + item.surname}</Typography.Text>}
                        description={<Typography.Text>{item.lastMessage}</Typography.Text>}
                        />
                    </List.Item>
                    )}
                />
                </Space>
                
                </Col>
                <Col flex={18}>
                </Col>
            </Row>
        </div>
    );
};

export default ChatPage;

