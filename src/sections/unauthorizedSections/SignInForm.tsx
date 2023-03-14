
import { Button, Form, Input, Space, Switch, Typography } from "antd";
import Fingerprint2 from 'fingerprintjs2';
import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { useNotify } from '../../hooks/useNotify';
import { useGetMeQuery, useLazyGetMeQuery, useSignInMutation } from '../../services/AuthApiSlice';
import { setCredentials } from '../../store/slices/AuthSlice';


interface SignInFormProps {

}


const SignInForm: React.FC<SignInFormProps> = ({})  =>
{

    const [signIn, result] = useSignInMutation();
    const [getMe, getMeResult] = useLazyGetMeQuery();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useNotify(result,undefined,() => {navigate('/')});

    const submitHandler = (values:object) =>
    {
      Fingerprint2.getV18( async (fingerprint, components) => {
        await signIn({...values,fingerprint});
        await getMe();
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

