import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Router from "next/router";
import Image from "next/image";
import Footer from "../components/Footer";
import { baseUrl } from "../components/BaseUrl";
import axios from "axios";
import LandingSidebar from "../components/LandingSidebar";

const Main = styled.div`
    background-color: rgb(191 226 239);
    width: 100%;
    min-height: 100vh;
    padding: 32px;
    padding-right: 0;
    padding-left: 0;
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

const AboutMain = styled.div`
    display: flex;
    align-items: center;
    padding: 40px;
    p {
        padding-left: 50px;
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
        img {
            width: 250px;
            height: 250px;
        }
    }
`;

export default function AboutUs() {
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
                            >
                                تماس با ما
                            </li>
                            <li
                                onClick={() => {
                                    Router.push("/about_us");
                                }}
                                className="active-li"
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
                    <div className="page-title">درباره ما</div>
                </HeadMain>
                <AboutMain>
                    <div className="w-100">
                        <p>
                            نام بیت هولد از ترکیب سه واژه (بیت) که مخفف بیتکوین
                            و (هولد) که به معنای نگه داری و (اکسچنج) به معنای
                            مبادله ساخته شده است هدف ما فراهــــم نمودن بستری
                            امن، سریع و آسان جهت خرید و فروش مستقیم ارزهای
                            دیجیتال بین خریدار و فروشنده است. این بستر به عنوان
                            واسطه ای میان خریداران و فروشندگان، امنیت معاملات و
                            وصول دارایی های مبادله شده را تضمین می‌کند . تیم بیت
                            هولد متشکل از جمعی از دانشجویان دانشگاه خواجه نصیر
                            تهران است که در زمینه‌های گوناگون اعم از برنامه
                            نویسی، مدیریت و مالی تخصص دارند. افراد این تیم در
                            چند سال اخیر، در خرید و فروش بیت‌کوین و سایر ارزهای
                            دیجیتال فعال بوده‌اند. ما از نزدیک شاهد برخی مشکلات
                            برای ایرانیان از جمله دسترسی سخت به بازارهای خارجی،
                            وجود کلاهبرداران داخلی، خرید و فروش با سودی
                            ناعادلانه برای مردم توسط صرافی‌های داخلی و از طرفی
                            جود نداشتن پلتفرمی امن و حرفه‌ای برای خرید و فروش
                            بیت‌کوین و سایر ارزهای دیجیتال در ایران و دلایل
                            متعدد دیگر بوده‌ایم. ما با مشاهده این مشکلات تصمیم
                            به ایجاد پلتفرمی کاملا ایمن، حرفه‌ای وآسان برای خرید
                            و فروش بیت‌کوین و سایر ارزهای دیجیتال گرفتیم.
                            امیدواریم که بتوانیم با تلاش بسیار و نوآوری محصولی
                            شایسته شما ارائه نماییم.
                        </p>
                    </div>
                    <img
                        src="/images/about-us.png"
                        width={500}
                        height={400}
                        alt=""
                    />
                </AboutMain>
            </div>
            <Footer />
            <CopyRight>کلیه حقوق برای بیت هولد محفوظ میباشد 2022</CopyRight>
        </Main>
    );
}
