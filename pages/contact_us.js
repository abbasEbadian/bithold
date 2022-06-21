import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Router from "next/router";
import Image from "next/image";
import Footer from "../components/Footer";
import axios from "axios";
import { baseUrl } from "../components/BaseUrl";
import LandingSidebar from "../components/LandingSidebar";

const Main = styled.div`
    background-color: rgb(191 226 239);
    width: 100%;
    min-height: 100vh;
    padding: 32px;
    padding-right: 0;
    padding-left: 0;
    iframe {
        margin-right: auto;
        margin-left: auto;
        width: 100%;
        height: 340px;
    }
`;

const HeadMain = styled.div`
    background: #fcfcfc;
    border-radius: 16px;
    padding: 16px;
    padding-bottom: 60px;
`;

const Header = styled.header`
    height: 48px;
    width: 100%;
    background: rgb(191 226 239);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px;
    img {
    }

    ul {
        display: flex;
        align-items: center;
        list-style: none;
        margin: 0;
        padding-right: 8px;
        .active-li {
            background: linear-gradient(90deg, #128cbd -1.72%, #3dbdc8 100%);
            border-radius: 4px;
            height: 32px;
            padding: 0 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
        }
        li {
            cursor: pointer;
            margin-left: 20px;
            color: #323232;
            font-size: 15px;
            line-height: 26px;
        }
    }
    .toggle {
        display: none;
    }
    @media (max-width: 992px) {
        .toggle {
            display: block;
            margin-right: 22px;
        }
        ul {
            display: none;
        }
    }
`;

const CopyRight = styled.div`
    font-weight: 600;
    font-size: 12px;
    line-height: 17px;
    text-align: center;
    margin-top: 16px;
    color: #777777;
`;

const ToogleMenu = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    background-color: #fff;
    transition: 0.1s all;
    height: 100vh;
    width: 250px;
    z-index: 1;
    overflow: hidden;
    ul {
        list-style: none;
        margin-top: 50px;
        li {
            margin-bottom: 20px;
        }
    }
`;

const AboutMain = styled.div`
    display: flex;
    align-items: center;
    padding: 140px;
    padding-top: 40px;
    padding-bottom: 40px;
    h4 {
        font-size: 20px;
    }
    p {
        padding-left: 50px;
    }
    a {
        width: 200px;
        justify-content: space-between;
        text-decoration: none;
    }
    @media (max-width: 1100px) {
        flex-direction: column;
        div {
            order: 1;
        }
        p {
            padding-left: 0px;
        }
    }
    @media (max-width: 1100px) {
        padding: 20px;
        .im {
            width: 250px;
            height: 250px;
        }
    }
`;

export default function ContactUs() {
    const [showMenu, setShowMenu] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [img, setImg] = useState(null);
    let token = "";
    setTimeout(() => {
        token = localStorage.getItem("token");
    }, 2000);
    useEffect(() => {
        setTimeout(() => {
            let config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                url: `${baseUrl}account/details/`,
                method: "GET",
            };
            axios(config)
                .then((res) => {
                    if (res.status == "200") {
                        setImg(res.data.avatar);
                    }
                })
                .catch((error) => {});
        }, 2200);
    }, []);
    setTimeout(() => {
        if (
            localStorage.getItem("token") != null &&
            typeof window != "undefined"
        ) {
            setIsLogin(true);
        }
    }, 1000);
    const closeHandler = (e) => {
        setShowMenu(false);
    };
    return (
        <Main className="max-w-1992">
            <Head>
                {" "}
                <link rel="shortcut icon" href="/images/fav.png" />
                <title>بیت هولد | تماس با ما</title>
            </Head>
            <LandingSidebar shows={showMenu.toString()} close={closeHandler} />

            <div className="px-4">
                <HeadMain>
                    <Header>
                        <div
                            onClick={() => {
                                setShowMenu(true);
                            }}
                            className="toggle"
                        >
                            <svg
                                width="20"
                                height="14"
                                viewBox="0 0 20 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M0.330322 7C0.330322 6.44772 0.778037 6 1.33032 6H18.6704C19.2227 6 19.6704 6.44772 19.6704 7C19.6704 7.55229 19.2227 8 18.6704 8H1.33032C0.778037 8 0.330322 7.55229 0.330322 7Z"
                                    fill="#323232"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M0.330322 12.3356C0.330322 11.7833 0.778037 11.3356 1.33032 11.3356H18.6704C19.2227 11.3356 19.6704 11.7833 19.6704 12.3356C19.6704 12.8879 19.2227 13.3356 18.6704 13.3356H1.33032C0.778037 13.3356 0.330322 12.8879 0.330322 12.3356Z"
                                    fill="#323232"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M0.329834 1.66443C0.329834 1.11214 0.777549 0.664429 1.32983 0.664429H18.6699C19.2222 0.664429 19.6699 1.11214 19.6699 1.66443C19.6699 2.21671 19.2222 2.66443 18.6699 2.66443H1.32983C0.777549 2.66443 0.329834 2.21671 0.329834 1.66443Z"
                                    fill="#323232"
                                />
                            </svg>
                        </div>
                        <ul>
                            <li
                                onClick={() => {
                                    Router.push("/");
                                }}
                            >
                                خانه
                            </li>
                            <li
                                onClick={() => {
                                    Router.push("/trade");
                                }}
                            >
                                خرید و فروش
                            </li>
                            <li className="analysis-dd">
                                تحلیل
                                <ul>
                                    <li
                                        onClick={() => {
                                            Router.push("/analysis");
                                        }}
                                    >
                                        ابزار تحلیل
                                    </li>
                                    <li>
                                        <a
                                            href="https://blog.bithold.exchange/category/analysis/"
                                            target="blank"
                                        >
                                            تحلیل های بیت هولد
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li
                                onClick={() => {
                                    Router.push("/dashboard");
                                }}
                            >
                                مبدل ارزها
                            </li>

                            <li
                                onClick={() => {
                                    Router.push("/faq");
                                }}
                            >
                                سوالات متداول
                            </li>
                            <li
                                onClick={() => {
                                    Router.push("/our_rules");
                                }}
                            >
                                قوانین ما
                            </li>
                            <li
                                onClick={() => {
                                    Router.push("/contact_us");
                                }}
                                className="active-li"
                            >
                                تماس با ما
                            </li>
                            <li
                                onClick={() => {
                                    Router.push("/about_us");
                                }}
                            >
                                درباره ما
                            </li>
                        </ul>
                        {isLogin ? (
                            img !== null ? (
                                <img
                                    onClick={() => {
                                        Router.push("/dashboard");
                                    }}
                                    src={img}
                                    width={38}
                                    height={38}
                                    alt="profile"
                                    className="c-p radi"
                                />
                            ) : (
                                <img
                                    onClick={() => {
                                        Router.push("/dashboard");
                                    }}
                                    className="ms-1 img-prof c-p"
                                    src="/images/prof-img.png"
                                    width={38}
                                    height={38}
                                    alt="profile"
                                />
                            )
                        ) : (
                            ""
                        )}
                    </Header>
                    <div className="page-title">تماس با ما</div>
                </HeadMain>
                <AboutMain>
                    <div className="w-100">
                        <h4>آدرس</h4>
                        <p>
                            آذربایجان غربی، مهاباد، خیابان صلاح الدین ایوبی، سه
                            راه وفایی، ساختمان صلاح الدین، طبقه ۵ ، واحد ۱۷
                        </p>
                        <br />
                        <h4>شماره دفتر</h4>
                        <div className="d-flex">
                            <svg
                                className="ms-2"
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                            >
                                <path
                                    id="ic_phone_24px"
                                    d="M6.62,10.79a15.149,15.149,0,0,0,6.59,6.59l2.2-2.2a.994.994,0,0,1,1.02-.24,11.407,11.407,0,0,0,3.57.57,1,1,0,0,1,1,1V20a1,1,0,0,1-1,1A17,17,0,0,1,3,4,1,1,0,0,1,4,3H7.5a1,1,0,0,1,1,1,11.36,11.36,0,0,0,.57,3.57,1,1,0,0,1-.25,1.02Z"
                                    transform="translate(-3 -3)"
                                />
                            </svg>

                            <p>۰۴۴۴۲۲۴۳۳۳۷</p>
                        </div>
                        <br />
                        <svg
                            className="ms-2"
                            xmlns="http://www.w3.org/2000/svg"
                            width="13.99"
                            height="22"
                            viewBox="0 0 13.99 22"
                        >
                            <path
                                id="ic_stay_primary_portrait_24px"
                                d="M17,1.01,7,1A2,2,0,0,0,5.01,3V21A2,2,0,0,0,7,23H17a2.006,2.006,0,0,0,2-2V3A2,2,0,0,0,17,1.01ZM17,19H7V5H17Z"
                                transform="translate(-5.01 -1)"
                            />
                        </svg>
                        09120248522
                        <br />
                        <span className="me-3 d-block">09143446658</span>
                        <br />
                        <br />
                        <a
                            href="http://www.instagram.com/bithold.exchange"
                            target="blank"
                            className="d-flex align-items-center mt-5"
                        >
                            <span>بیت هولد در اینستاگرام</span>
                            <img
                                src="/images/instagram.png"
                                width={20}
                                alt=""
                            />
                        </a>
                        <a
                            href="http://t.me/bithold.exchange"
                            target="blank"
                            className="d-flex align-items-center mt-2"
                        >
                            <span>بیت هولد در تلگرام</span>
                            <img src="/images/telegram.png" width={20} alt="" />
                        </a>
                    </div>

                    <img
                        className="im"
                        src="/images/contact-us.png"
                        width={500}
                        height={500}
                        alt=""
                    />
                </AboutMain>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3196.3420462835124!2d45.717916699999996!3d36.7623611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xe6614df9123ee382!2zMzbCsDQ1JzQ0LjUiTiA0NcKwNDMnMDQuNSJF!5e0!3m2!1sen!2s!4v1653137709339!5m2!1sen!2s"
                    width="600"
                    height="450"
                    allowFullScreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            <Footer />
            <CopyRight>کلیه حقوق برای بیت هولد محفوظ میباشد 2022</CopyRight>
        </Main>
    );
}
