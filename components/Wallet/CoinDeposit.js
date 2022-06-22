import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
// import QRCode from "react-qr-code";
import { baseUrl } from "../BaseUrl";
import axios from "axios";
import CopyIcon from '../icons/CopyIcon'
const Main = styled.div`
    z-index: 10;
    .lds-ring {
        display: inline-block;
        position: relative;
        width: 8px;
        height: 8px;
    }
    .lds-ring div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 20px;
        top: -3px;
        height: 20px !important;
        margin: 4px;
        margin-right: 100px;
        border: 2px solid #000;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: #000 transparent transparent transparent;
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
    .to-col,
    .to-col div {
        height: 200px;
    }
    .div-sel select {
        padding: 5px 10px;
        border: 1px solid #ddd;
        padding-left: 17px;
    }
    .btn-done {
        margin-top: 34px;
        color: #fff;
        width: 358px;
        height: 40px;
        border-radius: 8px;
        background: linear-gradient(90deg, #128cbd -1.72%, #3dbdc8 100%);
        @media (max-width: 786px) {
            width: 238px;
        }
    }
    .btn-done-2 {
        margin-top: 24px;
        color: #fff;
        width: 200px;
        height: 36px;
        border-radius: 8px;
        background: linear-gradient(90deg, #128cbd -1.72%, #3dbdc8 100%);
    }
    .m-w-20 {
        min-width: 20px;
    }
    .box {
        width: 645px;
        background: #ffffff;
        border-radius: 16px;
        position: fixed;
        box-shadow: 0 0 14px #0002;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 32px;
        span {
            font-weight: 600;
            font-size: 16px;
        }
        p {
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
            text-align: right;
            max-width: 320px;
            color: #29335c;
        }
        h6 {
            font-size: 16px;
            font-weight: 500;
            color: #4c4c4c;
            margin-top: 28px;
            margin-bottom: 6px;
        }
        .adress-box {
            width: 320px;
            height: 44px;
            background: #ffffff;
            border: 1.5px solid #dbdbdb;
            border-radius: 8px;
            padding: 8px 16px;
            display: flex;
            color: #6d6d6d;
            font-weight: normal;
            font-size: 13.5px;
            overflow-y: hidden;
            div {
                margin-top: 3px;
                margin-left: 3px;
                @media (max-width: 786px) {
                    font-size: 9.5px;
                    margin-top: 6px;
                }
            }
        }
        .qr-code {
            transform: scale(0.5);
            transform-origin: top;
        }
        .text-red {
            font-weight: 500;
            font-size: 26px;
            line-height: 70px;
            margin-right: 20px;
            color: #f15152;
        }
    }
    .to-col {
        flex-wrap: wrap;
        @media (max-width: 786px) {
            .qr-code {
                display: none;
            }
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
        .qr-code {
            margin-top: 40px;
        }
        .adress-box {
            width: 240px !important;
            margin-right: 0;
            font-size: 12px;
        }
    }
`;

const TxId = styled.div`
    width: 100%;
    height: 100%;
    .center {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    input {
        width: 280px;
        height: 40px;
        border-radius: 10px;
        border: 1px solid #ddd;
        padding: 10px;
        text-align: left;
    }
`;

const CoinDeposit = (props) => {
    const wallet = props.wallet;
    const itemTo = props.itemTo;
    const [adress, setAdress] = useState("");
    const [done, setDone] = useState(false);
    const [selectNetwork, setSelectNetwork] = useState(false);
    const [txId, setTxId] = useState("");
    const [loading, setLoading] = useState(false);

    let item = wallet.find((i) => {
        if (i.service !== undefined) {
            return i.service.small_name_slug == itemTo.small_name_slug;
        }
    });
    const netHandler = (n) => {
       

            let data = {
                network: n,
                wallet: item.id,
            };
            let config = {
                method: "POST",
                url: `${baseUrl}wallet/deposit/address/`,
                data: data,
                headers: {"Content-type": "application/json"}
            };
        setLoading(true);
        axios(config)
            .then((response) => {
                setLoading(false);
                setAdress(response.data.address);
            })
            .catch((error) => {})
        .finally(f=>setLoading(false))
    };
    const doneHandler = (n) => {
            let data = {
                tx_id: txId,
                wallet: item.id,
            };
            let config = {
                method: "POST",
                url: `${baseUrl}wallet/deposit/`,
                data: data,
                headers: {
                    "Content-type": "application/json",
                },
            };
            setLoading(true)
            axios(config)
            .then((response) => {
                response.data.error != 0
                ? toast.error(response.data.message)
                : toast.success(response.data.message);
            })
            .catch((error) => {})
            .finally(f=>setLoading(false))
    }
    return (
        <Main>
            <div
                className={props.theme == "light" ? "bg-gray box" : " box"}
            >
                {selectNetwork ? (
                    !done ? (
                        <>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <span>واریز به کیف پول شما</span>
                                <svg
                                    onClick={() => {
                                        props.setBlur(false);
                                        props.setShowCoinDeposit(false);
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
                            <div className="d-flex to-col justify-content-between">
                                <div>
                                    <p>
                                        آدرس کیف پول شما در کادر زیر قابل مشاهده
                                        است برای واریز کردن ارزهای دیجیتال به
                                        این کیف پول میتوانید از این آدرس استفاده
                                        کنید.
                                    </p>
                                    <h6>آدرس کیف پول شما</h6>
                                    <div className="adress-box">
                                    
                                            <CopyIcon  onClick={() => {
                                                navigator.clipboard.writeText(
                                                    adress
                                                );
                                                toast.success("آدرس کپی شد");
                                            }}
                                            className="c-p m-w-20 ms-1"/>
                                        {loading ? (
                                            <div className="lds-ring">
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                            </div>
                                        ) : (
                                            <div>{adress}</div>
                                        )}
                                    </div>
                                </div>
                                <div className="qr-code">
                                    {/* <QRCode value={adress} /> */}
                                    <div className="text-red">
                                        بارکد آدرس کیف پول
                                    </div>
                                </div>
                                <div className="position-absolute"></div>
                            </div>
                            <div className="text-center mx-auto">
                                <span>
                                    لطفا بعد از واریز ، روی دکمه واریز کردم کلیک
                                    کنید .
                                </span>
                                <button
                                    onClick={() => {
                                        setDone(true);
                                    }}
                                    className="btn-done mx-auto"
                                >
                                    واریز کردم
                                </button>
                            </div>
                        </>
                    ) : (
                        <TxId>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <span>واریز به کیف پول شما</span>
                                <svg
                                    onClick={() => {
                                        props.setBlur(false);
                                        props.setShowCoinDeposit(false);
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
                            <div className="center">
                                <p>tx-id را وارد کنید</p>
                                <input
                                    placeholder="tx-id"
                                    className="mb-2"
                                    type="text"
                                    name=""
                                    id=""
                                    onChange={(e) => {
                                        setTxId(e.target.value);
                                    }}
                                />
                                <input
                                    placeholder="مقدار"
                                    type="number"
                                    name=""
                                    id=""
                                />
                                <button
                                    className="btn-done-2"
                                    onClick={doneHandler}
                                    disabled={loading}
                                >
                                    {
                                        loading?
                                            <div class="spinner-border spinner-border-sm" role="status"></div>
                                        : <div>ثبت</div>
                                    }
                                </button>
                            </div>
                        </TxId>
                    )
                ) : (
                    <>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <span>واریز به کیف پول شما</span>
                            <svg
                                onClick={() => {
                                    props.setBlur(false);
                                    props.setShowCoinDeposit(false);
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
                        <div className="div-sel">
                            <p>لطفا شبکه واریز را انتخاب کنید</p>
                            <select
                                name="network"
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    setSelectNetwork(true);
                                    netHandler(e.target.value);
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
                    </>
                )}
            </div>
        </Main>
    );
};

export default CoinDeposit;
