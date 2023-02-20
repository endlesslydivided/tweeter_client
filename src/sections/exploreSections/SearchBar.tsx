
import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, Row } from "antd";
import React from "react";
import './SearchBar.scss';

interface SearchBarProps {

}


const SearchBar: React.FC<SearchBarProps> = ({})  =>
{

    return (
        <Card className='search-bar-card'>
                <Row >
                    <Col flex={22} >
                        <Input.Search 
                        addonBefore={<SearchOutlined color="rgb(0,0,0,0.2)"/>} 
                        enterButton={<Button type="primary">Search</Button>}  
                        className='search-bar-input 'placeholder="Search" />      
                    </Col>
                </Row>
                
        </Card>
    )
}

export default SearchBar;

