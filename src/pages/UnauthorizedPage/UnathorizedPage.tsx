import { Col, Row } from "antd";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import SignInForm from "../../sections/unauthorizedSections/SignInForm";
import SignUpForm from "../../sections/unauthorizedSections/SignUpForm";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../../utils/consts";
import './UnauthorizedPage.scss'

const animatedBackground = require('../../assets/unauthorized_animation.gif')

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
                                    <Col md={{span:12}} xs={{span:0}} className='content-col'>
                                        <img className={'bg-image'} src={animatedBackground} />

                                    </Col>
                                    <Col md={{span:12}} xs={{span:24}} className='form-col'>
                                        <SignUpForm/>
                                    </Col>
                                </Row>

                            </div>
                            :
                            <div className='login'> 
                                <Row align='middle' justify='space-around'>
                                    <Col md={{span:12}} xs={{span:24}} className='form-col'>
                                        <SignInForm/>
                                    </Col>
                                    <Col md={{span:12}} xs={{span:0}} className='content-col'>
                                    <img  className={'bg-image'}src={animatedBackground} />

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

