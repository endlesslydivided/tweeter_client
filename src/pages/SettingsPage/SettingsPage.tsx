import { LockOutlined, SettingOutlined } from "@ant-design/icons";
import { Card, Col, MenuProps, Row, Space, Typography } from "antd";
import { useState } from "react";
import VerticalSideMenu from "../../components/VerticalSideMenu/VerticalSideMenu";
import SessionSection from "../../sections/settingsSections/SessionsSection";
import UpdatePasswordSection from "../../sections/settingsSections/UpdatePasswordSection";
import UserDataFormSection from "../../sections/settingsSections/UserDataFormSection";
import './SettingsPage.scss';

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
        key: 'security',
    },
];

const SettingsPage = () => {

    const [content, setContent] = useState('general');

    const renderContent = () =>
    {
        switch(content)
        {
            case 'general': return (
                <>
                    <UserDataFormSection/>
                    <UpdatePasswordSection/>
                </>
            )

            case 'security': return (
                <>
                    <SessionSection/>
                </>
            )
        }
    }

    return (
        <div  className='setting-page-container'>
            <Row gutter={[15,10]} className='settings-page-row'>              
                <Col span={6} className='settings-page-verticalmenu-col'>
                    <Card 
                    bordered={false} 
                    bodyStyle={{ display: "none" }} 
                    headStyle={{paddingLeft:'0px'}} title=
                    {
                        <VerticalSideMenu selectedKey={content} setSelecteKey={setContent} items={items}/>
                    }/>
                </Col>
                <Col span={18} className='settings-page-general-col'>
                    <Space direction="vertical">
                        {renderContent()}
                    </Space>
                
                </Col>
            </Row>
        </div>
    );
};

export default SettingsPage;

