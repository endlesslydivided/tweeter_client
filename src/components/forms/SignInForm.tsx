
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useSignInMutation} from '../../services/AuthApiSlice';
import {useDispatch} from 'react-redux';
import React, { Component } from "react";
import {Layout,Menu,Button,Row,Col,Typography,Form,Input,Switch,} from "antd";
import {DribbbleOutlined,TwitterOutlined,InstagramOutlined} from "@ant-design/icons";

interface SignInFormProps {

    animState:boolean,
    setAnimState:Function
}


const SignInForm: React.FC<SignInFormProps> = ({animState,setAnimState})  =>
{

    const [signIn, {isLoading, isError}] = useSignInMutation();

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    return (
        <React.Fragment>

                <Typography.Title style={{textAlign:'center'}} level={1}>Sign In</Typography.Title>

                <Typography.Title type='secondary' style={{textAlign:'center'}} level={5}>
                  Enter your email and password to sign in
                </Typography.Title>

                <Form layout="vertical" className="row-col">

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
                    <Switch defaultChecked />
                    Remember me
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                      SIGN IN
                    </Button>
                  </Form.Item>

                  <Typography.Paragraph type='secondary'>
                    Don't have an account?{" "}
                    <Link to="/signUp"  onClick={() => setAnimState(!animState)} >
                      Sign Up
                    </Link>
                  </Typography.Paragraph>

                </Form>

            </React.Fragment>
    )
}

export default SignInForm;