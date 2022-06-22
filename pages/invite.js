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
import CopyIcon from "../components/icons/CopyIcon";
import withAuth from "../utils/withAuth";

const Main = styled.div`
    background-color: #edf8fc;
    width: 100%;
    min-height: 100vh;
    .css-b62m3t-container {
        width: 100%;
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

const InviteMain = styled.div`
    border-radius: 10px;
    width: 93%;
    margin-right: auto;
    margin-left: auto;
    margin-top: 30px;
    height: 100%;
    background-color: #fff;
`;

const InviteHead = styled.div`
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

const InviteContent = styled.div`
    padding: 16px;
`;
const Title = styled.div`
    height: 60px;
    width: 100%;
    background-color: #00000033;
    display: flex;
    padding-right: 16px;
    div {
        margin-top: 15px;
        width: 100%;
    }
`;

const InviteLink = styled.div``;
const CodeBox = styled.div`
    border: 1px solid #333;
    margin-top: 30px;
    border-radius: 10px;
    height: 44px;
    direction: ltr;
    display: flex;
    align-items: center;
    padding-top: 12px;
    padding-left: 16px;
    @media (max-width: 786px) {
        font-size: 12px;
    }
`;

 function Invite() {
    const [refral, setRefral] = useState([]);
    const {theme} = useContext(NightModeContext);
    let token = "";

    const [showMenu, setShowMenu] = useState(false);
    const menuHandler = () => {
        setShowMenu(!showMenu);
    };

    useEffect(() => {
            let config = {
                headers: {
                    "Content-type": "application/json",
                },
                url: `${baseUrl}account/referral/`,
                method: "GET",
            };
            axios(config)
                .then((res) => {
                    if (res.data.error === 0) {
                        setRefral(res.data);
                    }
                })
                .catch((error) => {});
    }, []);

    return (
        <Main
            className={
                theme == "light" ? "bg-dark-2 max-w-1992" : "max-w-1992"
            }
        >
            <Head>
                {" "}
                <link rel="shortcut icon" href="/images/fav.png" />
                <title>صرافی بیت هولد | دعوت از دوستان</title>
            </Head>
            <Sidebar show-menu={menuHandler} active="2" show={showMenu} />
            <Content className={showMenu ? "pr-176" : ""}>
                <Header show-menu={menuHandler} />
                <InviteMain className={theme == "light" ? "bg-gray" : ""}>
                    <InviteHead>
                        <h6>دعوت از دوستان</h6>
                    </InviteHead>
                    <InviteContent>
                        <Title>
                            <div>
                                <h6>تعداد افراد دعوت شده توسط شما</h6>
                            </div>
                            <div>
                                <h6>میزان درآمد شما</h6>
                            </div>
                        </Title>
                        <Title>
                            <div>
                                <h6 className="me-3">{refral.user_count}</h6>
                            </div>
                            <div>
                                <h6 className="me-3">{refral.total_get}</h6>
                            </div>
                        </Title>
                        <InviteLink>
                            <h6 className="mt-4">لینک دعوت شما:</h6>
                            <CodeBox className="d-flex px-2">
                                <p className="adress-box">
                                    <CopyIcon onClick={() => {
                                        navigator.clipboard.writeText(
                                            ` https://www.bithold.exchange/register?referral=${refral.referral_code}`
                                        );
                                        toast.success("آدرس کپی شد");
                                    }}
                                    className="c-p"/>
                                </p>
                                <p className="px-2">
                                    {"https://www.bithold.exchange/register?referral="}
                                    {refral.referral_code}
                                </p>
                            </CodeBox>
                        </InviteLink>
                    </InviteContent>
                </InviteMain>
            </Content>
        </Main>
    );
}
export default withAuth(Invite)