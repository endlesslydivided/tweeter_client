
import { LockOutlined, PlusOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Form, Input, MenuProps, Row, Select, Space, Typography, Upload } from "antd";


interface UpdatePasswordSectionProps 
{

}

const UpdatePasswordSection: React.FC<UpdatePasswordSectionProps> = ({})  =>
{
    const [form] = Form.useForm();

    return (
            <Card>
                <Space direction="vertical" size='small' style={{width: '100%',justifySelf:'center'}}>
                    <Typography.Title level={3}>Update password</Typography.Title>

                    <Typography.Text type='secondary'>
                        Enter an old password, a new one and confirm your choice
                    </Typography.Text>

                    <Form name="basic" 
                    initialValues={{ remember: true }} 
                    className="password-settings"
                    layout='horizontal'
                    form={form}
                    labelAlign="left"
                    labelCol={{span: 6 }}
                    wrapperCol={{ span: 18 }}>

                        <Space direction="vertical" size="small" style={{display:'flex'}}>


                        <Form.Item  name="oldPassword" label={'Old password'}  rules={[{ required: true, message: "Please enter your old password!" },]}>
                            <Input.Password  type='password' />
                        </Form.Item>

                        <Form.Item  name="password"  label={'New password'} rules={[{ required: true, message: "Please enter your new password!" },]}>
                            <Input.Password  type='password' />
                        </Form.Item>

                        <Form.Item name="passwordCheck" label={'New password check'} rules={[{ required: true, message: "Please enter your new password again!" },]}>
                            <Input.Password  />
                        </Form.Item>

                            <Form.Item style={{justifyContent:'end',display:'flex'}}>
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

export default UpdatePasswordSection