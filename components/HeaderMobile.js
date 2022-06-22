import React, { useContext } from 'react'
import Image from "next/image";
import styled from "styled-components";
import ExitIcon from './icons/ExitIcon'
import DayIcon from './icons/DayIcon'
import NightIcon from './icons/NightIcon'
import BellIcon from './icons/BellIcon'
import { Dropdown, NavDropdown } from 'react-bootstrap';
import UserContext from '../utils/state/userContext';
import UserIcon from './icons/UserIcon';
import Router from 'next/router';
const HeaderLeftMob = styled.div`
    align-items:center;
    width: 100%;
    text-align:center;
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
    section{
        display: grid;
        place-items: center;
    }
    #user-dropdown{
        font-size: 12px;
        padding-inline: 8px;

        &::after{
            margin-left: 0px;
            margin-right: 8px;
        }
    }
     > *:not(section){
        margin-block: 0;
        margin-inline: 8px;
        width: 32px;
        height: 32px;
        display: grid;
        place-items: center;
        border: 1px solid #8887;
        border-radius: 50%;
        padding: 4px;
        font-size: 14px;

        &.circle.circle-exit *{
            stroke : #fffa;
        }
        &.circle.circle-notif *{
            fill : #fffa;

        }
        
    }
    img{
        margine-left: 8px;
    }
    .themeToggler{
        margin: 0 8px;
        display: grid;
        place-items:center;
        position:relative;
        *{
            color: white;
            fill: #fffa !important;
        }
        
    }
    .boxes {
        transition: 0.5s all;

        position: absolute;
        width: 200px;
        height: 250px;
        border-radius: 10px;
        background-color: #4f5e7b;
        left: 0px;
        padding: 10px;
        z-index: 99999999999 !important;
        top: 36px;
        font-size: 10px;
        div {
            margin-top: 8px;
        }
        .read-btn {
            background-color: #4fde7b;
            height: 30px;
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

    @media (min-width: 550px) {
        label {
            border: 1px solid #edf8fc60;
            box-sizing: border-box;
            border-radius: 61px;
            width: 48px;
            height: 22px;
            position: relative;
            display: flex;
            align-items: center;
            cursor: pointer;
            margin-left: 4px;
            margin-top: 10px;
        }
        .white-circle {
            background-color: #fff;
            border-radius: 50%;
            width: 16px;
            height: 16px;
            position: absolute;
            top: 2px;
            right: 3px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: 0.1s all;
        }
    }
    @media (max-width: 550px) {
        display: none;
    }
    display: none;
    input {
        display: none;
    }
  
    
    .dark-circle {
        background-color: #0a0c0f;
        border-radius: 50%;
        width: 16px;
        height: 16px;
        top: 2px;
        left: 2px;
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
    @media (max-width: 550px) {
        z-index: 1;
        display: flex;
        margin-left: 10px;
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
function HeaderMobile({ handleOnChange, theme, notifs, showNotifBox, logOutHandler, readAllHandler}) {
    const { user, userLoading } = useContext(UserContext)
    return (
        <HeaderLeftMob>
            <section className='flex-grow-1'>
                <Image
                    onClick={() => {
                        Router.push("/");
                    }}
                    src="/images/mob-logo.svg"
                    width={70}
                    height={42}
                    alt="logo"
                />
            </section>

            <label className="themeToggler">
                <input onChange={handleOnChange} type="checkbox" />
                {theme === 'dark' && <div
                    className={
                        theme === 'light'
                            ? "white-circle "
                            : "white-circle circle-none"
                    }
                >
                    <DayIcon />
                </div>}
                {theme === 'light' && <div
                    className={
                        theme === 'dark'
                            ? "dark-circle "
                            : "dark-circle circle-none"
                    }
                >
                    <NightIcon />
                </div>}
            </label>
            <div className="circle c-p position-relative circle-notif"
            >
                <BellIcon onClick={e => setShowNotifBox(!showNotifBox)} />
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
                        notifs.length > 0 && <div className="d-flex align-items-center notif-actions">
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
            <section>
                <NavDropdown
                    id="user-dropdown"
                    title={userLoading ? "" : ( user.first_name + " " + user.last_name )}
                    menuVariant="dark"
                    size="sm"
                >
                    <NavDropdown.Item>
                        <div onClick={e => Router.push('/profile')} className="circle mob-out c-p circle-exit d-flex align-items-center justify-content-between ">
                            پروفایل
                            <UserIcon />
                        </div>
                    </NavDropdown.Item>

                    <NavDropdown.Divider />
                    <NavDropdown.Item>
                        <div onClick={logOutHandler} className="circle mob-out c-p circle-exit d-flex align-items-center justify-content-between ">
                            خروج
                            <ExitIcon />
                        </div>
                    </NavDropdown.Item>
                </NavDropdown>
            </section>




        </HeaderLeftMob>
    )
}

export default HeaderMobile