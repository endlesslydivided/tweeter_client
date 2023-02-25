
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { Button, Form, Input, notification, Select, Space, Typography } from "antd";
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useNotify } from "../../hooks/useNotify";
import { useSignUpMutation } from '../../services/AuthApiSlice';
import { LOGIN_ROUTE } from "../../utils/consts";

const { Title } = Typography;
const { Option } = Select;

interface SignUpFormProps {

}

 
const SignUpForm: React.FC<SignUpFormProps> = ({})  =>
{
    const [form] = Form.useForm();

    const [singUp, result] = useSignUpMutation(); 

    const navigate = useNavigate();

    useNotify(result,'User successfully registered! Go to your email account to verify', () => navigate((`${LOGIN_ROUTE}`)));

    const submitHandler = (values:any) =>
    {
      singUp(values);
    }

    return (
        <React.Fragment>

              <Title style={{textAlign:'center'}} level={1}>Sign up</Title>

              <Typography.Text style={{textAlign:'center'}} type='secondary'>
                Enter your data to create an account
              </Typography.Text>

              <Form 
              onFinish={submitHandler} 
              name="basic" 
              initialValues={{ remember: true }} 
              layout='vertical' 
              form={form}>

                <Form.Item label="User data:"  style={{margin:'0'}}>
                  <Space direction="vertical" size="middle" style={{display:'flex'}}>

                    <Input.Group compact>

                      <Form.Item noStyle name="firstname" rules={[{ required: true, message: "Please enter your name!" },]}>
                        <Input style={{ width: '50%' }} placeholder="Firstname" />
                      </Form.Item>

                      <Form.Item  noStyle name="surname" rules={[{ required: true, message: "Please enter your surname!" },]}> 
                        <Input style={{ width: '50%' }} placeholder="Surname" />
                      </Form.Item>

                    </Input.Group>

                    <Input.Group compact>

                      <Form.Item noStyle name="country" rules={[{ required: true, message: "Please enter your country!" },]}>
                        <Input style={{ width: '50%' }} placeholder="Country" />
                      </Form.Item>

                      <Form.Item  noStyle name="city" rules={[{ required: true, message: "Please enter your city!" },]}> 
                        <Input style={{ width: '50%' }} placeholder="City" />
                      </Form.Item>

                    </Input.Group>

                    <Form.Item name="sex">
                      <Select placeholder="Select your sex" allowClear>
                        <Option value="man">Man</Option>
                        <Option value="woman">Woman</Option>
                      </Select>
                    </Form.Item>

                  </Space>
                </Form.Item>

                <Form.Item label="Credentials:" style={{margin:'0'}}>

                  <Space direction="vertical" size="middle" style={{display:'flex'}}>

                    <Form.Item noStyle name="email" rules={[{ required: true, message: "Please enter your email!" },]}>
                      <Input placeholder="Email" />
                    </Form.Item>

                    <Form.Item noStyle name="password" rules={[{ required: true, message: "Please enter your password!" },]}>
                      <Input.Password placeholder="Password" type='password' />
                    </Form.Item>

                    <Form.Item name="passwordCheck" rules={[{ required: true, message: "Please enter your password again!" },]}>
                      <Input.Password placeholder="Password check" />
                    </Form.Item>

                  </Space>
                </Form.Item>
               
                <Form.Item>
                  <Button style={{ width: "100%" }} loading={result.isLoading}   type="primary" htmlType="submit">
                    SIGN UP
                  </Button>
                </Form.Item>
              </Form>
              <Typography.Paragraph type='secondary'>
                Already have an account?{" "}
                <Link to="/signIn">
                  Sign In
                </Link>
              </Typography.Paragraph>
        </React.Fragment>
    )
}

export default SignUpForm;