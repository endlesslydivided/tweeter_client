
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Form, Image, Input, notification, Row, Select, Space, Typography, Upload, UploadProps } from "antd";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../hooks/redux";
import { useUpdateMainPhotoMutation, useUpdateMeMutation, useUpdateProfilePhotoMutation } from "../../../services/UsersApiSlice";
import { updateCurrentUser } from "../../../store/slices/AuthSlice";
import UpdateMainPhotoForm from "./UpdateMainPhotoForm";
import UpdateProfilePhotoForm from "./UpdateProfilePhotoForm";
import "./UserDataFormSection.scss";


interface UserDataFormSectionProps 
{

}


const UserDataFormSection: React.FC<UserDataFormSectionProps> = ({})  =>
{
    const [form] = Form.useForm();
    
    const user:any = useAppSelector((state:any) => state.auth?.user);
    const dispatch = useDispatch();
    const [updateMe] = useUpdateMeMutation();

    const onUpdateUserSubmit= async (e:any) =>  
	{
        const result:any = await updateMe({body:e});

        if(result.data)
        {
            dispatch(updateCurrentUser({...user,...result.data}));
            notification.success({message:'Profile photo is updated!',placement:'topRight',duration:2})
        }
        else if(result.error)
		{
			notification.error({message:result.error.message,placement:'topRight',duration:2})
		}      
	};


    useEffect(()=>
    {
        form.setFieldsValue(user);
    },[user])

    return (
    <Card className="user-data-form-card">
        <Space direction="vertical" size='small' >
            <Typography.Title level={3}>Edit profile</Typography.Title>

            <Typography.Text type='secondary'>
                Enter and submit new data
            </Typography.Text>

            <Form name="basic" 
            onFinish={onUpdateUserSubmit}
            initialValues={{ remember: true }} 
            className="user-data-settings-form"
            layout='horizontal'
            form={form}
            labelAlign="left"
            labelCol={{span: 4 }}
            wrapperCol={{ span: 24 }}>

                <Space direction="vertical" size="small" >
                    <Form.Item   name="firstname"  label="Name" rules={[{required: true,message: "Please enter your name!" },]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item  name="surname" label="Surname" rules={[{required: true,message: "Please enter your surname!" },]}> 
                        <Input/>
                    </Form.Item>

                    <Form.Item  name="country"  label="Country" rules={[{required: true,message: "Please enter your country!" },]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item  name="city" label="City" rules={[{required: true,message: "Please enter your city!" },]}> 
                        <Input/>
                    </Form.Item>

                    <Form.Item rules={[{required: true,message: "Please enter your sex!" },]}  name="sex" label="Sex">
                        <Select>
                            <Select.Option value="man">Man</Select.Option>
                            <Select.Option value="woman">Woman</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item  name="description" label="Description" rules={[{required: false},]}> 
                        <Input.TextArea/>
                    </Form.Item>

                    <Form.Item label="Edit your photos" className="update-avatar-form">
                        <UpdateMainPhotoForm/>
                        <UpdateProfilePhotoForm/>                        
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