import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";
import Sidebar from "../components/Sidebar";
import styled from "styled-components";
import Header from "../components/Header";
import { useContext, useEffect, useState } from "react";
import Router from "next/router";
import Image from "next/image";
import Wizard from "../components/Auth/Wizard";
import axios from "axios";
import { baseUrl } from "../components/BaseUrl";
import NightModeContext from "../components/Context";
import Particle from "../components/Particle";

const Main = styled.div`
    background-color: #edf8fc;
    width: 100%;
    min-height: 100vh;
`;
const Content = styled.div`
    overflow: hidden;
    transition: 0.1s all;
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

const AuthMain = styled.div`
    padding: 32px;
    h2 {
        color: #323232;
        line-height: 25.74px;
        font-size: 18px;
        font-weight: 600;
    }
`;

export default function Auth() {
    const stts = useContext(NightModeContext);

    // useEffect(() => {
    //     if (
    //         localStorage.getItem("token") == null ||
    //         typeof window == "undefined"
    //     ) {
    //         Router.push("/login");
    //     }
    // }, []);
    const [showMenu, setShowMenu] = useState(false);
    const [profile, setProfile] = useState([]);
    const menuHandler = () => {
        setShowMenu(!showMenu);
    };

    let token = "";
    setTimeout(() => {
        token = localStorage.getItem("token");
    }, 1000);
    // useEffect(() => {
    //     if (
    //         localStorage.getItem("token") == null ||
    //         typeof window == "undefined"
    //     ) {
    //         Router.push("/login");
    //     }
    // }, []);
    // useEffect(() => {
    //     setTimeout(() => {
    //         let config = {
    //             headers: {
    //                 "Content-type": "application/json",
    //                 Authorization: `Bearer ${token}`,
    //             },
    //             url: `${baseUrl}account/details/`,
    //             method: "GET",
    //         };
    //         axios(config)
    //             .then((res) => {
    //                 if (res.status == "200") {
    //                     setProfile(res.data);
    //                 }
    //             })
    //             .catch((error) => {});
    //     }, 1200);
    // }, []);

    return (
        <Main
            className={
                stts.night == "true" ? "bg-dark-2 max-w-1992" : "max-w-1992"
            }
        >
            <Head>
                {" "}
                <link rel="shortcut icon" href="/images/fav.png" />
                <title>صرافی بیت هولد | احراز هویت</title>
            </Head>

            <Sidebar show-menu={menuHandler} active="5" show={showMenu} />
            <Content className={showMenu ? "pr-176" : ""}>
                <Header show-menu={menuHandler} />
                <Particle/>
                <AuthMain>
                    <h2>احراز هویت</h2>
                    <Wizard stts={stts} profile={profile} token={token} />
                </AuthMain>
            </Content>
        </Main>
    );
}
