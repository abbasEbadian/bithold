import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Router from "next/router";
import NightModeContext from "./Context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { baseUrl } from "./BaseUrl";
import axios from "axios";
import UserContext from "../utils/state/userContext";
import ExitIcon from './icons/ExitIcon' 
import DayIcon from './icons/DayIcon' 
import NightIcon from './icons/NightIcon' 
import BellIcon from './icons/BellIcon' 
import MenuOpenIcon from './icons/MenuOpenIcon' 
import UserIcon from './icons/UserIcon' 
import Link from 'next/link'
import HeaderMobile from "./HeaderMobile";
const HeaderMain = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 64px;
    background-color: #002939;
    color: #fff;
    position: sticky;
    top: 0;
    z-index: 3;
    @media (max-width: 550px) {
        border-radius: 0 0 8px 8px;
    }
    .h-to-0 {
        height: 0 !important;
        overflow: hidden !important;
        padding: 0 !important;
    }
    
`;

const HeaderRight = styled.div`
    display: flex;
    align-items: center;
    padding-right: 20px;
    font-weight: 600;
    font-size: 16px;
    line-height: 29px;
    span {
        margin-right: 10px;
    }
    @media (max-width: 550px) {
        span {
            font-size: 14px;
        }
        svg {
            width: 26px;
        }
        padding-right: 10px;
    }
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    padding-left: 30px;
    label {
        border: 1px solid #edf8fc60;
        box-sizing: border-box;
        border-radius: 61px;
        width: 88px;
        height: 32px;
        position: relative;
        display: flex;
        align-items: center;
        cursor: pointer;
        margin-left: 16px;
    }
    .white-circle {
        background-color: #fff;
        border-radius: 50%;
        width: 26px;
        height: 26px;
        position: absolute;
        top: 3px;
        right: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.1s all;
    }
    .notif-actions > div{
        height: 30px;
        display: grid;
        place-items:center;
        line-height: 15px;

    }
    .dark-circle {
        background-color: #0a0c0f;
        border-radius: 50%;
        width: 26px;
        height: 26px;
        position: absolute;
        top: 3px;
        left: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.1s all;
    }
    .circle-none {
        background-color: transparent;
        svg path {
            fill: #4f5e7b;
        }
    }
    .items {
        display: flex;
        .circle {
            margin-right: 8px;
            position: relative;

            width: 32px;
            height: 32px;
            border-radius: 50%;
            border: 1px solid rgba(255, 255, 255, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    .boxes {
        transition: 0.5s all;

        position: absolute;
        width: 200px;
        height: 250px;
        maxi-height: 250px;
        overflow: auto;
        border-radius: 10px;
        background-color: #4f5e7b;
        left: 0px;
        padding: 10px;
        z-index: 10;
        top: 36px;
        font-size: 10px;
        div {
            margin-top: 8px;
        }
        .read-btn {
            background-color: #4fde7b;
            border-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        overflow: auto;
    }
    input {
        display: none;
    }

    @media (max-width: 550px) {
        display: none;
    }
`;



const Badge = styled.div`
    width: 15px;
    height: 15px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #108abb;
    border: 1px solid #ededed;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    position: absolute;
    left: 0;
    top: 0;
    font-size: 11px;
    padding-top: 3px;
`;
const HeaderAuthReminder = styled.div`
    position: absolute;
    left: 0;
    top: 100%;
    display: flex;
    background-color: #002939;
    font-size: 13px;
    padding: 8px;
    border-radius: 0 0 8px 0;
    div{
        margin-inline: 8px;
    }
    
`;

const Header = (props) => {
    const [notifs, setNotifs] = useState([]);
    const [showNotifBox, setShowNotifBox] = useState(false);
    const {theme, setTheme} = useContext(NightModeContext);
    const {user, authenticated} = useContext(UserContext);

    const handleOnChange = (e) => {
        setTheme(t => t === 'dark'? 'light': 'dark')
    };
    const logOutHandler = (e) => {
        localStorage.removeItem("token");
        Router.push("/login");
    };
    const get_notifs = () => {
        axios.get(`${baseUrl}notification/unread_list/`)
            .then((res) => { if (res.status == "200") setNotifs(res.data) })
            .catch((error) => {});
    }
    useEffect(() => {
            get_notifs()
    }, []);
    const readAllHandler = (e) => {
        let config = {
            headers: {
                "Content-type": "application/json"
            },
            method: "POST",
            url: `${baseUrl}notification/readAll/`,
        };

        axios(config)
            .then((response) => {
                toast.success(response.data.message)
                get_notifs()
            })
            .catch((error) => {});
    };
    return (
        <HeaderMain className={theme === 'night' ? "bg-gray" : ""}>
            {authenticated && user.rank !== "accepted" && Router.pathname.indexOf("/auth") === -1 && <HeaderAuthReminder className={theme === 'night' ? "bg-gray" : ""}>
                <div class="triangle">
                    <span>!</span>
                </div>
                <Link href='/auth'><a>احراز هویت</a></Link>
            </HeaderAuthReminder>}
                
            <HeaderRight>
                <MenuOpenIcon color="#ddd" onClick={e=>props["show-menu"]()}/>
                <span>داشبورد</span>
            </HeaderRight>
            <HeaderLeft>
                <label>
                    <input onChange={handleOnChange} type="checkbox" />
                    <div
                        className={
                            theme === 'dark'
                                ? "white-circle "
                                : "white-circle circle-none"
                        }
                    >
                       <DayIcon/>
                    </div>
                    <div
                        className={
                            theme === 'light'
                                ? "dark-circle "
                                : "dark-circle circle-none"
                        }
                    >
                        <NightIcon/>
                    </div>
                </label>

                <div className="items">
                    <div
                        onClick={() => {
                            Router.push("/profile");
                        }}
                        className="circle c-p "
                    >
                        <UserIcon/>
                    </div>
                    <div
                        className="circle c-p position-relative "
                        
                    >
                       <BellIcon onClick={e=>setShowNotifBox(!showNotifBox)}/>
                        <Badge>
                            {notifs.length == undefined ? "0" : notifs.length}
                        </Badge>
                        <div
                            className={showNotifBox ? "boxes" : "h-to-0 boxes"}
                        >
                            {notifs.length !== 0
                                ? <>
                                    {notifs.map((i) => {
                                        return <div key={i.id} className='pb-2 border-bottom mb-2'>
                                            {i.text}
                                            <br />
                                            <small className="d-block text-start w-100 ps-2 mt-2">
                                                {new Date(i.published).toLocaleDateString('fa')}
                                            </small>
                                            </div>;
                                    })}
                                    
                                </>
                            : (
                                <b className="mt-2 me-1">
                                    شما اعلان خوانده نشده ای ندارید
                                </b>
                            )}
                            {
                                notifs.length>0 && <div className="d-flex align-items-center notif-actions">
                                    <div onClick={readAllHandler} className="btn fs-12 text-white read-btn flex-grow-1 mt-0 ">
                                            همه را خواندم
                                    </div>
                                    <div className="btn btn-danger mt-0 fs-12 me-2" onClick={(e) => {
                                        setShowNotifBox(!showNotifBox);
                                    }}>بستن</div>
                                </div>
                                 || 
                                 <div className="btn btn-danger mt-3 fs-12 me-2" onClick={(e) => {
                                    setShowNotifBox(!showNotifBox);
                                }}>بستن</div>
                            }
                            
                        </div>
                    </div>
                    <div onClick={logOutHandler} className="px-2 border d-flex align-items-center me-3" style={{borderRadius: 60}} role="button">
                        <small className="text-white d-inline-block ms-2">خروج</small>
                        <ExitIcon/>
                    </div>
                </div>
            </HeaderLeft>
           
                        
            <HeaderMobile handleOnChange={handleOnChange} theme={theme} notifs={notifs} showNotifBox={showNotifBox} logOutHandler={logOutHandler} readAllHandler={readAllHandler}/>
        </HeaderMain> 
    );
};

export default Header;
