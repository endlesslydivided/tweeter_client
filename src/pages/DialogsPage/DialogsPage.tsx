
import { MoreOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, Row, Space, theme } from "antd";
import DialogList from "../../components/DialogList/DialogList";
import SideChatButtons from "../../components/SideChatButtons/SideChatButtons";
import WatchedDialogsList from "../../components/WatchedDialogsList/WatchedDialogsList";
import useMediaQuery from "../../hooks/useMediaQuery";
import './DialogsPage.scss';

const { useToken } = theme;

const DialogsPage = () => {
    
    const token = useToken();
    const xs = useMediaQuery('(max-width:576px)');
    return (
        <div  className='dialogs-page-container'>
            <Row className='dialogs-page-row' gutter={[20,10]} >
                <Col 
                    md={{span:12,offset:3}}
                    sm={{span:12}}
                    xs={{span:24}}
                    className='dialogs-col'>
                    
                    <Card className="dialogs-list-card">
                        <Space.Compact block className={`dialogs-space ${xs ? 'xs-space-margin' : ''}`}>
                            <Input.Search 
                            enterButton={null}  
                            className='dialogs-search-bar-input' placeholder="Search" /> 
                            
                            <Button icon={<MoreOutlined/>} type={'link'}/>
                        </Space.Compact>
                    
                        <DialogList/>          
                    </Card>
                   
   
                </Col>
                <Col md={{span:6}}
                    sm={{span:12}}
                    xs={{span:0}}  className='watched-dialogs-col'>
                    <div className='side-chat-menu'>
                        <SideChatButtons/>             
                        <WatchedDialogsList />     
                    </div>              
                </Col>
            </Row>
        </div>
    );
};

export default DialogsPage;

