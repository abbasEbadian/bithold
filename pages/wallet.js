import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";
import Sidebar from "../components/Sidebar";
import styled from "styled-components";
import Header from "../components/Header";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
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

import WalletIn from '../components/icons/WalletIn'
import WalletOut from '../components/icons/WalletOut'
import ArrowUpDown from '../components/icons/ArrowUpDown'
import withAuth from "../utils/withAuth";

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
    display: flex;
    align-items:center;
    flex-direction: column;
    p {
        margin-top: 10px;
        margin-bottom: 32px;
        font-size: 14px;
        text-align: center;
    }
    button {
        width: 100px;
        font-size: 12px;
        margin-top: 14px;
    }
`;

function Dashboard() {
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
    const [allToman, setAllToman] = useState(0);
    const [allT, setAllT] = useState(0);
    const [allR, setAllR] = useState(0);
    const [loaded, setLoaded] = useState(true);
    const [showGenModal, setShowGenModal] = useState(false);
    const [itemToGen, setItemToGen] = useState();
    const [actives , setActives] = useState(true)
    const { theme } = useContext(NightModeContext);
    // 138198.4164
    let row = 0;
    /**
     * @param {Object} item
     * @param {String}  [action=deposit]  - deposit or withdraw
     * 
     * **/

    const ShowGenModalHandler =  async (item, action="deposit") => {
        const has_wallet = wallet.find(i=>i.service.id === item.id)
        const is_irt = item.name === 'تومان'
        console.log(is_irt)
        setItemTo(item)
        if(!has_wallet){
            setShowGenModal(true);
            await generateHandler(item.id);
            fetchWallet()
            setShowGenModal(false);
        }
        if(is_irt){
            if(action === 'deposit'){
                setShowRialDeposit(true)
            }else{
                setShowRialWithDrow(true)
            }
        }else{
            if(action === 'deposit'){
                setShowCoinDeposit(true)
            }else{
                setShowCoinWithDrow(true)
            }
        }
        
        
    };
    ShowGenModalHandler

    const computeAllT = () => {
        let total = 0
        
        wallet.map((w) => {
            const val =  w.service.small_name_slug !== "IRT"?
                total += (w.balance * w.service.buyPrice)
            :
                total += (w.balance / w.service.buyPrice);
        })
        return total
    }
    useEffect(() => {
        const ttr = computeAllT()
        setAllT(ttr)
    }, [wallet])
    useEffect(() => {
        const t = coins.find(i => i.small_name_slug === "USDT" )
        setAllR( allT * (t?.show_price_irt || 0))
    }, [allT, coins])
    
    


    const menuHandler = () => {
        setShowMenu(!showMenu);
    };
    const fetchService = () => {
        axios.get(`${baseUrl}service/list/`)
            .then((res) => {
                if (res.status == "200") {
                    setCoins(res.data);
                }
            })
            .catch((error) => {});
    }

    const fetchWallet = () => {
        axios.get(`${baseUrl}wallet/list/`)
            .then((res) => {
                if (res.status === 200) {
                    setLoaded(true);
                    setWallet(res.data);
                }
            })
            .catch((error) => {});
    }

    useEffect(() => {
        fetchService()
        fetchWallet()
    }, []);

    
    // generate

    const generateHandler = async (asset_id) => {


        let config_3 = {
            headers: {
                "Content-type": "application/json"
            },
            method: "POST",
            url: `${baseUrl}wallet/generate/`,
            data: {service : asset_id}
        };
        return new Promise((res, rej) => {
            axios(config_3)
                .then(({data}) => {
                    return res(true)
                })
                .catch((error) => {
                    toast.error(response.data.message);
                    return rej(false)
                });
        })
    };


    let ids = [];
    return (
        <>
            <Main
                className={
                    theme == "light" ? "bg-dark-2 max-w-1992" : "max-w-1992"
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
                                    <span>{allT?.toLocaleString()}</span> تتر
                                </div>
                            </Balance>
                            <Balance className="me-3 balance-2">
                                <div className="text-field-1">
                                    تخمین موجودی تومانی :
                                </div>
                                <div className="text-field-2">
                                    <div className="d-flex align-items-center">
                                        <WalletOut /> 
                                        <WalletIn /> 
                                        
                                        <div>
                                            {Number((allR)?.toFixed())?.toLocaleString('fa')}
                                            <span className="mx-2 fs-12">تومان</span>
                                        </div>
                                    </div>
                                </div>
                            </Balance>
                        </div>
                        <div className="scrollable mt-5">
                            <WalletTable
                                className={
                                    theme == "light"
                                        ? "bg-gray table"
                                        : " table"
                                }
                            >
                                <thead>
                                    <tr className="align-middle ">
                                        <th scope="col" className=" remove-mob">
                                            <div className="d-flex align-items-center">
                                                <div className="arrows">
                                                    <ArrowUpDown />
                                                </div>
                                                ردیف
                                            </div>
                                        </th>
                                        <th scope="col">
                                            <div className="d-flex align-items-center">
                                                <div className="arrows">
                                                <ArrowUpDown />
                                                </div>
                                                اسم
                                            </div>
                                        </th>
                                        <th scope="col">
                                            <div className="d-flex align-items-center ">
                                                <div className="arrows">
                                                    <ArrowUpDown />
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
                                    {coins.map((item, index) => {
                                        const wall = wallet.find(i=>i.service.id === item.id)
                                        const usdt = coins.find(i=>i.small_name_slug === "USDT")
                                        return (
                                            <tr key={item.id}>
                                                <td scope="row" className="pt-12 remove-mob-2">
                                                    {index+1}
                                                </td>

                                                <td className="align-middle">
                                                    <img src={item.image} alt="coin" width={25}height={25} />
                                                    <span className="me-2"> 
                                                        {item.name}
                                                    </span>
                                                </td>
                                                <td className="align-middle"> 
                                                    {
                                                        wall
                                                        &&
                                                         Number(wall.balance).toLocaleString()
                                                        ||
                                                        0
                                                    }
                                                    <span className="mx-1 text-center fs-12">
                                                        {item.small_name_slug}
                                                    </span>
                                                    {/* { wall && wall.balance > 0? <><br/><small>
                                                        {wall.balance * wall.service.buyPrice} {" usdt"}
                                                    </small></>: undefined} */}
                                                </td>
                                                <td className="align-middle ">
                                                    <button
                                                        onClick={() => ShowGenModalHandler(item)}
                                                        className="text-success-2"
                                                        disabled={
                                                            !loaded
                                                        }
                                                    >
                                                        واریز
                                                    </button>
                                                </td>
                                                <td className="align-middle ">
                                                    <button
                                                        disabled={!loaded}
                                                        onClick={() => {
                                                            ShowGenModalHandler(item, "withdraw");
                                                        }}
                                                        className="text-danger-2"
                                                    >
                                                        برداشت
                                                    </button>
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
                {showGenModal && 
                <ShowGenModal>
                    <>
                        <p>
                            در حال ساخت کیف پول برای این ارز 
                        </p>

                        <div className="spinner-border"role="status"></div>
                        </>  
                    </ShowGenModal>
                }
                {showCoinDeposit ? (
                    <CoinDeposit
                        wallet={wallet}
                        itemTo={itemTo}
                        setBlur={setBlur}
                        theme={theme}
                        setShowCoinDeposit={setShowCoinDeposit}
                    />
                ) : (
                    ""
                )}
                {showCoinWithDrow ? (
                    <CoinWithdraw
                        wallet={wallet}
                        itemTo={itemTo}
                        setBlur={setBlur}
                        theme={theme}
                        setShowCoinWithDrow={setShowCoinWithDrow}
                    />
                ) : (
                    ""
                )}
                {showRialDeposit ? (
                    <RialDeposit
                        wallet={wallet}
                        itemTo={itemTo}
                        setBlur={setBlur}
                        theme={theme}
                        setShowRialDeposit={setShowRialDeposit}
                    />
                ) : (
                    ""
                )}
                {showRialWithDrow ? (
                    <RialWithdraw
                        wallet={wallet}
                        itemTo={itemTo}
                        setBlur={setBlur}
                        theme={theme}
                        setShowRialWithDrow={setShowRialWithDrow}
                    />
                ) : (
                    ""
                )}
            </Main>
            
        </>
    );
}

export default withAuth(Dashboard)