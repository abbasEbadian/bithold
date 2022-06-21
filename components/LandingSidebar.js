import Router from "next/router";
import React, { useState } from "react";
import styled from "styled-components";

const ToogleMenu = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    background-color: #ffff !important;
    transition: 0.1s all;
    height: 100vh;
    width: 250px;
    z-index: 1333300;
    overflow: hidden;
    ul {
        list-style: none;
        margin-top: 50px;
        white-space: nowrap;
        li {
            color: #727272;
            margin-bottom: 20px;
            svg {
                margin-left: 10px;
                margin-top: -3px;
            }
        }
    }
`;

const LandingSidebar = (props) => {
    console.log(props);
    console.log("sdas");
    return (
        <ToogleMenu className={props.shows == "true" ? "w-100-vw" : "w-0"}>
            <div className="d-flex justify-content-between">
                <div></div>
                <svg
                    className="close"
                    onClick={() => {
                        props.close();
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 14 14"
                >
                    <path
                        id="ic_close_24px"
                        d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z"
                        transform="translate(-5 -5)"
                    ></path>
                </svg>
            </div>
            <ul>
                <li
                    onClick={() => {
                        Router.push("/");
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="17"
                        viewBox="0 0 20 17"
                    >
                        <path
                            id="ic_home_24px"
                            d="M10,20V14h4v6h5V12h3L12,3,2,12H5v8Z"
                            transform="translate(-2 -3)"
                        />
                    </svg>
                    <span>خانه</span>
                </li>
                <li
                    onClick={() => {
                        Router.push("/trade");
                    }}
                >
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
                    onClick={() => {
                        Router.push("/analysis");
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="13.49"
                        viewBox="0 0 20 13.49"
                    >
                        <path
                            id="ic_multiline_chart_24px"
                            d="M22,6.92,20.59,5.51,17.74,8.72A10.764,10.764,0,0,0,9.61,5,11.459,11.459,0,0,0,2,8L3.42,9.42A9.388,9.388,0,0,1,9.61,7a8.789,8.789,0,0,1,6.77,3.24L13.5,13.48l-4-4L2,16.99l1.5,1.5,6-6.01,4,4,4.05-4.55a12.272,12.272,0,0,1,1.44,4.55H21a14.143,14.143,0,0,0-2.04-6.14Z"
                            transform="translate(-2 -5)"
                        />
                    </svg>

                    <span>ابزار تحلیل</span>
                </li>
                <li>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="12.98"
                        viewBox="0 0 20 12.98"
                    >
                        <path
                            id="ic_show_chart_24px"
                            d="M3.5,18.49l6-6.01,4,4L22,6.92,20.59,5.51,13.5,13.48l-4-4L2,16.99Z"
                            transform="translate(-2 -5.51)"
                        />
                    </svg>

                    <a
                        href="https://blog.bithold.exchange/category/analysis/"
                        target="blank"
                    >
                        تحلیل های بیت هولد
                    </a>
                </li>
                <li
                    onClick={() => {
                        Router.push("/dashboard");
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="18"
                        viewBox="0 0 14 18"
                    >
                        <path
                            id="ic_swap_vert_24px"
                            d="M16,17.01V10H14v7.01H11L15,21l4-3.99ZM9,3,5,6.99H8V14h2V6.99h3Z"
                            transform="translate(-5 -3)"
                        />
                    </svg>

                    <span>مبدل ارزها</span>
                </li>

                <li
                    onClick={() => {
                        Router.push("/faq");
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                    >
                        <path
                            id="ic_help_outline_24px"
                            d="M11,18h2V16H11ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.011,8.011,0,0,1,12,20ZM12,6a4,4,0,0,0-4,4h2a2,2,0,0,1,4,0c0,2-3,1.75-3,5h2c0-2.25,3-2.5,3-5A4,4,0,0,0,12,6Z"
                            transform="translate(-2 -2)"
                        />
                    </svg>

                    <span>سوالات متداول</span>
                </li>
                <li
                    onClick={() => {
                        Router.push("/our_rules");
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                    >
                        <path
                            id="ic_error_outline_24px"
                            d="M11,15h2v2H11Zm0-8h2v6H11Zm.99-5A10,10,0,1,0,22,12,10,10,0,0,0,11.99,2ZM12,20a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                            transform="translate(-2 -2)"
                        />
                    </svg>

                    <span>قوانین ما</span>
                </li>
                <li
                    onClick={() => {
                        Router.push("/contact_us");
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                    >
                        <path
                            id="ic_call_24px"
                            d="M6.62,10.79a15.149,15.149,0,0,0,6.59,6.59l2.2-2.2a.994.994,0,0,1,1.02-.24,11.407,11.407,0,0,0,3.57.57,1,1,0,0,1,1,1V20a1,1,0,0,1-1,1A17,17,0,0,1,3,4,1,1,0,0,1,4,3H7.5a1,1,0,0,1,1,1,11.36,11.36,0,0,0,.57,3.57,1,1,0,0,1-.25,1.02Z"
                            transform="translate(-3 -3)"
                        />
                    </svg>

                    <span> تماس با ما</span>
                </li>
                <li
                    onClick={() => {
                        Router.push("/about_us");
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="14"
                        viewBox="0 0 22 14"
                    >
                        <path
                            id="ic_group_24px"
                            d="M16,11a3,3,0,1,0-3-3A2.987,2.987,0,0,0,16,11ZM8,11A3,3,0,1,0,5,8,2.987,2.987,0,0,0,8,11Zm0,2c-2.33,0-7,1.17-7,3.5V19H15V16.5C15,14.17,10.33,13,8,13Zm8,0c-.29,0-.62.02-.97.05A4.22,4.22,0,0,1,17,16.5V19h6V16.5C23,14.17,18.33,13,16,13Z"
                            transform="translate(-1 -5)"
                        />
                    </svg>
                    درباره ما
                </li>
            </ul>
        </ToogleMenu>
    );
};

export default LandingSidebar;
