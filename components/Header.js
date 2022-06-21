import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Router from "next/router";
import NightModeContext from "./Context";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { baseUrl } from "./BaseUrl";
import axios from "axios";
import UserContext from "../utils/state/userContext";
const HeaderMain = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 64px;
    background-color: #002939;
    color: #fff;
    position:relative;
    @media (max-width: 550px) {
        border-radius: 0 0 8px 8px;
    }
    .h-to-0 {
        height: 0 !important;
        overflow: hidden !important;
        padding: 0 !important;
    }
    .mob-out {
        margin-top: 8px;
        margin-left: 5px;
        svg path {
            stroke: #aaaaaa76;
        }
    }
`;

const HeaderRight = styled.div`
    display: flex;
    align-items: center;
    padding-right: 20px;
    font-weight: 600;
    font-size: 20px;
    line-height: 29px;
    span {
        margin-right: 10px;
    }
    @media (max-width: 550px) {
        span {
            font-size: 14px;
        }
        svg {
            width: 26px;
        }
        padding-right: 10px;
    }
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    padding-left: 30px;
    label {
        border: 1px solid #edf8fc60;
        box-sizing: border-box;
        border-radius: 61px;
        width: 88px;
        height: 32px;
        position: relative;
        display: flex;
        align-items: center;
        cursor: pointer;
        margin-left: 16px;
    }
    .white-circle {
        background-color: #fff;
        border-radius: 50%;
        width: 26px;
        height: 26px;
        position: absolute;
        top: 3px;
        right: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.1s all;
    }
    .dark-circle {
        background-color: #0a0c0f;
        border-radius: 50%;
        width: 26px;
        height: 26px;
        position: absolute;
        top: 3px;
        left: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.1s all;
    }
    .circle-none {
        background-color: transparent;
        svg path {
            fill: #4f5e7b;
        }
    }
    .items {
        display: flex;
        .circle {
            margin-right: 8px;
            position: relative;

            width: 32px;
            height: 32px;
            border-radius: 50%;
            border: 1px solid rgba(255, 255, 255, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    .boxes {
        transition: 0.5s all;

        position: absolute;
        width: 200px;
        height: 250px;
        border-radius: 10px;
        background-color: #4f5e7b;
        left: 0px;
        padding: 10px;
        z-index: 10;
        top: 36px;
        font-size: 10px;
        div {
            margin-top: 8px;
        }
        .read-btn {
            background-color: #4fde7b;
            height: 30px;
            border-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        overflow: auto;
    }
    input {
        display: none;
    }

    @media (max-width: 550px) {
        display: none;
    }
`;

const HeaderLeftMob = styled.div`
    .items {
        display: flex;
        .circle {
            margin-right: 8px;
            position: relative;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            border: 1px solid rgba(255, 255, 255, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    z-index: 2 !important;

    .boxes {
        transition: 0.5s all;

        position: absolute;
        width: 200px;
        height: 250px;
        border-radius: 10px;
        background-color: #4f5e7b;
        left: 0px;
        padding: 10px;
        z-index: 99999999999 !important;
        top: 36px;
        font-size: 10px;
        div {
            margin-top: 8px;
        }
        .read-btn {
            background-color: #4fde7b;
            height: 30px;
            border-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        overflow: auto;
    }
    input {
        display: none;
    }

    @media (max-width: 550px) {
        display: none;
    }
    display: none;
    input {
        display: none;
    }
    label {
        border: 1px solid #edf8fc60;
        box-sizing: border-box;
        border-radius: 61px;
        width: 48px;
        height: 22px;
        position: relative;
        display: flex;
        align-items: center;
        cursor: pointer;
        margin-left: 4px;
        margin-top: 10px;
    }
    .white-circle {
        background-color: #fff;
        border-radius: 50%;
        width: 16px;
        height: 16px;
        position: absolute;
        top: 2px;
        right: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.1s all;
    }
    .dark-circle {
        background-color: #0a0c0f;
        border-radius: 50%;
        width: 16px;
        height: 16px;
        position: absolute;
        top: 2px;
        left: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.1s all;
    }
    .circle-none {
        background-color: transparent;
        svg path {
            fill: #4f5e7b;
        }
    }
    .items {
        display: flex;
        .circle {
            margin-right: 8px;
            position: relative;

            width: 32px;
            height: 32px;
            border-radius: 50%;
            border: 1px solid rgba(255, 255, 255, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    @media (max-width: 550px) {
        z-index: 1;
        display: flex;
        margin-left: 10px;
    }
`;

const Badge = styled.div`
    width: 15px;
    height: 15px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #108abb;
    border: 1px solid #ededed;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    position: absolute;
    left: 0;
    top: 0;
    font-size: 11px;
    padding-top: 3px;
`;

const Header = (props) => {
    const [notifs, setNotifs] = useState([]);
    const [showNotifBox, setShowNotifBox] = useState(false);
    const stts = useContext(NightModeContext);
    const user = useContext(UserContext);

    let isCheck = "";
    if (typeof window !== "undefined") {
        isCheck = localStorage.getItem("night");
        stts.setStatus(isCheck);
    }
    const [check, setCheck] = useState(false);
    const handleOnChange = (e) => {
        setCheck(!check);
        localStorage.setItem("night", e.target.checked);
    };
    const logOutHandler = (e) => {
        localStorage.removeItem("token");
        Router.push("/login");
    };

    useEffect(() => {
        setTimeout(() => {
            let config = {
                headers: {
                    "Content-type": "application/json"
                },
                url: `${baseUrl}notification/unread_list/`,
                method: "GET",
            };
            axios(config)
                .then((res) => {
                    if (res.status == "200") {
                        setNotifs(res.data);
                    }
                })
                .catch((error) => {});
        }, 2200);
    }, []);
    const readAllHandler = (e) => {
        let config = {
            headers: {
                "Content-type": "application/json"
            },
            method: "POST",
            url: `${baseUrl}notification/readAll/`,
        };

        axios(config)
            .then((response) => {
                toast.success(response.data.message)
            })
            .catch((error) => {});
    };
    return (
        <HeaderMain className={isCheck == "true" ? "bg-gray" : ""}>
            <HeaderRight>
                <svg
                    className="c-p"
                    onClick={props["show-menu"]}
                    width="40"
                    height="40"
                    viewBox="0 0 34 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M8.3302 17H25.6703"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M8.3302 22.3356H25.6703"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M8.32974 11.6645H25.6698"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <span>داشبورد</span>
            </HeaderRight>
            <HeaderLeft>
                <label>
                    <input onChange={handleOnChange} type="checkbox" />
                    <div
                        className={
                            isCheck == "false"
                                ? "white-circle "
                                : "white-circle circle-none"
                        }
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.3845 4.94951C9.66392 4.22698 8.68691 3.81863 7.66649 3.81351C7.16049 3.81141 6.65921 3.91087 6.19234 4.106C5.72547 4.30113 5.3025 4.58796 4.94849 4.94951C4.41224 5.48831 4.04735 6.17369 3.89975 6.9194C3.75215 7.6651 3.82842 8.4378 4.11898 9.14025C4.40954 9.84271 4.90139 10.4435 5.53264 10.8671C6.16389 11.2906 6.90632 11.518 7.66649 11.5205C8.17249 11.5226 8.67377 11.4232 9.14064 11.228C9.60751 11.0329 10.0305 10.7461 10.3845 10.3845C11.107 9.66394 11.5154 8.68693 11.5205 7.66651C11.5225 7.16068 11.4229 6.65958 11.2278 6.1929C11.0327 5.72621 10.7459 5.30341 10.3845 4.94951Z"
                                fill="url(#paint0_linear_117_5320)"
                            />
                            <path
                                d="M7.66649 2.6165C7.80546 2.61394 7.93802 2.55759 8.0363 2.45931C8.13458 2.36103 8.19093 2.22847 8.1935 2.0895V0.5275C8.1935 0.387598 8.13791 0.253427 8.03899 0.154501C7.94006 0.0555757 7.8059 0 7.666 0C7.5261 0 7.39192 0.0555757 7.293 0.154501C7.19407 0.253427 7.13849 0.387598 7.13849 0.5275V2.0895C7.14106 2.22864 7.19756 2.36134 7.29605 2.45965C7.39455 2.55796 7.52735 2.61419 7.66649 2.6165V2.6165Z"
                                fill="url(#paint1_linear_117_5320)"
                            />
                            <path
                                d="M11.9855 4.0995L13.1035 2.9815C13.2003 2.8847 13.2547 2.7534 13.2547 2.6165C13.2547 2.4796 13.2003 2.3483 13.1035 2.2515C13.0067 2.1547 12.8754 2.10031 12.7385 2.10031C12.6016 2.10031 12.4703 2.1547 12.3735 2.2515L11.2585 3.3665C11.2106 3.41443 11.1725 3.47134 11.1466 3.53397C11.1207 3.59659 11.1073 3.66372 11.1073 3.7315C11.1073 3.79929 11.1207 3.86641 11.1466 3.92904C11.1725 3.99167 11.2106 4.04857 11.2585 4.0965C11.3064 4.14443 11.3633 4.18246 11.4259 4.2084C11.4886 4.23434 11.5557 4.24769 11.6235 4.24769C11.6913 4.24769 11.7584 4.23434 11.821 4.2084C11.8836 4.18246 11.9405 4.14443 11.9885 4.0965L11.9855 4.0995Z"
                                fill="url(#paint2_linear_117_5320)"
                            />
                            <path
                                d="M14.8055 7.1395H13.2435C13.1036 7.1395 12.9694 7.19507 12.8705 7.29399C12.7716 7.39292 12.716 7.52709 12.716 7.66699C12.716 7.80689 12.7716 7.94107 12.8705 8.03999C12.9694 8.13892 13.1036 8.19449 13.2435 8.19449H14.8055C14.9454 8.19449 15.0796 8.13892 15.1785 8.03999C15.2774 7.94107 15.333 7.80689 15.333 7.66699C15.333 7.52709 15.2774 7.39292 15.1785 7.29399C15.0796 7.19507 14.9454 7.1395 14.8055 7.1395V7.1395Z"
                                fill="url(#paint3_linear_117_5320)"
                            />
                            <path
                                d="M11.9655 11.2355C11.8687 11.1387 11.7374 11.0843 11.6005 11.0843C11.4636 11.0843 11.3323 11.1387 11.2355 11.2355C11.1387 11.3323 11.0843 11.4636 11.0843 11.6005C11.0843 11.7374 11.1387 11.8687 11.2355 11.9655L12.3505 13.0805C12.4473 13.1773 12.5786 13.2317 12.7155 13.2317C12.8524 13.2317 12.9837 13.1773 13.0805 13.0805C13.1773 12.9837 13.2317 12.8524 13.2317 12.7155C13.2317 12.5786 13.1773 12.4473 13.0805 12.3505L11.9655 11.2355Z"
                                fill="url(#paint4_linear_117_5320)"
                            />
                            <path
                                d="M7.66649 12.7165C7.52752 12.7191 7.39497 12.7754 7.29669 12.8737C7.19841 12.972 7.14206 13.1045 7.1395 13.2435V14.8055C7.1395 14.9454 7.19507 15.0796 7.29399 15.1785C7.39292 15.2774 7.52709 15.333 7.66699 15.333C7.80689 15.333 7.94107 15.2774 8.03999 15.1785C8.13892 15.0796 8.19449 14.9454 8.19449 14.8055V13.2435C8.19192 13.1043 8.13544 12.9716 8.03694 12.8733C7.93845 12.775 7.80563 12.7188 7.66649 12.7165V12.7165Z"
                                fill="url(#paint5_linear_117_5320)"
                            />
                            <path
                                d="M3.34651 11.2355L2.23151 12.3505C2.13471 12.4473 2.08032 12.5786 2.08032 12.7155C2.08032 12.8524 2.13471 12.9837 2.23151 13.0805C2.32831 13.1773 2.45961 13.2317 2.59651 13.2317C2.73341 13.2317 2.86471 13.1773 2.96151 13.0805L4.07951 11.9655C4.17631 11.8687 4.2307 11.7374 4.2307 11.6005C4.2307 11.4636 4.17631 11.3323 4.07951 11.2355C3.98271 11.1387 3.85141 11.0843 3.71451 11.0843C3.57761 11.0843 3.44631 11.1387 3.34951 11.2355H3.34651Z"
                                fill="url(#paint6_linear_117_5320)"
                            />
                            <path
                                d="M2.6165 7.66649C2.61394 7.52752 2.55759 7.39497 2.45931 7.29669C2.36103 7.19841 2.22847 7.14206 2.0895 7.1395H0.5275C0.387598 7.1395 0.253427 7.19507 0.154501 7.29399C0.0555757 7.39292 0 7.52709 0 7.66699C0 7.80689 0.0555757 7.94107 0.154501 8.03999C0.253427 8.13892 0.387598 8.19449 0.5275 8.19449H2.0895C2.22864 8.19192 2.36134 8.13544 2.45965 8.03694C2.55796 7.93845 2.61419 7.80563 2.6165 7.66649V7.66649Z"
                                fill="url(#paint7_linear_117_5320)"
                            />
                            <path
                                d="M3.34651 4.09949C3.44331 4.1963 3.57461 4.25068 3.71151 4.25068C3.84841 4.25068 3.97971 4.1963 4.07651 4.09949C4.17332 4.00269 4.2277 3.87139 4.2277 3.73449C4.2277 3.59759 4.17332 3.46629 4.07651 3.36949L2.96151 2.25449C2.86471 2.15769 2.73341 2.1033 2.59651 2.1033C2.45961 2.1033 2.32831 2.15769 2.23151 2.25449C2.13471 2.35129 2.08032 2.48259 2.08032 2.61949C2.08032 2.75639 2.13471 2.88769 2.23151 2.98449L3.34651 4.09949Z"
                                fill="url(#paint8_linear_117_5320)"
                            />
                            <defs>
                                <linearGradient
                                    id="paint0_linear_117_5320"
                                    x1="3.69376"
                                    y1="7.25389"
                                    x2="11.5205"
                                    y2="7.25389"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="#128CBD" />
                                    <stop offset="1" stopColor="#3DBDC8" />
                                </linearGradient>
                                <linearGradient
                                    id="paint1_linear_117_5320"
                                    x1="7.1203"
                                    y1="1.168"
                                    x2="8.1935"
                                    y2="1.168"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="#128CBD" />
                                    <stop offset="1" stopColor="#3DBDC8" />
                                </linearGradient>
                                <linearGradient
                                    id="paint2_linear_117_5320"
                                    x1="11.0703"
                                    y1="3.05889"
                                    x2="13.2547"
                                    y2="3.05889"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="#128CBD" />
                                    <stop offset="1" stopColor="#3DBDC8" />
                                </linearGradient>
                                <linearGradient
                                    id="paint3_linear_117_5320"
                                    x1="12.6709"
                                    y1="7.61044"
                                    x2="15.333"
                                    y2="7.61044"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="#128CBD" />
                                    <stop offset="1" stopColor="#3DBDC8" />
                                </linearGradient>
                                <linearGradient
                                    id="paint4_linear_117_5320"
                                    x1="11.0473"
                                    y1="12.0429"
                                    x2="13.2317"
                                    y2="12.0429"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="#128CBD" />
                                    <stop offset="1" stopColor="#3DBDC8" />
                                </linearGradient>
                                <linearGradient
                                    id="paint5_linear_117_5320"
                                    x1="7.12131"
                                    y1="13.8845"
                                    x2="8.19449"
                                    y2="13.8845"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="#128CBD" />
                                    <stop offset="1" stopColor="#3DBDC8" />
                                </linearGradient>
                                <linearGradient
                                    id="paint6_linear_117_5320"
                                    x1="2.04325"
                                    y1="12.0429"
                                    x2="4.2307"
                                    y2="12.0429"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="#128CBD" />
                                    <stop offset="1" stopColor="#3DBDC8" />
                                </linearGradient>
                                <linearGradient
                                    id="paint7_linear_117_5320"
                                    x1="-0.045112"
                                    y1="7.61044"
                                    x2="2.6165"
                                    y2="7.61044"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="#128CBD" />
                                    <stop offset="1" stopColor="#3DBDC8" />
                                </linearGradient>
                                <linearGradient
                                    id="paint8_linear_117_5320"
                                    x1="2.0433"
                                    y1="3.06189"
                                    x2="4.2277"
                                    y2="3.06189"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="#128CBD" />
                                    <stop offset="1" stopColor="#3DBDC8" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div
                        className={
                            isCheck == "true"
                                ? "dark-circle "
                                : "dark-circle circle-none"
                        }
                    >
                        <svg
                            width="12"
                            height="13"
                            viewBox="0 0 12 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6 12.0009C7.124 12.0127 8.22756 11.7 9.17828 11.1003C10.129 10.5006 10.8865 9.63934 11.36 8.61985C10.7512 8.88541 10.092 9.01541 9.428 9.00085C8.178 8.99953 6.9796 8.50231 6.09581 7.61834C5.21202 6.73436 4.71506 5.53585 4.714 4.28585C4.72687 3.42133 4.96897 2.57571 5.41557 1.83536C5.86217 1.09501 6.49727 0.486457 7.256 0.0718537C6.83951 0.0187825 6.41981 -0.00494263 6 0.000853724C4.4087 0.000853724 2.88258 0.632995 1.75736 1.75821C0.632141 2.88343 0 4.40955 0 6.00085C0 7.59215 0.632141 9.11828 1.75736 10.2435C2.88258 11.3687 4.4087 12.0009 6 12.0009Z"
                                fill="url(#paint0_linear_144_4793)"
                            />
                            <defs>
                                <linearGradient
                                    id="paint0_linear_144_4793"
                                    x1="-0.195862"
                                    y1="5.35729"
                                    x2="11.36"
                                    y2="5.35729"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="#128CBD" />
                                    <stop offset="1" stopColor="#3DBDC8" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </label>

                <div className="items">
                    <div
                        onClick={() => {
                            Router.push("/profile");
                        }}
                        className="circle c-p "
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle
                                cx="12"
                                cy="12"
                                r="9.00375"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M16.0017 16.0016C15.8853 15.7089 15.7048 15.446 15.4734 15.2323V15.2323C15.0836 14.8699 14.5711 14.6684 14.0388 14.6681H9.96214C9.42958 14.6684 8.91681 14.87 8.52654 15.2323V15.2323C8.29569 15.4465 8.11527 15.7093 7.99832 16.0016"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <circle
                                cx="12"
                                cy="10.2493"
                                r="2.25094"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <div
                        className="circle c-p position-relative "
                        onClick={(e) => {
                            setShowNotifBox(!showNotifBox);
                        }}
                    >
                        <svg
                            width="18"
                            height="21"
                            viewBox="0 0 18 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M16.162 6.18299L17.304 5.84199C16.665 3.70333 15.2498 1.88073 13.336 0.731995L12.721 1.75299C14.3805 2.74872 15.6078 4.32879 16.162 6.18299Z"
                                fill="white"
                            />
                            <path
                                d="M4.74499 1.75699L4.12999 0.735992C2.21621 1.88473 0.800935 3.70733 0.161987 5.84599L1.30399 6.18299C1.85821 4.32878 3.08553 2.74872 4.74499 1.75299V1.75699Z"
                                fill="white"
                            />
                            <path
                                d="M2.17401 8.39999V14.791C2.17449 14.9802 2.13744 15.1675 2.06501 15.3423C1.99257 15.517 1.88618 15.6757 1.75201 15.809C1.50702 16.0529 1.31283 16.343 1.18066 16.6624C1.04849 16.9818 0.980971 17.3243 0.982006 17.67V18.615H5.81101C5.94821 19.2885 6.31391 19.8938 6.84621 20.3286C7.37851 20.7634 8.0447 21.0009 8.73201 21.0009C9.41931 21.0009 10.0855 20.7634 10.6178 20.3286C11.1501 19.8938 11.5158 19.2885 11.653 18.615H16.482V17.67C16.483 17.3242 16.4153 16.9817 16.283 16.6622C16.1506 16.3428 15.9562 16.0528 15.711 15.809C15.5768 15.6757 15.4704 15.517 15.398 15.3423C15.3256 15.1675 15.2885 14.9802 15.289 14.791V8.39999C15.2868 6.76493 14.6747 5.1895 13.5725 3.98183C12.4702 2.77417 10.9571 2.02112 9.32901 1.86999V0.649994H8.13601V1.86999C6.50758 2.02066 4.99397 2.77349 3.8913 3.98121C2.78863 5.18893 2.17627 6.76462 2.17401 8.39999ZM8.73201 19.808C8.3622 19.8075 8.0016 19.6926 7.69972 19.479C7.39784 19.2654 7.16949 18.9636 7.04601 18.615H10.418C10.2945 18.9636 10.0662 19.2654 9.76429 19.479C9.46241 19.6926 9.10182 19.8075 8.73201 19.808ZM14.098 8.39999V14.791C14.0973 15.1364 14.1651 15.4786 14.2974 15.7977C14.4298 16.1168 14.624 16.4064 14.869 16.65C15.0791 16.8593 15.2189 17.1287 15.269 17.421H2.19501C2.24505 17.1287 2.38485 16.8592 2.59501 16.65C2.84017 16.4062 3.03455 16.1162 3.16689 15.7967C3.29923 15.4773 3.36691 15.1348 3.36601 14.789V8.39999C3.3563 7.68922 3.48792 6.98361 3.7532 6.32413C4.01849 5.66465 4.41216 5.06445 4.91136 4.55839C5.41055 4.05234 6.00533 3.65051 6.66112 3.37624C7.31692 3.10198 8.02067 2.96074 8.7315 2.96074C9.44234 2.96074 10.1461 3.10198 10.8019 3.37624C11.4577 3.65051 12.0525 4.05234 12.5517 4.55839C13.0508 5.06445 13.4445 5.66465 13.7098 6.32413C13.9751 6.98361 14.1067 7.68922 14.097 8.39999H14.098Z"
                                fill="white"
                            />
                        </svg>
                        <Badge>
                            {notifs.lenght == undefined ? "0" : notifs.lenght}
                        </Badge>
                        <div
                            className={showNotifBox ? "boxes" : "h-to-0 boxes"}
                        >
                            {notifs !== undefined && notifs.lenght !== 0
                                ? notifs.map((i) => {
                                      return <div key={i.id}>{i.text}</div>;
                                  })
                                : ""}
                            {notifs.lenght !== undefined ? (
                                <div
                                    onClick={readAllHandler}
                                    className="read-btn"
                                >
                                    همه را خواندم
                                </div>
                            ) : (
                                <b className="mt-2 me-1">
                                    شما اعلان خوانده نشده ای ندارید
                                </b>
                            )}
                        </div>
                    </div>
                    <div onClick={logOutHandler} className="px-2 border d-flex align-items-center me-3" style={{borderRadius: 60}} role="button">
                        <small className="text-white d-inline-block ms-2">خروج</small>
                        <svg
                            width="18"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M3.74654 12L8.33179 16.5852"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M8.33179 7.41476L3.74654 12"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M3.74657 12L13.8341 12"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M13.8341 3.74656H15.9739C18.3374 3.74656 20.2534 5.66258 20.2534 8.02612V15.6682C20.2534 18.0317 18.3374 19.9478 15.9739 19.9478H13.8341"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>
            </HeaderLeft>
            <HeaderLeftMob>
                <div onClick={logOutHandler} className="circle mob-out c-p ">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M3.74654 12L8.33179 16.5852"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M8.33179 7.41476L3.74654 12"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M3.74657 12L13.8341 12"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M13.8341 3.74656H15.9739C18.3374 3.74656 20.2534 5.66258 20.2534 8.02612V15.6682C20.2534 18.0317 18.3374 19.9478 15.9739 19.9478H13.8341"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                <label>
                    <input onChange={handleOnChange} type="checkbox" />
                    <div
                        className={
                            isCheck == "false"
                                ? "white-circle "
                                : "white-circle circle-none"
                        }
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.3845 4.94951C9.66392 4.22698 8.68691 3.81863 7.66649 3.81351C7.16049 3.81141 6.65921 3.91087 6.19234 4.106C5.72547 4.30113 5.3025 4.58796 4.94849 4.94951C4.41224 5.48831 4.04735 6.17369 3.89975 6.9194C3.75215 7.6651 3.82842 8.4378 4.11898 9.14025C4.40954 9.84271 4.90139 10.4435 5.53264 10.8671C6.16389 11.2906 6.90632 11.518 7.66649 11.5205C8.17249 11.5226 8.67377 11.4232 9.14064 11.228C9.60751 11.0329 10.0305 10.7461 10.3845 10.3845C11.107 9.66394 11.5154 8.68693 11.5205 7.66651C11.5225 7.16068 11.4229 6.65958 11.2278 6.1929C11.0327 5.72621 10.7459 5.30341 10.3845 4.94951Z"
                                fill="url(#paint0_linear_117_5320)"
                            />
                            <path
                                d="M7.66649 2.6165C7.80546 2.61394 7.93802 2.55759 8.0363 2.45931C8.13458 2.36103 8.19093 2.22847 8.1935 2.0895V0.5275C8.1935 0.387598 8.13791 0.253427 8.03899 0.154501C7.94006 0.0555757 7.8059 0 7.666 0C7.5261 0 7.39192 0.0555757 7.293 0.154501C7.19407 0.253427 7.13849 0.387598 7.13849 0.5275V2.0895C7.14106 2.22864 7.19756 2.36134 7.29605 2.45965C7.39455 2.55796 7.52735 2.61419 7.66649 2.6165V2.6165Z"
                                fill="url(#paint1_linear_117_5320)"
                            />
                            <path
                                d="M11.9855 4.0995L13.1035 2.9815C13.2003 2.8847 13.2547 2.7534 13.2547 2.6165C13.2547 2.4796 13.2003 2.3483 13.1035 2.2515C13.0067 2.1547 12.8754 2.10031 12.7385 2.10031C12.6016 2.10031 12.4703 2.1547 12.3735 2.2515L11.2585 3.3665C11.2106 3.41443 11.1725 3.47134 11.1466 3.53397C11.1207 3.59659 11.1073 3.66372 11.1073 3.7315C11.1073 3.79929 11.1207 3.86641 11.1466 3.92904C11.1725 3.99167 11.2106 4.04857 11.2585 4.0965C11.3064 4.14443 11.3633 4.18246 11.4259 4.2084C11.4886 4.23434 11.5557 4.24769 11.6235 4.24769C11.6913 4.24769 11.7584 4.23434 11.821 4.2084C11.8836 4.18246 11.9405 4.14443 11.9885 4.0965L11.9855 4.0995Z"
                                fill="url(#paint2_linear_117_5320)"
                            />
                            <path
                                d="M14.8055 7.1395H13.2435C13.1036 7.1395 12.9694 7.19507 12.8705 7.29399C12.7716 7.39292 12.716 7.52709 12.716 7.66699C12.716 7.80689 12.7716 7.94107 12.8705 8.03999C12.9694 8.13892 13.1036 8.19449 13.2435 8.19449H14.8055C14.9454 8.19449 15.0796 8.13892 15.1785 8.03999C15.2774 7.94107 15.333 7.80689 15.333 7.66699C15.333 7.52709 15.2774 7.39292 15.1785 7.29399C15.0796 7.19507 14.9454 7.1395 14.8055 7.1395V7.1395Z"
                                fill="url(#paint3_linear_117_5320)"
                            />
                            <path
                                d="M11.9655 11.2355C11.8687 11.1387 11.7374 11.0843 11.6005 11.0843C11.4636 11.0843 11.3323 11.1387 11.2355 11.2355C11.1387 11.3323 11.0843 11.4636 11.0843 11.6005C11.0843 11.7374 11.1387 11.8687 11.2355 11.9655L12.3505 13.0805C12.4473 13.1773 12.5786 13.2317 12.7155 13.2317C12.8524 13.2317 12.9837 13.1773 13.0805 13.0805C13.1773 12.9837 13.2317 12.8524 13.2317 12.7155C13.2317 12.5786 13.1773 12.4473 13.0805 12.3505L11.9655 11.2355Z"
                                fill="url(#paint4_linear_117_5320)"
                            />
                            <path
                                d="M7.66649 12.7165C7.52752 12.7191 7.39497 12.7754 7.29669 12.8737C7.19841 12.972 7.14206 13.1045 7.1395 13.2435V14.8055C7.1395 14.9454 7.19507 15.0796 7.29399 15.1785C7.39292 15.2774 7.52709 15.333 7.66699 15.333C7.80689 15.333 7.94107 15.2774 8.03999 15.1785C8.13892 15.0796 8.19449 14.9454 8.19449 14.8055V13.2435C8.19192 13.1043 8.13544 12.9716 8.03694 12.8733C7.93845 12.775 7.80563 12.7188 7.66649 12.7165V12.7165Z"
                                fill="url(#paint5_linear_117_5320)"
                            />
                            <path
                                d="M3.34651 11.2355L2.23151 12.3505C2.13471 12.4473 2.08032 12.5786 2.08032 12.7155C2.08032 12.8524 2.13471 12.9837 2.23151 13.0805C2.32831 13.1773 2.45961 13.2317 2.59651 13.2317C2.73341 13.2317 2.86471 13.1773 2.96151 13.0805L4.07951 11.9655C4.17631 11.8687 4.2307 11.7374 4.2307 11.6005C4.2307 11.4636 4.17631 11.3323 4.07951 11.2355C3.98271 11.1387 3.85141 11.0843 3.71451 11.0843C3.57761 11.0843 3.44631 11.1387 3.34951 11.2355H3.34651Z"
                                fill="url(#paint6_linear_117_5320)"
                            />
                            <path
                                d="M2.6165 7.66649C2.61394 7.52752 2.55759 7.39497 2.45931 7.29669C2.36103 7.19841 2.22847 7.14206 2.0895 7.1395H0.5275C0.387598 7.1395 0.253427 7.19507 0.154501 7.29399C0.0555757 7.39292 0 7.52709 0 7.66699C0 7.80689 0.0555757 7.94107 0.154501 8.03999C0.253427 8.13892 0.387598 8.19449 0.5275 8.19449H2.0895C2.22864 8.19192 2.36134 8.13544 2.45965 8.03694C2.55796 7.93845 2.61419 7.80563 2.6165 7.66649V7.66649Z"
                                fill="url(#paint7_linear_117_5320)"
                            />
                            <path
                                d="M3.34651 4.09949C3.44331 4.1963 3.57461 4.25068 3.71151 4.25068C3.84841 4.25068 3.97971 4.1963 4.07651 4.09949C4.17332 4.00269 4.2277 3.87139 4.2277 3.73449C4.2277 3.59759 4.17332 3.46629 4.07651 3.36949L2.96151 2.25449C2.86471 2.15769 2.73341 2.1033 2.59651 2.1033C2.45961 2.1033 2.32831 2.15769 2.23151 2.25449C2.13471 2.35129 2.08032 2.48259 2.08032 2.61949C2.08032 2.75639 2.13471 2.88769 2.23151 2.98449L3.34651 4.09949Z"
                                fill="url(#paint8_linear_117_5320)"
                            />
                            <defs>
                                <linearGradient
                                    id="paint0_linear_117_5320"
                                    x1="3.69376"
                                    y1="7.25389"
                                    x2="11.5205"
                                    y2="7.25389"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="#128CBD" />
                                    <stop offset="1" stopColor="#3DBDC8" />
                                </linearGradient>
                                <linearGradient
                                    id="paint1_linear_117_5320"
                                    x1="7.1203"
                                    y1="1.168"
                                    x2="8.1935"
                                    y2="1.168"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="#128CBD" />
                                    <stop offset="1" stopColor="#3DBDC8" />
                                </linearGradient>
                                <linearGradient
                                    id="paint2_linear_117_5320"
                                    x1="11.0703"
                                    y1="3.05889"
                                    x2="13.2547"
                                    y2="3.05889"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="#128CBD" />
                                    <stop offset="1" stopColor="#3DBDC8" />
                                </linearGradient>
                                <linearGradient
                                    id="paint3_linear_117_5320"
                                    x1="12.6709"
                                    y1="7.61044"
                                    x2="15.333"
                                    y2="7.61044"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="#128CBD" />
                                    <stop offset="1" stopColor="#3DBDC8" />
                                </linearGradient>
                                <linearGradient
                                    id="paint4_linear_117_5320"
                                    x1="11.0473"
                                    y1="12.0429"
                                    x2="13.2317"
                                    y2="12.0429"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="#128CBD" />
                                    <stop offset="1" stopColor="#3DBDC8" />
                                </linearGradient>
                                <linearGradient
                                    id="paint5_linear_117_5320"
                                    x1="7.12131"
                                    y1="13.8845"
                                    x2="8.19449"
                                    y2="13.8845"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="#128CBD" />
                                    <stop offset="1" stopColor="#3DBDC8" />
                                </linearGradient>
                                <linearGradient
                                    id="paint6_linear_117_5320"
                                    x1="2.04325"
                                    y1="12.0429"
                                    x2="4.2307"
                                    y2="12.0429"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="#128CBD" />
                                    <stop offset="1" stopColor="#3DBDC8" />
                                </linearGradient>
                                <linearGradient
                                    id="paint7_linear_117_5320"
                                    x1="-0.045112"
                                    y1="7.61044"
                                    x2="2.6165"
                                    y2="7.61044"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="#128CBD" />
                                    <stop offset="1" stopColor="#3DBDC8" />
                                </linearGradient>
                                <linearGradient
                                    id="paint8_linear_117_5320"
                                    x1="2.0433"
                                    y1="3.06189"
                                    x2="4.2277"
                                    y2="3.06189"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="#128CBD" />
                                    <stop offset="1" stopColor="#3DBDC8" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div
                        className={
                            isCheck == "true"
                                ? "dark-circle "
                                : "dark-circle circle-none"
                        }
                    >
                        <svg
                            width="12"
                            height="13"
                            viewBox="0 0 12 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6 12.0009C7.124 12.0127 8.22756 11.7 9.17828 11.1003C10.129 10.5006 10.8865 9.63934 11.36 8.61985C10.7512 8.88541 10.092 9.01541 9.428 9.00085C8.178 8.99953 6.9796 8.50231 6.09581 7.61834C5.21202 6.73436 4.71506 5.53585 4.714 4.28585C4.72687 3.42133 4.96897 2.57571 5.41557 1.83536C5.86217 1.09501 6.49727 0.486457 7.256 0.0718537C6.83951 0.0187825 6.41981 -0.00494263 6 0.000853724C4.4087 0.000853724 2.88258 0.632995 1.75736 1.75821C0.632141 2.88343 0 4.40955 0 6.00085C0 7.59215 0.632141 9.11828 1.75736 10.2435C2.88258 11.3687 4.4087 12.0009 6 12.0009Z"
                                fill="url(#paint0_linear_144_4793)"
                            />
                            <defs>
                                <linearGradient
                                    id="paint0_linear_144_4793"
                                    x1="-0.195862"
                                    y1="5.35729"
                                    x2="11.36"
                                    y2="5.35729"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="#128CBD" />
                                    <stop offset="1" stopColor="#3DBDC8" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </label>
                <div
                    className="circle c-p mt-2 ms-1 position-relative "
                    onClick={(e) => {
                        setShowNotifBox(!showNotifBox);
                    }}
                >
                    <svg
                        width="18"
                        height="21"
                        viewBox="0 0 18 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M16.162 6.18299L17.304 5.84199C16.665 3.70333 15.2498 1.88073 13.336 0.731995L12.721 1.75299C14.3805 2.74872 15.6078 4.32879 16.162 6.18299Z"
                            fill="white"
                        />
                        <path
                            d="M4.74499 1.75699L4.12999 0.735992C2.21621 1.88473 0.800935 3.70733 0.161987 5.84599L1.30399 6.18299C1.85821 4.32878 3.08553 2.74872 4.74499 1.75299V1.75699Z"
                            fill="white"
                        />
                        <path
                            d="M2.17401 8.39999V14.791C2.17449 14.9802 2.13744 15.1675 2.06501 15.3423C1.99257 15.517 1.88618 15.6757 1.75201 15.809C1.50702 16.0529 1.31283 16.343 1.18066 16.6624C1.04849 16.9818 0.980971 17.3243 0.982006 17.67V18.615H5.81101C5.94821 19.2885 6.31391 19.8938 6.84621 20.3286C7.37851 20.7634 8.0447 21.0009 8.73201 21.0009C9.41931 21.0009 10.0855 20.7634 10.6178 20.3286C11.1501 19.8938 11.5158 19.2885 11.653 18.615H16.482V17.67C16.483 17.3242 16.4153 16.9817 16.283 16.6622C16.1506 16.3428 15.9562 16.0528 15.711 15.809C15.5768 15.6757 15.4704 15.517 15.398 15.3423C15.3256 15.1675 15.2885 14.9802 15.289 14.791V8.39999C15.2868 6.76493 14.6747 5.1895 13.5725 3.98183C12.4702 2.77417 10.9571 2.02112 9.32901 1.86999V0.649994H8.13601V1.86999C6.50758 2.02066 4.99397 2.77349 3.8913 3.98121C2.78863 5.18893 2.17627 6.76462 2.17401 8.39999ZM8.73201 19.808C8.3622 19.8075 8.0016 19.6926 7.69972 19.479C7.39784 19.2654 7.16949 18.9636 7.04601 18.615H10.418C10.2945 18.9636 10.0662 19.2654 9.76429 19.479C9.46241 19.6926 9.10182 19.8075 8.73201 19.808ZM14.098 8.39999V14.791C14.0973 15.1364 14.1651 15.4786 14.2974 15.7977C14.4298 16.1168 14.624 16.4064 14.869 16.65C15.0791 16.8593 15.2189 17.1287 15.269 17.421H2.19501C2.24505 17.1287 2.38485 16.8592 2.59501 16.65C2.84017 16.4062 3.03455 16.1162 3.16689 15.7967C3.29923 15.4773 3.36691 15.1348 3.36601 14.789V8.39999C3.3563 7.68922 3.48792 6.98361 3.7532 6.32413C4.01849 5.66465 4.41216 5.06445 4.91136 4.55839C5.41055 4.05234 6.00533 3.65051 6.66112 3.37624C7.31692 3.10198 8.02067 2.96074 8.7315 2.96074C9.44234 2.96074 10.1461 3.10198 10.8019 3.37624C11.4577 3.65051 12.0525 4.05234 12.5517 4.55839C13.0508 5.06445 13.4445 5.66465 13.7098 6.32413C13.9751 6.98361 14.1067 7.68922 14.097 8.39999H14.098Z"
                            fill="white"
                        />
                    </svg>
                    <Badge>
                        {notifs.lenght == undefined ? "0" : notifs.lenght}
                    </Badge>
                    <div className={showNotifBox ? "boxes" : "h-to-0 boxes"}>
                        {notifs !== undefined && notifs.lenght !== 0
                            ? notifs.map((i) => {
                                  return <div key={i.id}>{i.text}</div>;
                              })
                            : ""}
                        {notifs.lenght !== undefined ? (
                            <div onClick={readAllHandler} className="read-btn">
                                همه را خواندم
                            </div>
                        ) : (
                            <b className="mt-2 me-1">
                                شما اعلان خوانده نشده ای ندارید
                            </b>
                        )}
                    </div>
                </div>
                
                    <Image
                        onClick={() => {
                            Router.push("/");
                        }}
                        src="/images/mob-logo.svg"
                        width={70}
                        height={42}
                        alt="logo"
                    />
            </HeaderLeftMob>
        </HeaderMain>
    );
};

export default Header;
