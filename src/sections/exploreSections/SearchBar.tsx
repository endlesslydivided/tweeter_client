
import { GlobalOutlined, PictureOutlined, SearchOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Divider, Input, Popover, Radio, Row, Space, Tooltip, Typography } from "antd";
import React, { useState } from "react";

interface SearchBarProps {

}


const SearchBar: React.FC<SearchBarProps> = ({})  =>
{

	const [replyRule,setReplyRule] = useState(false);

    return (
        <Card className='search-bar-card'>
                <Row >
                    <Col flex={22} >
                        <Input.Search 
                        addonBefore={<SearchOutlined color="rgb(0,0,0,0.2)"/>} 
                        enterButton={<Button type="primary">Search</Button>}  className='search-bar-input 'placeholder="Search" />      
                    </Col>
                </Row>
                
        </Card>
    )
}

export default SearchBar;

