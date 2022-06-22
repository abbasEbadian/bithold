import axios from "axios";
import Router from "next/router";
import React, { useContext, useEffect, useState } from "react";
import ReactCodeInput from "react-code-input";
import ReactInputMask from "react-input-mask";
import styled from "styled-components";
import { baseUrl } from "../BaseUrl";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import CheckIcon from '../icons/CheckIcon'
import DocumentIcon from '../icons/DocumentIcon'
import UserContext from "../../utils/state/userContext";
import moment from "jalali-moment";
import ImageIcon from '../icons/ImageIcon'
const Main = styled.div``;
const Circles = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .first {
        right: 0px;
    }
`;
const Circle = styled.div`
    width: 38px;
    min-width: 38px;
    height: 38px;
    border: 2px solid #777777;
    border-radius: 50%;
    background-color: #fff;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    position: relative;
    font-weight: 600;
    span {
        position: absolute;
        white-space: nowrap;
        top: 40px;
        color: #ddd;
    }
    @media (max-width: 550px) {
        width: 34px;
        min-width: 34px;
        height: 34px;
        font-size: 16px;
        font-weight: 600;
        span {
            font-size: 10px;
            font-weight: 600;
        }
    }
`;

const Line = styled.div`
    width: 100%;
    border-bottom: 1px solid #000;
`;

const Content = styled.div`
    margin-top: 70px;
    width: 100%;
    display: flex;
    justify-content: center;
    .w-80 {
        width: 80% !important;
    }
`;

const StepOne = styled.div`
    width: 100%;
    max-width: 625px;
    padding-bottom: 32px;
    background: #ffffff;
    border-radius: 16px;
    padding-top: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
        font-weight: 600;
        font-size: 18px;
        line-height: 26px;
    }
    .homePhone {
        margin-top: 40px;
        border: 1px solid #afafaf;
        height: 40px;
        width: 340px;
        border-radius: 10px;
        padding: 16px;
        direction: ltr;
        ::placeholder {
            text-align: right;
        }
    }
    .l-t-r {
        direction: ltr !important;
    }
    .right {
        width: 200px;
        direction: rtl;
        text-align: right;
    }
    @media (max-width: 550px) {
        padding: 20px;
        p,
        .right {
            font-size: 13px;
        }
        .homePhone {
            width: 100%;
        }
    }
`;

const StepTwo = styled.div`
    width: 625px;
    background: #ffffff;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px;
    p {
        font-weight: 600;
        font-size: 18px;
        line-height: 26px;
    }
    span {
        font-size: 14px;
        color: #777777;
        padding-bottom: 4px;
    }
    div.first > label{
        flex: 1 1 auto;
    }
    div.first > label input{
        width: 100%;
        min-width: unset;
    }

    input {
        width: 100%;
        height: 50px;
        background-color: #edf8fc;
        border: 1px solid #dedede;
        border-radius: 8px;
        margin-top: 4px;
        padding: 16px;
    }
    label {
        display: flex;
        flex-direction: column;
        margin-top: 16px;
        flex-grow: 1;
    }
    label {
        display: flex;
        flex-direction: column;
        margin-top: 16px;
        flex-grow: 1;
        margin-inline: 8px;
    }
    @media (max-width: 768px) {
        font-size: 13px;
        height: 100%;
        p {
            font-size: 13px;
        }
        .d-flex {
            flex-direction: column;
            justify-content: center !important;
            align-items: center !important;
            width: 100%;
        }
        input,
        label {
            width: 100%;
        }
        input {
            height: 40px !important;
        }
        button:first-child {
            margin-top: 40px;
        }
    }
`;

const StepThree = styled.div`
    width: 625px;
    height: 100%;
    background: #ffffff;
    border-radius: 16px;
    padding-top: 32px;
    padding-bottom: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
        font-weight: 600;
        font-size: 18px;
        line-height: 26px;
    }
    span {
        font-size: 14px;
        color: #777777;
    }
    @media (max-width: 550px) {
        font-size: 13px;
        height: 100%;
        padding: 30px;
        p {
            font-size: 13px;
        }
        .d-flex {
            flex-direction: column;
            justify-content: center !important;
            align-items: center !important;
            width: 100%;
        }
        input,
        label {
            width: 100%;
        }
        input {
            height: 40px !important;
        }
        button:first-child {
            margin-top: 40px;
        }
    }
`;

const BackBtn = styled.button`
    width: 48%;
    height: 42px;
    background: #d6f4ff;
    border-radius: 41px;
    margin-top: 16px;
`;

const Uploads = styled.div`
    display: flex;
    margin-bottom: 20px;
    margin-top: 20px;

    .success {
        width: 50px;
        font-size: 12px;
        margin-top: 40px;
        margin-left: 20px;
    }
    @media (max-width: 550px) {
        flex-direction: column;
    }
`;

const Upload = styled.div`
    border: 3px dashed #29335c;
    width: 100px;
    height: 100px;
    border-radius: 10px;
    margin-top: 25px;
    margin-right: 10px;
    margin-left: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: hidden;
    input {
        height: 100px;
        position: absolute;
        opacity: 0;
    }
`;

const Submit = styled.button`
    
    width: 48%;
    height: 42px;
    margin-top: 65px;
    background: linear-gradient(90deg, #128cbd -1.72%, #3dbdc8 100%);
    border-radius: 32px;
    color: #fff;
    transition: 0.3s all;
    :hover {
        opacity: 0.83;
    }
    @media (max-width: 550px) {
        height: 38px;
    }
`;
const p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
const formatBD = (birthday) => p2e(new Date(birthday).toLocaleDateString("fa", {year:'numeric', month: '2-digit', day:'2-digit'}))




const Wizard = (props) => {
    const {user, fetchProfile} = useContext(UserContext)
    const [step, setStep] = useState(1);
    const [homePhone, setHomePhone] = useState();
    const [subHomePhone, setSubHomePhone] = useState(false);
    const [homeNumber, setHomeNumber] = useState("");
    const [homeCode, setHomeCode] = useState();
    const [addres, setAddres] = useState("");
    const [melli, setMelli] = useState(null);
    const [shenasname, setShenasname] = useState(null);
    const [selfi, setSelfi] = useState(null);
    const [birthCertificateId, setBirthCertificateId] = useState("");
    const [birthday, setBirthday] = useState(new Date());
    const [cardId, setCardId] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [postCode, setPostCode] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneNumberCounter, setPhoneNumberCounter] = useState(null);
    const [scans, setScans] = useState({
        birth_certificate: false,
        national_card: false,
        selfie: false
    })
    const [loading1 ,setLoading1] = useState(false)
    const [loading2 ,setLoading2] = useState(false)
    const [loading3 ,setLoading3] = useState(false)
    
    
    const submitStep1 = () =>{
        const data = {
            action : "profile",
            first_name: firstName,
            last_name: lastName,
            card_id: cardId,
            email,
            birth_certificate_id: birthCertificateId,
            birthday: formatBD(birthday),
            address: addres,
            post_code: postCode,
            phone: phoneNumber,
            father_name: fatherName
        }
        if(![firstName, lastName, cardId, birthday,
            email, addres, birthCertificateId, phoneNumber,
            postCode].every(Boolean)){
            toast.warn("فیلدهای ستاره دار الزامی هستند.")
            return;
        }
        setLoading1(true)
        axios.post(baseUrl+ "account/manage/", data)
        .then(response => {
            const {data} = response
            if(data.error === 1){
                toast.error(data.message)
            }else{
                toast.success(data.message)
                if(typeof fetchProfile !== 'undefined') fetchProfile()
            }
        })
        .catch(e=>{
            toast.error("خطا در برقراری ارتباط")
        })
        .finally(f => setLoading1(false))
    }
    
    const submitStep2 = () =>{
       
        setLoading2(true)
        axios.get(baseUrl+ "account/verify/phone/")
        .then(response => {
            const {data} = response
            if(data.error === 1){
                toast.error(data.message)
            }else{
                toast.success(data.message)
            }
            setPhoneNumberCounter(60)
            setSubHomePhone(true)
        })
        .catch(e=>{
            toast.error("خطا در برقراری ارتباط")
        })
        .finally(f => setLoading2(false))
    }
    const otpHandler = (e) => {
        let data = {
            otp: homeCode,
        };
        let config = {
            headers: {
                "Content-type": "application/json"
            },
            method: "POST",
            url: `${baseUrl}account/verify/phone/complete/`,
            data: data,
        };
        setLoading2(true)
        axios(config)
        .then((response) => {
            const {data: {error, message}} = response
            if(error){
                toast.error(message)
            }else{
                toast.success(message)
                if(typeof fetchProfile !== 'undefined')fetchProfile()
                setStep(3)
            }
            
        })
        .catch((error) => {
            toast.error("خطایی وجود دارد");
        })
        .finally(f=>{
            setLoading2(false)
        })
    };
    const uploadHandler = (e) => {
        
        let data = new FormData();
        data.append("selfie_photo", selfi !== null ? selfi.base64 : "");
        data.append("card", melli !== null ? melli.base64 : "");
        data.append(
            "birth_certificate",
            shenasname !== null ? shenasname.base64 : ""
        )
        let config = {
            headers: {
                "Content-type": "application/json",
            },
            method: "POST",
            url: `${baseUrl}account/document/`,
            data: data,
        }

        setLoading3(true)
        axios(config)
        .then((response) => {
            if(!response.data.error){
                setStep(4);

            }
            toast(response.data.message, { type: response.data.error? 'error' : 'success'})
        })
        .catch((error) => {
            toast.error("خطایی وجود دارد");
        })
        .finally(f => {
            setLoading3(false)
        })
    };

    const melliHanleChange = (file) => {
        if (file.target.files[0] !== undefined) {
            if (
                file.target.files[0].type == "image/png" ||
                file.target.files[0].type == "image/jpg" ||
                file.target.files[0].type == "image/jpeg"
            ) {
                let files = file.target.files[0];
                let reader = new FileReader();
                reader.readAsDataURL(files);
                reader.onloadend = () => {
                    setMelli({
                        file: files,
                        base64: reader.result,
                    });
                };
            }
        }
    };
    const shenasnameHanleChange = (file) => {
        if (file.target.files[0] !== undefined) {
            if (
                file.target.files[0].type == "image/png" ||
                file.target.files[0].type == "image/jpg" ||
                file.target.files[0].type == "image/jpeg"
            ) {
                let files = file.target.files[0];
                let reader = new FileReader();
                reader.readAsDataURL(files);
                reader.onloadend = () => {
                    setShenasname({
                        file: files,
                        base64: reader.result,
                    });
                };
            }
        }
    };
    const selfiHandleChange = (file) => {
        if (file.target.files[0] !== undefined) {
            if (
                file.target.files[0].type == "image/png" ||
                file.target.files[0].type == "image/jpg" ||
                file.target.files[0].type == "image/jpeg"
            ) {
                let files = file.target.files[0];
                let reader = new FileReader();
                reader.readAsDataURL(files);
                reader.onloadend = () => {
                    setSelfi({
                        file: files,
                        base64: reader.result,
                    });
                };
            }
        }
    };

    const handlePinChange = (pinCode) => {
        setHomeCode(pinCode);
    };
    
 
    useEffect(() => {
        if(user?.mobile) {
            setAddres(user?.personal_data?.address?.address)
            setPhoneNumber(user?.personal_data?.address?.phone)
            setPostCode(user?.personal_data?.address?.post_code)
            setBirthCertificateId(user.personal_data?.birth_certificate_id)
            setFirstName(user?.first_name)
            setLastName(user?.last_name)
            setCardId(user.personal_data?.national_id)
            setFatherName(user.father_name)
            setEmail(user.email)
            const _scans = { 
                birth_certificate: user.scans.birth_certificate,
                national_card:  user.scans.national_card,
                selfie: user.scans.selfie
            }
            setScans(_scans)
            
            if(user.birthday){
                setBirthday(new Date(moment.from(user.birthday, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/M/D')))
            }
            
            let nextStep = 1
            if(user?.personal_data?.address?.phone && !user.is_phone_accepted){
                nextStep = 2
            }
            if(user.is_phone_accepted){
                nextStep = 3
            }
            if(Object.values(_scans).every(Boolean)){
                nextStep = 4
            }
            setStep(nextStep)
        }
    }, [user]);

    useEffect(() => {
        if(phoneNumberCounter > 0)
            setTimeout(()=>{setPhoneNumberCounter(phoneNumberCounter - 1)}, 1000)
    }, [phoneNumberCounter])
  
    return (
        <Main className="container-lg">
            <Circles>
                <Circle>
                    {step > 1 && <CheckIcon /> || 1}
                    <span className="first">آدرس و مشخصات</span>
                </Circle>
                <Line />
                <Circle>
                    {step > 2 && <CheckIcon /> || 2}
                    <span>تلفن ثابت</span>
                </Circle>
                <Line />
                <Circle>
                    {step > 3 && <CheckIcon /> || 3}
                    <span>آپلود مدارک</span>
                </Circle>
                <Line />
                <Circle>
                    4<span>تایید هویت</span>
                </Circle>
            </Circles>
            {step === 1 ? (
                <>
                    <Content>
                        <StepTwo
                            className={
                                props.theme == "light" ? "bg-gray" : ""
                            }
                        >
                            <p>آدرس و اطلاعات شما</p>
                            <span>
                                دقت کنید آدرس دقیق محل سکونت فعلی خود را وارد
                                کنید
                            </span>
                            <div className="d-flex justify-content-between first ">
                                <label htmlFor="firstname" className="asterik">
                                    <span>نام</span>
                                    <input
                                        required
                                        name="firstname"
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => {
                                            setFirstName(e.target.value);
                                        }}
                                    />
                                </label>
                                <label className="asterik">
                                    <span>نام خانوادگی</span>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => {
                                            setLastName(e.target.value);
                                        }}
                                    />
                                </label>
                                <label className="asterik">
                                    <span>نام پدر</span>
                                    <input
                                        value={fatherName}
                                        onChange={(e) => {
                                            setFatherName(e.target.value);
                                        }}
                                        type="text"
                                    />
                                </label>
                                </div>
                                <div className="d-flex justify-content-between w-100 ">

                                <label className="asterik">
                                    <span>کد ملی</span>
                                    <input
                                        type="text"
                                        value={cardId}
                                        onChange={(e) => {
                                            setCardId(e.target.value);
                                        }}
                                    />
                                </label>
                                <label className="asterik">
                                    <span>شماره شناسنامه</span>
                                    <input
                                        type="text"
                                        value={birthCertificateId}
                                        onChange={(e) => {
                                            setBirthCertificateId(
                                                e.target.value
                                            );
                                        }}
                                    />
                                </label>
                            </div>
                            <div className="d-flex justify-content-between w-100 " style={{zIndex: 3}}>
                                <label className="asterik">
                                    <span>ایمیل</span>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                    />
                                </label>
                                
                                <label className="asterik">
                                    <span>تاریخ تولد</span>
                                    <DatePicker
                                        value={birthday}
                                        calendar={persian}
                                        locale={persian_fa}
                                        onChange={(dateObjects) =>
                                            setBirthday(dateObjects.toDate())
                                        }
                                    />
                                </label>
                            </div>
                            <div className="d-flex justify-content-between w-100 asterik">
                                <label  className="asterik">
                                    <span>تلفن ثابت</span>
                                    <input
                                        value={phoneNumber}
                                        onChange={(e) => {
                                            setPhoneNumber(e.target.value);
                                        }}
                                        type="text"
                                    />
                                </label>
                                <label className="asterik">
                                    <span>کد پستی</span>
                                    <input
                                        value={postCode}
                                        onChange={(e) => {
                                            setPostCode(e.target.value);
                                        }}
                                        type="text"
                                    />
                                </label>
                            </div>
                            
                            <div className="d-flex justify-content-between w-100 asterik">
                            <label className="w-100 asterik">
                                <span>آدرس</span>
                                <input
                                    value={addres}
                                    onChange={(e) => {
                                        setAddres(e.target.value);
                                    }}
                                    type="text"
                                    className="w-100"
                                />
                            </label>
                            </div>
                            
                            <div className="d-flex justify-content-center w-100 ">
                                <Submit
                                    onClick={submitStep1}
                                    className="mt-3"
                                    disabled={loading1}
                                >
                                    {
                                        loading1?
                                        <div class="spinner-border spinner-border-sm" role="status"></div>
                                        : <div>{"تایید و ادامه"}</div>
                                    }
                                </Submit>
                            </div>
                        </StepTwo>
                    </Content>
                </>
            ) : step === 2 ? (
                <>
                    
                    <Content>
                        <StepOne
                            className={
                                props.theme == "light" ? "bg-gray" : ""
                            }
                        >
                            {!subHomePhone ? (
                                <>
                                    <p className="text-center fs-12">
                                       برای تایید شماره ثابت ، یک تماس صوتی برای اعلام کد ، برقرار خواهد شد.
                                    </p>
                                   <div>
                                        <h6 className="fs-12 pb-2">شماره وارد شده :</h6>
                                        <span className="border rounded px-4 py-2">
                                            { phoneNumber || "04132846918" }
                                        </span>
                                   </div>
                                    <div className="w-100 px-md-5 px-2 d-flex align-items-center justify-content-between">
                                        <Submit
                                            className="mt-5"
                                            onClick={submitStep2}
                                            disabled={loading2 }
                                        >
                                            {
                                                loading2? 
                                                <div class="spinner-border spinner-border-sm" role="status"></div>
                                                : <div>درخواست تماس</div>
                                            }
                                        </Submit>
                                        <BackBtn
                                            className="mt-5"
                                            onClick={(e) => {
                                                setStep(1);
                                            }}
                                        >
                                            بازگشت و اصلاح
                                        </BackBtn>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h5>منتظر تماس ما باشید</h5>
                                    <h6 className="text-center">
                                        سپس شماره خوانده شده در تماس را وارد نمایید
                                    </h6>
                                    <div className="right mt-4">کد تایید</div>
                                    <div className="l-t-r">
                                        <ReactCodeInput
                                            onChange={handlePinChange}
                                            type="number"
                                            fields={5}
                                        />
                                    </div>
                                    <div className="fs-12">
                                        {
                                            phoneNumberCounter > 0?
                                                <div> تماس مجدد بعد از {phoneNumberCounter} ثانیه</div>
                                            :
                                                <div className="text-primary" role="button" onClick={submitStep2}>تماس مجدد</div>
                                        }
                                    </div>
                                    <div className="w-80 d-flex align-items-center justify-content-between">
                                        <Submit
                                            onClick={otpHandler}
                                            className="mt-5"
                                        >
                                            تایید و ادامه
                                        </Submit>
                                        <BackBtn
                                            className="mt-5"
                                            onClick={(e) => {
                                                setSubHomePhone(!subHomePhone);
                                            }}
                                        >
                                            بازگشت
                                        </BackBtn>
                                    </div>
                                </>
                            )}
                        </StepOne>
                    </Content>
                </>
            ) : step === 3 ? (
                <>
                    <Content>
                        <StepThree
                            className={
                                props.theme == "light" ? "bg-gray" : ""
                            }
                        >
                            <p>آپلود مدارک</p>
                            <span>
                                عکس کارت ملی به صورت پشت و رو همراه عکس شناسنامه
                                و عکس سلفی از خود را آپلود کنید
                            </span>
                            <br />
                            <span className="px-3">
                                دریافت سلفی برای حفظ امنیت شما می‌باشد. لطفاً
                                کارت ملی خود را در درست داشته و مطابق تصویر زیر
                                عکس سلفی بگیرید.
                            </span>
                            <img src="/images/selfi.svg" alt="" />
                            <span></span>
                            <Uploads>
                                {melli !== null && melli.lenght !== 0 ? (
                                    <div className="success">
                                        تصویر با موفقیت آپلود شد
                                    </div>
                                ) : (
                                    <Upload onDrop={melliHanleChange} >
                                        <ImageIcon />
                                        <input
                                            accept="image/png, image/gif, image/jpeg"
                                            type="file"
                                            onChange={melliHanleChange}
                                            placeholder="کارت ملی"
                                        />
                                        کارت ملی
                                        {scans.national_card && <div className={"uploaded"}>آپلود شده</div>}
                                    </Upload>
                                )}
                                {shenasname !== null &&
                                shenasname.lenght !== 0 ? (
                                    <div className="success">
                                        تصویر با موفقیت آپلود شد
                                    </div>
                                ) : (
                                    <Upload onDrop={shenasnameHanleChange}>
                                        <ImageIcon/>
                                        <input
                                            accept="image/png, image/gif, image/jpeg"
                                            type="file"
                                            onChange={shenasnameHanleChange}
                                        />
                                        شناسنامه
                                        {scans.birth_certificate && <div className={"uploaded"}>آپلود شده</div>}
                                    </Upload>
                                )}

                                {selfi !== null && selfi.lenght !== 0 ? (
                                    <div className="success">
                                        تصویر با موفقیت آپلود شد
                                    </div>
                                ) : (
                                    <Upload
                                        className="on-hover"
                                        onDrop={selfiHandleChange}
                                    >
                                        <ImageIcon />
                                        <input
                                            accept="image/png, image/gif, image/jpeg"
                                            type="file"
                                            onChange={selfiHandleChange}
                                        />
                                        سلفی
                                        {scans.selfie && <div className={"uploaded"}>آپلود شده</div>}
                                    </Upload>
                                )}
                            </Uploads>
                            <div className="d-flex justify-content-between w-100 px-4">
                                <BackBtn
                                    onClick={(e) => {
                                        user?.is_phone_accepted != true
                                            ? setStep(2)
                                            : setStep(1);
                                    }}
                                >
                                    بازگشت
                                </BackBtn>
                                <Submit
                                    onClick={uploadHandler}
                                    className="mt-3"
                                    disabled={loading3}
                                >
                                    {
                                        loading3? 
                                        <div class="spinner-border spinner-border-sm" role="status"></div>
                                        : <div>تایید و ادامه</div>
                                    }
                                </Submit>
                            </div>
                        </StepThree>
                    </Content>
                </>
            ) : (
                <>
                    <Content>
                        <StepThree
                            className={
                                props.theme == "light" ? "bg-gray" : ""
                            }
                        >
                            <p>آپلود مدارک</p>
                            <span>
                                اطلاعات شما جهت بررسی به کارشناسان ما ارسال شد .
                                بزودی نتیجه برای شما ارسال می شود .
                            </span>
                           <DocumentIcon />

                            <Submit
                                onClick={(e) => {
                                    Router.push("/dashboard");
                                }}
                                className="mt-3"
                            >
                                تایید
                            </Submit>
                        </StepThree>
                    </Content>
                </>
            )}
        </Main>
    );
};

export default Wizard;
