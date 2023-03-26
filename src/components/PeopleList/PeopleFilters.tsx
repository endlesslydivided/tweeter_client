import { Button, Card, Col, Form, Radio, Row, Select, Switch } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux';
import { resetUsers } from '../../store/slices/UsersSlice';
import countries from '../../utils/languageCountries';


interface PeopleFiltersProps
{
    filters: any;
    setFilters: Function;
    setInitialFilters:Function;
}

const options = [
    { label: 'Man', value: 'man' },
    { label: 'Woman', value: 'woman' },
    { label: 'Any', value: '' },
  ];

const PeopleFilters:React.FC<PeopleFiltersProps> = ({filters,setFilters,setInitialFilters}) => {

    const dispatch = useDispatch();
    
  return (
    <Card className="people-filters-card">
        <Row  gutter={[10,10]}>
            <Col flex={3}>
                <Form.Item label="Country">
                    <Select 
                        showSearch
                        placeholder="Country" 
                        value={filters.country} 
                        filterOption={(input:any, option:any) =>
                            (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
                          }
                        onChange={(value:any) => setFilters((p:any) => {return {...p,country:value}})}>
                        {
                            countries.map((item:any) => <Select.Option value={item.en}>
                                <img loading="lazy" width="20" src={`https://flagcdn.com/w20/${item.alpha2.toLowerCase()}.png`}
                                    srcSet={`https://flagcdn.com/w40/${item.alpha2.toLowerCase()}.png 2x`}
                                    />
                                {' '+ item.en}</Select.Option>)
                        }
                    </Select>
                </Form.Item>
            </Col>
            <Col flex={1}>
                <Form.Item label="Sex">
                    <Radio.Group 
                        optionType="button"
                        buttonStyle="solid"
                        options={options} 
                        onChange={(e:any) => setFilters((p:any) => {return {...p,sex:e.target.value}})} 
                        value={filters.sex} />
                </Form.Item>
            </Col>
            <Col flex={1}>
                <Form.Item label="Have photo">
                    <Switch                 
                        onChange={(value:any) => setFilters((p:any) => {return {...p,havePhoto:value}})} 
                        defaultChecked={filters.havePhoto} />
                </Form.Item>
            </Col>
            <Col flex={1}>               
                <Button onClick={(e:any) => {setInitialFilters()}} block > Reset</Button>
            </Col>
        </Row>
    </Card>
  )
}

export default PeopleFilters