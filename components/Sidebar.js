import React, { useContext } from "react";
import styled from "styled-components";
import Image from "next/image";
import Router from "next/router";
import NightModeContext from "./Context";

const SidebarMain = styled.div`
    z-index: 100000;
    position: fixed;
    width: 176px;
    height: 100vh;
    background-color: #fff;
    transition: 0.1s all;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 20px;
`;
const SidebarHeader = styled.div`
    height: 64px;
    background-color: #edf8fc;
    border-radius: 0 0 16px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    .svg-white{
        fill: #fff;
    }
    .close {
        display: none;
    }
    @media (max-width: 550px) {
        img {
            display: none !important;
        }
        .close {
            display: block;
        }
        justify-content: flex-end;
        padding-left: 20px;
    }
`;
const SidebarUl = styled.ul`
    list-style: none;
    margin-top: 44px;
    padding-left: 24px;
    white-space: nowrap;
    transition: 0.2s all;
    .right-li {
        transition: 0.1s all;
        position: absolute;
        right: 0;
        top: 3px;
        background: #108abb;
        border-radius: 8px 0px 0px 8px;
        width: 5px;
        height: 40px;
        display: none;
    }
    .active {
        background: rgba(16, 138, 187, 0.15);
        border-radius: 32px 0px 0px 32px;
        color: #323232;
        font-weight: 600;
        svg path {
            stroke: #108abb;
        }
        .right-li {
            display: block;
        }
    }
    li {
        cursor: pointer;
        color: #727272;
        font-weight: 400;
        padding: 12px 0;
        padding-right: 21px;
        font-size: 13px;
        line-height: 23px;
        position: relative;
        svg {
            margin-left: 8px;
        }
        .arrow {
            position: absolute;
            left: 0;
            top: 20px;
        }
    }
`;

const Sidebar = (props) => {
    const stts = useContext(NightModeContext);

    return (
        <SidebarMain
            className={
                props.show ? (stts.night == "true" ? "bg-gray " : "") : "w-0"
            }
        >
            <div>
                <SidebarHeader
                    className={stts.night == "true" ? "bg-dark-2" : ""}
                >
                    <Image
                        onClick={() => {
                            Router.push("/");
                        }}
                        className="c-p"
                        src="/images/side-logo.svg"
                        width={100}
                        height={42}
                        alt="logo"
                    />
                    <svg
                        onClick={props["show-menu"]}
                        className={stts.night == "true" ? "close svg-white" : "close"}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 14 14"
                    >
                        <path
                            id="ic_close_24px"
                            d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z"
                            transform="translate(-5 -5)"
                        />
                    </svg>
                </SidebarHeader>
                <SidebarUl className={props.show ? "" : "op-0"}>
                    <li
                        className={props.active === "1" ? "active" : ""}
                        onClick={() => {
                            Router.push("/dashboard");
                        }}
                    >
                        <span className="right-li"></span>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 4.00098V6.43998"
                                stroke="#777777"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M21 13H19"
                                stroke="#777777"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M3 13H5"
                                stroke="#777777"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M18.36 6.64001L13.404 11.596"
                                stroke="#777777"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M11.981 11C13.086 11 13.981 11.895 13.981 13C13.981 14.105 13.086 15 11.981 15C10.876 15 9.98102 14.105 9.98102 13C9.98102 11.895 10.876 11 11.981 11"
                                stroke="#777777"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M5.64001 6.64001L7.76001 8.76001"
                                stroke="#777777"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M16.24 17.24L18.36 19.36L18.364 19.364C21.879 15.849 21.879 10.151 18.364 6.63601C14.849 3.12101 9.15101 3.12101 5.63601 6.63601C2.12101 10.151 2.12101 15.849 5.63601 19.364L5.64001 19.36L7.64001 17.36"
                                stroke="#777777"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span>داشبورد</span>
                    </li>
                    <li
                        className={props.active === "2" ? "active" : ""}
                        onClick={() => {
                            Router.push("/trade");
                        }}
                    >
                        <span className="right-li"></span>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6 6L8 4L6 2"
                                stroke="#777777"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M10.8891 12.6109C13.037 14.7588 13.037 18.2412 10.8891 20.3891C8.7412 22.537 5.25879 22.537 3.11091 20.3891C0.96303 18.2412 0.96303 14.7588 3.11091 12.6109C5.25879 10.463 8.7412 10.463 10.8891 12.6109"
                                stroke="#777777"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M9.47496 18.5521L6.99996 13.6021L4.52496 18.5521"
                                stroke="#777777"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M5.01996 17.5601H8.97996"
                                stroke="#777777"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M20.8891 3.61091C23.037 5.75879 23.037 9.2412 20.8891 11.3891C18.7412 13.537 15.2588 13.537 13.1109 11.3891C10.963 9.2412 10.963 5.75879 13.1109 3.61091C15.2588 1.46303 18.7412 1.46303 20.8891 3.61091"
                                stroke="#777777"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M15 7.50002V5.52502C15 5.24902 15.224 5.02502 15.5 5.02502H17.812C18.495 5.02502 19.05 5.57902 19.05 6.26202V6.26202C19.05 6.94502 18.496 7.49902 17.812 7.49902H15L15 7.50002Z"
                                stroke="#777777"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M15 7.5V9.475C15 9.751 15.224 9.975 15.5 9.975H18.05C18.733 9.975 19.287 9.421 19.287 8.738V8.738C19.287 8.055 18.733 7.501 18.05 7.501"
                                stroke="#777777"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M18 18L16 20L18 22"
                                stroke="#777777"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M21 16V18C21 19.105 20.105 20 19 20H16"
                                stroke="#777777"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M3 8V6C3 4.895 3.895 4 5 4H8"
                                stroke="#777777"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span>خرید و فروش</span>
                    </li>
                    <li
                        className={props.active === "3" ? "active" : ""}
                        onClick={() => {
                            Router.push("/wallet");
                        }}
                    >
                        <span className="right-li"></span>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M20 15.5H18C16.895 15.5 16 14.605 16 13.5V13.5C16 12.395 16.895 11.5 18 11.5H20C20.552 11.5 21 11.948 21 12.5V14.5C21 15.052 20.552 15.5 20 15.5Z"
                                stroke="#777777"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M20 11.5V8.5C20 7.395 19.105 6.5 18 6.5H4.5C3.672 6.5 3 5.828 3 5V5C3 4.172 3.672 3.5 4.5 3.5H17"
                                stroke="#777777"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M20 15.5V18.5C20 19.605 19.105 20.5 18 20.5H5C3.895 20.5 3 19.605 3 18.5V5"
                                stroke="#777777"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span>کیف پول</span>
                    </li>
                    <li
                        className={props.active === "4" ? "active" : ""}
                        onClick={() => {
                            Router.push("/history");
                        }}
                    >
                        <span className="right-li"></span>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M19 9C20.105 9 21 9.895 21 11V18C21 19.105 20.105 20 19 20H9C7.895 20 7 19.105 7 18V18"
                                stroke="#777777"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M15 17L17 15L15 13"
                                stroke="#777777"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M3 9H16V6C16 4.895 15.105 4 14 4H5C3.895 4 3 4.895 3 6V13C3 14.105 3.895 15 5 15H17"
                                stroke="#777777"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span>تاریخچه</span>
                        
                    </li>
                    <li
                        className={props.active === "5" ? "active" : ""}
                        onClick={() => {
                            Router.push("/profile");
                        }}
                    >
                        <span className="right-li"></span>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M18.364 5.63604C21.8787 9.15076 21.8787 14.8492 18.364 18.3639C14.8493 21.8787 9.1508 21.8787 5.6361 18.3639C2.12138 14.8492 2.12138 9.15074 5.6361 5.63604C9.15082 2.12132 14.8493 2.12132 18.364 5.63604"
                                stroke="#727272"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M13.9891 8.3239C15.0876 9.42244 15.0876 11.2035 13.9891 12.3021C12.8906 13.4006 11.1095 13.4006 10.0109 12.3021C8.91238 11.2035 8.91238 9.42244 10.0109 8.3239C11.1095 7.22537 12.8906 7.22537 13.9891 8.3239"
                                stroke="#727272"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M17.707 18.958C16.272 17.447 14.248 16.5 12 16.5C9.75203 16.5 7.72803 17.447 6.29303 18.959"
                                stroke="#727272"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span>حساب کاربری</span>
                    </li>
                    <li
                        className={props.active === "6" ? "active" : ""}
                        onClick={() => {
                            Router.push("/invite");
                        }}
                    >
                        <span className="right-li"></span>
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M15.7524 4.9971H18.2534"
                                stroke="#727272"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M17.0029 6.24762V3.74658"
                                stroke="#727272"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M17.0029 8.99876C14.793 8.99876 13.0012 7.20701 13.0012 4.99709C13.0012 2.78717 14.793 0.995422 17.0029 0.995422C19.2128 0.995422 21.0046 2.78717 21.0046 4.99709C21.0046 7.20701 19.2128 8.99876 17.0029 8.99876"
                                stroke="#727272"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M9.49978 9.02374C10.7273 9.02374 11.7227 10.0192 11.7227 11.2467C11.7227 12.4742 10.7273 13.4696 9.49978 13.4696C8.27227 13.4696 7.27686 12.4742 7.27686 11.2467C7.27686 10.0192 8.27227 9.02374 9.49978 9.02374"
                                stroke="#727272"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M13.5014 17.0271C13.3854 16.734 13.2043 16.4719 12.9732 16.2578V16.2578C12.5821 15.8956 12.0718 15.6935 11.5386 15.6935C10.6493 15.6935 8.3513 15.6935 7.46193 15.6935C6.9287 15.6935 6.41749 15.8956 6.02633 16.2578V16.2578C5.79523 16.4719 5.61516 16.735 5.49811 17.0271"
                                stroke="#727272"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M13.0072 4.76196C11.9368 4.27576 10.7523 3.99664 9.49976 3.99664C4.8038 3.99664 0.996216 7.80423 0.996216 12.5002C0.996216 17.1961 4.8038 21.0037 9.49976 21.0037C14.1957 21.0037 18.0033 17.1961 18.0033 12.5002C18.0033 11.2477 17.7242 10.0632 17.238 8.99272"
                                stroke="#727272"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span>دعوت از دوستان</span>
                    </li>
                </SidebarUl>
            </div>
            {/* <CallUs className={props.show ? "" : "op-0"}>
                <Image
                    src="/images/headphone.svg"
                    width={84}
                    height={84}
                    alt="call"
                />
                <span className="span-1">در صورت نیاز</span>
                <span className="span-2">
                    با ما <span className="span-3"> تماس </span>بگیرید
                </span>
                <p>021123456</p>
            </CallUs> */}
        </SidebarMain>
    );
};

export default Sidebar;
