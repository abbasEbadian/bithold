import Router from "next/router";
import { useCallback, useContext, useEffect, useState } from "react";
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
import Particle from "../components/Particle";
import UserContext from "../utils/state/userContext";
import PenIcon from "../components/icons/PenIcon";
import  SecurityIcon from "../components/icons/SecurityIcon";
import  AlertIcon from "../components/icons/AlertIcon";
import CardIcon from "../components/icons/CardIcon";
import withAuth from "../utils/withAuth";

const Content = styled.div`
    overflow: hidden;
    transition: 0.1s all;
    background-color: #edf8fc;
    width: 100%;
    min-height: 100vh;
    padding-bottom: 70px;
    .loading {
        position: relative;
        img {
            position: absolute;
        }
    }
    .lds-ring {
        position: absolute;
        width: 20px;
        height: 20px;
        left: 0 !important;
        top: 0 !important;
    }
    .lds-ring div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        height: 24px;
        margin: 8px;
        margin-right: 30px;
        border: 3px solid #fff;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: #fff transparent transparent transparent;
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
const ProfMain = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 70px 32px;
    overflow: hidden;
    
    .bg-dark-2 label div {
        color: #fff !important;
    }
`;
const RightBox = styled.div`
    height: 283px;
    box-shadow: 0px 2px 8px rgba(50, 50, 50, 0.12);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    
    margin-inline: auto;
    svg {
        margin-left: 6px;
    }
    .slide-bck-center {
        animation: right-animate 1s ease infinite alternate;
    }
    @keyframes right-animate {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(1.1);
        }
    }
    > div{
        background-color: #fff;
        padding: 16px;
        border-radius: 16px;
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
    @media (max-width: 1100px) {
        margin-bottom: 50px;
        margin-top: 0;
    }
`;
const LeftBox = styled.div`
    box-shadow: 0px 2px 8px rgba(50, 50, 50, 0.12);
    border-radius: 16px;
    position: relative;
    label.avatar{
        position: absolute;
        top: calc(-1 * (78px / 2));
        left: calc(50% - (78px / 2));
        cursor: pointer;
        width: 78px;
        height: 78px;
        border-radius: 50%;
    }
    label.avatar img{
        border-radius: 50%;
        border:1px solid #ddd;
        box-shadow: 0 0px 14px #0004;
    }
    #editIcon {
        position: absolute;
        top: 0;
        right: -6px;
        fill: #fff;
        filter: drop-shadow(0px 4px 3px black);
    }
    > form{
        background-color: #fff;
        padding: 16px;
        border-radius: 16px;
        padding-top: 32px;
    }
    .inputs > *{
        flex: 1 1 auto;
        padding: 8px;
    }
    @media (max-width: 1100px) {
        .img-prof {
            left: 44%;
        }
        .edit-prof-svg {
            left: 52%;
        }
    }
    @media (max-width: 786px) {
        label {
            width: 100%;
            margin-right: 0;
        }
        .img-prof {
            left: 40%;
        }
        .edit-prof-svg {
            left: 56%;
        }
    }
`;
const Alert = styled.div`
    
    height: 52px;
    background: #f6543e;
    border-radius: 8px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 14px 10px;
    font-size: 13px;
    color: #fff;
    display: flex;
    align-items:center;
    svg {
        margin-left: 5px;
    }
    @media (max-width: 786px) {
        
        padding: 4px;
        margin-top: 40px;
    }
`;
const Success = styled.div`
    width: 473px;
    height: 40px;
    background: #018f41;
    border-radius: 8px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 10px 10px;
    font-size: 13px;
    color: #fff;
    text-align: center;
    line-height: calc(40px / 2);

    svg {
        margin-left: 5px;
    }
    @media (max-width: 786px) {
        width: 298px !important;
        padding: 4px;
        margin-top: 40px;
    }
`;

const Inp = styled.input`
    background: #ffffff;
    border: 1.5px solid #dbdbdb;
    border-radius: 8px;
    height: 44px;
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 20px;
    margin-left: 8px;
    min-width: 300px;
    width: 100%;
`;

const SubBtn = styled.button`
    width: 228px;
    height: 39px;
    background: linear-gradient(90deg, #128cbd -1.72%, #3dbdc8 100%);
    border-radius: 32px;
    margin-right: auto !important;
    margin-left: auto !important;
    color: #fff;
`;

function Profile() {
    const [img, setImg] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const {theme} = useContext(NightModeContext);
    const {user, authenticated, fetchProfile} = useContext(UserContext);

    const [showMenu, setShowMenu] = useState(false);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        national_id:"",
        phone: "",
        post_code: "",
        address: "",
        email: ""
    })
    useEffect(() => {
        if(user.father_name){
            setFormData({
                first_name: user.first_name,
                last_name: user.last_name,
                phone: user?.personal_data?.address?.phone,
                post_code: user?.personal_data?.address?.post_code,
                father_name: user.father_name,
                email: user.email,
                address: user?.personal_data?.address?.address,
                national_id: user.personal_data?.national_id
            })
        }
    }, [user])
    const menuHandler = () => {
        setShowMenu(!showMenu);
    }  
    const submit = (e) => {
        e.preventDefault()
        axios.post(baseUrl+"account/manage/", {...formData, action: "profile"}) 
        .then(({data, status}) =>{
            toast(data.message, {type: data.error? 'error': 'success'})
            if(!data.error) fetchProfile()
        })
    }

    useEffect(()=>{
        if(user.avatar) setImg(user.avatar)
    }, [user])

    const profileChange = (e) => {
        let data = new FormData();
        data.append("file", e);
        setLoading(true);
        let config = {
            headers: {"Content-Type": "multipart/form-data"},
            method: "POST",
            url: `${baseUrl}account/avatar/`,
            data: data,
        };
        axios(config)
            .then((response) => {
                toast.success(response.data.message);
                if(typeof fetchProfile === 'function') fetchProfile()
            })
            .catch((error) => {
                toast.error("خطایی وجود دارد");
            })
            .finally(f=>setLoading(false))
    };


    return (
        <>
            <Head>
                {" "}
                <link rel="shortcut icon" href="/images/fav.png" />
                <title> صرافی بیت هولد | پروفایل</title>
            </Head>
            <div className="max-w-1992">
                <Sidebar show-menu={menuHandler} active="5" show={showMenu} />
                
                <Content
                    className={
                        showMenu
                            ? theme == "light"
                                ? "pr-176 bg-dark-2"
                                : "pr-176 "
                            : theme == "light"
                            ? "bg-dark-2"
                            : ""
                    }
                >
                    <Header show-menu={menuHandler} />
                    <ProfMain className="row">
                        <Particle/>
                        <RightBox
                            className={"col-12 col-lg-3 "}
                        >
                            <div className={(theme == "light" ? "bg-gray" : "")}>
                                <div className={"edit-prof d-flex align-items-center" }>
                                    <div className="d-flex align-items-center">
                                        <svg
                                            className={
                                                theme == "light"
                                                    ? "svg-white"
                                                    : ""
                                            }
                                            width="32"
                                            height="32"
                                            viewBox="0 0 32 32"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M7.05732 20.8253L20.8253 7.05733C21.3453 6.53733 22.1893 6.53733 22.7093 7.05733L24.944 9.29199C25.464 9.81199 25.464 10.656 24.944 11.176L11.1747 24.9427C10.9253 25.1933 10.5867 25.3333 10.2333 25.3333H6.66666V21.7667C6.66666 21.4133 6.80666 21.0747 7.05732 20.8253Z"
                                                stroke="#323232"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M18.3333 9.54666L22.4533 13.6667"
                                                stroke="#323232"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <span>ویرایش پروفایل</span>
                                    </div>
                                    <svg
                                        className={
                                            theme == "light" ? "svg-white" : ""
                                        }
                                        width="8"
                                        height="14"
                                        viewBox="0 0 8 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M6.66666 1.66667L1.33333 7.00001L6.66666 12.3333"
                                            stroke="#323232"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            <div
                                className="setting c-p"
                                onClick={() => {
                                    Router.push("/cards");
                                }}
                            >
                                <CardIcon/>

                                <span>کارت های بانکی</span>
                            </div>
                            <div
                                className="setting c-p"
                                onClick={() => {
                                    Router.push("/change_password");
                                }}
                            >
                                <SecurityIcon />

                                <span>امنیت</span>
                            </div>
                            {user.authentication_status == "unverified" ? (
                                <div className="d-grid">
                                    <button
                                    onClick={() => {
                                        Router.push("/auth");
                                    }}
                                    className="auth-btn slide-bck-center btn-warning mx-auto"
                                >
                                    احراز هویت
                                </button>
                                </div>
                            ) : ""}
                            </div>
                        </RightBox>
                        <LeftBox
                            className={"col-12 col-lg-9 " }
                        >
                            <form onSubmit={submit} className={theme == "light" ? "bg-gray" : ""}>
                            <label htmlFor="file" className="avatar">
                                <div className="position-relative">
                                    <img
                                        className="img-prof"
                                        src={img ?? "/images/prof-img.png"}
                                        width={78}
                                        height={78}
                                        alt="profile"
                                    />
                                    {loading && 
                                        <div className="lds-ring">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>}
                                    <PenIcon id="editIcon" className={theme == "light"? "svg-white edit-prof-svg": " edit-prof-svg"}/>
                                </div>
                            </label>

                            <input
                                type="file"
                                className="d-none"
                                id="file"
                                accept="image/*"
                                onChange={(e) => {
                                    profileChange(e.target.files["0"]);
                                }}
                            />
                            {user.rank == "unverified" ? (
                                <Alert>
                                    <AlertIcon />
                                    جهت احراز هویت اطلاعات حساب کاربری خود را
                                    همراه با مدارک بارگذاری کنید.
                                </Alert>
                            ) : (
                                <Success>اکانت شما تایید شده است .</Success>
                            )}
                            <div className="d-flex flex-wrap inputs" >
                                <label>
                                    <div>نام </div>
                                    <Inp
                                        value={formData.first_name}
                                        onChange={e=>setFormData({...formData, first_name: e.target.value})}
                                    />
                                </label>
                                <label>
                                    <div>و نام خانوادگی </div>
                                    <Inp
                                        value={formData.last_name}
                                        onChange={e=>setFormData({...formData, last_name: e.target.value})}
                                    />
                                </label>
                                <label>
                                    <div>نام پدر</div>
                                    <Inp
                                        value={formData.father_name}
                                        onChange={e=>setFormData({...formData, father_name: e.target.value})}
                                        className="w-162"
                                    />
                                </label>
                                <label>
                                    <div>شماره همراه</div>
                                    <Inp
                                        defaultValue={user.mobile}
                                        disabled                                        
                                    />
                                </label>
                                <label>
                                    <div>ایمیل</div>
                                    <Inp
                                        value={formData.email}
                                        onChange={e=>setFormData({...formData, email: e.target.value})}                                   
                                    />
                                </label>
                                <label>
                                    <div>کد ملی</div>
                                    <Inp
                                       value={formData.national_id}
                                       onChange={e=>setFormData({...formData, national_id: e.target.value})}
                                    />
                                </label>
                                <label>
                                    <div>شماره ثابت</div>
                                    <Inp
                                        value={formData.phone}
                                        onChange={e=>setFormData({...formData, phone: e.target.value})}
                                        disabled={user.is_phone_accepted}
                                    />
                                </label>
                                <label>
                                    <div>کد پستی</div>
                                    <Inp
                                        value={formData.post_code}
                                        onChange={e=>setFormData({...formData, post_code: e.target.value})}
                                    />
                                </label>
                                <label>
                                    <div>آدرس</div>
                                    <Inp
                                        className="w-100"
                                        value={formData.address}
                                       onChange={e=>setFormData({...formData, address: e.target.value})}
                                    />
                                </label>
                            </div>

                            <div className="w-100 d-flex justify-content-center mt-3">
                                <button
                                    className="btn btn-warning px-5"
                                        type="submit"
                                >
                                    اصلاح
                                </button>
                            </div>
                            </form>
                        </LeftBox>
                    </ProfMain>
                </Content>
            </div>
        </>
    );
}

export default withAuth(Profile)