import { useEffect, useReducer, useState } from "react";
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
    "profile",
    "cards",

]


function MyApp({ Component, pageProps }) {
    const [night, setNight] = useState(false);
    const [user, setUser] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    config_axios()
    const setStatus = (i) => {
        setNight(i);
    };
    useEffect(async() => {
        const handleRouteStart = () => NProgress.start();
        const handleRouteDone = () => NProgress.done();
        Router.events.on("routeChangeStart", handleRouteStart);
        try{
            const token = localStorage.getItem('token')
            if(!token) throw new Error()
            const {data} = await axios.get(BASE + "/account/details/", _headers(token))
            setUser(data)
            setAuthenticated(true)
        }
        catch(e){
            console.log(e)
            localStorage.removeItem("token")
            const path = Router.pathname.split("/")
            if(GUARDED_ROUTES.includes( path[path.length - 1]))
                Router.replace("/login")
        }
        finally{
            Router.events.on("routeChangeComplete", handleRouteDone);
            Router.events.on("routeChangeError", handleRouteDone);
        }
    
        return () => {
          // Make sure to remove the event handler on unmount!
          Router.events.off("routeChangeStart", handleRouteStart);
          Router.events.off("routeChangeComplete", handleRouteDone);
          Router.events.off("routeChangeError", handleRouteDone);
        };
      }, []);
    useEffect(() => {
        !function(){var i="tTAFwQ",a=window,d=document;function g(){var g=d.createElement("script"),s="https://www.goftino.com/widget/"+i,l=localStorage.getItem("goftino_"+i);g.async=!0,g.src=l?s+"?o="+l:s;d.getElementsByTagName("head")[0].appendChild(g);}"complete"===d.readyState?g():a.attachEvent?a.attachEvent("onload",g):a.addEventListener("load",g,!1);}();
    },[])
    
    return (
        <UserContext.Provider value={{user, authenticated}}>
            <NightModeContext.Provider
                value={{
                    night,
                    setStatus,
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
