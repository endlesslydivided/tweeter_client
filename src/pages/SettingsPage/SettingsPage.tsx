import { LockOutlined, SettingOutlined } from "@ant-design/icons";
import { Card, Col, MenuProps, Row, Space, Typography } from "antd";
import { useState } from "react";
import SessionSection from "../../components/SettingsSections/SessionSection/SessionsSection";
import UserDataFormSection from "../../components/SettingsSections/UpdateDataFormSection/UserDataFormSection";
import UpdatePasswordSection from "../../components/SettingsSections/UpdatePasswordSection/UpdatePasswordSection";
import VerticalSideMenu from "../../components/VerticalSideMenu/VerticalSideMenu";
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
                <Col md={{span:6}} xs={{span:24}} className='settings-page-verticalmenu-col'>
                    <Card 
                    bordered={false} 
                    bodyStyle={{ display: "none" }} 
                    headStyle={{paddingLeft:'0px'}} title=
                    {
                        <VerticalSideMenu selectedKey={content} setSelecteKey={setContent} items={items}/>
                    }/>
                </Col>
                <Col md={{span:18}} xs={{span:24}} className='settings-page-general-col'>
                    <Space direction="vertical" size={'middle'}>
                        {renderContent()}
                    </Space>
                
                </Col>
            </Row>
        </div>
    );
};

export default SettingsPage;

