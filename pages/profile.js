import Router from "next/router";
import { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { baseUrl } from "../components/BaseUrl";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "bootstrap/dist/css/bootstrap.css";
import Image from "next/image";
import axios from "axios";
import NightModeContext from "../components/Context";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import Particle from "../components/Particle";
import UserContext from "../utils/state/userContext";
const Content = styled.div`
    overflow: hidden;
    transition: 0.1s all;
    background-color: #edf8fc;
    width: 100%;
    min-height: 100vh;
    padding-bottom: 70px;
    .loading {
        position: relative;
        img {
            position: absolute;
        }
    }
    .lds-ring {
        display: inline-block;
        position: absolute;
        width: 20px;
        height: 20px;
        left: 59% !important;
        top: -45px !important;
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
    @media (max-width: 1300px) {
        .mx-1200 {
            flex-wrap: wrap;
        }
        .y-inv {
            margin-right: 0;
        }
    }

    @media (max-width: 992px) {
        .mx-1200 {
            flex-wrap: wrap;
            flex-direction: column;
            align-items: center;
        }
        .y-inv {
            margin-right: 0;
        }
        .lds-ring {
            left: 61% !important;
        }
    }
    @media (max-width: 786px) {
    }
    .scrollable {
        max-height: 450px !important;
        overflow-y: auto !important;
        overflow-x: hidden;
        tbody tr {
            width: 336px;
        }
        ::-webkit-scrollbar {
            width: 5px;
            height: 9px;
        }
        ::-webkit-scrollbar-thumb {
            background-color: #00293957;
            border-radius: 20px;
            width: 5px;
        }
    }
`;
const ProfMain = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 70px 32px;
    overflow: hidden;
    @media (max-width: 1250px) {
        padding-top: 16px;
    }
    .bg-dark-2 label div {
        color: #fff !important;
    }
`;
const RightBox = styled.div`
    width: 289px;
    height: 283px;
    background-color: #fff;
    box-shadow: 0px 2px 8px rgba(50, 50, 50, 0.12);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    padding: 24px;
    svg {
        margin-left: 6px;
    }
    .slide-bck-center {
        animation: right-animate 1s ease infinite alternate;
    }
    @keyframes right-animate {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(1.1);
        }
    }

    .auth-btn {
        margin-top: 24px;
        width: 130px;
        margin-right: auto;
        margin-left: auto;
        height: 40px;
        border-radius: 8px;
    }
    .edit-prof {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
        span {
            font-size: 16px;
            font-weight: 700;
        }
    }
    .setting {
        display: flex;
        align-items: center;
        padding-bottom: 13px;
        padding-top: 13px;
        border-bottom: 1px solid #eee;
        span {
            color: #777777;
        }
    }
    @media (max-width: 1250px) {
        margin-bottom: 50px;
        margin-top: 0;
    }
`;
const LeftBox = styled.div`
    width: 711px;
    padding: 32px;
    background-color: #fff;
    box-shadow: 0px 2px 8px rgba(50, 50, 50, 0.12);
    border-radius: 16px;
    position: relative;
    .img-prof {
        position: absolute;
        top: -69px;
        left: 316px;
        border-radius: 50%;
        cursor: pointer;
    }
    label {
        display: block;
        margin-right: 8px;
    }
    .edit-prof-svg {
        position: absolute;
        top: -69px;
        left: 370px;
        fill: #fff;
    }
    .w-162 {
        width: 160px;
    }
    @media (max-width: 1250px) {
        margin-top: 20px;
        .img-prof {
            left: 44%;
        }
        .edit-prof-svg {
            left: 52%;
        }
    }
    @media (max-width: 786px) {
        width: 328px !important;
        padding: 16px;
        label {
            width: 100%;
            margin-right: 0;
        }
        .img-prof {
            left: 40%;
        }
        .edit-prof-svg {
            left: 56%;
        }
    }
`;
const Alert = styled.div`
    width: 473px;
    height: 52px;
    background: #f6543e;
    border-radius: 8px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 14px 10px;
    font-size: 13px;
    color: #fff;
    svg {
        margin-left: 5px;
    }
    @media (max-width: 786px) {
        width: 298px !important;
        padding: 4px;
        margin-top: 40px;
    }
`;
const Success = styled.div`
    width: 473px;
    height: 52px;
    background: #018f41;
    border-radius: 8px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 14px 10px;
    font-size: 13px;
    color: #fff;
    text-align: center;
    svg {
        margin-left: 5px;
    }
    @media (max-width: 786px) {
        width: 298px !important;
        padding: 4px;
        margin-top: 40px;
    }
`;

const Inp = styled.input`
    background: #ffffff;
    border: 1.5px solid #dbdbdb;
    border-radius: 8px;
    height: 44px;
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 20px;
    width: 210px;
    margin-left: 8px;
    @media (max-width: 786px) {
        width: 100% !important;
    }
`;

const SubBtn = styled.button`
    width: 228px;
    height: 39px;
    background: linear-gradient(90deg, #128cbd -1.72%, #3dbdc8 100%);
    border-radius: 32px;
    margin-right: auto !important;
    margin-left: auto !important;
    color: #fff;
`;

export default function Profile() {
    const [profile, setProfile] = useState(null);
    const [img, setImg] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const stts = useContext(NightModeContext);
    const {user, authenticated} = useContext(UserContext);

    const [showMenu, setShowMenu] = useState(false);

    const menuHandler = () => {
        setShowMenu(!showMenu);
    }

    useEffect(()=>{
        if(authenticated) setImg(user.avatar)
    }, [user])

    const profileChange = (e) => {
        let data = new FormData();
        data.append("file", e);
        setLoading(true);
        let config = {
            headers: {"Content-Type": "multipart/form-data"},
            method: "POST",
            url: `${baseUrl}account/avatar/`,
            data: data,
        };
        axios(config)
            .then((response) => {
                setLoading(false);
                toast.success(response.data.message);
                changed();
            })
            .catch((error) => {
                setLoading(false);

                toast.error("خطایی وجود دارد");
                changed();
            });
    };

    const otpHandler = (e) => {
        let config2 = {
            headers: {"Content-type": "application/json" },
            method: "GET",
            url: `${baseUrl}account/verify/phone/`,
        };
        axios(config2)
            .then((response) => {})
            .catch((error) => {
                toast.error("خطایی وجود دارد", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    };
    return (
        <>
            <Head>
                {" "}
                <link rel="shortcut icon" href="/images/fav.png" />
                <title> صرافی بیت هولد | پروفایل</title>
            </Head>
            <div className="max-w-1992">
                <Sidebar show-menu={menuHandler} active="5" show={showMenu} />
                
                <Content
                    className={
                        showMenu
                            ? stts.night == "true"
                                ? "pr-176 bg-dark-2"
                                : "pr-176 "
                            : stts.night == "true"
                            ? "bg-dark-2"
                            : ""
                    }
                >
                    <Header show-menu={menuHandler} />
                    <ProfMain>
                        <Particle/>
                        <RightBox
                            className={stts.night == "true" ? "bg-gray" : ""}
                        >
                            <div className="edit-prof d-flex align-items-center">
                                <div className="d-flex align-items-center">
                                    <svg
                                        className={
                                            stts.night == "true"
                                                ? "svg-white"
                                                : ""
                                        }
                                        width="32"
                                        height="32"
                                        viewBox="0 0 32 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M7.05732 20.8253L20.8253 7.05733C21.3453 6.53733 22.1893 6.53733 22.7093 7.05733L24.944 9.29199C25.464 9.81199 25.464 10.656 24.944 11.176L11.1747 24.9427C10.9253 25.1933 10.5867 25.3333 10.2333 25.3333H6.66666V21.7667C6.66666 21.4133 6.80666 21.0747 7.05732 20.8253Z"
                                            stroke="#323232"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M18.3333 9.54666L22.4533 13.6667"
                                            stroke="#323232"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <span>ویرایش پروفایل</span>
                                </div>
                                <svg
                                    className={
                                        stts.night == "true" ? "svg-white" : ""
                                    }
                                    width="8"
                                    height="14"
                                    viewBox="0 0 8 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M6.66666 1.66667L1.33333 7.00001L6.66666 12.3333"
                                        stroke="#323232"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <div
                                className="setting c-p"
                                onClick={() => {
                                    Router.push("/cards");
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="16"
                                    viewBox="0 0 20 16"
                                    fill="#777777"
                                >
                                    <path
                                        id="ic_credit_card_24px"
                                        d="M20,4H4A1.985,1.985,0,0,0,2.01,6L2,18a1.993,1.993,0,0,0,2,2H20a1.993,1.993,0,0,0,2-2V6A1.993,1.993,0,0,0,20,4Zm0,14H4V12H20ZM20,8H4V6H20Z"
                                        transform="translate(-2 -4)"
                                    />
                                </svg>

                                <span>کارت های بانکی</span>
                            </div>
                            <div
                                className="setting c-p"
                                onClick={() => {
                                    Router.push("/change_password");
                                }}
                            >
                                <svg
                                    width="34"
                                    height="34"
                                    viewBox="0 0 34 34"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M14.512 16.8199C14.5847 16.8926 14.6065 17.002 14.5671 17.097C14.5278 17.192 14.4351 17.254 14.3322 17.254C14.2294 17.254 14.1367 17.192 14.0973 17.097C14.058 17.002 14.0797 16.8926 14.1524 16.8199C14.2518 16.7209 14.4126 16.7209 14.512 16.8199"
                                        stroke="#777777"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M15.6661 23.6694H6.32891C5.62131 23.6696 4.94264 23.3886 4.44229 22.8883C3.94194 22.3879 3.66094 21.7093 3.66113 21.0017V12.9983C3.66094 12.2907 3.94194 11.6121 4.44229 11.1117C4.94264 10.6114 5.62131 10.3304 6.32891 10.3306H15.6661"
                                        stroke="#777777"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M9.17647 16.8199C9.24919 16.8926 9.27094 17.002 9.23159 17.097C9.19223 17.192 9.09952 17.254 8.99669 17.254C8.89385 17.254 8.80114 17.192 8.76179 17.097C8.72243 17.002 8.74419 16.8926 8.81691 16.8199C8.9163 16.7209 9.07708 16.7209 9.17647 16.8199"
                                        stroke="#777777"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <rect
                                        x="19.6678"
                                        y="14.9992"
                                        width="10.6711"
                                        height="8.67028"
                                        rx="1.65"
                                        stroke="#777777"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M21.7079 14.9992V12.2922C21.7079 10.4721 23.1833 8.99667 25.0033 8.99667V8.99667C25.8774 8.99667 26.7156 9.34387 27.3336 9.96189C27.9516 10.5799 28.2988 11.4181 28.2988 12.2922V12.2922V15.0217"
                                        stroke="#777777"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>

                                <span>امنیت</span>
                            </div>
                            {user.rank == "unverified" ? (
                                <button
                                    onClick={() => {
                                        Router.push("/auth");
                                    }}
                                    className="auth-btn slide-bck-center btn-warning"
                                >
                                    احراز هویت
                                </button>
                            ) : user.is_phone_accepted ? (
                                ""
                            ) : (
                                <button
                                    onClick={() => {
                                        otpHandler();
                                        Router.push("/phone_otp");
                                    }}
                                    className="auth-btn slide-bck-center btn-warning"
                                >
                                    تایید شماره ثابت
                                </button>
                            )}
                        </RightBox>
                        <LeftBox
                            className={stts.night == "true" ? "bg-gray" : ""}
                        >
                            <label htmlFor="file">
                                {img !== null ? (
                                    <div className="position-relative">
                                        {!loading ? (
                                            <img
                                                className="img-prof"
                                                src={img}
                                                width={78}
                                                height={78}
                                                alt="profile"
                                            />
                                        ) : (
                                            <div className="loading">
                                                <img
                                                    className="img-prof"
                                                    src={img}
                                                    width={78}
                                                    height={78}
                                                    alt="profile"
                                                />
                                                <div className="lds-ring">
                                                    <div></div>
                                                    <div></div>
                                                    <div></div>
                                                    <div></div>
                                                </div>
                                            </div>
                                        )}

                                        <svg
                                            className={
                                                stts.night == "true"
                                                    ? "svg-white edit-prof-svg"
                                                    : " edit-prof-svg"
                                            }
                                            width="32"
                                            height="32"
                                            viewBox="0 0 32 32"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M7.05732 20.8253L20.8253 7.05733C21.3453 6.53733 22.1893 6.53733 22.7093 7.05733L24.944 9.29199C25.464 9.81199 25.464 10.656 24.944 11.176L11.1747 24.9427C10.9253 25.1933 10.5867 25.3333 10.2333 25.3333H6.66666V21.7667C6.66666 21.4133 6.80666 21.0747 7.05732 20.8253Z"
                                                stroke="#323232"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M18.3333 9.54666L22.4533 13.6667"
                                                stroke="#323232"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                ) : (
                                    <div className="position-relative">
                                        <img
                                            className="img-prof"
                                            src="/images/prof-img.png"
                                            width={78}
                                            height={78}
                                            alt="profile"
                                        />
                                        <svg
                                            className={
                                                stts.night == "true"
                                                    ? "svg-white edit-prof-svg"
                                                    : " edit-prof-svg"
                                            }
                                            width="32"
                                            height="32"
                                            viewBox="0 0 32 32"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M7.05732 20.8253L20.8253 7.05733C21.3453 6.53733 22.1893 6.53733 22.7093 7.05733L24.944 9.29199C25.464 9.81199 25.464 10.656 24.944 11.176L11.1747 24.9427C10.9253 25.1933 10.5867 25.3333 10.2333 25.3333H6.66666V21.7667C6.66666 21.4133 6.80666 21.0747 7.05732 20.8253Z"
                                                stroke="#323232"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M18.3333 9.54666L22.4533 13.6667"
                                                stroke="#323232"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </label>

                            <input
                                type="file"
                                className="d-none"
                                id="file"
                                onChange={(e) => {
                                    profileChange(e.target.files["0"]);
                                }}
                            />
                            {user.rank == "unverified" ? (
                                <Alert>
                                    <svg
                                        width="25"
                                        height="24"
                                        viewBox="0 0 25 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <rect
                                            width="24"
                                            height="24"
                                            transform="matrix(-1 0 0 1 24.5 0)"
                                            fill="white"
                                            fillOpacity="0.01"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M13.438 4.967C12.922 3.993 12.08 3.989 11.562 4.967L4.438 18.425C3.922 19.399 4.393 20.196 5.495 20.196H19.505C20.607 20.196 21.08 19.403 20.562 18.425L13.438 4.967ZM13.2071 14.7071C13.0196 14.8946 12.7652 15 12.5 15C12.2348 15 11.9804 14.8946 11.7929 14.7071C11.6054 14.5196 11.5 14.2652 11.5 14V9C11.5 8.73478 11.6054 8.48043 11.7929 8.29289C11.9804 8.10536 12.2348 8 12.5 8C12.7652 8 13.0196 8.10536 13.2071 8.29289C13.3946 8.48043 13.5 8.73478 13.5 9V14C13.5 14.2652 13.3946 14.5196 13.2071 14.7071ZM13.2071 17.7071C13.0196 17.8946 12.7652 18 12.5 18C12.2348 18 11.9804 17.8946 11.7929 17.7071C11.6054 17.5196 11.5 17.2652 11.5 17C11.5 16.7348 11.6054 16.4804 11.7929 16.2929C11.9804 16.1054 12.2348 16 12.5 16C12.7652 16 13.0196 16.1054 13.2071 16.2929C13.3946 16.4804 13.5 16.7348 13.5 17C13.5 17.2652 13.3946 17.5196 13.2071 17.7071Z"
                                            fill="white"
                                        />
                                    </svg>
                                    جهت احراز هویت اطلاعات حساب کاربری خود را
                                    همراه با مدارک بارگذاری کنید.
                                </Alert>
                            ) : (
                                <Success>اکانت شما تایید شده است .</Success>
                            )}
                            <div className="d-flex flex-wrap justify-content-center">
                                <label>
                                    <div>نام و نام خانوادگی</div>
                                    <Inp
                                        value={
                                            user.first_name +
                                            " " +
                                            user.last_name
                                        }
                                        disabled
                                    />
                                </label>
                                <label>
                                    <div>نام پدر</div>
                                    <Inp
                                        value={
                                            user.father_name
                                                ? user.father_name
                                                : ""
                                        }
                                        disabled
                                        className="w-162"
                                    />
                                </label>
                                <label>
                                    <div>شماره همراه</div>
                                    <Inp
                                        value={user.mobile ? user.mobile : ""}
                                        disabled
                                        type="number"
                                    />
                                </label>
                                <label>
                                    <div>کد ملی</div>
                                    <Inp
                                        value={
                                            user.personal_data !== undefined
                                                ? user.personal_data
                                                      .birth_certificate_id
                                                : ""
                                        }
                                        disabled
                                    />
                                </label>
                                <label>
                                    <div>شماره ثابت</div>
                                    <Inp
                                        value={
                                            user.personal_data !== undefined
                                                ? user.personal_data.address
                                                      .phone
                                                : ""
                                        }
                                        disabled
                                        className="w-162"
                                        type="number"
                                    />
                                </label>
                                <label>
                                    <div>کد پستی</div>
                                    <Inp
                                        value={
                                            user.personal_data !== undefined
                                                ? user.personal_data.address
                                                      .post_code
                                                : ""
                                        }
                                        disabled
                                    />
                                </label>
                            </div>

                            <label>
                                <div>آدرس</div>
                                <Inp
                                    disabled
                                    className="w-100"
                                    value={
                                        user.personal_data !== undefined
                                            ? user.address
                                            : ""
                                    }
                                />
                            </label>
                            <div className="w-100 d-flex justify-content-center mt-3">
                                <button
                                    className="btn btn-warning px-5"
                                    onClick={() => {
                                        Router.push("/edit");
                                    }}
                                >
                                    اصلاح
                                </button>
                            </div>
                        </LeftBox>
                    </ProfMain>
                </Content>
            </div>
        </>
    );
}
