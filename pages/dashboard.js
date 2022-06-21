import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";
import Sidebar from "../components/Sidebar";
import styled from "styled-components";
import Header from "../components/Header";
import { useContext, useEffect, useState } from "react";
import FastOrder from "../components/Dashboard/FastOrder";
import Router from "next/router";
import Select from "react-select";
import { baseUrl } from "../components/BaseUrl";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NightModeContext from "../components/Context";
import Marquee from "react-fast-marquee";

const Main = styled.div`
    background-color: #edf8fc;
    width: 100%;
    min-height: 100vh;
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
        .to-center {
            justify-content: center !important;
            align-items: center !important;
        }
        .y-inv {
            margin-right: 0;
        }
    }
`;

const MainCoin = styled.div`
    h2 {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 12px;
    }
    padding-top: 32px;
    padding-right: 32px;
    @media (max-width: 786px) {
    }
`;

const Cards = styled.div`
    display: flex;
    align-items: center;
    overflow: auto;
    scrollbar-width: thin;
    scrollbar-color: blue orange;
    padding-bottom: 20px;
    max-width: 2000px;
    margin-right: auto;
    margin-left: auto;
    direction: ltr;
    ::-webkit-scrollbar {
        width: 5px;
        height: 9px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #00293957;
        border-radius: 20px;
        width: 5px;
    }
`;

const Card = styled.div`
    position: relative;
    min-width: 187px;
    max-width: 187px;
    height: 177px;
    background-color: #fff;
    box-shadow: 0px 2px 8px rgba(50, 50, 50, 0.12);
    border-radius: 16px;
    padding: 16px;
    margin-left: 16px;
    direction: rtl;
    cursor: pointer;
    h6 {
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        margin-bottom: 0;
        margin-right: 8px;
    }
    span {
        font-weight: 400;
        font-size: 10px;
        display: block;
        margin-right: 8px;
    }
    .mt-90 {
        margin-top: 90px;
    }
    .zero {
        direction: ltr;
        width: 64px;
        height: 22px;
        border-radius: 51px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        line-height: 17px;
        background: #a7a7a7;
        color: #000000;
        font-weight: 600;
    }
    .red {
        direction: ltr;
        width: 64px;
        height: 22px;
        border-radius: 51px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        line-height: 17px;
        background: rgba(246, 84, 62, 0.2);
        color: #f6543e;
        font-weight: 600;
    }
    .green {
        direction: ltr;
        width: 64px;
        height: 22px;
        border-radius: 51px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        line-height: 17px;
        background: rgba(48, 224, 161, 0.2);
        color: #30e0a1;
        font-weight: 600;
    }
    .price {
        color: #323232;
        font-size: 12px;
        line-height: 17px;
    }
    .ch-img {
        position: absolute;
        top: 60px;
    }
`;

const LastOrders = styled.div`
    white-space: nowrap;
    margin-top: 32px;
    table > .scrollable > tbody > tr:nth-of-type(odd) > * {
        background-color: #b4b4b476;
    }

    .scrollable {
        max-height: 330px !important;
        min-height: 100% !important;
        overflow-y: auto !important;
        overflow-x: hidden;
        width: 400px;

        tbody tr {
            width: 400px !important;
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
    .last-box {
        background: #ffffff;
        box-shadow: 0px 2px 8px rgba(50, 50, 50, 0.12);
        border-radius: 16px;
        width: 400px;
        margin-top: 16px;
        height: 394px;
        padding: 20px;
        tbody {
            overflow-y: auto !important;
            max-height: 280px !important;
        }
        thead tr {
            border-radius: 20px;
        }
        thead tr,
        tbody tr {
            display: flex;
        }
        thead th {
            padding: 16px !important;
            font-weight: 400;
            color: #657d95;
            font-size: 14px;
            line-height: 20px;
            width: 100%;
        }
        tbody td {
            padding: 8px 20px;
            font-weight: normal;
            font-size: 14px;
            line-height: 20px;
        }
        tbody > tr:nth-of-type(even) > * {
            width: 100%;
        }
    }
    .arrows {
        display: flex;
        flex-direction: column;
        margin-left: 3px;
        svg {
            margin-bottom: 3px;
        }
    }
    @media (max-width: 992px) {
        .last-box,
        .scrollable tbody tr,
        .scrollable {
            width: 343px !important;
        }
    }
`;

const Change = styled.div`
    h2 {
        margin-bottom: 67px;
    }
    .change {
        width: 336px;
        height: 400px;
        background: #ffffff;
        box-shadow: 0px 2px 8px rgba(50, 50, 50, 0.12);
        border-radius: 16px;
        position: relative;
    }
    .change-head {
        background: rgba(255, 157, 0, 0.2);
        width: 336px;
        height: 39px;
        border-radius: 16px 16px 0px 0px;
        padding: 8px 16px;
        color: #ff9d00;
        font-weight: 600;
        font-size: 16px;
    }
    .change-svg {
        position: absolute;
        left: 20px;
        top: 20px;
    }
    .padd {
        padding: 16px;
    }
    .send-coin {
        color: #4c4c4c;
        font-weight: normal;
        font-size: 16px;
        line-height: 23px;
        margin-top: 40px;
        margin-bottom: 40px;
    }
    .send-box {
        display: flex;
        border-radius: 8px;
        border: 1.5px solid #dbdbdb;
        img {
            width: 22px;
            margin-left: 10px;
        }
    }
    .css-1s2u09g-control,
    .css-b62m3t-container {
        border: none !important;
        border-radius: 0 !important;
        border-top-left-radius: 8px !important;
        border-bottom-left-radius: 8px !important;
    }
    .css-b62m3t-container {
        border-right: 1px solid #dbdbdb !important;
    }

    .css-319lph-ValueContainer {
        border: none !important;
        border-radius: 0 !important;
    }

    .css-14el2xx-placeholder {
        font-size: 14px;
    }
    .amount {
        width: 152px;
        font-size: 14px;
        background: #edf8fc;
        border-left: 1px solid #dbdbdb;
        border-radius: 0 8px 8px 0;
        padding: 8px;
    }
    button {
        margin-top: 20px;
        color: #fff;
        width: 304px;
        height: 42px;
        background: #ff9d00;
        border-radius: 8px;
    }
`;

export default function Dashboard() {
    const [sourcePrice, setSourcePrice] = useState();
    const [orderList, setOrderList] = useState([]);
    const [coins, setCoins] = useState([]);
    const [showMenu, setShowMenu] = useState(false);
    const [selectedOption, setSelectedOption] = useState();
    const [selectedOptionTwo, setSelectedOptionTwo] = useState();
    const [calcRespons, setCalcRespons] = useState();
    const [loading, setLoading] = useState(false);
    const stts = useContext(NightModeContext);
    const [wallet, setWallet] = useState([]);
    const [destinationPrice , setDestinationPrice] = useState("")

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };
    const handleChangeTwo = (selectedOptionTwo) => {
        setSelectedOptionTwo(selectedOptionTwo);
    };
    let token = "";
    setTimeout(() => {
        token = localStorage.getItem("token");
    }, 2000);
    let refreshToken = "";
    setTimeout(() => {
        refreshToken = localStorage.getItem("refresh_token");
    }, 10000);

    setTimeout(() => {
        setInterval(() => {
            inter();
        }, 600000);
    }, 70000);
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

    useEffect(() => {
        // if (
        //     localStorage.getItem("token") == null ||
        //     typeof window == "undefined"
        // ) {
        //     Router.push("/login");
        // }
    }, []);
    let config = {
        url: `${baseUrl}service/list/`,
        method: "GET",
    };
    useEffect(() => {
        axios(config)
            .then((res) => {
                setCoins(res.data);
            })
            .catch((error) => {});
    }, []);
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
                        setBalanceHandler(res.data);
                    }
                })
                .catch((error) => {});
        }, 3200);
    }, []);
    let order_config = {};
    setTimeout(() => {
        order_config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            url: `${baseUrl}order/list/`,
            method: "GET",
        };
    }, 3000);
    useEffect(() => {
        setTimeout(() => {
            axios(order_config)
                .then((res) => {
                    if (res.status == "200") {
                        setOrderList(res.data);
                    }
                })
                .catch((error) => {});
        }, 3200);
    }, []);

    // Fee
    let selectItem = [];
    let selectTwoItem = [];

    selectItem = coins.find((i) => {
        return selectedOption !== undefined ? i.id == selectedOption.value : "";
    });
    let selectItemWallet = wallet.find((i) => {
        return selectedOptionTwo !== undefined
            ? i.service.id == selectedOptionTwo.value
            : "";
    });
    selectTwoItem = coins.find((i) => {
        return selectedOptionTwo !== undefined
            ? i.id == selectedOptionTwo.value
            : "";
    });
    //
    const menuHandler = () => {
        setShowMenu(!showMenu);
    };

    const changeHandler = (e) => {
        let data = {
            changed: "destination",
            description: "",
            destination_asset:
                selectedOption !== undefined && selectedOption.value,
            destination_price: destinationPrice,
            pmethod: "wallet",
            source_asset: selectedOptionTwo.value,
            source_price: sourcePrice,
            type: "swap",
        };
        
        setTimeout(() => {
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
            });
        }, 2600);
    };
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            let data = new FormData();
            data.append(
                "destination",
                selectedOption !== undefined ? selectedOption.value : ""
            );
            data.append(
                "source",
                selectedOptionTwo !== undefined ? selectedOptionTwo.value : ""
            );
            data.append(
                "source-price",
                parseInt(selectTwoItem !== undefined ? sourcePrice : "")
            );
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
                    setLoading(false);
                    setCalcRespons(response.data);
                    setDestinationPrice(response.data.destination_price)
                })
                .catch((error) => {});
        }, 2300);
    }, [sourcePrice, selectedOption, selectedOptionTwo]);
    let newCoins = coins.filter(
        (names) =>
            selectTwoItem !== undefined && names.name !== selectTwoItem.name
    );
    let newCoinsTwo = coins.filter(
        (names) => selectItem !== undefined && names.name !== selectItem.name
    );
    console.log(orderList);
    let x = []
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
                    <title>صرافی بیت هولد | داشبود</title>
                </Head>

                <Sidebar show-menu={menuHandler} active="1" show={showMenu} />
                <Content className={showMenu ? "pr-176" : ""}>
                    <Header show-menu={menuHandler} />
                    <MainCoin>
                        <h2
                            className={
                                stts.night == "true" ? "color-white-2 " : ""
                            }
                        >
                            ارز های اصلی
                        </h2>
                        <Cards>
                            <Marquee loop={0}>
                                {coins.map((item) => {
                                    return (
                                        <Card
                                            className={
                                                stts.night == "true"
                                                    ? "bg-gray "
                                                    : ""
                                            }
                                            key={item.id}
                                        >
                                            <div className="d-flex">
                                                <img
                                                    src={item.image}
                                                    alt="coin"
                                                    width={36}
                                                    height={36}
                                                />
                                                <div className="name">
                                                    <h6>{item.small_name_slug}</h6>
                                                    <span>
                                                        {item.name}
                                                    </span>
                                                </div>
                                            </div>
                                            {item.quote_usd !== undefined && item.quote_usd.percent24h >
                                            0 ? (
                                                <img
                                                    className="ch-img"
                                                    src={"/images/green-chart" + (Math.floor(Math.random() * 6) + 1) + ".svg"}
                                                    alt=""
                                                    width={160}
                                                    height={60}
                                                />
                                            ) : (
                                                <img
                                                    className="ch-img"
                                                    src={"/images/red-chart" + (Math.floor(Math.random() * 6) + 1) + ".svg"}
                                                    alt=""
                                                    width={160}
                                                    height={60}
                                                />
                                            )}
                                            {/* <MyChart
                                            id={item.id}
                                            strokee={
                                                item.quote_usd.percent24h >
                                                0
                                                    ? ["#30E0A1"]
                                                    : ["#F6543E"]
                                            }
                                        /> */}

                                            <div className="d-flex align-items-center mt-90">
                                                <div
                                                    className={
                                                        item.quote_usd !== undefined && item.quote_usd.percent24h ==
                                                        0
                                                            ? "zero"
                                                            : item.quote_usd !== undefined &&  item.quote_usd.percent24h >
                                                              0
                                                            ? "green"
                                                            : "red"
                                                    }
                                                >
                                                    {item.quote_usd !== undefined && item.quote_usd.percent24h} %
                                                </div>
                                                <div
                                                    className={
                                                        stts.night == "true"
                                                            ? "color-white-2 price me-2 "
                                                            : " price me-2"
                                                    }
                                                >
                                                    {item.sellPrice} $
                                                </div>
                                            </div>
                                        </Card>
                                    );
                                })}
                            </Marquee>
                        </Cards>
                    </MainCoin>
                    <div className="d-flex flex-wrap to-center justify-content-around px-32 pb-100">
                        <FastOrder
                            night={stts.night}
                            token={token}
                            coins={coins}
                        />
                        <Change>
                            <h2> </h2>
                            <div
                                className={
                                    stts.night == "true"
                                        ? "bg-gray change"
                                        : "change"
                                }
                            >
                                <div className="change-head">تبدیل</div>
                                <svg
                                    className="change-svg"
                                    width="40"
                                    height="40"
                                    viewBox="0 0 40 40"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        cx="20"
                                        cy="20"
                                        r="19"
                                        fill="#FF9D00"
                                        stroke="white"
                                        strokeWidth="2"
                                    />
                                    <path
                                        d="M18 16L15 13L12 16"
                                        stroke="white"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M15 27V13"
                                        stroke="white"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M22 24L25 27L28 24"
                                        stroke="white"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M25 13V27"
                                        stroke="white"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <div className="padd">
                                    <div className="send-coin">
                                        <h6>مقدار و نوع ارز</h6>
                                        <div className="send-box">
                                            <input
                                                className="amount"
                                                placeholder="مقدار"
                                                type="number"
                                                onChange={(e) => {
                                                    setSourcePrice(
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                            <Select
                                                value={selectedOptionTwo}
                                                onChange={handleChangeTwo}
                                                placeholder="انتخاب"
                                                options={
                                                    newCoinsTwo.length !== 0
                                                        ? newCoinsTwo.map(
                                                              (i, index) => {
                                                                  return {
                                                                      label: i,
                                                                      label: (
                                                                          <div>
                                                                              <img
                                                                                  src={
                                                                                      i.image
                                                                                  }
                                                                                  alt=""
                                                                              />
                                                                              {
                                                                                  i.name
                                                                              }
                                                                          </div>
                                                                      ),
                                                                      value: i.id,
                                                                      key: index,
                                                                  };
                                                              }
                                                          )
                                                        : coins.map(
                                                              (i, index) => {
                                                                  return {
                                                                      label: i,
                                                                      label: (
                                                                          <div>
                                                                              <img
                                                                                  src={
                                                                                      i.image
                                                                                  }
                                                                                  alt=""
                                                                              />
                                                                              {
                                                                                  i.name
                                                                              }
                                                                          </div>
                                                                      ),
                                                                      value: i.id,
                                                                      key: index,
                                                                  };
                                                              }
                                                          )
                                                }
                                            />
                                        </div>
                                    </div>
                                    {}
                                    <div className="send-coin mt-3">
                                        <h6>مقدار و نوع ارز دریافتی </h6>
                                        <div className="send-box">
                                            <input
                                                disabled
                                                className="amount"
                                                placeholder="مقدار دریافتی"
                                                type="text"
                                                value={
                                                    calcRespons !== undefined
                                                        ? calcRespons.destination_price
                                                        : ""
                                                }
                                            />
                                            <Select
                                                value={selectedOption}
                                                onChange={handleChange}
                                                placeholder="انتخاب"
                                                options={
                                                    newCoins.length !== 0
                                                        ? newCoins.map(
                                                              (i, index) => {
                                                                  return {
                                                                      label: i,
                                                                      label: (
                                                                          <div>
                                                                              <img
                                                                                  src={
                                                                                      i.image
                                                                                  }
                                                                                  alt=""
                                                                              />
                                                                              {
                                                                                  i.name
                                                                              }
                                                                          </div>
                                                                      ),
                                                                      value: i.id,
                                                                      key: index,
                                                                  };
                                                              }
                                                          )
                                                        : coins.map(
                                                              (i, index) => {
                                                                  return {
                                                                      label: i,
                                                                      label: (
                                                                          <div>
                                                                              <img
                                                                                  src={
                                                                                      i.image
                                                                                  }
                                                                                  alt=""
                                                                              />
                                                                              {
                                                                                  i.name
                                                                              }
                                                                          </div>
                                                                      ),
                                                                      value: i.id,
                                                                      key: index,
                                                                  };
                                                              }
                                                          )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <button
                                        onClick={changeHandler}
                                        disabled={
                                            selectItemWallet !== undefined &&
                                            sourcePrice >
                                                selectItemWallet.balance
                                        }
                                    >
                                        تبدیل
                                    </button>
                                </div>
                            </div>
                        </Change>
                        <LastOrders
                            className={
                                stts.night == "true" ? "color-white-2 " : ""
                            }
                        >
                            <h5>آخرین تراکنش ها</h5>

                            <table
                                className={
                                    stts.night == "true"
                                        ? "bg-gray last-box table-striped"
                                        : "last-box table-striped"
                                }
                            >
                                <thead>
                                    <tr>
                                        <th className="d-flex align-items-center">
                                            نوع معامله
                                        </th>
                                        <th className="d-flex align-items-center">
                                            مبدا
                                        </th>
                                        <th className="d-flex align-items-center">
                                            مقصد
                                        </th>
                                    </tr>
                                </thead>
                                <div className="scrollable">
                                    <tbody>
                                        {orderList.map((item) => {
                                            return item.destination_asset !==
                                                null ? (
                                                <tr key={item.id}>
                                                    <td>
                                                        {item.destination_asset ==
                                                            "14" ||
                                                        item.destination_asset ==
                                                            "12" ? (
                                                            <div className="text-danger">
                                                                فروش
                                                            </div>
                                                        ) : item.source_asset ==
                                                              "14" ||
                                                          item.source_asset ==
                                                              "12" ? (
                                                            <div className="text-success-2">
                                                                خرید
                                                            </div>
                                                        ) : (
                                                            <div className="text-warning">
                                                                تبدیل
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="align-middle">
                                                      {item.source_amount}{" "}
                                                      {coins.map((e) => {
                                                          if (
                                                              e.id ==
                                                              item.source_asset
                                                          ) {
                                                              return e.small_name_slug;
                                                          }
                                                      })}
                                                  </td>
                                                  <td className="align-middle">
                                                      {item.destination_amount}{" "}
                                                      {coins.map((e) => {
                                                          if (
                                                              e.id ==
                                                              item.destination_asset
                                                          ) {
                                                              return e.small_name_slug;
                                                          }
                                                      })}
                                                  </td>
                                                </tr>
                                            ) : (
                                                ""
                                            );
                                        })}
                                    </tbody>
                                </div>
                            </table>
                        </LastOrders>
                    </div>
                </Content>
            </Main>
        </>
    );
}
