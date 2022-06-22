import React from 'react'

function CloseIcon({...rest}) {
  return (
    <svg
        {...rest}   
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M12 20L20 12"
            stroke="#777777"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M20 20L12 12"
            stroke="#777777"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
  )
}

export default CloseIcon