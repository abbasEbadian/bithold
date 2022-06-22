import React from 'react'

function SwapIcon(    {...rest}) {
  return (
    <svg
    {...rest}
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <circle
        cx="20"
        cy="20"
        r="19"
        fill="#FF9D00"
        stroke="white"
        strokeWidth="2"
    />
    <path
        d="M18 16L15 13L12 16"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    />
    <path
        d="M15 27V13"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    />
    <path
        d="M22 24L25 27L28 24"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    />
    <path
        d="M25 13V27"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    />
</svg>
  )
}

export default SwapIcon