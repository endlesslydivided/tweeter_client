import { Card, Divider, List, Space, Typography } from "antd";
import React from "react";

interface TrendsSectionProps {

}


const TrendsSection: React.FC<TrendsSectionProps> = ({})  =>
{

    return (
        <Card className='trends-section-card'>
            <Card.Meta className="trends-section-card-meta" 
            title={<Typography.Text className="trends-section-card-title" strong>Trends for you</Typography.Text>}/>

            <Divider type="horizontal"style={{margin:'7.5px 0px'}}/>

            <List className="trends-section-card-list"
                split={false}
                dataSource={[
                    {tagWord:'programming',tweetCount:'123'},
                    {tagWord:'frontEnd',tweetCount:'46578'},
                    {tagWord:'development',tweetCount:'1243'},
                    {tagWord:'politics',tweetCount:'1213213'},
                ]}
                renderItem={(item) => (
                    <List.Item style={{margin:0}}>
                        <Space size={1} direction='vertical'>
                            <Typography.Title level={5}>#{item.tagWord}</Typography.Title> 
                            <Typography.Paragraph type='secondary'>{item.tweetCount} tweets</Typography.Paragraph> 
                        </Space>
                       
                    </List.Item>
                )}
            />


        </Card>
    )
}

export default TrendsSection;

