import React from 'react'
import NightModeContext from "../Context";

const MIN_LENGTH_8 =   "min-length-8"
const CONTAINS_DIGIT =   "contains-digit"
const CONTAINS_LOWERCASE =    "contains-lowercase"
const CONTAINS_UPPERCASE =    "contains-uppercase"
const CONTAINS_SPECIAL =    "contains-special"
const CONTAINS_NOT_OTHER =   "contains-not-other"


export const VALIDATORS = [
    {key: MIN_LENGTH_8, text: "طول رمز باید حداقل 8 کاراکتر باشد."                  , regex:"^.{8,}$"},
    {key: CONTAINS_DIGIT, text: "رمز باید شامل عدد باشد."                           , regex: "[0-9]"  },
    {key: CONTAINS_LOWERCASE, text: "رمز باید شامل حروف انگلیسی کوچک باشد."        , regex: "[a-z]+" },
    {key: CONTAINS_UPPERCASE, text: "رمز باید شامل حروف انگلیسی بزرگ باشد."        , regex: "[A-Z]+" },
    {key: CONTAINS_SPECIAL, text: "پسورد باید شامل کاراکتر های خاص باشد. [@$!%*?&]", regex: "[@$!%\*\?&]+"  },
    {key: CONTAINS_NOT_OTHER, text: "رمز نباید شامل حروف فارسی و عربی باشد."       , regex: "[^\u0600-\u06FF]"},   
]

function PasswordFieldErrors({text, setIsInValid}) {
    const [invalids, setInvalids] = React.useState([])
    const stts = React.useContext(NightModeContext);
    const validate = React.useCallback((text)=>{
        var reg;
        let invs = []
        VALIDATORS.map((validator) => {
            reg = new RegExp(validator.regex)
            if (! reg.test(text))
                invs.push(validator.key)
        })
        if(setIsInValid) setIsInValid(invs.length >0)
        setInvalids(VALIDATORS.filter(v => invs.includes(v.key)))
    }, [])
    React.useEffect(() => {
        validate(text)
    }, [text])

    React.useEffect(() => {
        validate(text)
    }, [])

    return (
        <div className='mt-2'>
            <ul>
                {VALIDATORS.map(item=>{
                    return <li className='d-flex align-items-center ' key={item.key}>
                            {
                                invalids.find(i=>item.key === i.key) ? 
                                <i className='bi bi-x text-danger'></i>
                                :
                                <i className='bi bi-check text-success'></i>
                            }
                            <small className={stts.night === "true" ?  "text-white-50" : 'text-black-50'}>{item.text}</small>
                        </li>
                })}
            </ul>
        </div>
    )
}

export default PasswordFieldErrors