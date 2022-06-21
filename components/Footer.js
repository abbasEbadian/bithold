import Image from "next/image";
import Router from "next/router";
import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Footers = styled.footer`
    max-width: 1120px;
    margin-top: 60px;
    margin-right: auto;
    margin-left: auto;
    background: #ffffff;
    border-radius: 8px;
    position: relative;
    display: flex;
    padding: 32px 24px;
    h5 {
        font-weight: 600;
        font-size: 16px;
        line-height: 20px;
        color: #323232;
    }
    p {
        font-weight: normal;
        font-size: 14px;
        line-height: 20px;
        text-align: right;
        color: #323232;
        max-width: 300px;
    }
    a {
        text-decoration: none;
        color: transparent;
    }
    .footer-col-2 {
        margin-right: 60px;
    }
    .footer-col-4 {
        margin-right: 60px;
    }
    input {
        width: 256px;
        height: 38px;
        margin-top: 8px;
        background: rgb(191 226 239);
        border-radius: 8px;
        padding: 16px;
        ::placeholder{
            direction: rtl !important;
        }
    }
    button {
        width: 102px;
        height: 24px;
        background: #108abb;
        border-radius: 32px;
        color: #fff;
        margin-top: 16px;
        transition: 0.3s all;
        :hover {
            background: #108bbbc5;
        }
    }
    @media (max-width: 1150px) {
        flex-direction: column;
        height: 100%;
        align-items: center;
        .res-mt {
            margin-top: 50px;
        }
    }
    @media (max-width: 650px) {
        .d-flex {
            flex-direction: column;
        }
        .footer-col-2,
        .footer-col-4 {
            margin-top: 30px;
            margin-right: 0;
        }
    }
`;

const Footer = () => {
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState("");
    const joinHandler = (e) => {
        if (email.length > 5 ) {
            toast.success("ضمن تشکر، ایمیل شما ثبت شد", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setSuccess(true);
        }
    };
    return (
        <Footers>
            <ToastContainer
                rtl={true}
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
            />
            <div className="d-flex">
                <div className="footer-col-1">
                    <Image
                        alt="logo"
                        src="/images/header-logo.png"
                        width={97}
                        height={40}
                    />
                    <h5>درباره ما</h5>
                    <p>
                        نام بیت هولد از ترکیب سه واژه (بیت) که مخفف بیتکوین و
                        (هولد) که به معنای نگه داری و (اکسچنج) به معنای مبادله
                        ساخته شده است. هدف ما فراهم نمودن بستری امن، سریع و آسان
                        جهت خرید و فروش مستقیم ارزهای دیجیتال بین خریدار و
                        فروشنده است.
                    </p>
                </div>
                <div className="footer-col-2 text-center">
                    <h5>دسترسی سریع</h5>
                    <div className="mt-4">راهنمای استفاده</div>
                    <div
                        className="mt-2 c-p"
                        onClick={() => {
                            Router.push("/contact_us");
                        }}
                    >
                        تماس با ما
                    </div>
                    <div
                        className="mt-2 c-p"
                        onClick={() => {
                            Router.push("/about_us");
                        }}
                    >
                        درباره ما
                    </div>
                </div>
            </div>
            <div className="d-flex res-mt">
                <div className="footer-col-2 text-center">
                    {!success ? (
                        <>
                            <h5>عضویت در خبرنامه</h5>
                            <label className="d-flex flex-column align-items-start">
                                آدرس ایمیل
                                <input
                                    type="email"
                                    placeholder="آدرس ایمیل خود را ثبت کنید"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </label>
                            <button onClick={joinHandler}>ثبت</button>
                        </>
                    ) : (
                        <span>ضمن تشکر، ایمیل شما ثبت شد</span>
                    )}
                </div>
                <div className="footer-col-4 text-center">
                    <h5>بیت هولد در شبکه های اجتماعی</h5>
                    <a
                        href="http://www.instagram.com/bithold.exchange"
                        target="blank"
                        className="d-flex align-items-center justify-content-between mt-5"
                    >
                        <span>بیت هولد در اینستاگرام</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20.684"
                            height="20.637"
                            viewBox="0 0 214.684 214.637"
                        >
                            <path
                                id="instagram"
                                d="M107.291,84.113a55.03,55.03,0,1,0,55.03,55.03A54.943,54.943,0,0,0,107.291,84.113Zm0,90.807a35.777,35.777,0,1,1,35.777-35.777,35.842,35.842,0,0,1-35.777,35.777Zm70.117-93.058a12.836,12.836,0,1,1-12.836-12.836A12.806,12.806,0,0,1,177.408,81.862Zm36.447,13.027c-.814-17.194-4.742-32.424-17.338-44.972-12.548-12.548-27.778-16.476-44.972-17.338-17.721-1.006-70.835-1.006-88.556,0-17.146.814-32.376,4.741-44.972,17.29S1.541,77.647.679,94.841c-1.006,17.721-1.006,70.835,0,88.556.814,17.194,4.741,32.424,17.338,44.972S45.8,244.845,62.989,245.707c17.721,1.006,70.835,1.006,88.556,0,17.194-.814,32.424-4.741,44.972-17.338,12.548-12.548,16.475-27.778,17.338-44.972,1.006-17.721,1.006-70.787,0-88.508ZM190.962,202.411a36.221,36.221,0,0,1-20.4,20.4c-14.129,5.6-47.654,4.31-63.268,4.31s-49.187,1.245-63.268-4.31a36.221,36.221,0,0,1-20.4-20.4c-5.6-14.129-4.31-47.654-4.31-63.268s-1.245-49.187,4.31-63.268a36.221,36.221,0,0,1,20.4-20.4c14.129-5.6,47.654-4.31,63.268-4.31s49.187-1.245,63.268,4.31a36.221,36.221,0,0,1,20.4,20.4c5.6,14.129,4.31,47.654,4.31,63.268S196.565,188.33,190.962,202.411Z"
                                transform="translate(0.075 -31.825)"
                            />
                        </svg>
                    </a>
                    <a
                        href="http://t.me/bithold.exchange"
                        target="blank"
                        className="d-flex align-items-center justify-content-between mt-2"
                    >
                        <span>بیت هولد در تلگرام</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20.554"
                            height="20.554"
                            viewBox="0 0 237.554 237.554"
                        >
                            <path
                                id="telegram"
                                d="M118.777,8A118.777,118.777,0,1,0,237.554,126.777,118.756,118.756,0,0,0,118.777,8Zm58.335,81.372-19.493,91.861c-1.437,6.514-5.316,8.094-10.728,5.029L117.2,164.374l-14.32,13.793c-1.58,1.58-2.922,2.922-5.987,2.922L99,150.868l55.03-49.714c2.395-2.107-.527-3.3-3.688-1.2L82.33,142.773l-29.311-9.148c-6.37-2.012-6.514-6.37,1.341-9.435L168.874,80.032C174.19,78.117,178.836,81.326,177.112,89.372Z"
                                transform="translate(0 -8)"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </Footers>
    );
};

export default Footer;
