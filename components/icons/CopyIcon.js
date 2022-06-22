import React from 'react'

function CopyIcon({...rest}) {
  return (
    <svg
                                    {...rest}    
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <rect
                                            x="6.99792"
                                            y="6.99792"
                                            width="14.0058"
                                            height="14.0058"
                                            rx="2"
                                            stroke="#727272"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M6.99792 17.0021H4.99709C3.89206 17.0021 2.99625 16.1063 2.99625 15.0013V4.99709C2.99625 3.89206 3.89206 2.99625 4.99709 2.99625H15.0013C16.1063 2.99625 17.0021 3.89206 17.0021 4.99709V6.99792"
                                            stroke="#727272"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
  )
}

export default CopyIcon