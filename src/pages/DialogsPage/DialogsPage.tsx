
import { MoreOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Space, theme } from "antd";
import DialogList from "../../components/DialogList/DialogList";
import useMediaQuery from "../../hooks/useMediaQuery";
import './DialogsPage.scss';

const { useToken } = theme;

const DialogsPage = () => {
    
    const token = useToken();
    const xs = useMediaQuery('(max-width:576px)');
    return (
        <div  className='dialogs-page-container'>
            <Row className='dialogs-page-row' >
                <Col 
                    md={{span:12,offset:6}}
                    sm={{span:12,offset:6}}
                    xs={{span:24}} 
                    className='dialogs-col'>
                    
                    <Space.Compact block className={`dialogs-space ${xs ? 'xs-space-margin' : ''}`}>
                        <Input.Search 
                        enterButton={null}  
                        className='dialogs-search-bar-input' placeholder="Search" /> 
                        
                        <Button icon={<MoreOutlined/>} type={'link'}/>
                    </Space.Compact>
                   
                    <DialogList/>            
   
                </Col>
            </Row>
        </div>
    );
};

export default DialogsPage;

