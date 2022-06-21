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
import moment from "jalali-moment";
const Main = styled.div`
    background-color: #edf8fc;
    width: 100%;
    min-height: 100vh;
    .scrollable {
        max-height: 500px;
        overflow: auto;
    }
`;
const Content = styled.div`
    overflow: hidden;
    transition: 0.1s all;
    .p-32 {
        padding: 32px;
        span {
            font-weight: 600;
            font-size: 18px;
            line-height: 26px;
            color: #323232;
        }
    }
`;
const HistoryTable = styled.table`
    min-width: 600px;
    width: 100%;
    margin-top: 20px;
    min-width: 800px;
    overflow: auto;
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
        overflow: auto;

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
    }
`;

export default function History() {
    const stts = useContext(NightModeContext);
    const [showMenu, setShowMenu] = useState(false);
    const [orders, setOrders] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [coins, setCoins] = useState([]);

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
    const menuHandler = () => {
        setShowMenu(!showMenu);
    };
    console.log(transactions);
    let token = "";
    let trans = [];

    setTimeout(() => {
        token = localStorage.getItem("token");
    }, 1000);
    useEffect(() => {
        if (
            localStorage.getItem("token") == null ||
            typeof window == "undefined"
        ) {
            Router.push("/login");
        }
    }, []);
    useEffect(() => {
        setTimeout(() => {
            let config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                url: `${baseUrl}transaction/list/`,
                method: "GET",
            };
            axios(config)
                .then((res) => {
                    setTransactions(res.data);
                })
                .catch((error) => {});
        }, 1200);
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
                        setOrders(res.data);
                    }
                })
                .catch((error) => {});
        }, 4000);
    }, []);

    console.log(orders);

    return (
        <Main
            className={
                stts.night == "true" ? "bg-dark-2 max-w-1992" : "max-w-1992"
            }
        >
            <Head>
                {" "}
                <link rel="shortcut icon" href="/images/fav.png" />
                <title>صرافی بیت هولد | تاریخچه معاملات</title>
            </Head>

            <Sidebar show-menu={menuHandler} active="4" show={showMenu} />
            <Content className={showMenu ? "pr-176" : ""}>
                <Header show-menu={menuHandler} />
                <div className="p-32">
                    <span>معاملات</span>
                    <div className="scrollable">
                        <HistoryTable
                            className={
                                stts.night == "true"
                                    ? "bg-gray table"
                                    : " table"
                            }
                        >
                            <thead>
                                <tr className="align-middle ">
                                    <th scope="col">
                                        <div className="d-flex align-items-center">
                                            شماره تراکنش
                                        </div>
                                    </th>
                                    <th scope="col">
                                        <div className="d-flex align-items-center">
                                            نوع معامله
                                        </div>
                                    </th>
                                    <th scope="col">
                                        <div className="d-flex align-items-center ">
                                            تاریخ
                                        </div>
                                    </th>
                                    <th scope="col">
                                        <div className="d-flex align-items-center ">
                                            مبدا
                                        </div>
                                    </th>
                                    <th scope="col">
                                        <div className="d-flex align-items-center ">
                                            مقصد
                                        </div>
                                    </th>
                                    <th scope="col">
                                        <div className="d-flex align-items-center ">
                                            وضعیت
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length !== 0
                                    ? orders.map((item) => {
                                          return (
                                              <tr key={item.id}>
                                                  <td
                                                      scope="row"
                                                      className="pt-12"
                                                  >
                                                      {item.id}
                                                  </td>

                                                  <td className="align-middle">
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
                                                      {moment(
                                                          item.published.slice(
                                                              0,
                                                              10
                                                          ),
                                                          "YYYY-MM-DD"
                                                      )
                                                          .locale("fa")
                                                          .format("YYYY/MM/DD")}
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
                                                  <td className="align-middle">
                                                      {item.status ==
                                                          "accepted" ||
                                                      item.status ==
                                                          "delivered" ? (
                                                          <div className="text-success-2">
                                                              انجام شده
                                                          </div>
                                                      ) : item.status ==
                                                        "pending" ? (
                                                          <span>در انتظار</span>
                                                      ) : (
                                                          <div className="text-danger">
                                                              رد شده
                                                          </div>
                                                      )}
                                                  </td>
                                              </tr>
                                          );
                                      })
                                    : ""}
                            </tbody>
                        </HistoryTable>
                    </div>
                    <span className="mt-5 d-block">واریز و برداشت</span>
                    <div className="scrollable">
                        <HistoryTable
                            className={
                                stts.night == "true"
                                    ? "bg-gray table"
                                    : " table"
                            }
                        >
                            <thead>
                                <tr className="align-middle ">
                                    <th scope="col">
                                        <div className="d-flex align-items-center">
                                            شماره تراکنش
                                        </div>
                                    </th>
                                    <th scope="col">
                                        <div className="d-flex align-items-center">
                                            تاریخ تراکنش
                                        </div>
                                    </th>
                                    <th scope="col">
                                        <div className="d-flex align-items-center ">
                                            نوع تراکنش
                                        </div>
                                    </th>
                                    <th scope="col">
                                        <div className="d-flex align-items-center ">
                                            مقدار تراکنش
                                        </div>
                                    </th>
                                    <th scope="col">
                                        <div className="d-flex align-items-center ">
                                            وضعیت تراکنش
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.lenght !== 0
                                    ? transactions.map((item) => {
                                          return (
                                              <tr key={item.id}>
                                                  <td
                                                      scope="row"
                                                      className="pt-12"
                                                  >
                                                      {item.id}
                                                  </td>

                                                  <td className="align-middle">
                                                      {moment(
                                                          item.published.slice(
                                                              0,
                                                              10
                                                          ),
                                                          "YYYY-MM-DD"
                                                      )
                                                          .locale("fa")
                                                          .format("YYYY/MM/DD")}
                                                  </td>
                                                  <td className="align-middle">
                                                      {item.type ==
                                                      "deposit" ? (
                                                          <div className="text-success-2">
                                                              واریز
                                                          </div>
                                                      ) : (
                                                          <div className="text-danger">
                                                              برداشت
                                                          </div>
                                                      )}
                                                  </td>
                                                  <td className="align-middle">
                                                      <span>{item.amount}</span>
                                                  </td>
                                                  <td className="align-middle">
                                                      {item.status ==
                                                      "accepted" ? (
                                                          <div className="text-success-2">
                                                              انجام شده
                                                          </div>
                                                      ) : item.status ==
                                                        "pending" ? (
                                                          <span>در انتظار</span>
                                                      ) : (
                                                          <div className="text-danger">
                                                              رد شده
                                                          </div>
                                                      )}
                                                  </td>
                                              </tr>
                                          );
                                      })
                                    : ""}
                            </tbody>
                        </HistoryTable>
                    </div>
                </div>
            </Content>
        </Main>
    );
}
