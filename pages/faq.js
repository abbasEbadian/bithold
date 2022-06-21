import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap/dist/js/bootstrap.js";
import Sidebar from "../components/Sidebar";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Router from "next/router";
import Image from "next/image";
import axios from "axios";
import LandingChart from "../components/LandingChart";
import { baseUrl } from "../components/BaseUrl";
import Footer from "../components/Footer";
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
            padding: 0 5px;
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



const FaqMain = styled.div`
    width: 100%;
    margin-top: 50px;
`;
const FaqContent = styled.div`
    padding-top: 30px;
    padding-left: 20px;
    display: flex;
    width: 100%;
    h4 {
        font-size: 18px;
    }
    p {
        font-size: 14px;
    }
    div {
        width: 50%;
        padding-right: 20px;
        max-height: 700px;
        overflow: scroll;
        overflow-x: hidden !important;
    }
    @media (max-width: 992px) {
        flex-direction: column;
        div {
            width: 100%;
        }
        img {
        width: 280px;
        height: 350px;
        margin-right: auto;
        margin-left: auto;
    }
    }
    p {
        direction: rtl;
    }
    
`;

export default function Faq() {
    const [showMenu, setShowMenu] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [img, setImg] = useState(null);
    let token = "";
    const closeHandler = (e) => {
        setShowMenu(false);
    };
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
    return (
        <Main className="max-w-1992">
            <Head>
                {" "}
                <link rel="shortcut icon" href="/images/fav.png" />
                <title>بیت هولد | سوالات متداول</title>
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
                                className="active-li"
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
                    <div className="page-title">سوالات متداول</div>
                </HeadMain>
                <FaqMain>
                    <FaqContent>
                        <img src="/images/faq.png" width={500} height={600} alt="" />

                        <div>
                            <h4>بیت هولد چیست ؟</h4>
                            <p>
                                بیت هولد استارتاپی پیشرو در زمینه ارزهای دیجیتال
                                است که از سال 1399 با هدف فراهم آوردن بستری امن
                                و سریع برای خرید و فروش ارزهای دیجیتال شروع به
                                کار کرده است. اگر قصد خرید ارزهای دیجیتال مانند
                                بیت کوین را دارید یا میخواهید دارایی های دیجیتال
                                خود را نقد کنید، بیت هولد به شما کمک می کند در
                                سریع ترین زمان به این هدف برسید. بیت هولد، یکی
                                از معتبرترین بازارهای ایرانی تبادل ارزهای
                                دیجیتال برای کسانی است که به دنبال یک راهکار
                                امن، مطمئن، سریع، راحت و ارزان برای تبدیل دارایی
                                های خود هستند.
                            </p>
                            <h4>چرا بیت هولد نماد اعتماد الکترونیک ندارد؟</h4>
                            <p>
                                با توجه به این که قانونی برای ارزهای دیجیتال در
                                کشور تصویب نشده است به همین دلیل به سایتهای فعال
                                در حوزه ارزهای دیجیتال، نماد اعتماد الکترونیکی
                                تعلق نمی گیرد و هیچ صرافی ای در این زمینه دارای
                                نماد اعتماد الکترونیک نمی باشد.
                            </p>
                            <h4> خرید و فروش به چه صورت انجام میشود؟</h4>
                            <p>
                                پس از ثبت نام و انجام احراز هویت، با حضور در
                                قسمت بازارها، می توانید نسبت به انجام خرید و یا
                                فروش ارزهای دیجیتال اقدام نمایید.
                            </p>
                            <h4>چطور با پشتیبانی در ارتباط باشم؟</h4>
                            <p>
                                تیم پشتیبانی بیت هولد به صورت 24 ساعته در خدمت
                                شما عزیزان میباشد. جهت حل مشکلات و پاسخگویی به
                                سوالات خود میتوانید از پنل کاربری خود برای ما
                                تیکت ثبت نمایید. همچنین در موارد ضروری و فوری می
                                توانید با دفتر صرافی تماس حاصل نمایید.
                            </p>
                            <h4>آیا امکان استرداد وجه وجود دارد؟</h4>
                            <p>
                                به دلیل خودکار بودن سامانه پرداخت الکترونیک
                                صرافی بیت هولد، امکان استرداد وجه وجود ندارد.
                            </p>
                            <h4>
                                در حال حاضر بیت هولد چه مقدار کمیسیون معامله
                                دریافت می نماید؟
                            </h4>
                            <p>
                                قیمت نهایی که در زمان درخواست خرید مشاهده
                                می‌کنید همراه با در نظر گرفتن کارمزدهای شبکه
                                بلاکچین حساب شده و صرافی بیت هولد کارمزدی دریافت
                                نمی‌کند.
                            </p>
                            <h4>آیا احراز هویت اجباری است؟</h4>
                            <p>
                                بله جهت حفظ امنیت کاربران و جلوگیری از بروز
                                مشکلات در آینده، احراز هویت توسط کاربران بیت
                                هولد ضروری میباشد. فرایند احراز هویت توسط
                                کارشناسان ما، همه روزه بجز ایام تعطیل از ساعت ۹
                                صبح تا ۱۸ عصر صورت می‌پذیرد. بدلیل حجم بالای
                                درخواست های احراز هویت از سوی کاربران، لطفا تا
                                تماس کارشناسان شکیبا باشید.
                            </p>

                            <h4>زمان انجام معاملات در صرافی چه ساعتی است؟</h4>
                            <p>
                                زمان انجام معاملات در بیت هولد شبانه روزی بوده و
                                حتی در روزهای تعطیل هم مشکلی برای انجام فعالیت
                                وجود نخواهد داشت.
                            </p>

                            <h4>آیا بیت هولد کیف پول دارد؟</h4>
                            <p>
                                بله. شما در بیت هولد برای هر ارز، کیف پول
                                اختصاصی دریافت خواهید کرد.
                            </p>
                        </div>
                    </FaqContent>
                </FaqMain>
            </div>
            <Footer />
            <CopyRight>کلیه حقوق برای بیت هولد محفوظ میباشد 2022</CopyRight>
        </Main>
    );
}
