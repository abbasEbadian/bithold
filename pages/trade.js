import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";
import Sidebar from "../components/Sidebar";
import styled from "styled-components";
import Header from "../components/Header";
import { useContext, useEffect, useState } from "react";
import Router from "next/router";
import axios from "axios";
import { baseUrl } from "../components/BaseUrl";
import NightModeContext from "../components/Context";
import Select from "react-select";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import withAuth from "../utils/withAuth";

const Main = styled.div`
    background-color: #edf8fc;
    width: 100%;
    min-height: 100vh;
    button {
        :disabled {
            opacity: 0.5;
        }
    }
    .select-all {
        width: 100px;
        font-size: 12px;
        height: 35px;
        background-color: #293a44;
        position: absolute;
        right: 10px;
        top: 16px;
    }
    .css-b62m3t-container {
        width: 100% !important;
    }
    .css-1s2u09g-control {
        width: 100% !important;
    }
    
    .my-modal {
        position: fixed;
        width: 360px;
        padding: 16px 20px;
        border-radius: 16px;
        background-color: #293a44;
        color: #fff;
        top: 50%;
        right: 50%;
        z-index: 1;
        transform: translateX(50%) translateY(-50%);
    }
    .sell-btn {
        background: #f6543e;
        margin-bottom: 20px;
        width: 100%;
        height: 42px;
        border-radius: 8px;
        margin-top: 16px;
        font-weight: 600;
        font-size: 16px;
        color: #fff;
    }
    .buy-btn {
        margin-bottom: 20px;
        width: 100%;
        height: 42px;
        background: #30e0a1;
        border-radius: 8px;
        margin-top: 16px;
        font-weight: 600;
        font-size: 16px;
        color: #fff;
    }
`;
const Content = styled.div`
    overflow: hidden;
    transition: 0.1s all;
    padding-bottom: 70px;
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
`;
const TradeMain = styled.div`
    padding: 32px;
    max-width: 1992px;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    display: flex;
    flex-direction: column;
    .full-screen {
        background-color: #fff;
        width: 150px;
        height: 34px;
        border-radius: 10px;
        font-size: 15px;
    }
    .go-to-fullscreen {
        position: absolute;
        width: 100vw;
        height: 100vh;
        left: 0;
        top: 0;
        z-index: 1;
    }
    .exit-fullscreen {
        position: absolute;
        top: 4px;
        right: 70px;
        height: 30px;
        background-color: #fff;
        z-index: 1;
        border-radius: 10px;
        padding: 0 10px;
        font-size: 12px;
    }
    iframe {
        width: 100%;
        height: 422px;
        border-radius: 16px;
        z-index: 1;
        border: none !important;
    }
    @media (min-height: 700px) {
        iframe {
            height: 534px;
        }
    }
`;

const TradeBox = styled.div`
    margin-top: 16px;
    width: 451px;
    height: 100%;
    background: #ffffff;
    box-shadow: 0px 2px 8px rgba(50, 50, 50, 0.12);
    border-radius: 16px;
    @media (max-width: 992px) {
        width: 80%;
    }
    .box-head {
        width: 100%;
        height: 49px;
        border-radius: 16px 16px 0px 0px;
        padding: 8px 16px;
        font-weight: 600;
        font-size: 16px;
    }
    .buy-head {
        background: rgba(48, 224, 161, 0.2);
        color: #30e0a1;
    }
    .sell-head {
        background: rgba(246, 84, 62, 0.2);
        color: #f6543e;
    }
    .box-content {
        padding: 16px;
        .bazar-be {
        }
        .shop-select {
            margin-top: 0px;
            margin-right: 10px;
            margin-bottom: 10px;
            .btn-active {
                color: #2bf824;
            }
            button {
                width: 50px;
                height: 30px;
                font-size: 14px;
                background-color: transparent;
                border: 1px solid #fff !important;
                border-radius: 0 !important;
                color: #777777;

                :first-child {
                    border-top-right-radius: 5px !important;
                    border-bottom-right-radius: 5px !important;
                }
                :last-child {
                    border-top-left-radius: 5px !important;
                    border-bottom-left-radius: 5px !important;
                }
            }
        }
    }
    .border-b {
        padding-bottom: 14px;
        border-bottom: 1px solid #b3b3b3;
    }
    input {
        width: 151px;
        height: 38px;
        background: #edf8fc;
        border: 1px solid #dedede;
        box-sizing: border-box;
        border-radius: 8px;
        padding: 8px;
    }
    .dir-left {
        direction: ltr;
        width: 100%;
        height: 52px;
    }
    span {
        color: #323232;
        font-weight: normal;
        margin-top: 0px;
        font-size: 16px;
        line-height: 16px;
    }
    button {
        width: 100%;
        height: 42px;
        background: #30e0a1;
        border-radius: 8px;
        margin-top: 16px;
        font-weight: 600;
        font-size: 16px;
        color: #fff;
    }
`;

const Inventory = styled.div`
    border-bottom: 1px solid #b3b3b3;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0;
`;

const SelectCoin = styled.div`
    width: 100% !important;
    z-index:3;
    position:relative;
    h5 {
        font-size: 16px;
        font-weight: 400;
        margin-top: 10px;
        color: #323232;
    }
    img {
        width: 22px;
        margin-left: 5px;
    }
`;

function Dashboard() {
    const {theme} = useContext(NightModeContext);
    const [coins, setCoins] = useState([]);
    const [wallet, setWallet] = useState([]);
    const [sellCustomPrice, setSellCustomPrice] = useState(false);
    const [buyCustomPrice, setBuyCustomPrice] = useState(false);
    const [shopActive, setShopActive] = useState("1");
    const [shopActiveTwo, setShopActiveTwo] = useState("1");
    const [fullscreen, setFullscreen] = useState(false);
    const [usdtState, setUsdtState] = useState("");
    const [tomanState, setTomanState] = useState("");
    const [selectedCoin, setSelectedCoin] = useState();
    const [selectedCoinTwo, setSelectedCoinTwo] = useState();
    const [buyAmount, setBuyAmount] = useState();
    const [sellAmount, setSellAmount] = useState();
    const [buyAmountWithOutFee, setBuyAmountWithOutFee] = useState();
    const [sellAmountWithOutFee, setSellAmountWithOutFee] = useState();
    const [loading, setLoading] = useState(false);

    //
    const [sellScheduleAmount, setSellScheduleAmount] = useState();
    const [sellSchedulePrice, setSellSchedulePrice] = useState();
    const [buyAm, setBuyM] = useState();
    const [sellAm, setSellAm] = useState();
    const [buyScheduleAmount, setBuyScheduleAmount] = useState();
    const [buySchedulePrice, setBuySchedulePrice] = useState();
    const [buyActive, setBuyActive] = useState(true);
    const [sellActive, setSellActive] = useState(false);
    const [sellShowModal, setSellShowModal] = useState(false);
    const [buyShowModal, setBuyShowModal] = useState(false);
    //

    const [sellMsg, setSellMsg] = useState("");
    const [buyMsg, setbuyMsg] = useState("");

    // fee
    const [sellFixFee, setSellFixFee] = useState([]);
    const [buyFixFee, setBuyFixFee] = useState([]);

    const [buyError, setBuyError] = useState(false);
    const [sellError, setSellError] = useState(false);

 
    let toman = [];
    let usdt = [];
    
    const [showMenu, setShowMenu] = useState(false);
    const menuHandler = () => {
        setShowMenu(!showMenu);
    };


    const fullscreenHandler = (e) => {
        setFullscreen(true);
    };
    const setBalanceHandler = (e) => {
        toman = e.find((i) => {
            return i.service.name == "تومان";
        });
        setTomanState(toman);
        usdt = e.find((i) => {
            return i.service.name == "تتر";
        });
        setUsdtState(usdt);
    };

    useEffect(() => {
            let config = {
                url: `${baseUrl}wallet/list/`,
                method: "GET",
            };
            axios(config)
                .then((res) => {
                    if (res.status == "200") {
                        setWallet(res.data);
                        setBalanceHandler(res.data);
                    }
                })
                .catch((error) => {});
    }, []);

    let config = {
        url: `${baseUrl}service/list/`,
        method: "GET",
    };
    useEffect(() => {
        axios(config)
            .then((res) => {
                if (res.status == "200") {
                    setCoins(res.data);
                }
            })
            .catch((error) => {});
    }, []);
    const handleChange = (selectedCoin) => {
        setSelectedCoin(selectedCoin);
        tradingViewHandler(selectedCoin);
    };
    const handleChangeTwo = (selectedCoinTwo) => {
        setSelectedCoinTwo(selectedCoinTwo);
        tradingViewHandler(selectedCoinTwo);
    };
    useEffect(() => {
            let data = new FormData();
            data.append(
                "destination",
                selectedCoinTwo !== undefined ? selectedCoinTwo.id : ""
            );
            data.append(
                "source",
                usdtState !== undefined &&
                    usdtState.service !== null &&
                    usdtState.length !== 0
                    ? shopActiveTwo == "1"
                        ? usdtState.service.id
                        : tomanState.service.id
                    : ""
            );
            data.append("source-price", 0);
            data.append("destination-price", buyAmount);
            data.append("changed", "destination");

            let config = {
                headers: {
                    "Content-type": "application/json",
                },
                method: "POST",
                url: `${baseUrl}order/calculator/`,
                data: data,
            };
            axios(config)
                .then((response) => {
                    setBuyAmountWithOutFee(response.data.amount_with_out_fee);
                    setBuyM(response.data.source_price);
                    setbuyMsg(response.data.message);
                    if (response.data.error !== 0) {
                        setBuyError(true);
                    }
                    if (response.data.error == 0) {
                        setBuyError(false);
                    }
                    setBuyFixFee(response.data);
                    if (shopActiveTwo == "1") {
                        if (response.data.source_price > usdtState.balance) {
                            setBuyActive(false);
                        } else {
                            setBuyActive(true);
                        }
                    } else {
                        if (response.data.source_price > tomanState.balance) {
                            setBuyActive(false);
                        } else {
                            setBuyActive(true);
                        }
                    }
                })
                .catch((error) => {});
    }, [
        selectedCoinTwo,
        shopActiveTwo,
        buyAmount,
        buySchedulePrice,
        buyScheduleAmount,
    ]);
    useEffect(() => {
        setTimeout(() => {
            let data = new FormData();
            data.append(
                "source",
                selectedCoin !== undefined ? selectedCoin.id : ""
            );
            data.append(
                "destination",
                usdtState !== undefined &&
                    usdtState.service !== null &&
                    usdtState.length !== 0
                    ? shopActive == "1"
                        ? usdtState.service.id
                        : tomanState.service.id
                    : ""
            );
            data.append("source-price", sellAmount);
            data.append("destination-price", 0);
            data.append("changed", "source");

            let config = {
                headers: {
                    "Content-type": "application/json",
                },
                method: "POST",
                url: `${baseUrl}order/calculator/`,
                data: data,
            };
            axios(config)
                .then((response) => {
                    setSellAmountWithOutFee(response.data.amount_with_out_fee);
                    setSellAm(response.data.destination_price);
                    setSellMsg(response.data.message);
                    if (response.data.error !== 0) {
                        setSellError(true);
                    }
                    if (response.data.error == 0) {
                        setSellError(false);
                    }
                    setSellFixFee(response.data);

                    if (shopActive == "2") {
                        if (sellAmount > sellBalance.balance) {
                            setSellActive(false);
                        } else {
                            setSellActive(true);
                        }
                    } else {
                        if (sellAmount > sellBalance.balance) {
                            setSellActive(false);
                        } else {
                            setSellActive(true);
                        }
                    }
                })
                .catch((error) => {});
        }, 300);
    }, [
        selectedCoin,
        shopActive,
        sellAmount,
        buySchedulePrice,
        buyScheduleAmount,
    ]);
    const buyHandler = (e) => {
        setLoading(true);
        setBuyShowModal(false);
        setTimeout(() => {
            let data = {
                changed: "destination",
                description: "",
                source_asset:
                    usdtState.service !== undefined
                        ? shopActiveTwo == "1"
                            ? usdtState.service.id
                            : tomanState.service.id
                        : "",
                destination_price: parseInt(buyAmount),
                pmethod: "wallet",
                destination_asset: parseInt(
                    selectedCoinTwo !== undefined ? selectedCoinTwo.id : ""
                ),
                source_price: parseInt(
                    buyAmountWithOutFee !== undefined ? buyAmountWithOutFee : ""
                ),
                type: "buy",
            };
            let config = {
                headers: {
                    "Content-type": "application/json"
                },
                method: "POST",
                url: `${baseUrl}order/create/`,
                data: data,
            };
            axios(config)
                .then((response) => {
                    toast.success(response.data.message);
                    setLoading(false);
                })
                .catch((error) => {
                    toast.error("خطایی وجود دارد");
                    setLoading(false);
                });
        }, 330);
    };
    const sellHandler = (e) => {
        setLoading(true);
        setSellShowModal(false);
        setTimeout(() => {
            let data = {
                changed: "source",
                description: "",
                destination_asset:
                    usdtState.service !== undefined
                        ? shopActive == "1"
                            ? usdtState.service.id
                            : tomanState.service.id
                        : "",
                source_price: parseInt(sellAmount),
                pmethod: "wallet",
                source_asset: parseInt(
                    selectedCoin !== undefined ? selectedCoin.id : ""
                ),
                destination_price: parseInt(
                    sellAmountWithOutFee !== undefined
                        ? sellAmountWithOutFee
                        : ""
                ),
                type: "sell",
            };
            let config = {
                headers: {
                    "Content-type": "application/json"
                },
                method: "POST",
                url: `${baseUrl}order/create/`,
                data: data,
            };
            axios(config)
                .then((response) => {
                    toast.success(response.data.message);
                    setLoading(false);
                })
                .catch((error) => {
                    toast.error("خطایی وجود دارد");
                    setLoading(false);
                });
        }, 330);
    };
    const scheduleBuyHandler = (e) => {
        setLoading(true);
        setBuyShowModal(false);
        setTimeout(() => {
            let data = {
                pair:
                    usdtState.service !== undefined
                        ? shopActiveTwo == "1"
                            ? usdtState.service.id
                            : tomanState.service.id
                        : "",
                amount: parseInt(buyScheduleAmount),
                asset: parseInt(
                    selectedCoinTwo !== undefined ? selectedCoinTwo.id : ""
                ),
                price: parseInt(
                    buySchedulePrice !== undefined ? buySchedulePrice : ""
                ),
                type: "buy",
            };
            let config = {
                headers: {
                    "Content-type": "application/json"
                },
                method: "POST",
                url: `${baseUrl}schedule/create/`,
                data: data,
            };
            axios(config)
                .then((response) => {
                    toast.success(response.data.message);
                    setLoading(false);
                })
                .catch((error) => {
                    toast.error("خطایی وجود دارد");
                    setLoading(false);
                });
        }, 330);
    };
    const scheduleSellHandler = (e) => {
        setLoading(true);
        setSellShowModal(false);

        setTimeout(() => {
            let data = {
                pair:
                    usdtState.service !== undefined
                        ? shopActiveTwo == "1"
                            ? usdtState.service.id
                            : tomanState.service.id
                        : "",
                amount: parseInt(sellScheduleAmount),
                asset: parseInt(
                    selectedCoin !== undefined ? selectedCoin.id : ""
                ),
                price: parseInt(
                    sellSchedulePrice !== undefined ? sellSchedulePrice : ""
                ),
                type: "sell",
            };
            let config = {
                headers: {
                    "Content-type": "application/json"
                },
                method: "POST",
                url: `${baseUrl}schedule/create/`,
                data: data,
            };
            axios(config)
                .then((response) => {
                    toast.success(response.data.message);
                    setLoading(false);
                })
                .catch((error) => {
                    toast.error("خطایی وجود دارد");
                    setLoading(false);
                });
        }, 330);
    };
    let sellBalance =
        selectedCoin !== undefined
            ? wallet.find((i) => {
                  return i.service.small_name_slug == selectedCoin.value;
              })
            : "";

    const sellAll = (e) => {
        setSellAmount(sellBalance !== undefined ? sellBalance.balance : "");
    };
    const buyAll = (e) => {};

    // tradingview
    const [tradingCoin, setTradingCoin] = useState("BTC");
    const tradingViewHandler = (e) => {
        setTradingCoin(e.value);
    };

    // Filter coin
    let filterToman = coins.filter((names) => names.name !== "تومان");
    let filterTether = coins.filter((names) => names.name !== "تتر");
    const filterHandler = (e) => {
        filterToman = coins.filter((names) => names.name !== "تومان");
        filterTether = coins.filter((names) => names.name !== "تتر");
    };


    return (
        <Main
            className={
                theme == "light" ? "bg-dark-2 max-w-1992" : "max-w-1992"
            }
        >
            <Head>
                {" "}
                <link rel="shortcut icon" href="/images/fav.png" />
                <title>صرافی بیت هولد | خرید و فروش</title>
            </Head>
            <Sidebar show-menu={menuHandler} active="2" show={showMenu} />
            <Content className={showMenu ? "pr-176" : ""}>
            
                {sellShowModal ? (
                    <div className="my-modal">
                        <div
                            onClick={() => {
                                setSellShowModal(false);
                            }}
                            className="w-100 c-p d-flex"
                        >
                            X
                        </div>
                        <div className="d-flex mb-3 justify-content-between">
                            <span>شما فروشنده هستید</span>
                            <span>
                                {sellAmount}{" "}
                                {selectedCoin !== undefined
                                    ? selectedCoin.value
                                    : ""}
                            </span>
                        </div>
                        <div className="d-flex mb-3 justify-content-between">
                            <span>واحد دریافتی </span>
                            <span>{shopActive == "1" ? "تتر" : "تومان"}</span>
                        </div>

                        <div className="d-flex mb-3 justify-content-between">
                            <span>کارمزد ثابت</span>
                            <span>
                                {sellFixFee !== undefined &&
                                sellFixFee.fix_fee !== undefined
                                    ? sellFixFee.fix_fee.toFixed(3)
                                    : ""}{" "}
                                <span>
                                    {shopActive == "2" ? "تتر" : "تومان"}
                                </span>
                            </span>
                        </div>
                        <div className="d-flex mb-3 justify-content-between">
                            <span>کارمزد تراکنش</span>
                            <span>
                                {sellFixFee !== undefined &&
                                sellFixFee.fix_fee !== undefined
                                    ? sellFixFee.fee.toFixed(3)
                                    : ""}{" "}
                                <span>
                                    {shopActive == "2" ? "تتر" : "تومان"}
                                </span>
                            </span>
                        </div>
                        <div className="d-flex mb-3 justify-content-between">
                            <span>مجموع کارمزد</span>
                            <span>
                                {sellFixFee !== undefined &&
                                sellFixFee.fix_fee !== undefined
                                    ? sellFixFee.total_fee.toFixed(3)
                                    : ""}{" "}
                                <span>
                                    {shopActive == "2" ? "تتر" : "تومان"}
                                </span>
                            </span>
                        </div>

                        <div className="d-flex mb-3 justify-content-between">
                            <span>مبلغ تراکنش</span>
                            <span>
                                {sellAmount}{" "}
                                {selectedCoin !== undefined
                                    ? selectedCoin.value
                                    : ""}
                            </span>
                        </div>

                        <div className="d-flex mb-3 justify-content-between">
                            <span>
                                میزان دریافتی شما
                                <small>(این مقدار حدودی است)</small>
                            </span>
                            <span>
                                {sellAm} {shopActive == "1" ? "تتر" : "تومان"}
                            </span>
                        </div>
                        {sellCustomPrice ? (
                            <button
                                onClick={scheduleSellHandler}
                                className="sell-btn"
                                disabled={!sellActive || sellError}
                            >
                                فروش
                                {selectedCoin !== undefined
                                    ? selectedCoin.value
                                    : ""}
                            </button>
                        ) : (
                            <button
                                onClick={sellHandler}
                                className="sell-btn"
                                disabled={!sellActive || sellError}
                            >
                                فروش
                                {selectedCoin !== undefined
                                    ? selectedCoin.value
                                    : ""}
                            </button>
                        )}
                    </div>
                ) : (
                    ""
                )}
                {buyShowModal ? (
                    <div className="my-modal">
                        <div
                            onClick={() => {
                                setBuyShowModal(false);
                            }}
                            className="w-100 c-p d-flex"
                        >
                            X
                        </div>
                        <div className="d-flex mb-3 justify-content-between">
                            <span>شما خریدار هستید</span>
                            <span>
                                {buyAmount}{" "}
                                {selectedCoinTwo !== undefined
                                    ? selectedCoinTwo.value
                                    : ""}
                            </span>
                        </div>
                        <div className="d-flex mb-3 justify-content-between">
                            <span>روش پرداخت</span>
                            <span>
                                {shopActiveTwo == "1" ? "تتر" : "تومان"}
                            </span>
                        </div>

                        <div className="d-flex mb-3 justify-content-between">
                            <span>کارمزد ثابت</span>
                            <span>
                                {buyFixFee.fix_fee !== undefined
                                    ? buyFixFee.fix_fee.toFixed(3)
                                    : ""}{" "}
                                <span>
                                    {shopActiveTwo == "1" ? "تتر" : "تومان"}
                                </span>
                            </span>
                        </div>
                        <div className="d-flex mb-3 justify-content-between">
                            <span>کارمزد تراکنش</span>
                            <span>
                                {buyFixFee.fix_fee !== undefined
                                    ? buyFixFee.fee.toFixed(3)
                                    : ""}{" "}
                                <span>
                                    {shopActiveTwo == "1" ? "تتر" : "تومان"}
                                </span>
                            </span>
                        </div>
                        <div className="d-flex mb-3 justify-content-between">
                            <span>مجموع کارمزد</span>
                            <span>
                                {buyFixFee.fix_fee !== undefined
                                    ? buyFixFee.total_fee.toFixed(3)
                                    : ""}{" "}
                                <span>
                                    {shopActiveTwo == "1" ? "تتر" : "تومان"}
                                </span>
                            </span>
                        </div>

                        <div className="d-flex mb-3 justify-content-between">
                            <span>مبلغ تراکنش</span>
                            <span>
                                {buyAm} {shopActiveTwo == "1" ? "تتر" : "تومان"}
                            </span>
                        </div>
                        <div className="d-flex mb-3 justify-content-between">
                            <span>
                                میزان دریافتی شما
                                <small>(این مقدار حدودی است)</small>
                            </span>
                            <span>
                                {buyAmount}{" "}
                                {selectedCoinTwo !== undefined
                                    ? selectedCoinTwo.value
                                    : ""}
                            </span>
                        </div>
                        {buyCustomPrice ? (
                            <button
                                onClick={scheduleBuyHandler}
                                className="buy-btn"
                                disabled={!buyActive || buyError}
                            >
                                خرید
                                {selectedCoinTwo !== undefined
                                    ? selectedCoinTwo.value
                                    : ""}
                            </button>
                        ) : (
                            <button
                                onClick={buyHandler}
                                className="buy-btn"
                                disabled={!buyActive || buyError}
                            >
                                خرید
                                {selectedCoinTwo !== undefined
                                    ? selectedCoinTwo.value
                                    : ""}
                            </button>
                        )}
                    </div>
                ) : (
                    ""
                )}
                <Header show-menu={menuHandler} />
                <TradeMain>
                    <div className="">
                        {theme == "light" ? (
                            <>
                                <iframe
                                    className={
                                        fullscreen ? "go-to-fullscreen" : ""
                                    }
                                    id="tradingview_915c5"
                                    src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_915c5&symbol=POLONIEX%3A${tradingCoin}USDT&interval=D&hidesidetoolbar=0&symboledit=0&saveimage=1&toolbarbg=F1F3F6&studies=%5B%5D&hideideas=1&theme=Dark&style=1&timezone=Etc%2FUTC&withdateranges=1&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=fa_IR&utm_source=www.panel.hi-exchange.com&utm_medium=widget&utm_campaign=chart&utm_term=POLONIEX%3A${tradingCoin}USDT`}
                                    allowtransparency="true"
                                    scrolling="no"
                                    allowFullScreen="true"
                                ></iframe>
                                <button
                                    className="full-screen"
                                    onClick={fullscreenHandler}
                                >
                                    تمام صفحه
                                </button>
                                {fullscreen ? (
                                    <button
                                        onClick={() => {
                                            setFullscreen(false);
                                        }}
                                        className="exit-fullscreen"
                                    >
                                        خروج از تمام صفحه
                                    </button>
                                ) : (
                                    ""
                                )}
                            </>
                        ) : (
                            <>
                                <iframe
                                    className={
                                        fullscreen ? "go-to-fullscreen" : ""
                                    }
                                    id="tradingview_915c5"
                                    src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_915c5&symbol=POLONIEX%3A${tradingCoin}USDT&interval=D&hidesidetoolbar=0&symboledit=0&saveimage=1&toolbarbg=F1F3F6&studies=%5B%5D&hideideas=1&theme=Loght&style=1&timezone=Etc%2FUTC&withdateranges=1&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=fa_IR&utm_source=www.panel.hi-exchange.com&utm_medium=widget&utm_campaign=chart&utm_term=POLONIEX%3A${tradingCoin}USDT`}
                                    allowtransparency="true"
                                    scrolling="no"
                                    allowFullScreen="true"
                                ></iframe>
                                <button
                                    className="full-screen"
                                    onClick={fullscreenHandler}
                                >
                                    تمام صفحه
                                </button>
                                {fullscreen ? (
                                    <button
                                        onClick={() => {
                                            setFullscreen(false);
                                        }}
                                        className="exit-fullscreen"
                                    >
                                        خروج از تمام صفحه
                                    </button>
                                ) : (
                                    ""
                                )}
                            </>
                        )}
                    </div>
                </TradeMain>
                <div className="d-flex flex-wrap w-100 justify-content-around">
                    <TradeBox className={theme == "light" ? "bg-gray" : ""}>
                        <div className="box-head buy-head">خرید</div>
                        <div className="box-content">
                            <Inventory
                                className={
                                    theme == "light" ? "color-white-2" : ""
                                }
                            >
                                <span>موجودی شما :</span>
                                <span>
                                    <span>
                                        {shopActiveTwo == "1" ? (
                                            usdtState !== undefined ? (
                                                <span className="ms-2">
                                                    {usdtState.balance}
                                                </span>
                                            ) : (
                                                ""
                                            )
                                        ) : tomanState !== undefined ? (
                                            <span className="ms-2">
                                                {tomanState.balance}
                                            </span>
                                        ) : (
                                            ""
                                        )}
                                    </span>
                                    {shopActiveTwo == "1" &&
                                    usdtState !== undefined ? (
                                        usdtState.service !== undefined ? (
                                            <span className="ms-2">
                                                {usdtState.service.name}
                                            </span>
                                        ) : (
                                            ""
                                        )
                                    ) : tomanState !== undefined &&
                                      tomanState.service !== undefined ? (
                                        <span className="ms-2">
                                            {tomanState.service.name}
                                        </span>
                                    ) : (
                                        ""
                                    )}
                                </span>
                            </Inventory>
                            <div className="d-flex align-items-center">
                                <span className="bazar-be">بازار به :</span>
                                <div className="shop-select">
                                    <button
                                        onClick={() => {
                                            filterHandler();
                                            setShopActiveTwo("1");
                                        }}
                                        className={
                                            shopActiveTwo === "1"
                                                ? "btn-active"
                                                : ""
                                        }
                                    >
                                        تتر
                                    </button>
                                    <button
                                        onClick={() => {
                                            filterHandler();
                                            setShopActiveTwo("2");
                                        }}
                                        className={
                                            shopActiveTwo === "2"
                                                ? "btn-active"
                                                : ""
                                        }
                                    >
                                        تومان
                                    </button>
                                </div>
                            </div>
                            <SelectCoin>
                                <h5
                                    className={
                                        theme == "light"
                                            ? "color-white-2"
                                            : ""
                                    }
                                >
                                    انتخاب ارز
                                </h5>
                                {shopActiveTwo == "2" ? (
                                    <Select
                                        value={selectedCoinTwo}
                                        onChange={handleChangeTwo}
                                        placeholder="انتخاب"
                                        options={filterToman.map((i, index) => {
                                            return {
                                                label: i,
                                                label: (
                                                    <div>
                                                        <img
                                                            src={i.image}
                                                            alt=""
                                                        />
                                                        {i.name}
                                                    </div>
                                                ),
                                                value: i.small_name_slug,
                                                key: index,
                                                id: i.id,
                                            };
                                        })}
                                    />
                                ) : shopActiveTwo == "1" ? (
                                    <Select
                                        value={selectedCoinTwo}
                                        onChange={handleChangeTwo}
                                        placeholder="انتخاب"
                                        options={filterTether.map(
                                            (i, index) => {
                                                return {
                                                    label: i,
                                                    label: (
                                                        <div>
                                                            <img
                                                                src={i.image}
                                                                alt=""
                                                            />
                                                            {i.name}
                                                        </div>
                                                    ),
                                                    value: i.small_name_slug,
                                                    key: index,
                                                    id: i.id,
                                                };
                                            }
                                        )}
                                    />
                                ) : (
                                    ""
                                )}
                            </SelectCoin>
                            <div className=" my-4">
                                {!buyCustomPrice ? (
                                    <div className="position-relative">
                                        <span>مقدار</span>
                                        {/* <button
                                            className="select-all"
                                            onClick={buyAll}
                                        >
                                            کل موجودی
                                        </button> */}
                                        <input
                                            className="dir-left"
                                            onChange={(e) => {
                                                setBuyAmount(e.target.value);
                                            }}
                                            type="text"
                                            placeholder={
                                                selectedCoinTwo !== undefined
                                                    ? selectedCoinTwo.value
                                                    : ""
                                            }
                                            name="price"
                                        />
                                    </div>
                                ) : (
                                    <div className="d-flex">
                                        <div className="ms-2 ">
                                            <div>
                                                <span>مقدار</span>
                                                <input
                                                    onChange={(e) => {
                                                        setBuyScheduleAmount(
                                                            e.target.value
                                                        );
                                                    }}
                                                    className="dir-left"
                                                    type="text"
                                                    placeholder={
                                                        selectedCoinTwo !==
                                                        undefined
                                                            ? selectedCoinTwo.value
                                                            : ""
                                                    }
                                                    name="price"
                                                />
                                            </div>
                                        </div>
                                        <div className="me-2 ">
                                            <div>
                                                <span>در قیمت</span>
                                                <input
                                                    onChange={(e) => {
                                                        setBuySchedulePrice(
                                                            e.target.value
                                                        );
                                                    }}
                                                    className="dir-left"
                                                    type="text"
                                                    name="price"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {!buyActive ? (
                                <div className="text-danger mt-3 d-inline-block">
                                    اعتبار نا کافی !
                                </div>
                            ) : (
                                ""
                            )}
                            <div className="text-danger mt-3 d-inline-block">
                                {buyMsg !==
                                "مشکل دریافت اطلاعات، لطفا مجددا تلاش نمایید."
                                    ? buyMsg
                                    : ""}
                            </div>
                            <label className="toggle">
                                <input
                                    className="toggle-checkbox"
                                    type="checkbox"
                                />
                                <span
                                    onClick={(e) => {
                                        setBuyCustomPrice(!buyCustomPrice);
                                    }}
                                    className={
                                        buyCustomPrice
                                            ? "toggle-switch checked"
                                            : "toggle-switch"
                                    }
                                ></span>
                                <small>خرید در قیمت خاص</small>
                            </label>
                            <button
                                className="buy-btn"
                                onClick={() => {
                                    setBuyShowModal(true);
                                    setSellShowModal(false);
                                }}
                                disabled={!buyActive || buyError}
                            >
                                خرید
                            </button>
                        </div>
                    </TradeBox>
                    <TradeBox className={theme == "light" ? "bg-gray" : ""}>
                        <div className="box-head sell-head">فروش</div>
                        <div className="box-content">
                            <Inventory
                                className={
                                    theme == "light" ? "color-white-2" : ""
                                }
                            >
                                <span>موجودی شما :</span>
                                <span>
                                    <span>
                                        <span className="ms-2">
                                            {selectedCoin !== undefined
                                                ? selectedCoin.value
                                                : ""}{" "}
                                            {sellBalance !== undefined
                                                ? sellBalance.balance
                                                : ""}
                                        </span>
                                    </span>
                                </span>
                            </Inventory>
                            <div className="d-flex align-items-center">
                                <span className="bazar-be">بازار به :</span>
                                <div className="shop-select">
                                    <button
                                        onClick={() => {
                                            setShopActive("1");
                                        }}
                                        className={
                                            shopActive === "1"
                                                ? "btn-active"
                                                : ""
                                        }
                                    >
                                        تتر
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShopActive("2");
                                        }}
                                        className={
                                            shopActive === "2"
                                                ? "btn-active"
                                                : ""
                                        }
                                    >
                                        تومان
                                    </button>
                                </div>
                            </div>
                            <SelectCoin>
                                <h5
                                    className={
                                        theme == "light"
                                            ? "color-white-2"
                                            : ""
                                    }
                                >
                                    انتخاب ارز
                                </h5>
                                {shopActive == "2" ? (
                                    <Select
                                        value={selectedCoin}
                                        onChange={handleChange}
                                        placeholder="انتخاب"
                                        options={filterToman.map((i, index) => {
                                            return {
                                                label: i,
                                                label: (
                                                    <div>
                                                        <img
                                                            src={i.image}
                                                            alt=""
                                                        />
                                                        {i.name}
                                                    </div>
                                                ),
                                                value: i.small_name_slug,
                                                key: index,
                                                id: i.id,
                                            };
                                        })}
                                    />
                                ) : (
                                    <Select
                                        value={selectedCoin}
                                        onChange={handleChange}
                                        placeholder="انتخاب"
                                        options={filterTether.map(
                                            (i, index) => {
                                                return {
                                                    label: i,
                                                    label: (
                                                        <div>
                                                            <img
                                                                src={i.image}
                                                                alt=""
                                                            />
                                                            {i.name}
                                                        </div>
                                                    ),
                                                    value: i.small_name_slug,
                                                    key: index,
                                                    id: i.id,
                                                };
                                            }
                                        )}
                                    />
                                )}
                            </SelectCoin>
                            <div className=" mt-3">
                                {!sellCustomPrice ? (
                                    <div className="position-relative">
                                        <span>مقدار</span>
                                        <button
                                            className="select-all"
                                            onClick={sellAll}
                                        >
                                            کل موجودی
                                        </button>
                                        <input
                                            className="dir-left"
                                            onChange={(e) => {
                                                setSellAmount(e.target.value);
                                            }}
                                            value={sellAmount}
                                            type="text"
                                            placeholder={
                                                selectedCoin !== undefined
                                                    ? selectedCoin.value
                                                    : ""
                                            }
                                            name="price"
                                        />
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                            {!sellActive ? (
                                <div className="text-danger mt-3 d-inline-block">
                                    اعتبار نا کافی !
                                </div>
                            ) : (
                                ""
                            )}
                            <div className="text-danger mt-3 d-inline-block">
                                {sellMsg !==
                                "مشکل دریافت اطلاعات، لطفا مجددا تلاش نمایید."
                                    ? sellMsg
                                    : ""}
                            </div>
                            {sellCustomPrice ? (
                                <div className="d-flex">
                                    <div className="mt-3 ms-2 mb-3">
                                        <div>
                                            <span>مقدار</span>
                                            <input
                                                onChange={(e) => {
                                                    setSellScheduleAmount(
                                                        e.target.value
                                                    );
                                                }}
                                                className="dir-left"
                                                type="text"
                                                placeholder={
                                                    selectedCoin !== undefined
                                                        ? selectedCoin.value
                                                        : ""
                                                }
                                                name="price"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-3 me-2 mb-3">
                                        <div>
                                            <span>در قیمت</span>
                                            <input
                                                onChange={(e) => {
                                                    setSellSchedulePrice(
                                                        e.target.value
                                                    );
                                                }}
                                                className="dir-left"
                                                type="text"
                                                name="price"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                ""
                            )}
                            <label className="toggle">
                                <input
                                    className="toggle-checkbox"
                                    type="checkbox"
                                />
                                <span
                                    onClick={(e) => {
                                        setSellCustomPrice(!sellCustomPrice);
                                    }}
                                    className={
                                        sellCustomPrice
                                            ? "toggle-switch checked"
                                            : "toggle-switch"
                                    }
                                ></span>
                                <small>فروش در قیمت خاص</small>
                            </label>

                            <button
                                className="sell-btn"
                                onClick={() => {
                                    setBuyShowModal(false);
                                    setSellShowModal(true);
                                }}
                                disabled={!sellActive || sellError}
                            >
                                فروش
                            </button>
                        </div>
                    </TradeBox>
                </div>
            </Content>
        </Main>
    );
}


export default withAuth(Dashboard)