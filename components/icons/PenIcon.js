import React from 'react'

function PenIcon({children, ...rest}) {
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
  )
}

export default PenIcon