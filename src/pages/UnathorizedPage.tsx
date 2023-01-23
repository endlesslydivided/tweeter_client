import { useEffect, useRef, useState } from "react";
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
                <>
                    {
                        isLogin ?
                            <div className="register" style={{display: 'flex', width: "100%"}}>
                                <>
                                    <h1 >
                                        Tweeter
                                    </h1>
                                    <p >
                                        Some text
                                    </p>
                                </>
                                <SignUpForm animState={isLogin} setAnimState={setIsLogin}/>
                            </div>
                            :
                            <div className="login" style={{display: 'flex', width: "100%"}}>
                                <SignInForm animState={isLogin} setAnimState={setIsLogin}/>
                                <>
                                    <h1 >
                                        Tweeter
                                    </h1>
                                    <p >
                                        Some text
                                    </p>
                                </>
                            </div>
                    }
                </>

            </CSSTransition>
        </SwitchTransition>
    );
};

export default UnathorizedPage;

