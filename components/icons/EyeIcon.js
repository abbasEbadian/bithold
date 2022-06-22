import React from 'react'

function EyeIcon({children, ...rest}) {
  return (
    <svg
    {...rest}
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="15"
        viewBox="0 0 22 15"
    >
        <path
            id="ic_remove_red_eye_24px"
            d="M12,4.5A11.827,11.827,0,0,0,1,12a11.817,11.817,0,0,0,22,0A11.827,11.827,0,0,0,12,4.5ZM12,17a5,5,0,1,1,5-5A5,5,0,0,1,12,17Zm0-8a3,3,0,1,0,3,3A3,3,0,0,0,12,9Z"
            transform="translate(-1 -4.5)"
        />
    </svg>
  )
}

export default EyeIcon