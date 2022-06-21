import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import styled from "styled-components";
import { baseUrl } from "../BaseUrl";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Main = styled.div`
    padding: 32px;
    padding-right: 0;
    padding-left: 0;
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
    button {
        :disabled {
            opacity: 0.5;
        }
    }
    h6 {
        font-weight: 600;
        font-size: 18px;
    }
    @media (max-width: 786px) {
        padding: 0;
        margin-top: 32px;
    }
    .lds-ring {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
    }
    .lds-ring div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 24px;
        height: 24px;
        margin: 8px;
        margin-right: 30px;
        border: 3px solid #fff;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: #fff transparent transparent transparent;
    }
    .lds-ring div:nth-child(1) {
        animation-delay: -0.45s;
    }
    .lds-ring div:nth-child(2) {
        animation-delay: -0.3s;
    }
    .lds-ring div:nth-child(3) {
        animation-delay: -0.15s;
    }
    @keyframes lds-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

const Box = styled.div`
    background: #ffffff;
    box-shadow: 0px 2px 8px rgba(50, 50, 50, 0.12);
    border-radius: 16px;
    width: 390px;
    height: 396px;
    margin-top: 16px;
    padding: 20px;

    .bazar-be {
        margin-bottom: 0px !important;
        margin-top: 0px !important;
    }

    .shop-select {
        margin-top: 17.5px;
        margin-right: 10px;
        margin-bottom: 17.5px;
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
    .buy-btn {
        margin-top: 33px;
        color: #fff;
        width: 358px;
        height: 40px;
        border-radius: 8px;
        background: linear-gradient(90deg, #128cbd -1.72%, #3dbdc8 100%);
    }
    @media (max-width: 786px) {
        width: 343px;
        height: 100%;

        .d-flex {
            flex-wrap: wrap;
        }
        .buy-btn {
            margin-top: 16px;
            width: 305px;
        }
    }
    .sell-btn {
        background: linear-gradient(
            90deg,
            #ff3c00 -1.72%,
            #ff792b 100%
        ) !important;
    }
`;

const BoxHead = styled.div`
    width: 163px;
    height: 32px;
    background-color: #edf8fc;
    border-radius: 6px;
    padding: 4px;
    button {
        width: 75px;
    }
    .buy-active {
        background: #108abb;
        color: #fff;
        border-radius: 10px 4px 4px 10px;
    }
    .sell-active {
        background: linear-gradient(
            90deg,
            #ff3c00 -1.72%,
            #ff792b 100%
        ) !important;
        color: #fff;
        border-radius: 4px 10px 10px 4px;
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
    h5 {
        font-size: 16px;
        font-weight: 400;
        margin-top: 16px;
        color: #323232;
    }
    img {
        width: 22px;
        margin-left: 5px;
    }
`;
const Amount = styled.div`
    h5 {
        font-size: 16px;
        font-weight: 400;
        margin-top: 16px;
        color: #323232;
    }
    input {
        width: 168px;
        height: 42px;
        background: #edf8fc;
        border: 1px solid #dedede;
        border-radius: 8px;
        padding: 0 8px;
        text-align: left;
        ::-webkit-outer-spin-button,
        ::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        -moz-appearance: textfield;
    }
    .select-all {
        padding: 0 10px;
        background-color: #eee;
        border-radius: 4px;
        font-size: 12px;
        margin-top: 8px;
    }
    @media (max-width: 786px) {
        input {
            width: 305px;
        }
    }
`;

const FastOrder = (props) => {
    const [activeTab, setActiveTab] = useState("buy");
    const [selectedCoin, setSelectedCoin] = useState();
    const [selectedCoinTwo, setSelectedCoinTwo] = useState();
    const [shopActive, setShopActive] = useState("1");
    const [wallet, setWallet] = useState([]);
    const [usdtState, setUsdtState] = useState(null);
    const [tomanState, setTomanState] = useState(null);
    const [buyAmount, setBuyAmount] = useState();
    const [sellAmount, setSellAmount] = useState();
    const [buyAmountWithOutFee, setBuyAmountWithOutFee] = useState();
    const [sellAmountWithOutFee, setSellAmountWithOutFee] = useState();
    const [loading, setLoading] = useState(false);
    const [btnDis, setBtnDis] = useState(true);
    const [buyActive, setBuyActive] = useState(true);
    const [sellActive, setSellActive] = useState(false);
    const [sellShowModal, setSellShowModal] = useState(false);
    const [buyShowModal, setBuyShowModal] = useState(false);
    const [sellFixFee, setSellFixFee] = useState([]);
    const [buyFixFee, setBuyFixFee] = useState([]);
    const [buyAm, setBuyM] = useState();
    const [sellAm, setSellAm] = useState();
    const [buyCustomPrice, setBuyCustomPrice] = useState(false);
    const [sellCustomPrice, setSellCustomPrice] = useState(false);
    const [destinationPrice, setDestinationPrice] = useState();
    const [coins, setCoins] = useState([]);

    const [sellMsg, setSellMsg] = useState("");
    const [buyMsg, setbuyMsg] = useState("");

    const [buyError, setBuyError] = useState(false);
    const [sellError, setSellError] = useState(false);
    let configs = {
        url: `${baseUrl}service/list/`,
        method: "GET",
    };
    useEffect(() => {
        axios(configs)
            .then((res) => {
                setCoins(res.data);
            })
            .catch((error) => {});
    }, []);
    let sellBalance =
        selectedCoin !== undefined
            ? wallet.find((i) => {
                  return (
                      i.service !== null &&
                      i.service.small_name_slug == selectedCoin.value
                  );
              })
            : "";
    let token = "";
    setTimeout(() => {
        token = localStorage.getItem("token");
    }, 2000);

    let toman = [];
    let usdt = [];
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
                        setWallet(res.data);
                        setBalance(res.data);
                    }
                })
                .catch((error) => {});
        }, 3000);
    }, []);
    const setBalance = (e) => {
        usdt = e.find((i) => {
            return i.service.name == "تتر";
        });
        setUsdtState(usdt);
        toman = e.find((i) => {
            return i.service.name == "تومان";
        });
        setTomanState(toman);
    };

    const handleChange = (selectedCoin) => {
        setSelectedCoin(selectedCoin);
    };
    const handleChangeTwo = (selectedCoinTwo) => {
        setSelectedCoinTwo(selectedCoinTwo);
    };

    //
    useEffect(() => {
        setTimeout(() => {
            let data = new FormData();
            setBtnDis(true);
            data.append(
                "destination",
                selectedCoinTwo !== undefined ? selectedCoinTwo.id : ""
            );
            data.append(
                "source",
                usdtState !== null && usdtState !== undefined
                    ? shopActive == "1"
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
                    Authorization: `Bearer ${token}`,
                },
                method: "POST",
                url: `${baseUrl}order/calculator/`,
                data: data,
            };
            axios(config)
                .then((response) => {
                    response.data.error !== 0 ? "" : setBtnDis(false);
                    setBuyAmountWithOutFee(response.data.amount_with_out_fee);
                    setBuyFixFee(response.data);
                    setBuyM(response.data.source_price);
                    setbuyMsg(response.data.message);
                    if (response.data.error !== 0) {
                        setBuyError(true);
                    }
                    if (response.data.error == 0) {
                        setBuyError(false);
                    }
                    if (shopActive == "1") {
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
        }, 2000);
    }, [selectedCoinTwo, shopActive, buyAmount]);
    useEffect(() => {
        setTimeout(() => {
            let data = new FormData();
            setBtnDis(true);
            data.append(
                "source",
                selectedCoin !== undefined ? selectedCoin.id : ""
            );
            data.append(
                "destination",
                usdtState !== null && usdtState !== undefined
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
                    Authorization: `Bearer ${token}`,
                },
                method: "POST",
                url: `${baseUrl}order/calculator/`,
                data: data,
            };
            axios(config)
                .then((response) => {
                    response.data.error !== 0 ? "" : setBtnDis(false);
                    setSellAmountWithOutFee(response.data.amount_with_out_fee);
                    setSellFixFee(response.data);
                    setDestinationPrice(response.data.destination_price);
                    setSellMsg(response.data.message);
                    if (response.data.error !== 0) {
                        setSellError(true);
                    }
                    if (response.data.error == 0) {
                        setSellError(false);
                    }
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
        }, 2000);
    }, [selectedCoin, shopActive, sellAmount]);

    const buyHandler = (e) => {
        setLoading(true);

        setTimeout(() => {
            let data = {
                changed: "destination",
                description: "",
                source_asset:
                    usdtState !== null && usdtState !== undefined
                        ? shopActive == "1"
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
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                method: "POST",
                url: `${baseUrl}order/create/`,
                data: data,
            };
            axios(config)
                .then((response) => {
                    toast.success(response.data.message, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setLoading(false);
                })
                .catch((error) => {
                    toast.error("خطایی وجود دارد", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setLoading(false);
                });
        }, 3000);
    };
    const sellHandler = (e) => {
        setLoading(true);
        setSellShowModal(false);
        setTimeout(() => {
            let data = {
                changed: "source",
                description: "",
                destination_asset:
                    usdtState !== null && usdtState !== undefined
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
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                method: "POST",
                url: `${baseUrl}order/create/`,
                data: data,
            };
            axios(config)
                .then((response) => {
                    toast.success(response.data.message, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setLoading(false);
                })
                .catch((error) => {
                    toast.error("خطایی وجود دارد", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setLoading(false);
                });
        }, 3000);
    };
    let selectItem = [];
    let selectTwoItem = [];

    let withotToman = coins.filter(
        (names) => selectTwoItem !== undefined && names.name !== "تومان"
    );
    let withotTether = coins.filter(
        (names) => selectItem !== undefined && names.name !== "تتر"
    );
    console.log(buyError);
    return (
        <Main>
            <h6 className={props.night == "true" ? "color-white-2" : ""}>
                سفارش سریع
            </h6>

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
                            {sellFixFee.fix_fee !== undefined
                                ? sellFixFee.fix_fee.toFixed(3)
                                : ""}{" "}
                            <span>{shopActive == "2" ? "تتر" : "تومان"}</span>
                        </span>
                    </div>
                    <div className="d-flex mb-3 justify-content-between">
                        <span>کارمزد تراکنش</span>
                        <span>
                            {sellFixFee.fix_fee !== undefined
                                ? sellFixFee.fee.toFixed(3)
                                : ""}{" "}
                            <span>{shopActive == "2" ? "تتر" : "تومان"}</span>
                        </span>
                    </div>
                    <div className="d-flex mb-3 justify-content-between">
                        <span>مجموع کارمزد</span>
                        <span>
                            {sellFixFee.fix_fee !== undefined
                                ? sellFixFee.total_fee.toFixed(3)
                                : ""}{" "}
                            <span>{shopActive == "2" ? "تتر" : "تومان"}</span>
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
                            {destinationPrice}{" "}
                            {shopActive == "1" ? "تتر" : "تومان"}
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
                        <span>{shopActive == "1" ? "تتر" : "تومان"}</span>
                    </div>

                    <div className="d-flex mb-3 justify-content-between">
                        <span>کارمزد ثابت</span>
                        <span>
                            {buyFixFee.fix_fee !== undefined
                                ? buyFixFee.fix_fee.toFixed(3)
                                : ""}{" "}
                            <span>{shopActive == "1" ? "تتر" : "تومان"}</span>
                        </span>
                    </div>
                    <div className="d-flex mb-3 justify-content-between">
                        <span>کارمزد تراکنش</span>
                        <span>
                            {buyFixFee.fix_fee !== undefined
                                ? buyFixFee.fee.toFixed(3)
                                : ""}{" "}
                            <span>{shopActive == "1" ? "تتر" : "تومان"}</span>
                        </span>
                    </div>
                    <div className="d-flex mb-3 justify-content-between">
                        <span>مجموع کارمزد</span>
                        <span>
                            {buyFixFee.fix_fee !== undefined
                                ? buyFixFee.total_fee.toFixed(3)
                                : ""}{" "}
                            <span>{shopActive == "1" ? "تتر" : "تومان"}</span>
                        </span>
                    </div>

                    <div className="d-flex mb-3 justify-content-between">
                        <span>مبلغ تراکنش</span>
                        <span>
                            {buyAm} {shopActive == "1" ? "تتر" : "تومان"}
                        </span>
                    </div>
                    <div className="d-flex mb-3 justify-content-between">
                        <span>
                            میزان دریافتی شما
                            <small>(این مقدار حدودی است)</small>
                        </span>
                        <span>{buyAmountWithOutFee}</span>
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
            <Box className={props.night == "true" ? "bg-gray " : ""}>
                <BoxHead className={props.night == "true" ? "bg-dark-2" : ""}>
                    <button
                        onClick={() => {
                            setActiveTab("buy");
                            setSellAmount("");
                            setBuyAmount("");
                            setSelectedCoinTwo("");
                            setSelectedCoin("");
                        }}
                        className={
                            activeTab === "buy"
                                ? "buy-active"
                                : props.night == "true"
                                ? "color-white-2"
                                : ""
                        }
                        type="button"
                    >
                        خرید
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab("sell");
                            setSellAmount("");
                            setBuyAmount("");
                            setSelectedCoinTwo("");
                            setSelectedCoin("");
                        }}
                        className={
                            activeTab === "sell"
                                ? "sell-active"
                                : props.night == "true"
                                ? "color-white-2"
                                : ""
                        }
                        type="button"
                    >
                        فروش
                    </button>
                </BoxHead>
                <div className="d-flex align-items-center">
                    <span className="bazar-be">بازار به :</span>
                    <div className="shop-select">
                        <button
                            onClick={() => {
                                setShopActive("1");
                            }}
                            className={shopActive === "1" ? "btn-active" : ""}
                        >
                            تتر
                        </button>
                        <button
                            onClick={() => {
                                setShopActive("2");
                            }}
                            className={shopActive === "2" ? "btn-active" : ""}
                        >
                            تومان
                        </button>
                    </div>
                </div>
                <Inventory
                    className={props.night == "true" ? "color-white-2" : ""}
                >
                    <span>موجودی شما :</span>
                    {!sellActive ? (
                        <div className="text-danger mt-3 d-inline-block">
                            اعتبار نا کافی !
                        </div>
                    ) : (
                        ""
                    )}
                    <span>
                        <span>
                            {activeTab == "buy" && shopActive == "1" ? (
                                usdtState !== null &&
                                usdtState !== undefined ? (
                                    <span className="ms-2">
                                        {usdtState.balance}
                                    </span>
                                ) : (
                                    <span className="ms-2">
                                        {tomanState !== null &&
                                        tomanState !== undefined
                                            ? tomanState.balance
                                            : ""}
                                    </span>
                                )
                            ) : selectedCoinTwo !== undefined &&
                              sellBalance !== undefined ? (
                                <span className="ms-2">
                                    {usdtState !== null && usdtState.balance}
                                </span>
                            ) : shopActive == "2" ? (
                                <span className="ms-2">
                                    {tomanState !== null && tomanState.balance}
                                </span>
                            ) : (
                                <span className="ms-2">
                                    {usdtState.balance}
                                </span>
                            )}
                        </span>
                    </span>
                </Inventory>
                {activeTab === "buy" ? (
                    <>
                        <div className="d-flex justify-content-between">
                            <SelectCoin>
                                <h5
                                    className={
                                        props.night == "true"
                                            ? "color-white-2"
                                            : ""
                                    }
                                >
                                    انتخاب ارز
                                </h5>
                                <Select
                                    value={selectedCoinTwo}
                                    onChange={handleChangeTwo}
                                    placeholder="انتخاب"
                                    options={
                                        withotTether.length !== 0 &&
                                        shopActive == "2"
                                            ? withotToman.map((i, index) => {
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
                                              })
                                            : withotTether.map((i, index) => {
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
                                              })
                                            ? withotTether.map((i, index) => {
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
                                              })
                                            : coins.map((i, index) => {
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
                                                      value: i.id,
                                                      key: index,
                                                  };
                                              })
                                    }
                                />
                            </SelectCoin>
                            <Amount>
                                <div className="d-flex align-items-center justify-content-between">
                                    <h5
                                        className={
                                            props.night == "true"
                                                ? "color-white-2"
                                                : ""
                                        }
                                    >
                                        مقدار
                                    </h5>
                                </div>
                                <input
                                    className={
                                        props.night == "true" ? "bg-dark-2" : ""
                                    }
                                    placeholder="مقدار"
                                    type="number"
                                    onChange={(e) => {
                                        setBuyAmount(e.target.value);
                                    }}
                                    value={buyAmount}
                                />
                            </Amount>
                        </div>
                        <div className="text-danger mt-3 d-inline-block">
                            {buyMsg !==
                            "مشکل دریافت اطلاعات، لطفا مجددا تلاش نمایید."
                                ? buyMsg
                                : ""}
                        </div>
                        <button
                            className="buy-btn"
                            disabled={!buyActive || buyError}
                            onClick={() => {
                                setBuyShowModal(true);
                                setSellShowModal(false);
                            }}
                        >
                            {loading ? (
                                <div className="lds-ring">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            ) : (
                                "خرید"
                            )}
                        </button>
                    </>
                ) : (
                    <>
                        <div className="d-flex justify-content-between">
                            <SelectCoin>
                                <h5
                                    className={
                                        props.night == "true"
                                            ? "color-white-2"
                                            : ""
                                    }
                                >
                                    انتخاب ارز
                                </h5>
                                <Select
                                    value={selectedCoin}
                                    onChange={handleChange}
                                    placeholder="انتخاب"
                                    options={
                                        withotToman.length !== 0 &&
                                        withotTether.length !== 0 &&
                                        shopActive == "2"
                                            ? withotToman.map((i, index) => {
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
                                              })
                                            : withotTether.map((i, index) => {
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
                                              })
                                    }
                                />
                            </SelectCoin>
                            <Amount>
                                <div className="d-flex align-items-center justify-content-between">
                                    <h5
                                        className={
                                            props.night == "true"
                                                ? "color-white-2"
                                                : ""
                                        }
                                    >
                                        مقدار
                                    </h5>
                                    <button
                                        onClick={(e) => {
                                            setSellAmount(
                                                selectedCoinTwo !== undefined &&
                                                    sellBalance !== undefined
                                                    ? sellBalance.balance
                                                    : ""
                                            );
                                        }}
                                        className="select-all"
                                    >
                                        کل موجودی
                                    </button>
                                </div>
                                <input
                                    className={
                                        props.night == "true" ? "bg-dark-2" : ""
                                    }
                                    onChange={(e) => {
                                        setSellAmount(e.target.value);
                                    }}
                                    type="number"
                                    value={sellAmount}
                                />
                            </Amount>
                        </div>
                        <div className="text-danger mt-3 d-inline-block">
                            {sellMsg !==
                            "مشکل دریافت اطلاعات، لطفا مجددا تلاش نمایید."
                                ? sellMsg
                                : ""}
                        </div>
                        <button
                            className="buy-btn sell-btn"
                            onClick={() => {
                                setBuyShowModal(false);
                                setSellShowModal(true);
                            }}
                            disabled={!sellActive || sellError}
                        >
                            {loading ? (
                                <div className="lds-ring">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            ) : (
                                "فروش"
                            )}
                        </button>
                    </>
                )}
            </Box>
        </Main>
    );
};

export default FastOrder;
