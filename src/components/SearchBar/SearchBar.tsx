
import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, Row } from "antd";
import React from "react";
import './SearchBar.scss';

interface SearchBarProps {
    search:any;
    setSearch:any;
}


const SearchBar: React.FC<SearchBarProps> = ({search,setSearch})  =>
{

    return (
        <Card className='search-bar-card'>
                <Row >
                    <Col flex={22} >
                        <Input.Search
                        onChange={(e:any) => setSearch((p:any) => {return {...p,search:e.target.value}})}
                        value={search} 
                        addonBefore={<SearchOutlined color="rgb(0,0,0,0.2)"/>} 
                        enterButton={<Button type="primary">Search</Button>}  
                        className='search-bar-input 'placeholder="Search" />      
                    </Col>
                </Row>
                
        </Card>
    )
}

export default SearchBar;

