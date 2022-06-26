import Image from "next/image";
import React, { useCallback, useEffect, useState, useRef} from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.css";
import Router, { useRouter } from "next/router";
import axios from "axios";
import { baseUrl } from "../components/BaseUrl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import Link from "next/link";

import PasswordFieldErrors from "../components/Auth/PasswordFieldErrors";
import Particle from "../components/Particle";
import withAuth from "../utils/withAuth";

const Main = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(191 226 239);
    padding: 24px;
    
    
    @media (max-width: 992px) {
        margin-block: 64px;
    }
`;

const Content = styled.div`
    .w-50 {
    }
    max-width: 1280px;
    display: flex;
    justify-content: center;
    width: 100%;
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
`;

const Box = styled.div`
    width: 400px;
    background: #ffffff;
    box-shadow: 0px 2px 8px rgba(50, 50, 50, 0.12);
    border-radius: 16px;
    margin-top: 32px;
    z-index: 1;
    padding: 16px;
    h4 {
        font-weight: 600;
        font-size: 14px;
        margin-top: 20px;
        line-height: 20px;
        color: #323232;
    }
    @media (max-width: 992px) {
        h4 {
            font-size: 13px;
            margin-top: 20px;
            line-height: 0px;
        }
        input {
            margin-top: 3px !important;
            height: 36px !important;
        }
    .mt-992-20{
        margin-top: 30px !important;
    }
    }
    label {
        display: flex;
        flex-direction: column;
        margin-bottom: 8px;
        @media (max-width: 992px) {
            margin-top: 5px;
            margin-bottom: 0px;
            .show-pass {
                position: absolute;
                right: 14px;
                opacity: 0.4;
                top: 37px !important;
                cursor: pointer;
            }
        }
        font-size: 16px;
        position: relative;
        line-height: 23px;
        .show-pass {
            position: absolute;
            right: 14px;
            opacity: 0.4;
            top: 45px;
            cursor: pointer;
        }
        .ltr {
            direction: ltr;
        }
    }
    input {
        margin-top: 8px;
        background-color: rgb(191 226 239);
        width: 176px;
        height: 44px;
        border: 1.5px solid #dbdbdb;
        box-sizing: border-box;
        border-radius: 8px;
        padding: 10px;
    }
    .lds-ring {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
    }
    .lds-ring div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 24px;
        height: 24px;
        margin: 8px;
        margin-right: 30px;
        border: 3px solid #fff;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: #fff transparent transparent transparent;
    }
    .lds-ring div:nth-child(1) {
        animation-delay: -0.45s;
    }
    .lds-ring div:nth-child(2) {
        animation-delay: -0.3s;
    }
    .lds-ring div:nth-child(3) {
        animation-delay: -0.15s;
    }
    @keyframes lds-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    @media (max-width: 992px) {
        width: 343px;
        height: 100% !important;
        .to-col {
            .me-3 {
                margin-right: 0 !important;
            }
            flex-direction: column;
            input {
                width: 100% !important;
            }
        }
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
    const [activeTab, setActiveTab] = useState("reg");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [password1, setPassword1] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [code, setCode] = useState();
    const [passwordInvalid, setPasswordInvalid] = useState()
    const [accepted, setAccepted] = useState()
    const router = useRouter()
    const {referral} = router.query 
    
    useEffect(() => {
        if(referral) setCode(referral)
    }, [referral])

    useEffect(() => {
        setCode(
            window.location.href.substring(
                window.location.href.indexOf("=") + 1
            )
        );
    }, []);
    const subHandler = async (e) => {
        let data = {
            first_name: firstName,
            last_name: lastName,
            mobile: mobile,
            password: password,
            ref_code: code,
            ref_mobile: code,
        };

        let config = {
            method: "POST",
            url: `${baseUrl}token/register/`,
            data,
        };
        if(password !== password1){
            toast.error("رمز عبور یکسان نیست!")
            return;
        }

        setLoading(true);
        axios(config)
        .then((response) => {
            if (response.data.error === 0) {
                localStorage.setItem("signup_token", response.data?.token)
                Router.push(`/verifycode?action=signup&mobile=${mobile}`);
                setLoading(false);
            } else {
                toast.error(response.data.message);
                setLoading(false);
            }
        })
        .catch((error) => {
            setLoading(false);
            toast.error("خطا در ارتباط");
        })
        .finally(f=>{
            setLoading(false)
        })
    };
   
    return (
        <Main>
            <Head>
                {" "}
                <link rel="shortcut icon" href="/images/fav.png" />
                <title>صرافی بیت هولد | ثبت نام</title>
            </Head>
            <Content>
                <LeftContent>
                    <Particle/>
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
                                }}
                                className={
                                    activeTab === "reg" ? "register" : ""
                                }
                                type="button"
                            >
                                ثبت نام
                            </button>
                        </BoxHead>
                        {/* <h4>ثبت نام کاربر</h4> */}
                        <div className="d-flex mt-3 to-col">
                            <label htmlFor="name">
                                <span>نام</span>
                                <input
                                    onChange={(e) => {
                                        setFirstName(e.target.value);
                                    }}
                                    type="text"
                                    name="name"
                                    id="name"
                                    onKeyDown={(e) => {
                                        e.key === "Enter" ? subHandler() : "";
                                    }}
                                />
                            </label>
                            <label className="me-3" htmlFor="family">
                                <span>نام خانوادگی</span>
                                <input
                                    onChange={(e) => {
                                        setLastName(e.target.value);
                                    }}
                                    type="text"
                                    name="family"
                                    id="family"
                                    onKeyDown={(e) => {
                                        e.key === "Enter" ? subHandler() : "";
                                    }}
                                />
                            </label>
                        </div>
                        <div className="d-flex to-col">
                            <label htmlFor="name">
                                <span>شماره موبایل</span>
                                <input
                                    className="ltr"
                                    onChange={(e) => {
                                        setMobile(e.target.value);
                                    }}
                                    type="number"
                                    name="username"
                                    id="phone"
                                    autoComplete="username"
                                    onKeyDown={(e) => {
                                        e.key === "Enter" ? subHandler() : "";
                                    }}
                                />
                            </label>
                            
                            <label htmlFor="name" className="me-3">
                                <span>
                                    کد دعوت{" "}
                                    <small className="me-0">(اختیاری)</small>
                                </span>
                                <input
                                    className="ltr"
                                    onChange={(e) => {
                                        setCode(e.target.value);
                                    }}
                                    value={code}
                                    type="number"
                                    autoComplete="organization"
                                    onKeyDown={(e) => {
                                        e.key === "Enter" ? subHandler() : "";
                                    }}
                                />
                            </label>
                        </div>
                        <div>
                            <label className="" htmlFor="password">
                                    <span>رمز عبور</span>
                                    <input
                                        className="ltr w-100"
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                        value={password}
                                        type={!showPassword ? "password" : "text"}
                                        name="password"
                                        id="password"
                                        onKeyDown={(e) => {
                                            e.key === "Enter" ? subHandler() : "";
                                        }}
                                    />
                                    
                                    <i onClick={() => {
                                            setShowPassword(!showPassword);
                                        }} className={'show-pass bi bi-eye' + (showPassword? '-slash':'') + '-fill'} />
                            </label>
                           <PasswordFieldErrors text={password} setIsInValid={setPasswordInvalid}/>


                            <label className="" htmlFor="password">
                                    <span>تکرار رمز عبور</span>
                                    <input
                                        className="ltr w-100"
                                        onChange={(e) => {
                                            setPassword1(e.target.value);
                                        }}
                                        value={password1}
                                        type={!showPassword1 ? "password" : "text"}
                                        name="password"
                                        id="password"
                                        onKeyDown={(e) => {
                                            e.key === "Enter" ? subHandler() : "";
                                        }}
                                        
                                    />
                                    <i onClick={() => {
                                            setShowPassword1(!showPassword1);
                                        }} className={'show-pass  bi bi-eye' + (showPassword1? '-slash':'')+ '-fill'} />
                                    
                            </label>
                        </div>
                        <div className="d-flex w-100">
                           
                            <input type="checkbox" value={accepted} onChange={e=>setAccepted(e.target.checked)} style={{width: 14, height: 14}}></input>
                            <label className="d-flex flex-row align-items-center pt-1"  style={{fontSize: 13}}>
                                <Link href="/our_rules"><a className="mx-2" target={"_blank"}>قوانین وبسایت </a></Link>
                                 را  می پذیرم.
                            </label>
                        </div>
                        <div className="d-flex justify-content-center mt-5 mt-992-20">
                            <Submit onClick={subHandler} disabled={passwordInvalid || password1.length ===0 || !accepted || loading}>
                                {loading ? (
                                    <div className="lds-ring">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                ) : (
                                    "ثبت نام"
                                )}
                            </Submit>
                        </div>
                    </Box>
                </LeftContent>
            </Content>
        </Main>
    );
}
export default withAuth(Register, false)