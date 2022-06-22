import React from 'react'

function ExitIcon({...rest}) {
  return (
    <svg
    {...rest}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M3.74654 12L8.33179 16.5852"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M8.33179 7.41476L3.74654 12"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M3.74657 12L13.8341 12"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M13.8341 3.74656H15.9739C18.3374 3.74656 20.2534 5.66258 20.2534 8.02612V15.6682C20.2534 18.0317 18.3374 19.9478 15.9739 19.9478H13.8341"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
  )
}

export default ExitIcon