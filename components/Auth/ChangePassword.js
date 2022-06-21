import React from 'react'
import styled from 'styled-components'
import axios from "axios";
import Router from "next/router";
import { baseUrl } from "../BaseUrl";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Main = styled.div`
`

const ChangePassword = () => {
  return (
    <Main>
            <ToastContainer
                rtl={true}
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
            />
    </Main>
  )
}

export default ChangePassword