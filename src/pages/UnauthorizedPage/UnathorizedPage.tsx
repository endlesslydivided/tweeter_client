import { Col, Row } from "antd";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import SignInForm from "../../sections/unauthorizedSections/SignInForm";
import SignUpForm from "../../sections/unauthorizedSections/SignUpForm";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../../utils/consts";
import './UnauthorizedPage.scss'

const UnathorizedPage = () => {
   
    const location = useLocation();
    const loginRef:any = useRef(null);
    const registerRef:any = useRef(null);
    const nodeRef = location.pathname ===`${REGISTRATION_ROUTE}` ? registerRef: loginRef;

    return (
        <SwitchTransition>
            <CSSTransition  key={location.pathname} nodeRef={nodeRef} addEndListener={(done:any) =>
            {
                nodeRef?.current?.addEventListener("transitionend", done, false);
            }} classNames="fade"
            >
                <div ref={nodeRef} className='auth-page-container'>
                    {
                        location.pathname ===`${REGISTRATION_ROUTE}` ?
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
                                        <SignUpForm/>
                                    </Col>
                                </Row>

                            </div>
                            :
                            <div className='login'> 
                                <Row align='middle' justify='space-around'>
                                    <Col span={12} className='form-col'>
                                        <SignInForm/>
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

