import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.css";
import Router from "next/router";
import axios from "axios";
import { baseUrl } from "../components/BaseUrl";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import ReactCodeInput from "react-code-input";
import Particle from "../components/Particle";
import withAuth from "../utils/withAuth";

const Main = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #edf8fc;
    padding: 24px;
    .l-t-r {
        direction: ltr;
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
    height: 352px;
    background: #ffffff;
    box-shadow: 0px 2px 8px rgba(50, 50, 50, 0.12);
    border-radius: 16px;
    margin-top: 32px;
    padding: 16px;
    h4 {
        font-weight: 600;
        font-size: 16px;
        margin-top: 30px;
        line-height: 20px;
        color: #323232;
    }
    label {
        display: flex;
        flex-direction: column;
        margin-bottom: 8px;
        margin-top: 80px;
        font-size: 16px;
        line-height: 23px;
    }
    .mt-60 {
    }
    input {
        margin-top: 8px;
        background-color: #edf8fc;
        width: 100%;
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
    }
`;

const Submit = styled.button`
    width: 188px;
    height: 38px;
    background: linear-gradient(90deg, #128cbd -1.72%, #3dbdc8 100%);
    border-radius: 32px;
    color: #fff;
    transition: 0.3s all;
    margin-top: 40px;
    :hover {
        opacity: 0.83;
    }
`;

 function ForgetPassword() {
    const [activeTab, setActiveTab] = useState("1");
    const [mobile, setMobile] = useState("09");
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState("");
    const subHandler = async (e) => {
        let data = {
            mobile: mobile,
        };
        let config = {
            method: "POST",
            url: `${baseUrl}token/password/`,
            data: data,
        };

        setLoading(true);
        await axios(config)
            .then((response) => {
                const {data} = response
                if (data.error === 0) {
                    setActiveTab("2");
                    toast.success(data.message)
                }
            })
            .catch((error) => {
                toast.error("شماره موبایل یا کلمه عبور اشتباه است",);
            })
            .finally(f=>setLoading(false))
    };
    const subHandlerTwo = (e) => {
        
        let data = new FormData();
        data.append("mobile", mobile);
        data.append("code", code);
        let config = {
            method: "POST",
            url: `${baseUrl}token/password/verify/`,
            data: data,
        };
        setLoading(true);
        axios(config)
            .then((response) => {
                const {data} = response
                if (data.error === 0) {
                    localStorage.setItem("mobile", mobile);
                    toast.success(data.message);
                    Router.push("/login");
                }else{
                    toast.error(data.message)
                }
            })
            .catch((error) => {
                toast.error("خطایی رخ داده است");
            })
            .finally(f=>setLoading(false))
    };
    const handlePinChange = (pinCode) => {
        setCode(pinCode);
    };
    return (
        <Main>
            <Head>
                {" "}
                <link rel="shortcut icon" href="/images/fav.png" />
                <title>صرافی بیت هولد | فراموشی رمز عبور</title>
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
                        <h4>فراموشی رمز عبور</h4>
                        {activeTab == "1" ? (
                            <>
                                <label htmlFor="name">
                                    شماره موبایل
                                    <input
                                        onChange={(e) => {
                                            setMobile(e.target.value);
                                        }}
                                        type="number"
                                        name="phone"
                                        id="phone"
                                        onKeyDown={(e) => {
                                            e.key === "Enter"
                                                ? subHandler()
                                                : "";
                                        }}
                                        dir="ltr"
                                        value={mobile}
                                    />
                                </label>
                                <div className="d-flex justify-content-center mt-3">
                                    <Submit onClick={subHandler} disabled={loading}>
                                        {loading ? (
                                            <div className="lds-ring">
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                            </div>
                                        ) : (
                                            "ادامه"
                                        )}
                                    </Submit>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="d-flex justify-content-center text-center">
                                    <label className="l-t-r">
                                        کد تایید
                                        <ReactCodeInput
                                            onChange={handlePinChange}
                                            type="number"
                                            fields={5}
                                            onKeyDown={(e) => {
                                                e.key === "Enter"
                                                    ? handlePinChange()
                                                    : "";
                                            }}
                                        />
                                    </label>
                                </div>
                                <div className="d-flex justify-content-center mt-3">
                                    <Submit onClick={subHandlerTwo} disabled={loading}>
                                        {loading ? (
                                            <div className="lds-ring">
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                            </div>
                                        ) : (
                                            "تغییر رمز"
                                        )}
                                    </Submit>
                                </div>
                            </>
                        )}
                    </Box>
                </LeftContent>
            </Content>
        </Main>
    );
}

export default withAuth(ForgetPassword, false)