
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Form, Input, Row, Select, Space, Typography, Upload } from "antd";
import "./UserDataFormSection.scss"

interface UserDataFormSectionProps 
{

}

const UserDataFormSection: React.FC<UserDataFormSectionProps> = ({})  =>
{
    const [form] = Form.useForm();

    return (
            <Card className="user-data-form-card">
                <Space direction="vertical" size='small' >
                    <Typography.Title level={3}>Edit profile</Typography.Title>

                    <Typography.Text type='secondary'>
                        Enter and submit new data
                    </Typography.Text>

                    <Form name="basic" 
                    initialValues={{ remember: true }} 
                    className="user-data-settings-form"
                    layout='horizontal'
                    form={form}
                    labelAlign="left"
                    labelCol={{span: 4 }}
                    wrapperCol={{ span: 24 }}>

                        <Space direction="vertical" size="small" >


                            <Form.Item  name="Name"  label="Name" rules={[{required: true,message: "Please enter your name!" },]}>
                                <Input />
                            </Form.Item>

                            <Form.Item  name="Surname" label="Surname" rules={[{required: true,message: "Please enter your surname!" },]}> 
                                <Input  />
                            </Form.Item>

                            <Form.Item  name="Country"  label="Country" rules={[{required: true,message: "Please enter your country!" },]}>
                                <Input />
                            </Form.Item>

                            <Form.Item  name="City" label="City" rules={[{required: true,message: "Please enter your city!" },]}> 
                                <Input  />
                            </Form.Item>

                            <Form.Item rules={[{required: true,message: "Please enter your sex!" },]}  name="sex" label="Sex">
                                <Select>
                                    <Select.Option value="man">Man</Select.Option>
                                    <Select.Option value="woman">Woman</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item label="Edit your avatar" className="update-avatar-form">
                                <Row gutter={[10,10]}  className="row" >
                                    <Col>
                                        <Avatar size={120} shape="square" icon={<UserOutlined/>}/>
                                    </Col>
                                    <Col>
                                        <Avatar size={45} icon={<UserOutlined/>}/>
                                    </Col>
                                    <Col>
                                        <Avatar icon={<UserOutlined />} size={36} shape="square" />
                                    </Col>
                                    <Col>
                                        <Upload showUploadList={false}  maxCount={1} listType="picture-card">
                                            <div>
                                                <PlusOutlined />
                                                <div className="text">Upload</div>
                                            </div>
                                        </Upload>
                                    </Col>
                                </Row>
                            </Form.Item>

                            <Form.Item className="submit-form">
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>


                        </Space>
                    
                    
                    </Form>
                </Space>
            </Card>  
    )
}

export default UserDataFormSection