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
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import PasswordFieldErrors from "../components/Auth/PasswordFieldErrors";
import Particle from "../components/Particle";
import Link from 'next/link'

const Main = styled.div`
    background-color: #edf8fc;
    width: 100%;
    min-height: 100vh;
    .css-b62m3t-container {
        width: 100%;
    }
    .Toastify__toast-container {
        z-index: 999999;
    }
    .change_password__ChangeHead-sc-1edztku-3,
    .change_password__ChangeContent-sc-1edztku-4 {
    }
    #tsparticles {
        position: absolute;
        height: 100%;
    }
    #tsparticles canvas {
    }
`;
const Content = styled.div`
    overflow: hidden;
    transition: 0.1s all;
    padding-bottom: 70px;
    @media (max-width: 786px) {
        h6 {
            font-size: 13px !important;
        }
    }
`;
const ChangeMain = styled.div`
    position: relative;
    z-index: 9999 !important;
    border-radius: 10px;
    width: 33%;
    margin-right: auto;
    margin-left: auto;
    margin-top: 30px;
    height: 100%;
    background-color: #fff;
    padding-bottom: 30px;
    @media (max-width: 786px) {
        width: 90%;
    }
`;

const ChangeHead = styled.div`
    height: 60px;
    width: 100%;
    padding: 16px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom: 1px solid #333;
    h6 {
        font-size: 20px;
    }
    @media (max-width: 786px) {
        h6 {
            font-size: 16px !important;
        }
    }
`;

const ChangeContent = styled.div`
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
        line-height: 0;
    }
    label {
        margin-top: 20px;
        margin-bottom: 0;
        width: 80%;
        position: relative;
    }
    input {
        margin-bottom: 20px;
        margin-top: 0;
        width: 100%;
        height: 40px;
        padding: 16px;
        border: 1px solid #c9c9c9;
        border-radius: 10px;
    }
    svg {
        position: absolute;
        left: 20px;
        top: 28px;
        fill: #c9c9c9;
        cursor: pointer;
    }
    button {
        width: 200px;
        margin-top: 40px;
        height: 40px;
        border-radius: 10px;
    }
`;

export default function ChangePass() {
    const stts = useContext(NightModeContext);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordTwo, setShowPasswordTwo] = useState(false);
    const [showPasswordThree, setShowPasswordThree] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordIsInvalid, setPasswordIsInvalid] = useState(true)
    let token = "";
    setTimeout(() => {
        token = localStorage.getItem("token");
    }, 2000);
    // useEffect(() => {
    //     if (
    //         localStorage.getItem("token") == null ||
    //         typeof window == "undefined"
    //     ) {
    //         Router.push("/login");
    //     }
    // }, []);
    const [showMenu, setShowMenu] = useState(false);
    const menuHandler = () => {
        setShowMenu(!showMenu);
    };
    let refreshToken = "";
    setTimeout(() => {
        refreshToken = localStorage.getItem("refresh_token");
    }, 2000);

    setTimeout(() => {
        setInterval(() => {
            inter();
        }, 600000);
    }, 10000);
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

    const changePassHandler = (e) => {
        let data = new FormData();
        data.append("action", "password");
        data.append("old_password", oldPassword);
        data.append("new_password1", newPassword);
        data.append("new_password2", confirmPassword);
        let config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            method: "POST",
            url: `${baseUrl}account/manage/`,
            data: data,
        };

        axios(config)
            .then((response) => {
                if (response.status === 200) {
                    toast.info(response.data.message, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
            .catch((error) => {});
    };

    return (
        <Main
            className={
                stts.night == "true" ? "bg-dark-2 max-w-1992" : "max-w-1992"
            }
        >
            <Head>
                {" "}
                <link rel="shortcut icon" href="/images/fav.png" />
                <title>صرافی بیت هولد | تعییر رمز</title>
            </Head>
            <Sidebar show-menu={menuHandler} active="2" show={showMenu} />
            <Content className={showMenu ? "pr-176" : ""}>

                <Header show-menu={menuHandler} />
                <Particle/>
                <ChangeMain className={stts.night == "true" ? "bg-gray" : ""}>
                    <ChangeHead>
                        <h6>تغییر رمز عبور</h6>
                    </ChangeHead>
                    <ChangeContent>
                        <label>
                            <p>رمز عبور کنونی</p>
                            <input
                                onChange={(e) => {
                                    setOldPassword(e.target.value);
                                }}
                                type={!showPassword ? "password" : "text"}
                            />
                            {!showPassword ? (
                                <svg
                                    className="show-pass"
                                    onClick={() => {
                                        setShowPassword(!showPassword);
                                    }}
                                    width="22"
                                    height="15"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 346.184 221.173"
                                >
                                    <path
                                        id="eye"
                                        d="M342.189,167.94a196.99,196.99,0,0,0-338.2,0,28.848,28.848,0,0,0,0,29.293,196.99,196.99,0,0,0,338.2,0A28.847,28.847,0,0,0,342.189,167.94Zm-169.1,96.384a81.738,81.738,0,1,1,81.738-81.738A81.694,81.694,0,0,1,173.092,264.324ZM235.6,182.586A62.505,62.505,0,1,1,117.94,153.153v.019a25.738,25.738,0,1,0,25.738-25.738h-.019A62.52,62.52,0,0,1,235.6,182.586Z"
                                        transform="translate(0 -72)"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="show-pass"
                                    onClick={() => {
                                        setShowPassword(!showPassword);
                                    }}
                                    width="22"
                                    height="15"
                                    viewBox="0 0 346.184 307.718"
                                >
                                    <path
                                        id="eye-slash"
                                        d="M172.306,235.588l19.58,27.972q-9.371.883-18.795.886a195.91,195.91,0,0,1-169.1-95.94,28.848,28.848,0,0,1,0-29.293A194.378,194.378,0,0,1,61.706,77.587l34.3,49.006a81.8,81.8,0,0,0,76.3,109Zm169.883-67.082a194.924,194.924,0,0,1-81.242,75.412l.007.009,24.924,35.58a14.421,14.421,0,0,1-3.546,20.086l-7.879,5.517a14.421,14.421,0,0,1-20.086-3.546L60.305,28.212A14.421,14.421,0,0,1,63.851,8.126l7.879-5.517A14.421,14.421,0,0,1,91.817,6.154L122.491,49.8a198.367,198.367,0,0,1,50.6-6.525,195.911,195.911,0,0,1,169.1,95.94,28.85,28.85,0,0,1,0,29.292Zm-87.36-14.646A81.792,81.792,0,0,0,142.6,77.995l11.6,16.262a62.622,62.622,0,0,1,48.321,4.454h-.018a25.735,25.735,0,1,0,25.735,25.735v-.018a62.492,62.492,0,0,1-4.958,66.682v.006L234.89,207.38A81.425,81.425,0,0,0,254.829,153.859ZM157.474,214.4l-46.6-66.566A62.525,62.525,0,0,0,157.474,214.4Z"
                                        transform="translate(0 0)"
                                    />
                                </svg>
                            )}
                        </label>
                        
                        <label>
                            <p>رمز عبور جدید</p>
                            <input
                                value={newPassword}
                                onChange={(e) => {
                                    setNewPassword(e.target.value);
                                }}
                                type={!showPasswordTwo ? "password" : "text"}
                            />
                            <svg
                                className="show-pass"
                                onClick={() => {
                                    setShowPasswordTwo(!showPasswordTwo);
                                }}
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="15"
                                viewBox="0 0 22 15"
                            >
                                <path
                                    id="ic_remove_red_eye_24px"
                                    d="M12,4.5A11.827,11.827,0,0,0,1,12a11.817,11.817,0,0,0,22,0A11.827,11.827,0,0,0,12,4.5ZM12,17a5,5,0,1,1,5-5A5,5,0,0,1,12,17Zm0-8a3,3,0,1,0,3,3A3,3,0,0,0,12,9Z"
                                    transform="translate(-1 -4.5)"
                                />
                            </svg>
                            <PasswordFieldErrors text={newPassword} setIsInValid={setPasswordIsInvalid} />
                        </label>
                        <label>
                            <p>تکرار رمز عبور جدید</p>
                            <input
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                }}
                                value={confirmPassword}
                                type={!showPasswordThree ? "password" : "text"}
                            />
                            <svg
                                className="show-pass"
                                onClick={() => {
                                    setShowPasswordThree(!showPasswordThree);
                                }}
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="15"
                                viewBox="0 0 22 15"
                            >
                                <path
                                    id="ic_remove_red_eye_24px"
                                    d="M12,4.5A11.827,11.827,0,0,0,1,12a11.817,11.817,0,0,0,22,0A11.827,11.827,0,0,0,12,4.5ZM12,17a5,5,0,1,1,5-5A5,5,0,0,1,12,17Zm0-8a3,3,0,1,0,3,3A3,3,0,0,0,12,9Z"
                                    transform="translate(-1 -4.5)"
                                />
                            </svg>
                        </label>
                            
                           
                            <button
                                onClick={changePassHandler}
                                className="btn-success "
                                disabled={passwordIsInvalid || confirmPassword !== newPassword}
                            >
                                تغییر رمز
                            </button>
                    </ChangeContent>
                </ChangeMain>
            </Content>
        </Main>
    );
}
