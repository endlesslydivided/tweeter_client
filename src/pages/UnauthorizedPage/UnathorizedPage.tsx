import { Col, Row } from "antd";
import { useRef, useState } from "react";
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import SignInForm from "../../sections/unauthorizedSections/SignInForm";
import SignUpForm from "../../sections/unauthorizedSections/SignUpForm";
import './UnauthorizedPage.scss'

const UnathorizedPage = () => {
   
    const [mode, setMode] = useState("out-in");

    const [isLogin, setIsLogin]:any = useState(false);
    const loginRef:any = useRef(null);
    const registerRef:any = useRef(null);
    const nodeRef = isLogin ? loginRef : registerRef;


    return (
        <SwitchTransition>
            <CSSTransition  key={isLogin} nodeRef={nodeRef} addEndListener={(done:any) =>{
                nodeRef?.current?.addEventListener("transitionend", done, false);
            }} classNames="fade"
            >
                <div ref={nodeRef} className='auth-page-container'>
                    {
                        isLogin ?
                            <div className='register'>
                                <Row align='middle' justify='space-between'>
                                    <Col span={12} className='content-col'>
                                        <h1 >
                                            Tweeter
                                        </h1>
                                        <p >
                                            Some text
                                        </p>
                                    </Col>
                                    <Col span={12} className='form-col'>
                                        <SignUpForm animState={isLogin} setAnimState={setIsLogin}/>
                                    </Col>
                                </Row>

                            </div>
                            :
                            <div className='login'> 
                                <Row align='middle' justify='space-around'>
                                    <Col span={12} className='form-col'>
                                        <SignInForm animState={isLogin} setAnimState={setIsLogin}/>
                                    </Col>
                                    <Col span={12} className='content-col'>
                                        <h1 >
                                            Tweeter
                                        </h1>
                                        <p >
                                            Some text
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                    }
                </div>
            </CSSTransition>
        </SwitchTransition>
    );
};

export default UnathorizedPage;

