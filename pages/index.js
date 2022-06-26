import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";
import Sidebar from "../components/Sidebar";

import styled from "styled-components";
import { useContext, useEffect, useRef, useState } from "react";
import Router from "next/router";
import Image from "next/image";
import axios from "axios";
import LandingChart from "../components/LandingChart";
import { baseUrl } from "../components/BaseUrl";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Footer from "../components/Footer";
import LandingSidebar from "../components/LandingSidebar";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import ReactCompareImage from "react-compare-image";
import UserContext from "../utils/state/userContext";
import { ParticleOptinsV2 } from "../utils";
import MenuOpenIcon from '../components/icons/MenuOpenIcon' 

const Main = styled.div`
    background-color: rgb(191 226 239);
    width: 100%;
    min-height: 100vh;
    padding: 32px;
    padding-right: 0;
    padding-left: 0;

    .img-res img {
        z-index: 99;
    }
    
    .h-to-c {
        height: 390px;
    }
    .changes {
        direction: ltr;
        text-align: center;
        width: 60px;
        margin-right: 22px;
        padding: 2px;
        border-radius: 12px;
        color: #fff;
        font-size: 13px;
    }
    .plus {
        background-color: #04c53e;
    }
    .zero {
        background-color: #7ae2fc;
    }
    .nega {
        background-color: #f14640;
    }
    .rtl {
        direction: rtl !important;
    }
    .to-full {
        height: 100% !important;
        max-height: 100% !important;
    }
    .bold {
        font-weight: 700;
    }
    .persian-name {
        margin-right: 10px;
        color: #000d0d9e;
    }
    .dir-l {
        direction: ltr !important;
    }
    .carousel-div {
        padding-bottom: 40px;
        position: relative;
        transition: 0.7s;
        :hover {
            transform: scale(1.11);
            transform-origin: top;
        }
        span {
            position: absolute;
            color: #fff;
            top: 30px;
            font-size: 10px;
            white-space: nowrap;
            font-weight: 500;
            right: 50%;
            transform: translateX(50%);
        }
    }
    .table-wrapper {
        z-index: 999999;
        border-radius: 26px !important;
        margin-top: 20px;
        max-height: 550px;
        margin-right: auto !important;
        margin-left: auto !important;
        overflow: auto;
        overflow-x: hidden;
        .dir-ltr {
            direction: ltr;
            text-align: right;
        }
        @media (max-width: 550px) {
            border-radius: 30px;
        }
    }
    table {
        width: 100%;
        margin-right: auto;
        margin-left: auto;
        background: #eee;
        border-radius: 26px;
        white-space: nowrap;
        tbody tr {
            :last-child {
                td {
                    padding-bottom: 20px;
                }
            }
        }
        td,
        th {
            padding-top: 16px;
            padding-right: 16px;
        }
    }
    @media (max-width: 1279px) {
        .table-wrapper {
            width: calc(100vw - 40px) !important;
            margin-right: auto;
            margin-left: auto;
        }
        table {
            width: 100%;
        }
    }

    @media (max-width: 992px) {
        .btn-resp {
            button {
                padding: 10px !important;
                padding-top: 4px !important;
                padding-bottom: 4px !important;
                font-size: 12px;
            }
        }
        .font-to-13 {
            font-size: 13px;
            th {
                padding-right: 10px;
            }
        }
        .fo-to-13 {
            td {
                padding-right: 0 !important;
            }
            td:nth-child(2) {
                padding-right: 16px !important;
            }
        }
    }

    @media (max-width: 786px) {
        #tsparticles {
            display: none;
        }
        span {
            font-weight: 600;
            font-size: 14px;
            line-height: 23px;
            text-align: right;
            color: #323232;
        }
        table tbody tr td span,
        table tbody tr td {
            font-size: 11.5px !important;
        }
        table tbody img {
            width: 18px;
            height: 18px;
        }
    }
    @media (max-width: 550px) {
        .to-cols {
            display: flex;
            margin-right: 0 !important;
            flex-direction: column;
        }
        .to-colss {
            display: flex;
            flex-direction: column;
            margin-right: 0 !important;
        }
        .persian-name {
            margin-right: 0 !important;
            margin-bottom: 5px;
            margin-top: -6px;
        }
        table td,
        .cPsUYe table th {
            padding-top: 6px;
            padding-right: 16px;
        }
    }
    .to-animate {
        animation: animate 6s infinite;
        position: relative;
        top: 0;
    }
    .res-d-none {
        button {
            width: 60px;
        }
    }
    @media (max-width: 786px) {
        .res-d-none {
            display: none !important;
        }
        .go-col {
            flex-direction: column;
            margin-top: 0 !important;
            margin-bottom: 0 !important;
        }
    }
    @keyframes animate {
        50% {
            top: 0;
            transform: scale(1);
        }
        100%,
        0% {
            top: 40px;
            transform: scale(0.9);
        }
    }
`;

const HeadMain = styled.div`
    background: #fcfcfc;
    border-radius: 16px;
    padding: 16px;
    z-index: 99;
    padding-bottom: 60px;
    position:relative;
    #tsparticles {
        position: absolute;
        z-index: 0;
        height: 100%;
        display: block !important;
    }
    @media (min-width: 1200px) {
        padding-bottom: 140px;
    }
    @media (min-width: 1400px) {
        padding-bottom: 160px;
    }
    h4 {
        font-size: 28px;
        font-weight: 600;
        span {
            color: #108abb;
        }
    }

    .mt-60 {
        margin-bottom: 40px;
        h6 {
            color: #4f4f4f;
            font-weight: 600;
            font-size: 20px;
            line-height: 29px;
            margin-top: 46px;
            margin-right: 20px;
        }
    }
    @media (max-width: 1200px) {
        .img-res {
            img {
                width: 340px;
                height: 200px ;
            }
        }
    }
    @media (max-width: 992px) {
        .mt-2 {
            flex-direction: column-reverse;
        }
        .img {
            object-fit: contain;
            width: 300px !important;
            position: relative !important;
            height: unset !important;
        }
        div.img-res {
            img {
                width: 270px ;
                height: 150px ;
            }
        }
        h4 {
            font-size: 16px;
            text-align: center;
            margin-right: 0 !important;
            margin-top: 20px;
            font-weight: 600;
            span {
                color: #108abb;
            }
        }
        .mt-60 {
            margin-top: 32px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            h6 {
                font-size: 14px;
                margin-top: 5px;
                text-align: center;
                font-weight: 600;
            }
        }
        .to-center {
            justify-content: center;
            align-items: center;
        }
    }
    .login-box {
        z-index: 9999;
        background-color: #2eb3ff18;
        width: 280px;
        height: 160px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        margin-right: 20px;
        margin-top: 20px;
        padding: 8px;
        button {
            z-index: 99;
            width: 160px;
            margin-top: 7px;
            margin-bottom: 7px;
            height: 40px;
            min-height: 40px;
            background: linear-gradient(90deg, #128cbd -1.72%, #3dbdc8 100%);
            border-radius: 10px;
            color: #fff;
            :hover {
                background: linear-gradient(
                    90deg,
                    #128cbd55 -1.72%,
                    #3dbdc855 100%
                );
                border: 1px solid #128cbd !important ;
                color: #128cbd;
            }
        }
        @media (max-width: 786px) {
            width: 220px;
            margin-right: 5px;
        }
    }
`;

const Header = styled.header`
    z-index: 99;
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
        z-index: 99;
        align-items: center;
        list-style: none;
        margin: 0;
        padding-right: 8px;
        .active-li {
            background: linear-gradient(90deg, #128cbd -1.72%, #3dbdc8 100%);
            border-radius: 4px;
            width: 52px;
            height: 32px;
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
const ChooseShop = styled.div`
    width: 244px;
    top: 0;
    height: 55px;
    background: #f9f9f9;
    border-radius: 16px;
    display: flex;
    align-items: center;
    padding-right: 16px;
    padding-left: 8px;
    justify-content: space-between;
    margin-right: 25px;

    span {
        font-weight: 600;
        font-size: 14px;
        line-height: 23px;
        text-align: right;
        color: #323232;
    }
    .act {
        width: 145px;
        height: 43px;
        background: #dff7ff;
        border-radius: 10px;
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
            color: #323232;
            font-weight: 600;
            font-size: 17px;
            line-height: 30px;
            text-align: right;
            width: 60px;
            height: 33px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }
        .shop-active {
            background: #108abb;
            border-radius: 10px;
            color: #fff;
        }
    }
`;

const Blog = styled.div`
    margin-top: 110px;
    padding: 32px 50px;
    padding-bottom: 100px;
    height: 650px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100% !important;
    background: #ffffff;
    -webkit-clip-path: polygon(0 1%, 100% 0, 100% 100%, 0 89%);
    clip-path: polygon(0 1%, 100% 0, 100% 100%, 0 89%);
    .blog-text {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        p {
            font-weight: 600;
            font-size: 22px;
            line-height: 31px;
            text-align: center;
            margin-bottom: 12px;
        }
        span {
            font-weight: normal;
            font-size: 16px;
            line-height: 23px;
            color: #666666;
        }
    }
    @media (max-width: 1200px) {
        height: 100%;
        padding-bottom: 70px;
    }
`;

const BlogCards = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 24px;
    max-width: 1300px;
    margin-right: auto;
    margin-left: auto;
    .blog-card {
        position: relative;
        min-width: 200px;
        max-width: 280px;
        padding-bottom: 20px;
        margin-right: 5px;
        margin-left: 5px;
    }
    .badge {
        position: absolute;
        top: 8px;
        right: 8px;
        width: 58px;
        height: 28px;
        background: #bc4110;
        border-radius: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .date {
        position: absolute;
        bottom: 38px;
        left: 8px;
        color: #fff;
        font-size: 12px;
    }
    @media (max-width: 1200px) {
        max-width: 1200px;
        overflow: scroll;
        .blog-card {
        }
    }
    @media (max-width: 786px) {
        flex-direction: column;
        align-items: center;
    }
`;

const WhyBithold = styled.div`
    padding: 0px 50px;
    width: 100% !important;
    height: 450px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .d-flex {
        @media (max-width: 786px) {
            flex-direction: column;
            align-items: center;
        }
    }
    p {
        font-weight: 600;
        font-size: 22px;
        line-height: 31px;
        text-align: center;
        margin-bottom: 12px;
    }
    span {
        font-weight: normal;
        font-size: 16px;
        line-height: 23px;
        color: #666666;
    }
    .card {
        margin: 0 10px;
        min-width: 272px;
        height: 150px;
        background: #ffffff;
        box-shadow: 0px 2px 18px rgba(61, 189, 200, 0.1);
        border-radius: 8px;
        padding: 33px 20px;
        display: flex !important;
        text-align: right;
        flex-direction: row;
        overflow: visible;
        justify-content: space-between;
        align-items: center;
        margin-top: 24px;
        h6 {
            font-weight: 600;
            font-size: 16px;
            line-height: 23px;
            color: #323232;
            margin-right: 10px;
        }
        p {
            font-size: 14px;
            margin-right: 10px;
            line-height: 20px;
            text-align: right;
            color: #474747;
        }
    }
    @media (max-width: 1200px) {
        .cardss {
            margin-top: 40px;
            max-width: 1200px;
            padding-bottom: 20px;
        }
        .card {
        }
    }
    @media (max-width: 810px) {
        .card {
            h6 {
                font-size: 14px;
            }
            p {
                font-size: 12px;
            }
        }
    }
`;

const Application = styled.div`
    margin-top: 24px;
    display: flex;
    justify-content: center;
    padding: 79px 50px;
    height: 100%;
    width: 100% !important;
    background: #ffffff;
    -webkit-clip-path: polygon(0 0, 100% 12%, 100% 100%, 0% 100%);
    clip-path: polygon(0 0, 100% 12%, 100% 100%, 0% 100%);
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
        margin-right: auto;
        margin-left: auto;
        border-radius: 10px;
    }
    @media (max-width: 920px) {
        padding: 39px 50px;
    }
    @media (max-width: 550px) {
        flex-direction: column;
    }
`;

const App = styled.div`
    text-align: right;
    h4 {
        font-weight: 600;
        font-size: 22px;
        line-height: 31px;
        color: #323232;
        margin-top: 30px;
    }
    p {
        margin-top: 20px;
        font-size: 17px;
        line-height: 24px;
        color: #323232;
        padding-left: 30px;
    }
    img {
        cursor: pointer;
    }
    @media (max-width: 992px) {
        h4 {
            font-size: 15px;
        }
        p {
            font-size: 13px;
            margin-top: 0;
        }
    }
    @media (max-width: 400px) {
        h4 {
            text-align: center;
        }
        p {
            text-align: center;
            padding-left: 0px;
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

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 6,
        slidesToSlide: 6,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1200 },
        items: 6,
        slidesToSlide: 6,
    },
    tablet: {
        breakpoint: { max: 1200, min: 664 },
        items: 3,
        slidesToSlide: 3,
    },
    mobile: {
        breakpoint: { max: 664, min: 0 },
        items: 1,
        slidesToSlide: 1,
    },
};
export default function Home() {
    const {user, authenticated} = useContext(UserContext);
    const [shop, setShop] = useState("TMN");
    const [showMenu, setShowMenu] = useState(false);
    const [coins, setCoins] = useState([]);
    const [posts, setBlogs] = useState([]);
    const [img, setImg] = useState(null);
    const [full, setFull] = useState(false);
    
    useEffect(() => {
        if(authenticated) {
            setImg(user.avatar)
        };
    }, [user, authenticated]);

    let greenRandom =
        "/images/green-chart" + (Math.floor(Math.random() * 6) + 1) + ".svg";
    let redRandom =
        "/images/red-chart" + (Math.floor(Math.random() * 6) + 1) + ".svg";

    useEffect(() => {
        axios.get(`https://blog.bithold.exchange/index.php/wp-json/wp/v2/posts/?per_page=8`)
        .then((res) => {
            setBlogs(res.data);
        })
        .catch((error) => {});
    }, []);

    let row = -1;
    let ii = 1;
    

    let config_2 = {
        url: `${baseUrl}service/list/`,
        method: "GET",
    };


    useEffect(() => {
        !(function () {
            var i = "Wd6EPY",
                a = window,
                d = document;
            function g() {
                var g = d.createElement("script"),
                    s = "https://www.goftino.com/widget/" + i,
                    l = localStorage.getItem("goftino_" + i);
                (g.async = !0), (g.src = l ? s + "?o=" + l : s);
                d.getElementsByTagName("head")[0].appendChild(g);
            }
            "complete" === d.readyState
                ? g()
                : a.attachEvent
                ? a.attachEvent("onload", g)
                : a.addEventListener("load", g, !1);
        })();
    }, []);


    useEffect(() => {
        axios(config_2)
            .then((res) => {
                if (res.status == "200") {
                    setCoins(res.data);
                    doller = res.data.find((i) => {
                        return i.name == "تومان";
                    });
                }
            })
            .catch((error) => {});
    }, []);
    useEffect(() => {
        setInterval(() => {
            axios(config_2)
                .then((res) => {
                    if (res.status == "200") {
                        setCoins(res.data);
                        doller = res.data.find((i) => {
                            return i.name == "تومان";
                        });
                    }
                })
                .catch((error) => {});
        }, 60000);
    }, []);

    const closeHandler = (e) => {
        setShowMenu(false);
    };

    const particlesInit = useRef(async (main) => {
        await loadFull(main);
    });

 
    return (
        <Main className="max-w-1992">
            <Head>
                <link rel="shortcut icon" href="/images/fav.png" />
                <title>بیت هولد | بزرگ ترین سامانه مبادله ارزهای دیجیتال</title>
            </Head>
            <LandingSidebar shows={showMenu.toString()} close={closeHandler} />

            <div className="px-4">
                <HeadMain>
                <Particles
                        id="tsparticles"
                        init={particlesInit.current}
                        options={ParticleOptinsV2}
                        />
                    <Header>
                        <div
                            onClick={() => {
                                setShowMenu(true);
                            }}
                            className="toggle"
                        >
                        <MenuOpenIcon />
                        </div>
                        <ul>
                            <li
                                className="active-li"
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
                            >
                                درباره ما
                            </li>
                        </ul>
                        {authenticated ? (
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
                    <div className="d-flex h-to-c to-center align-items-center overflow-hidden mt-2 justify-content-between">
                       
                        <div className="mt-60">
                            <div className="mb-5 d-flex go-col">
                                {!authenticated ? (
                                    <h6>
                                        به بزرگترین بازار ارز دیجیتال ایران
                                        بپیوندید
                                    </h6>
                                ) : (
                                    <h6>
                                        به بزرگترین بازار ارز دیجیتال ایران خوش
                                        آمدید
                                    </h6>
                                )}
                            </div>
                            {!authenticated ? (
                                <div className="login-box">
                                    <button
                                        onClick={() => {
                                            Router.push("/register");
                                        }}
                                    >
                                        ثبت نام
                                    </button>
                                    <button
                                        onClick={() => {
                                            Router.push("/login");
                                        }}
                                    >
                                        ورود
                                    </button>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <h4 className=" me-5">
                            بزرگ ترین سامانه خرید و فروش
                            <br />
                            امن
                            <span> بیت کوین </span>و<span> ارزهای دیجیتال</span>
                        </h4>
                        <div className="img-res">
                            <img
                                src="/images/gif.gif"
                                alt=""
                                width={490}
                                height={280}
                            />
                        </div>
                    </div>
                </HeadMain>
                <div
                    className={
                        full ? "to-full table-wrapper" : " table-wrapper"
                    }
                >
                    <ChooseShop>
                        <span>انتخاب بازار :</span>
                        <div className="act">
                            <span
                                className={shop === "TMN" ? "shop-active" : ""}
                                onClick={() => {
                                    setShop("TMN");
                                }}
                            >
                                تومان
                            </span>
                            <span
                                className={shop === "USDT" ? "shop-active" : ""}
                                onClick={() => {
                                    setShop("USDT");
                                }}
                            >
                                تتر
                            </span>
                        </div>
                    </ChooseShop>

                    <table>
                        <thead>
                            <tr className="font-to-13">
                                <th className="d-flex res-d-none align-items-center"></th>
                                <th className="align-middle">
                                    <svg
                                        className="c-p"
                                        onClick={() => {
                                            setFull(!full);
                                        }}
                                        fill="#535353"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20.254"
                                        height="20.254"
                                        viewBox="0 0 269.254 269.254"
                                    >
                                        <path
                                            id="expand"
                                            d="M0,120.95V46.424A14.39,14.39,0,0,1,14.424,32H88.95a7.233,7.233,0,0,1,7.212,7.212V63.253a7.233,7.233,0,0,1-7.212,7.212H38.465V120.95a7.233,7.233,0,0,1-7.212,7.212H7.212A7.233,7.233,0,0,1,0,120.95ZM173.092,39.212V63.253a7.233,7.233,0,0,0,7.212,7.212h50.485V120.95A7.233,7.233,0,0,0,238,128.162h24.041a7.233,7.233,0,0,0,7.212-7.212V46.424A14.39,14.39,0,0,0,254.83,32H180.3A7.233,7.233,0,0,0,173.092,39.212Zm88.95,165.88H238a7.233,7.233,0,0,0-7.212,7.212v50.485H180.3A7.233,7.233,0,0,0,173.092,270v24.041a7.233,7.233,0,0,0,7.212,7.212H254.83a14.39,14.39,0,0,0,14.424-14.424V212.3A7.233,7.233,0,0,0,262.042,205.092Zm-165.88,88.95V270a7.233,7.233,0,0,0-7.212-7.212H38.465V212.3a7.233,7.233,0,0,0-7.212-7.212H7.212A7.233,7.233,0,0,0,0,212.3V286.83a14.39,14.39,0,0,0,14.424,14.424H88.95A7.233,7.233,0,0,0,96.162,294.042Z"
                                            transform="translate(0 -32)"
                                        />
                                    </svg>{" "}
                                    <span className="me-2"> نام ارز</span>
                                </th>
                                <th className="align-middle ">آخرین قیمت</th>
                                <th className="align-middle res-d-none">
                                    تغییرات 24 ساعت
                                </th>
                                <th className="align-middle res-d-none">
                                    نمودار هفتگی
                                </th>
                                <th className="align-middle"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {coins.map((item) => {
                                row++;
                                return item.name !== "تومان" ? (
                                    <tr className="fo-to-13" key={item.id}>
                                        <td className="align-middle res-d-none">
                                            {row}
                                        </td>
                                        <td className="align-middle to-cols">
                                            <img
                                                src={item.image}
                                                alt="coin"
                                                width={30}
                                                height={30}
                                            />
                                            <span className="me-2 to-colss">
                                                <span className="bold ms-0">
                                                    {item.small_name_slug.toUpperCase()}
                                                </span>
                                                <span className="persian-name">
                                                    {item.name}
                                                </span>
                                            </span>
                                        </td>
                                        <td className="align-middle dir-ltr">
                                            {shop == "USDT" ? (
                                                item.name !== "تومان" ? (
                                                    <span>
                                                        {item.buyPrice} $
                                                    </span>
                                                ) : (
                                                    (
                                                        1 / coins[0].buyPrice
                                                    ).toFixed(6)
                                                )
                                            ) : item.name !== "تومان" ? (
                                                <div className="rtl">
                                                    {(
                                                        item.buyPrice.toFixed(
                                                            3
                                                        ) * coins[0].buyPrice
                                                    ).toLocaleString() +
                                                        " تومان "}
                                                </div>
                                            ) : (
                                                "1"
                                            )}
                                        </td>
                                        <td className="position-relative res-d-none">
                                            <div
                                                className={
                                                    item.quote_usd !==
                                                        undefined &&
                                                    item.quote_usd.percent24h >
                                                        0
                                                        ? "plus changes"
                                                        : item.quote_usd !==
                                                              undefined &&
                                                          item.quote_usd
                                                              .percent24h < 0
                                                        ? "nega changes"
                                                        : "zero changes"
                                                }
                                            >
                                                {item.quote_usd !== undefined &&
                                                    item.quote_usd.percent24h}
                                            </div>
                                        </td>
                                        <td className="position-relative res-d-none">
                                            {/* <LandingChart
                                                id={item.id}
                                                strokee={
                                                    item.market_cap_change_percentage_24h >
                                                    0
                                                        ? ["#30E0A1"]
                                                        : ["#F6543E"]
                                                }
                                            /> */}
                                            {item.quote_usd !== undefined &&
                                            item.quote_usd.percent24h > 0 ? (
                                                <img
                                                    className="ch-img"
                                                    src={
                                                        "/images/green-chart" +
                                                        (Math.floor(
                                                            Math.random() * 6
                                                        ) +
                                                            1) +
                                                        ".svg"
                                                    }
                                                    alt=""
                                                    width={160}
                                                    height={60}
                                                />
                                            ) : (
                                                <img
                                                    className="ch-img"
                                                    src={
                                                        "/images/red-chart" +
                                                        (Math.floor(
                                                            Math.random() * 6
                                                        ) +
                                                            1) +
                                                        ".svg"
                                                    }
                                                    alt=""
                                                    width={160}
                                                    height={60}
                                                />
                                            )}
                                        </td>
                                        <td className="ps-2 btn-resp ">
                                            <button
                                                onClick={() => {
                                                    Router.push("/trade");
                                                }}
                                                className="btn rounded btn-success"
                                            >
                                                خرید
                                            </button>
                                            <button
                                                onClick={() => {
                                                    Router.push("/trade");
                                                }}
                                                className="btn rounded btn-danger me-2"
                                            >
                                                فروش
                                            </button>
                                        </td>
                                    </tr>
                                ) : (
                                    ""
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <Blog>
                <div className="blog-text">
                    <p>وبلاگ بیت هولد</p>
                    <span>درباره اخرین اخبار رمز ارز بخوانید</span>
                </div>
                <BlogCards>
                    {posts.map((item) => (
                        <div key={item.id} className="blog-card">
                            <a href={item.link}>
                                <Image
                                    className="mx-auto"
                                    src={item.fimg_url}
                                    width={270}
                                    height={160}
                                    alt="blog"
                                />
                                <div className="badge">اخبار</div>
                                <div className="date">15 اردیبهشت</div>
                                <div className="text">
                                    {item.title.rendered}
                                </div>
                            </a>
                        </div>
                    ))}
                </BlogCards>
            </Blog>
            <WhyBithold className="text-center">
                <p>چرا از بیت هولد خرید کنیم</p>
                <div className="dir-l">
                    <Carousel
                        autoPlay={true}
                        autoPlaySpeed={4000}
                        swipeable={true}
                        draggable={false}
                        showDots={true}
                        responsive={responsive}
                        infinite={false}
                        keyBoardControl={true}
                        customTransition="all .5"
                        transitionDuration={500}
                        containerClass="carousel-container"
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"
                    >
                        <div className="carousel-div">
                            <img src="/images/1.png" width={180} alt="" />
                            <span>پشتیبانی از ارزهای متنوع </span>
                        </div>
                        <div className="carousel-div">
                            <img src="/images/2.png" width={180} alt="" />
                            <span>پشتیبانی 24 ساعته</span>
                        </div>
                        <div className="carousel-div">
                            <img src="/images/3.png" width={180} alt="" />
                            <span>امکان خرید حضوری</span>
                        </div>
                        <div className="carousel-div">
                            <img src="/images/4.png" width={180} alt="" />
                            <span>کارمزد معاملات پایین</span>
                        </div>
                        <div className="carousel-div">
                            <img src="/images/6.png" width={180} alt="" />
                            <span>امنیت بالا</span>
                        </div>
                        <div className="carousel-div">
                            <img src="/images/7.png" width={180} alt="" />
                            <span>احراز هویت در چند دقیقه</span>
                        </div>
                    </Carousel>
                </div>
            </WhyBithold>
            <Application>
                <App>
                    <h4>نسخه موبایل بیت هولد</h4>
                    <p>
                        وبسایت بیت هولد با ارائه نسخه موبایل با رابط کاربری زیبا
                        و آسان سعی در جلب رضایت کاربران خود داشته است. همچنین به
                        زودی اپلیکیشن بیت هولد در دو نسخه اندروید و ios منتشر
                        خواهد شد.
                    </p>
                </App>

                <ReactCompareImage
                    hover="true"
                    leftImage="/images/dark.jpg"
                    rightImage="/images/light.jpg"
                    sliderLineWidth="2"
                />
            </Application>
            <Footer />
            <CopyRight>کلیه حقوق برای بیت هولد محفوظ میباشد 2022</CopyRight>
        </Main>
    );
}
