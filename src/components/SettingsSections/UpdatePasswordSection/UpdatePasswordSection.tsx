
import { Button, Card, Form, Input, notification, Space, Typography } from "antd";
import { UploadChangeParam, UploadProps } from "antd/es/upload";
import { useUpdatePasswordMutation } from "../../../services/AuthApiSlice";


interface UpdatePasswordSectionProps 
{

}

const UpdatePasswordSection: React.FC<UpdatePasswordSectionProps> = ({})  =>
{
    const [form] = Form.useForm();

    const [updatePassword] = useUpdatePasswordMutation();

    const handleUpdatePassowrd: UploadProps['onChange'] = async (body: any) => {

        if(body.newPassword !== body.newPasswordCheck)
        {
            notification.error({message:'Password and password check fields aren`t equal',placement:'topRight',duration:2})
        }

        const result:any = await updatePassword({body});

        if(result.error)
        {
            notification.error({message:result.error.data.message,placement:'topRight',duration:2})
        }    
        else
        {
            notification.success({message:'Password is updated!',placement:'topRight',duration:2});
            form.resetFields();
        }
            
    };

    return (
        <Card>
            <Space direction="vertical" size='small' style={{width: '100%',justifySelf:'center'}}>
                
                <Typography.Title level={3}>Update password</Typography.Title>

                <Typography.Text type='secondary'>
                    Enter an old password, a new one and confirm your choice
                </Typography.Text>

                <Form name="basic" 
                onFinish={handleUpdatePassowrd}
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

                        <Form.Item  name="newPassword"  label={'New password'} rules={[{ required: true, message: "Please enter your new password!" },]}>
                            <Input.Password  type='password' />
                        </Form.Item>

                        <Form.Item name="newPasswordCheck" label={'New password check'} rules={[{ required: true, message: "Please enter your new password again!" },]}>
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