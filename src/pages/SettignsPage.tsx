import { LockOutlined, PlusOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Form, Input, MenuProps, Row, Select, Space, Typography, Upload } from "antd";
import { useState } from "react";
import PostList from "../components/PostList";
import VerticalSideMenu from "../components/VerticalSideMenu";
import SearchBar from "../sections/exploreSections/SearchBar";
import { UserAvatar } from "../sections/homeUserDataSections/UserCard";
import UpdatePasswordSection from "../sections/settingsSections/UpdatePasswordSection";
import UserDataFormSection from "../sections/settingsSections/UserDataFormSection";

const items: MenuProps['items'] = [
    {
        label: (<Typography.Text strong type='secondary'>
                    General settings <SettingOutlined/>
                </Typography.Text>),
        className:'vertical-menu-item',
        key: 'general',
    },
    {
        label: (<Typography.Text strong type='secondary'>
                    Security <LockOutlined/>
                </Typography.Text>), 
        className:'vertical-menu-item',
        key: 'tweetsReplies',
    },
];

const SettingsPage = () => {

    const [content, setContent] = useState('general');

    return (
        <div  className='setting-page-container'>
            <Row gutter={[15,10]} style={{width: '75vw',justifySelf:'center'}}>              
                <Col span={6}>
                    <Card bordered={false} bodyStyle={{ display: "none" }} headStyle={{paddingLeft:'0px'}} title=
                            {
                                <VerticalSideMenu selectedKey={content} setSelecteKey={setContent} items={items}/>
                            }/>
                </Col>
                <Col span={18}>
                    <Space direction="vertical" style={{width:'100%',}}>
                        <UserDataFormSection/>
                        <UpdatePasswordSection/>
                    </Space>
                
                </Col>
            </Row>
        </div>
    );
};

export default SettingsPage;

