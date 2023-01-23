
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useSignInMutation} from '../../services/AuthApiSlice';
import {useDispatch} from 'react-redux';
import React, { Component } from "react";
import {Layout,Menu,Button,Row,Col,Typography,Form,Input,Switch,} from "antd";
import {DribbbleOutlined,TwitterOutlined,InstagramOutlined} from "@ant-design/icons";

const { Title } = Typography;

interface AppRouterProps {

    animState:boolean,
    setAnimState:Function
}


const SignInForm: React.FC<AppRouterProps> = ({animState,setAnimState})  =>
{

    const [signIn, {isLoading, isError}] = useSignInMutation();

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    return (
        <Row gutter={[24, 0]} justify="space-around">
              <Col xs={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 2 }} md={{ span: 12 }}>

                <Title className="mb-15">Sign In</Title>

                <Title className="font-regular text-muted" level={5}>
                  Enter your email and password to sign in
                </Title>

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

                  <p className="font-semibold text-muted">
                    Don't have an account?{" "}
                    <Link to="/singUp"  onClick={() => setAnimState(!animState)} className="text-dark font-bold">
                      Sign Up
                    </Link>
                  </p>

                </Form>
              </Col>

              <Col style={{ padding: 12 }} xs={{ span: 24 }} lg={{ span: 12 }} md={{ span: 12 }}>
              </Col>

            </Row>
    )
}

export default SignInForm;