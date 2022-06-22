import Image from "next/image";
import { useEffect, useState, useCallback, useRef, useContext } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.css";
import Router, { useRouter } from "next/router";
import ReactCodeInput from "react-code-input";
import axios from "axios";
import { baseUrl } from "../components/BaseUrl";
import { toast } from "react-toastify";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";
import { loadFull } from "tsparticles";
import Particles from "react-tsparticles";
import Particle from "../components/Particle";

import UserContext from "../utils/state/userContext";
import withAuth from "../utils/withAuth";

const Main = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(191 226 239);
    padding: 24px;
`;

const Content = styled.div`
    .w-50 {
    }
    max-width: 1280px;
    display: flex;
    justify-content: center;
    width: 100%;
    margin-inline: auto;
    @media (max-width: 992px) {
        .w-50 {
            display: none !important;
        }
        justify-content: center;
    }
`;

const LeftContent = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    z-index: 1000;
`;

const Box = styled.div`
    width: 400px;
    height: 352px;
    background: #ffffff;
    box-shadow: 0px 2px 8px rgba(50, 50, 50, 0.12);
    border-radius: 16px;
    margin-top: 32px;
    padding: 16px;
    h4 {
        font-weight: 600;
        font-size: 14px;
        margin-top: 20px;
        line-height: 20px;
        color: #323232;
    }
    label {
        display: flex;
        flex-direction: column;
        margin-top: 36px;
        margin-bottom: 8px;
        font-size: 16px;
        line-height: 23px;
    }
    input {
        margin-top: 8px;
        background-color: rgb(191 226 239);
        width: 100%;
        height: 44px;
        border: 1.5px solid #dbdbdb;
        box-sizing: border-box;
        border-radius: 8px;
        padding: 10px;
    }
    .l-t-r {
        direction: ltr;
    }
    .resend {
        color: #2d3bfa;
    }
    @media (max-width: 992px) {
        width: 343px;
    }
`;

const BoxHead = styled.div`
    width: 163px;
    height: 34px;
    background-color: rgb(191 226 239);
    border-radius: 6px;
    padding: 4px;
    button {
        width: 75px;
        height: 100%;
    }
    .login {
        background: #108abb;
        color: #fff;
        border-radius: 10px 4px 4px 10px;
    }
    .register {
        background: #108abb;
        color: #fff;
        border-radius: 4px 10px 10px 4px;
    }
`; 

const Submit = styled.button`
    width: 188px;
    height: 38px;
    background: linear-gradient(90deg, #128cbd -1.72%, #3dbdc8 100%);
    border-radius: 32px;
    color: #fff;
    transition: 0.3s all;
    :hover {
        opacity: 0.83;
    }
`;

 function Register() {
    const {fetchProfile} = useContext(UserContext)
    const router = useRouter()
    const [activeTab, setActiveTab] = useState("log");
    const [counter, setCounter] = useState(60);
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const {mobile, action, id} = router.query
    const [authData, setAuthData] = useState({
        mobile: "", 
        action: "",
        id: "",
        signup_token: "",
        login_password: ""
    })

    useEffect(() => {
        setAuthData({
            mobile, action,
            id: localStorage.getItem("login_id"),
            login_password: localStorage.getItem("login_password"),
            signup_token: localStorage.getItem("signup_token"),
        })
    }, [mobile, action, id])

    useEffect(() => {
        const t = setTimeout(()=>{
            if(counter > 0) setCounter(counter - 1)
        }, 1000)

        return () => {
            clearTimeout(t)
        }
    }, [counter]);


    const subHandler = (e) => {
        if(code.length !== 5) {
            toast.error("کد ارسالی 5 رقمیست")
            return
        }
        const config = {
            method: "POST",
            url: new URL("token/verify/", baseUrl).href,
            data: {},
        };
        if(authData.action === "signup"){
            config.url = new URL( "token/register/verify/", baseUrl).href
            config.data = {mobile: authData.mobile, code}
        }else if(authData.action === 'login'){
            config.data = {
                id: authData.id,
                otp: code
            }
        }
        setLoading(true)
         axios(config)
            .then((response) => {
                if (response.data.access && response.data.access.length > 0) {
                    if(authData.action === "login"){
                        localStorage.setItem("token", response.data.access);
                        localStorage.setItem("refresh_token",response.data.refresh);
                        toast.success("ورود موفق")
                        if(fetchProfile) fetchProfile()
                        Router.push("/dashboard");
                    }else if(authData.action === "signup"){
                        toast.success("حساب شما با موفقیت ایجاد شد")
                        Router.push("/login")
                    }else{

                    }
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch((error) => {
                toast.error(" کد وارد شده اشتباه است");
            })
            .finally(f=>{
                setLoading(false)
            })
    }
    const resend = async (e) => {
        
        let config = {
            method: "POST",
            url: new URL('token/otp/resend/', baseUrl).href,
            data: {},
        };
        if(authData.action === 'signup') config.data = { token: authData.signup_token }
        else if (authData.action === "login"){
            config.url = new URL("token/otp/", baseUrl).href
            config.data = {
                mobile: authData.mobile,
                password: authData.login_password
            }
        }

        await axios(config)
            .then((response) => {
                const {data} = response
                if (data.error === 0) {
                    setCounter(60);
                    toast.success("ارسال شد")
                    if(authData.action === "signup"){
                        localStorage.removeItem('signup_token')
                        localStorage.setItem("signup_token", data.token)
                        authData.signup_token = data.token
                    }else if (authData.action === "login"){
                        localStorage.removeItem('login_id')
                        localStorage.setItem("login_id", data.id)
                        authData.id= data.id
                    }else{}
                } else {
                    toast.error(data.message);
                }
            })
            .catch((error) => {})
            .finally(f=>{
                setCode("")
            })
        }
    const handlePinChange = (pinCode) => {
        setCode(pinCode);
    };
    useEffect(() => {
        if (code.length > 4) {
            subHandler();
        }
    }, [code]);

    return (
        <Main>
           
            <Head>
                {" "}
                <link rel="shortcut icon" href="/images/fav.png" />
                <title>صرافی بیت هولد | کد تایید</title>
            </Head>
            <Content>
            <Particle/>
                <LeftContent>
                    <Image
                    onClick={() => {
                        Router.push("/");
                    }}
                        src="/images/mob-logo.svg"
                        width={153}
                        height={64}
                        alt="logo"
                    />
                    <Box>
                        <BoxHead>
                            <button
                                onClick={() => {
                                    setActiveTab("log");
                                    Router.push("/login");
                                }}
                                className={activeTab === "log" ? "login" : ""}
                                type="button"
                            >
                                ورود
                            </button>
                            <button
                                onClick={() => {
                                    setActiveTab("reg");
                                    Router.push("/register");
                                }}
                                className={
                                    activeTab === "reg" ? "register" : ""
                                }
                                type="button"
                            >
                                ثبت نام
                            </button>
                        </BoxHead>
                        <span className="mt-3 d-block fs-6">لطفا کد تایید ارسال شده را وارد نمایید</span>
                        <div className="d-flex justify-content-center text-center">
                            <label className="l-t-r">
                                کد تایید
                                <ReactCodeInput
                                    onChange={handlePinChange}
                                    type="number"
                                    fields={5}
                                    onKeyDown={(e) => {
                                        e.key === "Enter"
                                            ? handlePinChange
                                            : "";
                                    }}
                                />
                            </label>
                        </div>
                        {counter !== 0 ? (
                            <small className="text-center text-danger d-block">
                                ارسال دوباره کد تا
                                <span className="mx-2">{counter}</span>
                                ثانیه دیگر
                            </small>
                        ) : (
                            <small
                                onClick={resend}
                                className="resend text-center c-p d-block"
                            >
                                ارسال مجدد کد
                            </small>
                        )}
                        <div className="d-flex l-t-r justify-content-center mt-3">
                            <Submit onClick={subHandler} className="mt-4" disabled={code.length !== 5}>
                                تایید
                            </Submit>
                        </div>
                    </Box>
                </LeftContent>
            </Content>
        </Main>
    );
}
export default withAuth(Register, false)