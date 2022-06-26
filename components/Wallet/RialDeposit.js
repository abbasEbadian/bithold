import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { baseUrl } from "../BaseUrl";
import axios from "axios";

const Main = styled.div`
    z-index: 10;
    .selecct {
        width: 220px;
        margin-right: auto;
        margin-left: auto;
        background-color: #0000004b;
        color: #fff;
        padding: 5px 0;
        border-radius: 8px;
    }
    .box {
        width: 595px;
        height: auto;
        background: #ffffff;
        border-radius: 16px;
        box-shadow: 0 0 14px #0002;
        position: fixed;
        top: 425px;
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
        }
    }
    @media (max-width: 786px) {
        .to-col {
            flex-direction: column;
            align-items: center;
        }
    }
    .price-boxs {
        display: flex;
        align-items: center;
        margin-top: 23px;
        width: 100%;
        justify-content: space-between;
        max-width: 600px;
        overflow: auto;
        padding-bottom: 10px;
    }
    .only-box {
        width: 344px;
        height: 39px;
        border: 2px dashed #f6543e;
        box-sizing: border-box;
        border-radius: 8px;
        margin-right: auto;
        margin-left: auto;
        margin-top: 16px;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        text-align: center;
        color: #20232c;
        @media (max-width: 550px) {
            padding: 5px;
            width: 250px;
            height: 69px;
        }
    }
`;

const InputBox = styled.div`
    width: 305px;
    position: relative;
    input {
        background: #ffffff;
        border: 1.5px solid #dbdbdb;
        box-sizing: border-box;
        border-radius: 8px;
        padding: 10px;
        padding-left: 50px;
        width: 100%;
        margin-top: 7px;
        direction: ltr;
    }
    @media (max-width: 550px) {
        width: 250px;
    }
    span {
        position: absolute;
        left: 16px;
        top: 19px;
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
    :hover {
        opacity: 0.9;
    }
`;

const PriceBox = styled.div`
    min-width: 93px;
    margin-left: 5px;
    margin-right: 5px;
    height: 31px;
    background: rgba(16, 138, 187, 0.3);
    border-radius: 61px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const AddCard = styled.div`
    button {
        width: 130px;
        height: 36px;
        border-radius: 10px;
    }
    .d-flex {
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: space-between;
    }
    input {
        width: 100%;
        direction: ltr;
        margin-bottom: 16px;
        height: 40px;
        padding: 10px;
        border-radius: 10px;
        border: 1px solid #ddd;
    }
    .w-50 {
        direction: rtl;
    }
`;
const Limits = styled.div`
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
    margin-top: 20px;
    span {
        text-align: center;
        display: block;
    }
`;
const RialDeposit = (props) => {
    const wallet = props.wallet;
    const itemTo = props.itemTo;
    const [adress, setAdress] = useState("");
    const [value, setValue] = useState("");
    const [cards, setCards] = useState([]);
    const [cardNumber, setCardNumber] = useState("");
    const [shaba, setShaba] = useState("");
    const [bank, setBank] = useState("");
    const [bankNames, setBankNames] = useState("");
    const [cardId, setCardId] = useState();
    let token = "";
    token = localStorage.getItem("token");
    console.log(wallet);
    let item = wallet.find((i) => {
        if (i.service !== undefined) {
            return i.service.small_name_slug == itemTo.small_name_slug;
        }
    });
    console.log(item);
    useEffect(() => {
        setTimeout(() => {
            let data = {
                wallet: item.id,
            };
            let config = {
                method: "GET",
                url: `${baseUrl}bank/name/list/`,
                data: data,
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            axios(config)
                .then((response) => {
                    setBankNames(response.data);
                })
                .catch((error) => {});
        }, 2000);
    }, []);
    useEffect(() => {
        let config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            url: `${baseUrl}bank/list/`,
            method: "GET",
        };
        axios(config)
            .then((res) => {
                if (res.status == "200") {
                    setCards(res.data);
                }
            })
            .catch((error) => {});
    }, []);
    const addCardHandler = (e) => {
        let data = {
            card: cardNumber,
            shaba: "IR" + shaba,
            bank,
        };
        let config = {
            method: "POST",
            url: `${baseUrl}bank/add/`,
            data: data,
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        axios(config)
            .then((response) => {
                toast.error(response.data.message, {
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
                toast.error(error, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    };

    const bankHandler = (e) => {
        let data = new FormData();
        data.append("type", "1");
        data.append("amount", value);
        data.append("bank_id", cardId);
        let config = {
            method: "POST",
            url: `${baseUrl}wallet/manage/`,
            data: data,
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        axios(config)
            .then((response) => {
                response.data.error != 0
                    ? toast.error(response.data.message, {
                          position: "top-center",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                      })
                    : window.open(response.data.link);
            })
            .catch((error) => {});
    };

    return (
        <Main>
            <div
                className={props.theme == "light" ? "bg-gray box" : " box"}
            >
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <span>واریز به کیف پول ریالی</span>
                    <svg
                        onClick={() => {
                            props.setBlur(false);
                            props.setShowRialDeposit(false);
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
                {cards.length !== 0 ? (
                    <>
                        <p>
                            کیف پول خود را با مبلغ دلخواه شارژ و سپس برای معامله
                            های خود استفاده کنید. اعداد به تومان می باشد.
                        </p>
                        <span>مقدار شارژ کیف پول </span>
                        <Limits>
                                <span>
                                    حداقل مقدار واریز :{" "}
                                    <span className="text-danger">
                                        {itemTo !== undefined &&
                                            itemTo.deposit.min}{" "}
                                        {itemTo.name}
                                    </span>
                                </span>
                                <span>
                                    حداکثر مقدار واریز :{" "}
                                    <span className="text-danger">
                                        {itemTo !== undefined &&
                                            itemTo.deposit.max}{" "}
                                        {itemTo.name}
                                    </span>
                                </span>
                            </Limits>
                        <InputBox>
                            <input
                                value={value}
                                onChange={(e) => {
                                    setValue(e.target.value);
                                }}
                                type="number"
                            />
                            <span>تومان</span>
                        </InputBox>
                        <div className="price-boxs">
                            <PriceBox
                                className={
                                    props.theme == "light"
                                        ? "color-white-2"
                                        : ""
                                }
                                onClick={() => {
                                    setValue(5000000);
                                }}
                            >
                                5,000,000
                            </PriceBox>
                            <PriceBox
                                className={
                                    props.theme == "light"
                                        ? "color-white-2"
                                        : ""
                                }
                                onClick={() => {
                                    setValue(10000000);
                                }}
                            >
                                10,000,000
                            </PriceBox>
                            <PriceBox
                                className={
                                    props.theme == "light"
                                        ? "color-white-2"
                                        : ""
                                }
                                onClick={() => {
                                    setValue(15000000);
                                }}
                            >
                                15,000,000
                            </PriceBox>
                            <PriceBox
                                className={
                                    props.theme == "light"
                                        ? "color-white-2"
                                        : ""
                                }
                                onClick={() => {
                                    setValue(20000000);
                                }}
                            >
                                20,000,000
                            </PriceBox>
                            <PriceBox
                                className={
                                    props.theme == "light"
                                        ? "color-white-2"
                                        : ""
                                }
                                onClick={() => {
                                    setValue(50000000);
                                }}
                            >
                                50,000,000
                            </PriceBox>
                        </div>
                        <div
                            className={
                                props.theme == "light"
                                    ? "color-white-2  only-box d-flex align-items-center justify-content-center"
                                    : "  only-box d-flex align-items-center justify-content-center"
                            }
                        >
                            حتما از شماره کارت وارد شده در حساب خود واریز کنید .
                        </div>
                        <div className="w-100 mt-3 d-flex justify-center">
                            <select
                                className="selecct"
                                onChange={(e) => {
                                    setCardId(e.target.value);
                                }}
                                name=""
                                id=""
                            >
                                <option value="انتخاب کارت">انتخاب کارت</option>
                                {cards.map((i) => {
                                    
                                        return (
                                            <option key={i.card} value={i.id} disabled={i.status !== "confirmed"}>
                                                {i.card} {i.status !== "confirmed"? "(تایید نشده)": ""}
                                            </option>
                                        );  
                                })}
                            </select>
                        </div>
                        <div className="w-100 d-flex justify-content-center">
                            <Submit className="mt-3" onClick={bankHandler} disabled={!cardId || !value}>
                                واریز 
                            </Submit>
                        </div>
                    </>
                ) : (
                    <>
                        <p>شما کارت تایید شده ای ندارید</p>
                        <AddCard>
                            <span className="d-block mt-4 mb-3">
                                افزودن کارت
                            </span>
                            <div className="d-flex">
                                <input
                                    onChange={(e) => {
                                        setCardNumber(e.target.value);
                                    }}
                                    type="text"
                                    placeholder="شماره کارت"
                                />
                                <input
                                    onChange={(e) => {
                                        setShaba(e.target.value);
                                    }}
                                    type="text"
                                    placeholder=" IR شماره شبا بدون "
                                />
                            </div>
                            <div className="flex-row align-center w-100 d-flex justify-content-between">
                                <select
                                    className="form-control"
                                    onChange={(e) => {
                                        setBank(e.target.value);
                                    }}
                                >
                                    <option>انتخاب</option>
                                    {bankNames.length !== 0
                                        ? bankNames.map((i) => {
                                              return (
                                                  <option
                                                      key={i.name}
                                                      value={i.name}
                                                  >
                                                      {i.name}
                                                  </option>
                                              );
                                          })
                                        : ""}
                                </select>
                                <button
                                    onClick={addCardHandler}
                                    className="btn-success mt-4"
                                >
                                    افزودن کارت
                                </button>
                            </div>
                        </AddCard>
                    </>
                )}
            </div>
        </Main>
    );
};

export default RialDeposit;
