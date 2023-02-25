
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useSignInMutation} from '../../services/AuthApiSlice';
import {useDispatch} from 'react-redux';
import React, { Component } from "react";
import {Layout,Menu,Button,Row,Col,Typography,Form,Input,Switch, Space,} from "antd";
import {DribbbleOutlined,TwitterOutlined,InstagramOutlined} from "@ant-design/icons";
import { REGISTRATION_ROUTE } from '../../utils/consts';
import { useNotify } from '../../hooks/useNotify';
import Fingerprint2 from 'fingerprintjs2'
import { setCredentials } from '../../store/reducers/AuthSlice';


interface SignInFormProps {

}


const SignInForm: React.FC<SignInFormProps> = ({})  =>
{

    const [signIn, result] = useSignInMutation();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useNotify(result,undefined,() => {navigate('/')});

    const submitHandler = (values:object) =>
    {
      Fingerprint2.getV18( async (fingerprint, components) => {
        const userData = await signIn({...values,fingerprint}).unwrap();
        dispatch(setCredentials({...userData}));
      }) 
    }

    return (
        <React.Fragment>

                <Typography.Title style={{textAlign:'center'}} level={1}>Sign In</Typography.Title>

                <Typography.Title type='secondary' style={{textAlign:'center'}} level={5}>
                  Enter your email and password to sign in
                </Typography.Title>

                <Form layout="vertical" className="row-col" onFinish={submitHandler}>

                  <Form.Item label="Email" name="email" rules={[
                    {  
                        required: true,  
                        message: "Please input your email!",
                    }]}>
                    <Input placeholder="Email" />
                  </Form.Item>

                  <Form.Item label="Password" name="password" rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },]}>
                    <Input placeholder="Password" />
                  </Form.Item>

                  <Form.Item name="remember" className="aligin-center" valuePropName="checked">
                    <Space><Switch defaultChecked/>
                    
                    Remember me</Space>
                    
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={result.isLoading} style={{ width: "100%" }}>
                      SIGN IN
                    </Button>
                  </Form.Item>

                  <Typography.Paragraph type='secondary'>
                    Don't have an account?{" "}
                    <Link to="/signUp">
                      Sign Up
                    </Link>
                  </Typography.Paragraph>

                </Form>

            </React.Fragment>
    )
}

export default SignInForm;

