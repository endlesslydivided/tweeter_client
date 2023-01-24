
import React, {useEffect} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useSignUpMutation} from '../../services/AuthApiSlice';
import {useDispatch} from 'react-redux';
import {setCredentials} from '../../store/reducers/AuthSlice';
import {Layout,Menu,Button,Row,Col,Typography,Form,Input,Switch, Card, Checkbox, Select, Divider, Space,} from "antd";
import {DribbbleOutlined,TwitterOutlined,InstagramOutlined} from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

interface SignUpFormProps {

    animState:boolean,
    setAnimState:Function
}


const SignUpForm: React.FC<SignUpFormProps> = ({animState,setAnimState})  =>
{
    const [form] = Form.useForm();


    const [singUp, {isLoading, isError}] = useSignUpMutation();

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    return (
        <React.Fragment>

              <Title style={{textAlign:'center'}} level={1}>Sign up</Title>

              <Title type='secondary' style={{textAlign:'center'}} level={5}>
              Enter your data to create an account
              </Title>

              <Form name="basic" initialValues={{ remember: true }} layout='vertical' form={form}>

                <Form.Item label="User data:"  style={{margin:'0'}}>
                  <Space direction="vertical" size="middle" style={{display:'flex'}}>

                    <Input.Group compact>

                      <Form.Item noStyle name="Name" rules={[{ required: true, message: "Please enter your name!" },]}>
                        <Input style={{ width: '50%' }} placeholder="Name" />
                      </Form.Item>

                      <Form.Item  noStyle name="Surname" rules={[{ required: true, message: "Please enter your surname!" },]}> 
                        <Input style={{ width: '50%' }} placeholder="Surname" />
                      </Form.Item>

                    </Input.Group>

                    <Input.Group compact>

                      <Form.Item noStyle name="Country" rules={[{ required: true, message: "Please enter your county!" },]}>
                        <Input style={{ width: '50%' }} placeholder="Country" />
                      </Form.Item>

                      <Form.Item  noStyle name="City" rules={[{ required: true, message: "Please enter your city!" },]}> 
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

                    <Form.Item noStyle name="Email" rules={[{ required: true, message: "Please enter your email!" },]}>
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
                  <Button style={{ width: "100%" }} type="primary" htmlType="submit">
                    SIGN UP
                  </Button>
                </Form.Item>
              </Form>
              <Typography.Paragraph type='secondary'>Already have an account?{" "}<Link to="/signIn" onClick={() => setAnimState(!animState)}>Sign In</Link></Typography.Paragraph>
        </React.Fragment>
    )
}

export default SignUpForm;