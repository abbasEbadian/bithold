import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";
import Sidebar from "../components/Sidebar";
import styled from "styled-components";
import Header from "../components/Header";
import { useContext, useEffect, useState } from "react";
import Router from "next/router";
import Image from "next/image";
import axios from "axios";
import { baseUrl } from "../components/BaseUrl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CoinDeposit from "../components/Wallet/CoinDeposit";
import CoinWithdraw from "../components/Wallet/CoinWithdraw";
import NightModeContext from "../components/Context";
import RialDeposit from "../components/Wallet/RialDeposit";
import RialWithdraw from "../components/Wallet/RialWithdraw";

const Main = styled.div`
    background-color: #edf8fc;
    width: 100%;
    min-height: 100vh;
    position: relative;
    @media (max-width: 992px) {
        .kAUJUI thead tr th,
        .kAUJUI tbody tr th,
        .kAUJUI tbody tr td {
            padding-right: 2px !important;
            padding-left: 10px !important;
            border: none;
        }
        .bhIPnB .text-field-1 {
            top: 24px;
            right: 32px;
            font-size: 14px;
        }
        .bhIPnB .text-field-2 span {
            font-weight: bold;
            font-size: 15px !important;
        }
    }
`;
const Content = styled.div`
    overflow: hidden;
    transition: 0.1s all;
    padding-bottom: 70px;
    .scrollable {
        overflow: auto;
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
    }
    @media (max-width: 786px) {
    }
    .scrollable {
        max-height: 450px !important;
        overflow-y: auto !important;
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

const WalletMain = styled.div`
    padding: 20px 32px;
    min-height: 100vh;
    .balance-1 {
        background: url("/images/bg-balance.png");
        height: 125px;
    }
    .balance-2 {
        background: url("/images/bg-balance-2.png");
        height: 125px;
    }
    @media (max-width: 992px) {
        .balance-2 {
            margin-top: 10px;
        }
    }

    @media (max-width: 992px) {
        .balance-to-col {
            display: flex;
            align-items: center;
            flex-direction: column;
            .me-3 {
                margin-right: 0 !important;
            }
        }
    }
`;

const Balance = styled.div`
    width: 340px;
    @media (max-width: 550px) {
        width: 300px;
        .text-field-2 span {
            font-size: 22px !important;
        }
        .balance-to-col .me-3 {
            margin-top: 0 !important;
        }
    }
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .ms-6 {
        margin-left: 29px;
    }
    .text-field-1 {
        top: 24px;
        right: 32px;
        font-weight: 900;
        font-size: 18px;
        line-height: 26px;
        color: rgba(255, 255, 255, 0.9);
    }
    .text-field-2 {
        left: 32px;
        bottom: 34px;
        color: #fff;
        font-size: 12px;
        line-height: 57px;
        span {
            font-weight: bold;
            font-size: 22px;
            line-height: 60px;
            color: #fff;
        }
    }
`;

const WalletTable = styled.table`
    min-width: 600px;
    width: 100%;
    margin-top: 20px;
    .arrows {
        display: flex;
        flex-direction: column;
        margin-left: 3px;
        svg {
            margin-bottom: 3px;
        }
    }
    thead tr {
        width: 100%;
        border: none;
        background: #ededed;
        border-radius: 8px;
        height: 60px;
    }
    thead tr th,
    tbody tr th,
    tbody tr td {
        padding-right: 20px;
        border: none;
    }
    tbody {
        border-top: none !important;
        background-color: #fff;
        width: 100%;
    }
    .change-num {
        width: 40px;
        height: 22px;
        left: 115px;
        top: 0px;
        background: rgba(246, 84, 62, 0.2);
        border-radius: 51px;
        color: #f6543e;
        text-align: center;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    tbody tr {
        border-bottom: 1px solid #e8e8e8;
    }
    @media (max-width: 992px) {
        .remove-mob {
            display: none !important;
        }
        .remove-mob-2 {
            width: 40px;
            display: none;
        }
        .d-none {
            display: block;
        }
        min-width: 220px;
        font-size: 10px;
        img {
            width: 16px;
            height: 16px;
        }
    }
`;

const ShowGenModal = styled.div`
    width: 260px;
    height: 200px;
    border-radius: 20px;
    background-color: #ddecff;
    position: fixed;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    padding: 20px;
    p {
        margin-top: 10px;
        font-size: 14px;
        text-align: center;
    }
    button {
        width: 100px;
        font-size: 12px;
        margin-top: 14px;
    }
`;

export default function Dashboard() {
    const [coins, setCoins] = useState([]);
    const [id, setId] = useState(null);
    const [wallet, setWallet] = useState([]);
    const [showMenu, setShowMenu] = useState(false);
    const [isGenerate, setIsGenerate] = useState(false);
    const [showCoinDeposit, setShowCoinDeposit] = useState(false);
    const [showCoinWithDrow, setShowCoinWithDrow] = useState(false);
    const [showRialDeposit, setShowRialDeposit] = useState(false);
    const [showRialWithDrow, setShowRialWithDrow] = useState(false);
    const [blur, setBlur] = useState(false);
    const [itemTo, setItemTo] = useState([]);
    const [allT, setAllT] = useState(0);
    const [allToman, setAllToman] = useState(0);
    const [loaded, setLoaded] = useState(true);
    const [showGenModal, setShowGenModal] = useState(false);
    const [itemToGen, setItemToGen] = useState();
    const [actives , setActives] = useState(true)
    const stts = useContext(NightModeContext);
    // 138198.4164
    let row = 0;
    let token = "";
    let allTether = 0;
    const ShowGenModalHandler = (item) => {
        setShowGenModal(true);
    };
    const genratee = (item) => {
        generateHandler(item.id);
    };
    const allCalc = (res) => {
        for (let i = 0; i < res.length; i++) {
            if (res[i].service.small_name_slug !== "IRT") {
                allTether += res[i].balance * res[i].service.buyPrice;
                setAllT(allTether);
            } else {
                allTether += res[i].balance / res[i].service.buyPrice;
                setAllT(allTether);
            }
        }
    };

    setTimeout(() => {
        token = localStorage.getItem("token");
    }, 2000);
    // useEffect(() => {
    //     if (
    //         localStorage.getItem("token") == null ||
    //         typeof window == "undefined"
    //     ) {
    //         Router.push("/login");
    //     }
    // }, []);
    let refreshToken = "";
    setTimeout(() => {
        refreshToken = localStorage.getItem("refresh_token");
    }, 2100);

    setTimeout(() => {
        setInterval(() => {
            inter();
        }, 600000);
    }, 10000);
    const inter = () => {
        let data = {
            refresh: refreshToken,
        };
        let config = {
            method: "POST",
            url: `${baseUrl}token/refresh/`,
            data: data,
        };

        axios(config)
            .then((response) => {
                localStorage.setItem("token", response.data.access);
            })
            .catch((error) => {});
    };
    const menuHandler = () => {
        setShowMenu(!showMenu);
    };
    useEffect(() => {
        setTimeout(() => {
            let config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                url: `${baseUrl}wallet/list/`,
                method: "GET",
            };
            axios(config)
                .then((res) => {
                    if (res.status == "200") {
                        setLoaded(true);
                        setWallet(res.data);
                        allCalc(res.data);
                    }
                })
                .catch((error) => {});
        }, 2200);
    }, []);

    let config_2 = {
        url: `${baseUrl}service/list/`,
        method: "GET",
    };
    useEffect(() => {
        axios(config_2)
            .then((res) => {
                if (res.status == "200") {
                    setCoins(res.data);
                }
            })
            .catch((error) => {});
    }, []);

    // generate

    const generateHandler = (e) => {
        let data = {
            service: e,
        };

        setTimeout(() => {
            let config_3 = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                method: "POST",
                url: `${baseUrl}wallet/generate/`,
                data: data,
            };
            axios(config_3)
                .then((response) => {
                    response.data.error != 1
                        ? toast.success("کیف پول شما با موفقیت ساخته شد", {
                              position: "top-center",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                          }) &&
                          setTimeout(() => {
                              location.reload();
                          }, 2000)
                        : toast.error(response.data.message, {
                              position: "top-center",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                          });
                    if (
                        response.data.message ==
                        "شما کیف پول شما از قبل ساخته شده است."
                    ) {
                        setShowCoinDeposit();
                    }
                })
                .catch((error) => {
                    toast.error(response.data.message, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                });
        }, 2000);
    };

    console.log(token);

    let ids = [];
    return (
        <>
            <Main
                className={
                    stts.night == "true" ? "bg-dark-2 max-w-1992" : "max-w-1992"
                }
            >
                <Head>
                    {" "}
                    <link rel="shortcut icon" href="/images/fav.png" />
                    <title>صرافی بیت هولد | کیف پول</title>
                </Head>

                <Sidebar show-menu={menuHandler} active="3" show={showMenu} />
                <Content className={showMenu ? "pr-176" : ""}>
                    <Header show-menu={menuHandler} />
                    <WalletMain className={blur ? " bg-blur" : ""}>
                        <div className="d-flex balance-to-col">
                            <Balance className=" balance-1">
                                <div className="text-field-1">
                                    تخمین موجودی کوین ها:
                                </div>
                                <div className="text-field-2">
                                    <span>{allT.toLocaleString()}</span> تتر
                                </div>
                            </Balance>
                            <Balance className="me-3 balance-2">
                                <div className="text-field-1">
                                    تخمین موجودی تومانی :
                                </div>
                                <div className="text-field-2">
                                    <div className="d-flex align-items-center">
                                        <svg
                                            width="32"
                                            height="32"
                                            viewBox="0 0 32 32"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                x="0.5"
                                                y="0.5"
                                                width="31"
                                                height="31"
                                                rx="15.5"
                                                fill="#F6543E"
                                                stroke="#F6543E"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M16.7364 12.7636C16.3296 12.3569 15.6704 12.3569 15.2636 12.7636C14.8569 13.1704 14.8569 13.8297 15.2636 14.2364C15.6704 14.6432 16.3296 14.6432 16.7364 14.2364C17.1431 13.8297 17.1431 13.1704 16.7364 12.7636ZM17.6203 11.8797C16.7254 10.9848 15.2746 10.9848 14.3797 11.8797C13.4848 12.7747 13.4848 14.2254 14.3797 15.1203C15.2746 16.0152 16.7254 16.0152 17.6203 15.1203C18.5152 14.2254 18.5152 12.7747 17.6203 11.8797Z"
                                                fill="white"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M11.4167 11.2083C11.7618 11.2083 12.0417 11.4881 12.0417 11.8333V15.1666C12.0417 15.5118 11.7618 15.7916 11.4167 15.7916C11.0715 15.7916 10.7917 15.5118 10.7917 15.1666V11.8333C10.7917 11.4881 11.0715 11.2083 11.4167 11.2083Z"
                                                fill="white"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M20.5833 11.2083C20.9285 11.2083 21.2083 11.4881 21.2083 11.8333V15.1666C21.2083 15.5118 20.9285 15.7916 20.5833 15.7916C20.2382 15.7916 19.9583 15.5118 19.9583 15.1666V11.8333C19.9583 11.4881 20.2382 11.2083 20.5833 11.2083Z"
                                                fill="white"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M16 18.7083C16.3452 18.7083 16.625 18.9881 16.625 19.3333V23.5C16.625 23.8452 16.3452 24.125 16 24.125C15.6548 24.125 15.375 23.8452 15.375 23.5V19.3333C15.375 18.9881 15.6548 18.7083 16 18.7083Z"
                                                fill="white"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M18.1086 21.3914C18.3527 21.6354 18.3527 22.0312 18.1086 22.2753L16.4419 23.9419C16.1979 24.186 15.8021 24.186 15.5581 23.9419C15.314 23.6978 15.314 23.3021 15.5581 23.058L17.2247 21.3914C17.4688 21.1473 17.8645 21.1473 18.1086 21.3914Z"
                                                fill="white"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M13.8914 21.3914C14.1355 21.1473 14.5312 21.1473 14.7753 21.3914L16.4419 23.058C16.686 23.3021 16.686 23.6978 16.4419 23.9419C16.1979 24.186 15.8021 24.186 15.5581 23.9419L13.8914 22.2753C13.6473 22.0312 13.6473 21.6354 13.8914 21.3914Z"
                                                fill="white"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M10.1667 9.125C9.59101 9.125 9.125 9.59101 9.125 10.1667V16.8333C9.125 17.409 9.59101 17.875 10.1667 17.875H12.6667C13.0118 17.875 13.2917 18.1548 13.2917 18.5C13.2917 18.8452 13.0118 19.125 12.6667 19.125H10.1667C8.90066 19.125 7.875 18.0993 7.875 16.8333V10.1667C7.875 8.90066 8.90066 7.875 10.1667 7.875H21.8333C23.0993 7.875 24.125 8.90066 24.125 10.1667V16.8333C24.125 18.0993 23.0993 19.125 21.8333 19.125H19.3333C18.9882 19.125 18.7083 18.8452 18.7083 18.5C18.7083 18.1548 18.9882 17.875 19.3333 17.875H21.8333C22.409 17.875 22.875 17.409 22.875 16.8333V10.1667C22.875 9.59101 22.409 9.125 21.8333 9.125H10.1667Z"
                                                fill="white"
                                            />
                                        </svg>

                                        <svg
                                            className="me-3 ms-6"
                                            width="32"
                                            height="32"
                                            viewBox="0 0 32 32"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                width="32"
                                                height="32"
                                                rx="16"
                                                fill="#30E0A1"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M16.7364 12.7636C16.3296 12.3569 15.6704 12.3569 15.2636 12.7636C14.8569 13.1704 14.8569 13.8297 15.2636 14.2364C15.6704 14.6432 16.3296 14.6432 16.7364 14.2364C17.1431 13.8297 17.1431 13.1704 16.7364 12.7636ZM17.6203 11.8797C16.7254 10.9848 15.2746 10.9848 14.3797 11.8797C13.4848 12.7747 13.4848 14.2254 14.3797 15.1203C15.2746 16.0152 16.7254 16.0152 17.6203 15.1203C18.5152 14.2254 18.5152 12.7747 17.6203 11.8797Z"
                                                fill="white"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M11.4167 11.2083C11.7618 11.2083 12.0417 11.4881 12.0417 11.8333V15.1666C12.0417 15.5118 11.7618 15.7916 11.4167 15.7916C11.0715 15.7916 10.7917 15.5118 10.7917 15.1666V11.8333C10.7917 11.4881 11.0715 11.2083 11.4167 11.2083Z"
                                                fill="white"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M20.5833 11.2083C20.9285 11.2083 21.2083 11.4881 21.2083 11.8333V15.1666C21.2083 15.5118 20.9285 15.7916 20.5833 15.7916C20.2382 15.7916 19.9583 15.5118 19.9583 15.1666V11.8333C19.9583 11.4881 20.2382 11.2083 20.5833 11.2083Z"
                                                fill="white"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M16 18.7083C16.3452 18.7083 16.625 18.9881 16.625 19.3333V23.5C16.625 23.8452 16.3452 24.125 16 24.125C15.6548 24.125 15.375 23.8452 15.375 23.5V19.3333C15.375 18.9881 15.6548 18.7083 16 18.7083Z"
                                                fill="white"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M16.4419 18.8914C16.686 19.1354 16.686 19.5312 16.4419 19.7753L14.7753 21.4419C14.5312 21.686 14.1355 21.686 13.8914 21.4419C13.6473 21.1978 13.6473 20.8021 13.8914 20.558L15.5581 18.8914C15.8021 18.6473 16.1979 18.6473 16.4419 18.8914Z"
                                                fill="white"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M15.5581 18.8914C15.8021 18.6473 16.1979 18.6473 16.4419 18.8914L18.1086 20.558C18.3527 20.8021 18.3527 21.1978 18.1086 21.4419C17.8645 21.686 17.4688 21.686 17.2247 21.4419L15.5581 19.7753C15.314 19.5312 15.314 19.1354 15.5581 18.8914Z"
                                                fill="white"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M10.1667 9.125C9.59101 9.125 9.125 9.59101 9.125 10.1667V16.8333C9.125 17.409 9.59101 17.875 10.1667 17.875H12.6667C13.0118 17.875 13.2917 18.1548 13.2917 18.5C13.2917 18.8452 13.0118 19.125 12.6667 19.125H10.1667C8.90066 19.125 7.875 18.0993 7.875 16.8333V10.1667C7.875 8.90066 8.90066 7.875 10.1667 7.875H21.8333C23.0993 7.875 24.125 8.90066 24.125 10.1667V16.8333C24.125 18.0993 23.0993 19.125 21.8333 19.125H19.3333C18.9882 19.125 18.7083 18.8452 18.7083 18.5C18.7083 18.1548 18.9882 17.875 19.3333 17.875H21.8333C22.409 17.875 22.875 17.409 22.875 16.8333V10.1667C22.875 9.59101 22.409 9.125 21.8333 9.125H10.1667Z"
                                                fill="white"
                                            />
                                        </svg>
                                        <div>
                                            <span>
                                                {wallet.length > 0
                                                    ? (
                                                          allT *
                                                          coins.find(
                                                              (item) =>
                                                                  item.small_name_slug ===
                                                                  "IRT"
                                                          ).buyPrice
                                                      ).toLocaleString()
                                                    : "0"}
                                            </span>{" "}
                                            تومان
                                        </div>
                                    </div>
                                </div>
                            </Balance>
                        </div>
                        <div className="scrollable">
                            <WalletTable
                                className={
                                    stts.night == "true"
                                        ? "bg-gray table"
                                        : " table"
                                }
                            >
                                <thead>
                                    <tr className="align-middle ">
                                        <th scope="col" className=" remove-mob">
                                            <div className="d-flex align-items-center">
                                                <div className="arrows">
                                                    <svg
                                                        width="6"
                                                        height="5"
                                                        viewBox="0 0 6 5"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M2.50405 1.22444C2.59165 1.11489 2.70278 1.02645 2.82919 0.965679C2.95561 0.904904 3.09407 0.873348 3.23434 0.873348C3.3746 0.873348 3.51307 0.904904 3.63949 0.965679C3.7659 1.02645 3.87702 1.11489 3.96462 1.22444L5.75901 3.46766C5.86914 3.6052 5.93816 3.77106 5.95812 3.94612C5.97809 4.12118 5.94818 4.29832 5.87186 4.45713C5.79554 4.61593 5.67589 4.74994 5.52672 4.84372C5.37755 4.93749 5.20492 4.98721 5.02873 4.98714H1.43995C1.26375 4.98721 1.09112 4.93749 0.941953 4.84372C0.792783 4.74994 0.673142 4.61593 0.596817 4.45713C0.520492 4.29832 0.49059 4.12118 0.510555 3.94612C0.53052 3.77106 0.59954 3.6052 0.709663 3.46766L2.50405 1.22444Z"
                                                            fill="#657D95"
                                                        />
                                                    </svg>
                                                    <svg
                                                        width="6"
                                                        height="5"
                                                        viewBox="0 0 6 5"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M3.96502 4.48999C3.87742 4.59954 3.76629 4.68797 3.63988 4.74875C3.51346 4.80952 3.375 4.84108 3.23473 4.84108C3.09447 4.84108 2.956 4.80952 2.82958 4.74875C2.70317 4.68797 2.59205 4.59954 2.50445 4.48999L0.710056 2.24677C0.599934 2.10923 0.530913 1.94337 0.510948 1.76831C0.490983 1.59325 0.520885 1.41611 0.59721 1.2573C0.673535 1.09849 0.793176 0.964484 0.942346 0.870713C1.09152 0.77694 1.26415 0.727223 1.44034 0.727289L5.02912 0.727289C5.20532 0.727223 5.37795 0.77694 5.52712 0.870713C5.67629 0.964484 5.79593 1.09849 5.87225 1.2573C5.94858 1.41611 5.97848 1.59325 5.95852 1.76831C5.93855 1.94337 5.86953 2.10923 5.75941 2.24677L3.96502 4.48999Z"
                                                            fill="#657D95"
                                                        />
                                                    </svg>
                                                </div>
                                                ردیف
                                            </div>
                                        </th>
                                        <th scope="col">
                                            <div className="d-flex align-items-center">
                                                <div className="arrows">
                                                    <svg
                                                        width="6"
                                                        height="5"
                                                        viewBox="0 0 6 5"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M2.50405 1.22444C2.59165 1.11489 2.70278 1.02645 2.82919 0.965679C2.95561 0.904904 3.09407 0.873348 3.23434 0.873348C3.3746 0.873348 3.51307 0.904904 3.63949 0.965679C3.7659 1.02645 3.87702 1.11489 3.96462 1.22444L5.75901 3.46766C5.86914 3.6052 5.93816 3.77106 5.95812 3.94612C5.97809 4.12118 5.94818 4.29832 5.87186 4.45713C5.79554 4.61593 5.67589 4.74994 5.52672 4.84372C5.37755 4.93749 5.20492 4.98721 5.02873 4.98714H1.43995C1.26375 4.98721 1.09112 4.93749 0.941953 4.84372C0.792783 4.74994 0.673142 4.61593 0.596817 4.45713C0.520492 4.29832 0.49059 4.12118 0.510555 3.94612C0.53052 3.77106 0.59954 3.6052 0.709663 3.46766L2.50405 1.22444Z"
                                                            fill="#657D95"
                                                        />
                                                    </svg>
                                                    <svg
                                                        width="6"
                                                        height="5"
                                                        viewBox="0 0 6 5"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M3.96502 4.48999C3.87742 4.59954 3.76629 4.68797 3.63988 4.74875C3.51346 4.80952 3.375 4.84108 3.23473 4.84108C3.09447 4.84108 2.956 4.80952 2.82958 4.74875C2.70317 4.68797 2.59205 4.59954 2.50445 4.48999L0.710056 2.24677C0.599934 2.10923 0.530913 1.94337 0.510948 1.76831C0.490983 1.59325 0.520885 1.41611 0.59721 1.2573C0.673535 1.09849 0.793176 0.964484 0.942346 0.870713C1.09152 0.77694 1.26415 0.727223 1.44034 0.727289L5.02912 0.727289C5.20532 0.727223 5.37795 0.77694 5.52712 0.870713C5.67629 0.964484 5.79593 1.09849 5.87225 1.2573C5.94858 1.41611 5.97848 1.59325 5.95852 1.76831C5.93855 1.94337 5.86953 2.10923 5.75941 2.24677L3.96502 4.48999Z"
                                                            fill="#657D95"
                                                        />
                                                    </svg>
                                                </div>
                                                اسم
                                            </div>
                                        </th>
                                        <th scope="col">
                                            <div className="d-flex align-items-center ">
                                                <div className="arrows">
                                                    <svg
                                                        width="6"
                                                        height="5"
                                                        viewBox="0 0 6 5"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M2.50405 1.22444C2.59165 1.11489 2.70278 1.02645 2.82919 0.965679C2.95561 0.904904 3.09407 0.873348 3.23434 0.873348C3.3746 0.873348 3.51307 0.904904 3.63949 0.965679C3.7659 1.02645 3.87702 1.11489 3.96462 1.22444L5.75901 3.46766C5.86914 3.6052 5.93816 3.77106 5.95812 3.94612C5.97809 4.12118 5.94818 4.29832 5.87186 4.45713C5.79554 4.61593 5.67589 4.74994 5.52672 4.84372C5.37755 4.93749 5.20492 4.98721 5.02873 4.98714H1.43995C1.26375 4.98721 1.09112 4.93749 0.941953 4.84372C0.792783 4.74994 0.673142 4.61593 0.596817 4.45713C0.520492 4.29832 0.49059 4.12118 0.510555 3.94612C0.53052 3.77106 0.59954 3.6052 0.709663 3.46766L2.50405 1.22444Z"
                                                            fill="#657D95"
                                                        />
                                                    </svg>
                                                    <svg
                                                        width="6"
                                                        height="5"
                                                        viewBox="0 0 6 5"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M3.96502 4.48999C3.87742 4.59954 3.76629 4.68797 3.63988 4.74875C3.51346 4.80952 3.375 4.84108 3.23473 4.84108C3.09447 4.84108 2.956 4.80952 2.82958 4.74875C2.70317 4.68797 2.59205 4.59954 2.50445 4.48999L0.710056 2.24677C0.599934 2.10923 0.530913 1.94337 0.510948 1.76831C0.490983 1.59325 0.520885 1.41611 0.59721 1.2573C0.673535 1.09849 0.793176 0.964484 0.942346 0.870713C1.09152 0.77694 1.26415 0.727223 1.44034 0.727289L5.02912 0.727289C5.20532 0.727223 5.37795 0.77694 5.52712 0.870713C5.67629 0.964484 5.79593 1.09849 5.87225 1.2573C5.94858 1.41611 5.97848 1.59325 5.95852 1.76831C5.93855 1.94337 5.86953 2.10923 5.75941 2.24677L3.96502 4.48999Z"
                                                            fill="#657D95"
                                                        />
                                                    </svg>
                                                </div>
                                                مقدار
                                            </div>
                                        </th>
                                        <th className=" " scope="col">
                                            اکشن
                                        </th>
                                        <th className=""></th>
                                        <th className="remove-mob"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {coins.map((item) => {
                                        {
                                            row++;
                                        }
                                        return (
                                            <tr key={item.row}>
                                                <td
                                                    scope="row"
                                                    className="pt-12 remove-mob-2"
                                                >
                                                    {row}
                                                </td>
                                                <td className="align-middle">
                                                    <img
                                                        src={item.image}
                                                        alt="coin"
                                                        width={25}
                                                        height={25}
                                                    />
                                                    <span className="me-2">
                                                        {item.name}
                                                    </span>
                                                </td>
                                                <td className="align-middle">
                                                    <span className="ms-1 text-center">
                                                        {item.small_name_slug}
                                                    </span>
                                                    {wallet.lenght !== 0
                                                        ? wallet.map((wal) => {
                                                              return wal.service !==
                                                                  null &&
                                                                  wal.service
                                                                      .id ===
                                                                      item.id ? (
                                                                  <span>
                                                                      <span className="d-none">
                                                                          {ids.push(
                                                                              item.id
                                                                          )}
                                                                      </span>
                                                                      {wal
                                                                          .balance
                                                                          .lenght !==
                                                                          0 &&
                                                                      wal.balance !==
                                                                          undefined ? (
                                                                          <span>
                                                                              {" "}
                                                                              {
                                                                                  wal.balance
                                                                              }{" "}
                                                                          </span>
                                                                      ) : (
                                                                          " 1 "
                                                                      )}
                                                                  </span>
                                                              ) : (
                                                                  ""
                                                              );
                                                          })
                                                        : ""}
                                                </td>
                                                {/* <td className="align-middle d-flex mt-1">
                                                <div className="change-num ms-2">
                                                    %10-
                                                </div>
                                                <div className="price-num">
                                                    000000000 تومان
                                                </div>
                                            </td> */}
                                                {/* <td className="align-middle">
                                                00000000 تومان
                                            </td> */}
                                                <td className="align-middle ">
                                                    {ids.indexOf(item.id) ==
                                                    -1 ? (
                                                        <>
                                                            <button
                                                                onClick={() => {
                                                                    ShowGenModalHandler(
                                                                        item
                                                                    );
                                                                    setItemToGen(
                                                                        item
                                                                    );
                                                                    setItemTo(
                                                                        item
                                                                    );
                                                                }}
                                                                className="text-success-2"
                                                                disabled={
                                                                    !loaded
                                                                }
                                                            >
                                                                واریز
                                                            </button>
                                                            {showGenModal && (
                                                                <ShowGenModal>
                                                                    <p>
                                                                        شما کیف
                                                                        پول این
                                                                        ارز را
                                                                        ندارید.
                                                                        آیا
                                                                        می‌خواهید
                                                                        کیف پول
                                                                        این ارز
                                                                        برای شما
                                                                        ایجاد
                                                                        شود؟
                                                                    </p>
                                                                    <div className="d-flex justify-content-between mt-5">
                                                                        <button
                                                                            className="btn btn-danger"
                                                                            onClick={() => {
                                                                                setShowGenModal(
                                                                                    false
                                                                                );
                                                                            }}
                                                                        >
                                                                            لغو
                                                                        </button>
                                                                        <button
                                                                            className="btn btn-success"
                                                                            disabled={!actives}
                                                                            onClick={() => {
                                                                                genratee(
                                                                                    itemToGen
                                                                                );
                                                                                setActives(false)
                                                                            }}
                                                                        >
                                                                            ایجاد
                                                                            کیف
                                                                            پول
                                                                        </button>
                                                                    </div>
                                                                </ShowGenModal>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <button
                                                            disabled={!loaded}
                                                            onClick={() => {
                                                                setId(item.id);
                                                                if (
                                                                    item.name ==
                                                                    "تومان"
                                                                ) {
                                                                    setShowRialDeposit(
                                                                        true
                                                                    );
                                                                } else {
                                                                    setShowCoinDeposit(
                                                                        true
                                                                    );
                                                                }
                                                                setBlur(true);
                                                                setItemTo(item);
                                                            }}
                                                            className="text-success-2"
                                                        >
                                                            واریز
                                                        </button>
                                                    )}
                                                </td>
                                                <td className="align-middle ">
                                                    {ids.indexOf(item.id) ==
                                                    -1 ? (
                                                        <button
                                                            disabled={!loaded}
                                                            onClick={() => {
                                                                ShowGenModalHandler(
                                                                    item
                                                                );
                                                                setItemToGen(
                                                                    item
                                                                );
                                                                setItemTo(
                                                                    item
                                                                );
                                                            }}
                                                            className="text-danger-2"
                                                        >
                                                            برداشت
                                                        </button>
                                                    ) : (
                                                        <button
                                                            disabled={!loaded}
                                                            onClick={() => {
                                                                if (
                                                                    item.name ==
                                                                    "تومان"
                                                                ) {
                                                                    setShowRialWithDrow(
                                                                        true
                                                                    );
                                                                } else {
                                                                    setShowCoinWithDrow(
                                                                        true
                                                                    );
                                                                }
                                                                setItemTo(item);
                                                                setBlur(true);
                                                            }}
                                                            className="text-danger-2"
                                                        >
                                                            برداشت
                                                        </button>
                                                    )}
                                                </td>
                                                <td className="align-middle remove-mob">
                                                    <button
                                                        onClick={() => {
                                                            Router.push(
                                                                "/trade"
                                                            );
                                                        }}
                                                        className="text-primary-2"
                                                    >
                                                        معامله
                                                    </button>
                                                </td>
                                                <td className="d-none"></td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </WalletTable>
                        </div>
                    </WalletMain>
                </Content>
                {showCoinDeposit ? (
                    <CoinDeposit
                        wallet={wallet}
                        itemTo={itemTo}
                        setBlur={setBlur}
                        stts={stts}
                        setShowCoinDeposit={setShowCoinDeposit}
                        token={token}
                    />
                ) : (
                    ""
                )}
                {showCoinWithDrow ? (
                    <CoinWithdraw
                        wallet={wallet}
                        itemTo={itemTo}
                        setBlur={setBlur}
                        stts={stts}
                        setShowCoinWithDrow={setShowCoinWithDrow}
                        token={token}
                    />
                ) : (
                    ""
                )}
                {showRialDeposit ? (
                    <RialDeposit
                        wallet={wallet}
                        itemTo={itemTo}
                        setBlur={setBlur}
                        stts={stts}
                        setShowRialDeposit={setShowRialDeposit}
                        token={token}
                    />
                ) : (
                    ""
                )}
                {showRialWithDrow ? (
                    <RialWithdraw
                        wallet={wallet}
                        itemTo={itemTo}
                        setBlur={setBlur}
                        stts={stts}
                        setShowRialWithDrow={setShowRialWithDrow}
                        token={token}
                    />
                ) : (
                    ""
                )}
            </Main>
        </>
    );
}
