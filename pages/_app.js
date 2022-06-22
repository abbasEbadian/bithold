import { useEffect, useReducer, useRef, useState } from "react";
import NightModeContext from "../components/Context";
import "../styles/globals.css";
import "../styles/style-fix.css";

import NProgress from 'nprogress'
import Router from 'next/router'
import "nprogress/nprogress.css";
import { ToastContainer } from "react-toastify";
import UserContext from "../utils/state/userContext";
import axios from "axios";
import {config_axios} from '../utils/axiosConfig'
const BASE = "https://api.bithold.exchange/api/v2"
const _headers = (token) => ({headers: {Authorization: "Bearer " + token}})
const GUARDED_ROUTES = [
    'analysis',
    "auth",
    "cards",
    "change_password",
    'dashboard',
    'edit',
    "history",
    "invite",
    "profile",
    "phone_otp",
    "trade",
    "wallet"
]
const UNGUARDED_ROUTES = [
    "register",
    "login",
    "verifycode",
    "forgetpassword"
]

const _fetchProfile = async() => {
    
}

function MyApp({ Component, pageProps }) {
    const [theme, setTheme] = useState("dark"); // dark or light
    const [user, setUser] = useState(false);
    const [userLoading, setUserLoading] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const configed = useRef(false)
    if(!configed.current)
        config_axios()
    const fetchProfile = () => {
        setUserLoading(true)
        try{
            const token = localStorage.getItem('token')
            axios.get(BASE + "/account/details/", _headers(token))
            .then(({data}) => {
                setUser(data)
                setAuthenticated(true)
            })
            .catch(e=>{

            })
        }
        catch(e){
            NProgress.done()
            return true
        }
        finally{
            setUserLoading(false)
            NProgress.done()
        }
    }

    useEffect(() => {
        const handleRouteStart = () => NProgress.start();
        const handleRouteDone = () => NProgress.done()

        let path = Router.pathname.split("/")
        path = path[ path.length -1 ]

        

        
        Router.events.on("routeChangeStart",  () => {
            handleRouteStart()
            
            try{
                fetchProfile()
            }
            catch(e){
            }
            finally{
                // handleRouteDone()
            }
        });
        
        Router.events.on("routeChangeComplete", handleRouteDone);
        Router.events.on("routeChangeError", handleRouteDone);
        return () => {
          // Make sure to remove the event handler on unmount!
          Router.events.off("routeChangeStart", handleRouteStart);
          Router.events.off("routeChangeComplete", handleRouteDone);
          Router.events.off("routeChangeError", handleRouteDone);
        };
      }, []);

 
    useEffect(() => {
        try{
            fetchProfile()
        }catch(e){}
        !function(){var i="tTAFwQ",a=window,d=document;function g(){var g=d.createElement("script"),s="https://www.goftino.com/widget/"+i,l=localStorage.getItem("goftino_"+i);g.async=!0,g.src=l?s+"?o="+l:s;d.getElementsByTagName("head")[0].appendChild(g);}"complete"===d.readyState?g():a.attachEvent?a.attachEvent("onload",g):a.addEventListener("load",g,!1);}();
    },[])
    
    return (
        <UserContext.Provider value={{user, authenticated, fetchProfile, userLoading}}>
            <NightModeContext.Provider
                value={{
                    theme,
                    setTheme,
                }}
            >   
                <Component {...pageProps} />
                <ToastContainer
                    rtl={true}
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover={false}
                />
            </NightModeContext.Provider>
        </UserContext.Provider>
    );
}

export default MyApp;
