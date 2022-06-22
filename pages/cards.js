import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { baseUrl } from "../components/BaseUrl";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "bootstrap/dist/css/bootstrap.css";
import Image from "next/image";
import axios from "axios";
import NightModeContext from "../components/Context";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import CardIcon from '../components/icons/CardIcon'
import UserContext from "../utils/state/userContext";
import withAuth from "../utils/withAuth";
const Content = styled.div`
    overflow: hidden;
    transition: 0.1s all;
    background-color: #edf8fc;
    width: 100%;
    min-height: 100vh;
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
    .scrollable {
        max-height: 450px !important;
        overflow-y: auto !important;
        overflow-x: hidden;
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
const CardsMain = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 70px 32px;
    overflow: hidden;
    @media (max-width: 1250px) {
        padding-top: 16px;
        padding-inline: 16px;
    }
    .bg-dark-2 label div {
        color: #fff !important;
    }
`;
const Box = styled.div`
    width: 100%;
    height: 100%;
    background-color: #fff;
    box-shadow: 0px 2px 8px rgba(50, 50, 50, 0.12);
    border-radius: 16px;
    display: flex;

    flex-direction: column;
    padding: 24px;
    svg {
        margin-left: 6px;
    }
    .auth-btn {
        margin-top: 24px;
        width: 130px;
        margin-right: auto;
        margin-left: auto;
        height: 40px;
        border-radius: 8px;
    }
    .edit-prof {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
        span {
            font-size: 16px;
            font-weight: 700;
        }
    }
    .setting {
        display: flex;
        align-items: center;
        padding-bottom: 13px;
        padding-top: 13px;
        border-bottom: 1px solid #eee;
        span {
            color: #777777;
        }
    }
    @media (max-width: 1250px) {
        margin-bottom: 50px;
        margin-top: 0;
    }
    .under-line {
        padding-bottom: 16px;
        border-bottom: 1px solid #eee;
        margin-bottom: 20px;
    }
`;
const Card = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid #eee;
    border-radius: 10px;
    padding: 20px;
    margin-top: 20px;
    justify-content: space-between;
    .divs {
        display: flex;
        align-items: center;
    }
    .divs2{
        display:flex;
        flex-direction: column;
        align-items:center;
    }
    .divs2 *{
        width: 80px;
    }
    @media (max-width: 576px){
       padding: 16px 8px;
    }
`;

const AddCard = styled.button`
    width: 200px;
    height: 40px;
    background-color: #048a30;
    border-radius: 16px;
    margin-top: 40px;
    color: #fff;
`;

const Modal = styled.div`
    position: absolute;
    z-index: 10;
    width: 450px;
    padding: 20px;
    right: 50%;
    bottom: 40%;
    transform: translate(50%);
    background-color: #646464;
    border-radius: 16px;
    padding-top: 0;
    @media (max-width: 768px) {
        width: 280px;
    }
    .modal-h {
        padding-top: 10px;
    }
    input {
        display: block;
        width: 100%;
        background-color: transparent;
        border: 1px solid #fff;
        color: #fff;
        border-radius: 16px;
        height: 40px;
        margin-top: 10px;
        padding: 10px;
        direction: ltr;
        :first-child {
            margin-top: 20px;
        }
        ::placeholder {
            color: #fff;
        }
    }
    select {
        background-color: transparent;
        border-radius: 16px;
        margin-top: 10px;
        color: #fff;
    }
    button {
        width: 100%;
        height: 40px;
        border-radius: 16px;
        background-color: #04c42d;
    }
`;

function Cards() {
    const [cards, setCards] = useState([]);
    const [bankNames, setBankNames] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [shaba, setShaba] = useState("");
    const [bank, setBank] = useState("");
    const [showModal, setShowModal] = useState(false);

    
    const {theme} = useContext(NightModeContext);
    const {user, fetchProfile} = useContext(UserContext);

    
    const [showMenu, setShowMenu] = useState(false);
    const menuHandler = () => {
        setShowMenu(!showMenu);
    };
    useEffect(() => {
        let config = {
            headers: {
                "Content-type": "application/json",
            },
            url: `${baseUrl}bank/list/`,
            method: "GET",
        };
        axios(config)
            .then((res) => {
                if (res.status === 200) {
                    setCards(res.data);
                }
            })
            .catch((error) => {});
    }, []);

    useEffect(() => {
            let config = {
                method: "GET",
                url: `${baseUrl}bank/name/list/`,
                headers: {
                    "Content-type": "application/json"
                },
            };

            axios(config)
                .then((response) => {
                    setBankNames(response.data);
                })
                .catch((error) => {});
    }, []);

    const addCardHandler = (e) => {
        let data = {
            card: cardNumber,
            shaba,
            bank,
        };
        let config = {
            method: "POST",
            url: `${baseUrl}bank/add/`,
            data: data,
            headers: {
                "Content-type": "application/json"
            },
        };

        axios(config)
            .then((response) => {
                response.data.error == 1
                    ? toast.error(response.data.message)
                    : toast.success("اطلاعات حساب شما ثبت شد و توسط کارشناسان در حال بررسی می باشد.");
                setShowModal(false);
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    const deleteCard = (id) => {
        axios.post(baseUrl+`bank/${id}/remove/`)
        .then(response => {
            const {data} = response 
            if(data.error === 0){
                if(typeof fetchProfile === 'function') fetchProfile()
            }
            toast(data.message, {type: data.error?"error":"success"})
        })
    }
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/images/fav.png" />
                <title> صرافی بیت هولد | حساب های بانکی</title>
            </Head>
            <div className="max-w-1992">
                <Sidebar show-menu={menuHandler} active="5" show={showMenu} />
                {showModal ? (
                    <Modal>
                        <div className="modal-h">
                            <i className="c-p bi bi-x text-white fs-4" onClick={() => {
                                    setShowModal(false);
                                }}></i>
                        </div>
                        <div>
                            <input
                                onChange={(e) => {
                                    setCardNumber(e.target.value);
                                }}
                                type="number"
                                placeholder="شماره کارت"
                                value={cardNumber}
                            />
                            <input
                                onChange={(e) => {
                                    setShaba(e.target.value);
                                }}
                                type="number"
                                placeholder=" IR شماره شبا بدون "
                                value={shaba}
                            />
                            <select
                                className="form-control"
                                onChange={(e) => {
                                    setBank(e.target.value);
                                }}
                                value={bank}
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
                                disabled={
                                    cardNumber.length == 0 ||
                                    shaba.length == 0 ||
                                    bank.length == 0
                                }
                            >
                                افزودن کارت
                            </button>
                        </div>
                    </Modal>
                ) : (
                    ""
                )}
                <Content
                    className={
                        showMenu
                            ? theme == "dark"
                                ? "pr-176 bg-dark-2"
                                : "pr-176 "
                            : theme == "dark"
                            ? "bg-dark-2"
                            : ""
                    }
                >
                    <Header show-menu={menuHandler} />
                    <CardsMain>
                        <Box className={theme == "dark" ? "bg-gray" : ""}>
                            <h6 className="under-line">
                                حساب یا کارت های متصل
                            </h6>
                           <div className="row">
                           {cards.map((item) => {
                                return (
                                    <Card key={item.card} className="col-12 col-md-6 col-lg-4 col-xxl-3">
                                        <div className="divs">
                                            {" "}
                                            
                                            <div>
                                                <span className="me-2 d-block">
                                                    <CardIcon />
                                                    {item.bank}
                                                </span>
                                                <span className="me-2 d-block">
                                                    {item.card}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="divs2">
                                            {item.status == "confirmed" ? (
                                                <small className="fs-12 badge bg-success text-white">
                                                    تایید شده
                                                </small>
                                            ) : item.status == "pending" ? (
                                                <small className="fs-12 badge bg-warning text-dark">در حال بررسی</small>
                                            ) : (
                                                <small className="fs-12 badge bg-danger text-white">
                                                    رد شده
                                                </small>
                                            )}
                                            <small className=" btn fs-12 badge bg-danger text-white mt-2 w-100" onClick={e => deleteCard(item.id)}>
                                                حذف
                                            </small>
                                        </div>
                                    </Card>
                                );
                            })}
                           </div>
                            <AddCard
                                onClick={() => {
                                    setShowModal(true);
                                }}
                            >
                                افزودن کارت
                            </AddCard>
                        </Box>
                    </CardsMain>
                </Content>
            </div>
        </>
    );
}
export default  withAuth(Cards)