import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { baseUrl } from "../BaseUrl";
import axios from "axios";

const Main = styled.div`
    z-index: 10;
    .otp {
        display: block;
        border: 1px solid #000;
        border-radius: 8px;
        padding: 5px 10px;
        margin-top: 20px;
        margin-right: auto;
        margin-left: auto;
    }
    .div-sel select {
        padding: 5px 10px;
    }
    .box {
        width: 595px;
        height: unset;
        background: #ffffff;
        border-radius: 16px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 32px;
        p {
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
            text-align: right;
            color: #29335c;
        }
        .text-red {
            color: #f15152;
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
        }
    }
    @media (max-width: 992px) {
        .box {
            width: 90% !important;
            z-index: 1;
        }
    }
    @media (max-width: 786px) {
        .to-col {
            flex-direction: column;
            align-items: center;
        }
        .box {
            height: 520px !important;
        }
    }
`;

const InputBox = styled.div`
    width: 100%;
    position: relative;
    input {
        background: #ffffff;
        border: 1.5px solid #dbdbdb;
        box-sizing: border-box;
        border-radius: 8px;
        padding: 10px;
        width: 100%;
        margin-top: 7px;
    }
    button {
        position: absolute;
        width: 86px;
        height: 31px;
        background: rgba(16, 138, 187, 0.3);
        border-radius: 61px;
        left: 16px;
        top: 14px;
        font-size: 12px;
        font-weight: 500;
        color: #29335c;
    }
`;

const Submit = styled.button`
    width: 193px;
    height: 37px;
    background: linear-gradient(90deg, #128cbd -1.72%, #3dbdc8 100%);
    border-radius: 32px;
    color: #ffff;
    font-weight: 500;
    font-size: 14px;
    margin-right: auto;
    margin-left: auto;
    margin-top: 24px;
    transition: 0.5s;
    :disabled {
        opacity: 0.5;
    }
    :hover {
        opacity: 0.9;
    }
`;

const CoinWithdraw = (props) => {
    const wallet = props.wallet;
    const itemTo = props.itemTo;
    const [adress, setAdress] = useState("");
    const [values, setValues] = useState("");
    const [network, setNetwork] = useState("");
    const [getOtp, setGetOtp] = useState(false);
    const [otp, setOtp] = useState("");

    let token = "";
    setTimeout(() => {
        token = localStorage.getItem("token");
    }, 1000);
    let item = wallet.find((i) => {
        if (i.service !== undefined) {
            return i.service.small_name_slug == itemTo.small_name_slug;
        }
    });
    console.log(item);
    const withdrawOtpHandler = (e) => {
        let config = {
            method: "GET",
            url: `${baseUrl}wallet/withdrawal/otp/`,
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        axios(config)
            .then((response) => {
                setGetOtp(true);
                response.data.error > 0
                    ? toast.error(response.data.message, {
                          position: "top-center",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                      })
                    : toast.success(response.data.message, {
                          position: "top-center",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                      });
            })
            .catch((error) => {});
    };

    const withdrawHandler = (e) => {
        let data = {
            amount: values,
            id: item.id,
            network,
            otp,
            wallet: adress,
        };
        let config = {
            method: "POST",
            url: `${baseUrl}wallet/withdrawal/`,
            data: data,
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        axios(config)
            .then((response) => {
                if (response.data.error > 0) {
                    toast.error(response.data.message, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    toast.success(response.data.message, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                // setAdress(response.data)
            })
            .catch((error) => {});
    };
    return (
        <Main>
            {getOtp ? (
                <div
                    className={
                        props.stts.night == "true" ? "bg-gray box" : " box"
                    }
                >
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <span>برداشت از کیف پول شما</span>
                        <svg
                            onClick={() => {
                                props.setBlur(false);
                                props.setShowCoinWithDrow(false);
                            }}
                            className="c-p"
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 20L20 12"
                                stroke="#777777"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M20 20L12 12"
                                stroke="#777777"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <span>کد تایید را وارد کنید</span>
                    <input
                        className="otp"
                        type="text"
                        onChange={(e) => {
                            setOtp(e.target.value);
                        }}
                    />
                    <div className="w-100 d-flex justify-content-center">
                        <Submit
                            onClick={withdrawHandler}
                            disabled={values > item.balance}
                        >
                            ثبت درخواست برداشت
                        </Submit>
                    </div>
                </div>
            ) : (
                <div
                    className={
                        props.stts.night == "true" ? "bg-gray box" : " box"
                    }
                >
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <span>برداشت از کیف پول شما</span>
                        <svg
                            onClick={() => {
                                props.setBlur(false);
                                props.setShowCoinWithDrow(false);
                            }}
                            className="c-p"
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 20L20 12"
                                stroke="#777777"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M20 20L12 12"
                                stroke="#777777"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <p>
                        در صورت تمایل به برداشت موجودی کیف پول های خود ، درخواست
                        خود را اینجا ثبت نمایید.
                    </p>
                    {item !== undefined ? (
                        <>
                            <p className="text-red">
                                کارمزد انتقال در شبکه{" "}
                                {item !== undefined ? item.service.name : ""}:{" "}
                                {item.service.withdraw.fee}
                                {item.service.small_name_slug}
                            </p>
                            <span>میزان برداشت {item.service.name} </span>
                        </>
                    ) : (
                        ""
                    )}
                    <InputBox>
                        <input
                            type="text"
                            value={values}
                            onChange={(e) => {
                                setValues(e.target.value);
                            }}
                        />
                        <button
                            className={
                                props.stts.night == "true"
                                    ? "color-white-2"
                                    : " "
                            }
                            onClick={() => {
                                setValues(item.balance);
                            }}
                        >
                            کل موجودی
                        </button>
                    </InputBox>
                    <span className="d-block mt-4">آدرس کیف پول مقصد</span>
                    <InputBox>
                        <input
                            onChange={(e) => {
                                setAdress(e.target.value);
                            }}
                            type="text"
                        />
                    </InputBox>
                    <div className="div-sel mt-4">
                        <p>لطفا شبکه واریز را انتخاب کنید</p>
                        <select
                            name="network"
                            onChange={(e) => {
                                setNetwork(e.target.value);
                            }}
                        >
                            <option value=""> انتخاب کنید </option>
                            {itemTo.network.map((i) => {
                                return (
                                    <option key={i.id} value={i.id}>
                                        {i.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    {values > item.balance ? (
                        <div className="text-danger mt-2 me-2">
                            موجودی ناکافی !
                        </div>
                    ) : (
                        ""
                    )}
                    <div className="w-100 d-flex justify-content-center">
                        <Submit
                            onClick={withdrawOtpHandler}
                            disabled={
                                values > item.balance ||
                                network.length == 0 ||
                                values.length == 0 ||
                                adress.length == 0
                            }
                        >
                            ثبت درخواست برداشت
                        </Submit>
                    </div>
                </div>
            )}
        </Main>
    );
};

export default CoinWithdraw;
