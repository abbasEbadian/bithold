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
    iframe {
        width: 100%;
        min-height: 80vh;
        border-radius: 16px;
        border: none !important;
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

export default function Analysis() {
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
    const closeHandler = (e) => {
        setShowMenu(false);
    };
    return (
        <Main className="max-w-1992">
            <Head>
                {" "}
                <link rel="shortcut icon" href="/images/fav.png" />
                <title>بیت هولد | آنالیز</title>
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
                    <div className="page-title">ابزار تحلیل</div>
                </HeadMain>

                <iframe
                    id="tradingview_bc955"
                    src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_bc955&amp;symbol=BINANCE%3ABTCUSDT&amp;interval=1&amp;hidesidetoolbar=0&amp;symboledit=1&amp;saveimage=1&amp;toolbarbg=f1f3f6&amp;studies=%5B%5D&amp;theme=LIGHT&amp;style=1&amp;timezone=Asia%2FTehran&amp;hideideasbutton=1&amp;withdateranges=1&amp;studies_overrides=%7B%7D&amp;overrides=%7B%7D&amp;enabled_features=%5B%5D&amp;disabled_features=%5B%5D&amp;utm_source=arzdigital.com&amp;utm_medium=widget&amp;utm_campaign=chart&amp;utm_term=BINANCE%3ABTCUSDT"
                    allowtransparency="true"
                    scrolling="no"
                    allowFullScreen="true"
                ></iframe>
            </div>
            <Footer />

            <CopyRight>کلیه حقوق برای بیت هولد محفوظ میباشد 2022</CopyRight>
        </Main>
    );
}
