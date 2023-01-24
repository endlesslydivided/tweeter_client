import { Col, Grid, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {CSSTransition, SwitchTransition} from 'react-transition-group';
import SignInForm from "../components/forms/SignInForm";
import SignUpForm from "../components/forms/SignUpForm";

const UnathorizedPage = () => {
   
    const [mode, setMode] = useState("out-in");

    const [isLogin, setIsLogin]:any = useState(false);
    const loginRef:any = useRef(null);
    const registerRef:any = useRef(null);
    const nodeRef = isLogin ? loginRef : registerRef;


    return (
        <SwitchTransition>
            <CSSTransition key={isLogin} nodeRef={nodeRef} addEndListener={(done:any) =>{
                nodeRef?.current?.addEventListener("transitionend", done, false);
            }} classNames="fade"
            >
                <div ref={nodeRef} className={"auth-page-content"}>
                    {
                        isLogin ?
                            <div className="register ">
                                <Row align="middle" justify="space-between">
                                    <Col span={12} className="content-col">
                                        <h1 >
                                            Tweeter
                                        </h1>
                                        <p >
                                            Some text
                                        </p>
                                    </Col>
                                    <Col span={12} className="form-col">
                                        <SignUpForm animState={isLogin} setAnimState={setIsLogin}/>
                                    </Col>
                                </Row>

                            </div>
                            :
                            <div className="login"> 
                                <Row align="middle" justify="space-around">
                                    <Col span={12} className="form-col">
                                        <SignInForm animState={isLogin} setAnimState={setIsLogin}/>
                                    </Col>
                                    <Col span={12} className="content-col">
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

