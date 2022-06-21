import axios from "axios";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import ReactCodeInput from "react-code-input";
import ReactInputMask from "react-input-mask";
import styled from "styled-components";
import { baseUrl } from "../BaseUrl";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
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
    width: 625px;
    height: 285px;
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
    height: 565px;
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
    span {
        font-size: 14px;
        color: #777777;
    }
    input {
        width: 264px;
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
    width: 231px;
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
    width: 231px;
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
const Wizard = (props) => {
    const [step, setStep] = useState(1);
    const [homePhone, setHomePhone] = useState();
    const [subHomePhone, setSubHomePhone] = useState(false);
    const [homeNumber, setHomeNumber] = useState();
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
    console.log(birthCertificateId);
    let token = "";
    // setTimeout((e) => {
    //     token = localStorage.getItem("token");
    // }, 1000);
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
    const homePhoneHandler = (e) => {
        setSubHomePhone(true);
        setTimeout((e) => {
            let data = {
                action: "profile",
                address: addres,
                birth_certificate_id: birthCertificateId,
                birthday: birthday
                    .toLocaleDateString("fa-IR", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                    })
                    .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))
                    .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d)),
                card_id: cardId,
                email: email,
                first_name: props.profile.first_name,
                last_name: props.profile.last_name,
                father_name: fatherName,
                phone: homeNumber,
                post_code: postCode,
            };
            let config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                method: "POST",
                url: `${baseUrl}account/manage/`,
                data: data,
            };
            let config2 = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                method: "GET",
                url: `${baseUrl}account/verify/phone/`,
                data: data,
            };
            axios(config)
                .then((response) => {
                    axios(config2)
                        .then((response) => {})
                        .catch((error) => {
                            toast.error("خطایی وجود دارد", {
                                position: "top-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        });
                })
                .catch((error) => {
                    toast.error("خطایی وجود دارد", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                });
        }, 2000);
    };
    const handlePinChange = (pinCode) => {
        setHomeCode(pinCode);
    };
    const isPhoneAccepted = (e) => {
        props.profile.is_phone_accepted == true ? setStep(3) : setStep(2);
    };
    const verifyPhone = (e) => {};
    const otpHandler = (e) => {
        setTimeout((e) => {
            let data = {
                otp: homeCode,
            };
            let config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                method: "POST",
                url: `${baseUrl}account/verify/phone/complete/`,
                data: data,
            };

            axios(config)
                .then((response) => {
                    response.data.error == 1
                        ? toast.error(response.data.message, {
                              position: "top-center",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                          })
                        : setStep(3);
                })
                .catch((error) => {
                    toast.error("خطایی وجود دارد", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                });
        }, 2001);
    };

    useEffect((e) => {
        if (props.profile.personal_data !== undefined) {
            props.profile.personal_data.address.phone !== null
                ? setStep(2)
                : "";
        }
    }, []);

    const uploadHandler = (e) => {
        setStep(4);
        let data = new FormData();
        data.append("selfie_photo", selfi !== null ? selfi.base64 : "");
        data.append("card", melli !== null ? melli.base64 : "");
        data.append(
            "birth_certificate",
            shenasname !== null ? shenasname.base64 : ""
        );

        let config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            method: "POST",
            url: `${baseUrl}account/document/`,
            data: data,
        };

        setTimeout(() => {
            axios(config)
                .then((response) => {})
                .catch((error) => {
                    toast.error("خطایی وجود دارد", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                });
        }, 3000);
    };
    return (
        <Main>
            {step === 1 ? (
                <>
                    <Circles>
                        <Circle>
                            1<span className="first">آدرس و مشخصات</span>
                        </Circle>
                        <Line />
                        <Circle>
                            2<span>تلفن ثابت</span>
                        </Circle>
                        <Line />
                        <Circle>
                            3<span>آپلود مدارک</span>
                        </Circle>
                        <Line />
                        <Circle>
                            4<span>تایید هویت</span>
                        </Circle>
                    </Circles>
                    <Content>
                        <StepTwo
                            className={
                                props.stts.night == "true" ? "bg-gray" : ""
                            }
                        >
                            <p>آدرس و اطلاعات شما</p>
                            <span>
                                دقت کنید آدرس دقیق محل سکونت فعلی خود را وارد
                                کنید
                            </span>
                            <div className="d-flex justify-content-between w-100 px-4">
                                <label>
                                    کد ملی
                                    <input
                                        type="text"
                                        value={cardId}
                                        onChange={(e) => {
                                            setCardId(e.target.value);
                                        }}
                                    />
                                </label>
                                <label>
                                    شماره شناسنامه
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
                            <div className="d-flex justify-content-between w-100 px-4">
                                <label>
                                    ایمیل
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                    />
                                </label>
                                <label>
                                    تاریخ تولد
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
                            <div className="d-flex justify-content-between w-100 px-4">
                                <label>
                                    نام پدر
                                    <input
                                        value={fatherName}
                                        onChange={(e) => {
                                            setFatherName(e.target.value);
                                        }}
                                        type="text"
                                    />
                                </label>
                                <label>
                                    کد پستی
                                    <input
                                        value={postCode}
                                        onChange={(e) => {
                                            setPostCode(e.target.value);
                                        }}
                                        type="text"
                                    />
                                </label>
                            </div>
                            <label className="w-100 px-4">
                                آدرس
                                <input
                                    value={addres}
                                    onChange={(e) => {
                                        setAddres(e.target.value);
                                    }}
                                    type="text"
                                    className="w-100"
                                />
                            </label>
                            <div className="d-flex justify-content-center w-100 px-4">
                                <Submit
                                    onClick={isPhoneAccepted}
                                    className="mt-3"
                                >
                                    تایید و ادامه
                                </Submit>
                            </div>
                        </StepTwo>
                    </Content>
                </>
            ) : step === 2 ? (
                <>
                    <Circles>
                        <Circle>
                            <svg
                                width="17"
                                height="12"
                                viewBox="0 0 17 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M16.0813 0.925354L6.00667 11L0.970673 5.96269"
                                    stroke="#30E0A1"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span className="first">آدرس و مشخصات</span>
                        </Circle>
                        <Line />
                        <Circle>
                            2<span>تلفن ثابت</span>
                        </Circle>
                        <Line />
                        <Circle>
                            3<span>آپلود مدارک</span>
                        </Circle>
                        <Line />
                        <Circle>
                            4<span>تایید هویت</span>
                        </Circle>
                    </Circles>
                    <Content>
                        <StepOne
                            className={
                                props.stts.night == "true" ? "bg-gray" : ""
                            }
                        >
                            {!subHomePhone ? (
                                <>
                                    <p className="text-center">
                                        شماره ثابت خود را وارد نمایید
                                    </p>
                                    <input
                                        value={homeNumber}
                                        className="homePhone"
                                        placeholder="شماره ثابت"
                                        type="number"
                                        name="number"
                                        onChange={(e) => {
                                            setHomeNumber(e.target.value);
                                        }}
                                    />
                                    <div className="w-80 d-flex align-items-center justify-content-between">
                                        <Submit
                                            className="mt-5"
                                            onClick={homePhoneHandler}
                                        >
                                            تایید
                                        </Submit>
                                        <BackBtn
                                            className="mt-5"
                                            onClick={(e) => {
                                                setStep(1);
                                            }}
                                        >
                                            بازگشت
                                        </BackBtn>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p className="text-center">
                                        شماره خوانده شده در تماس را وارد نمایید
                                    </p>
                                    <div className="right mt-4">کد تایید</div>
                                    <div className="l-t-r">
                                        <ReactCodeInput
                                            onChange={handlePinChange}
                                            type="number"
                                            fields={5}
                                        />
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
                    <Circles>
                        <Circle>
                            <svg
                                width="17"
                                height="12"
                                viewBox="0 0 17 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M16.0813 0.925354L6.00667 11L0.970673 5.96269"
                                    stroke="#30E0A1"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span className="first">آدرس و مشخصات</span>
                        </Circle>
                        <Line />
                        <Circle>
                            <svg
                                width="17"
                                height="12"
                                viewBox="0 0 17 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M16.0813 0.925354L6.00667 11L0.970673 5.96269"
                                    stroke="#30E0A1"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span>تلفن ثابت</span>
                        </Circle>
                        <Line />
                        <Circle>
                            3<span>آپلود مدارک</span>
                        </Circle>
                        <Line />
                        <Circle>
                            4<span>تایید هویت</span>
                        </Circle>
                    </Circles>
                    <Content>
                        <StepThree
                            className={
                                props.stts.night == "true" ? "bg-gray" : ""
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
                                    <Upload onDrop={melliHanleChange}>
                                        <svg
                                            width="60"
                                            height="60"
                                            viewBox="0 0 60 60"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M51.7591 25.1647V42.0884C51.7591 47.4294 47.4293 51.7591 42.0884 51.7591H17.9116C12.5707 51.7591 8.24094 47.4294 8.24094 42.0884V17.9117C8.24094 12.5707 12.5707 8.24097 17.9116 8.24097H32.4177"
                                                stroke="#29335C"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M8.24094 32.4177L11.3722 29.2864C12.4654 28.1932 13.948 27.5791 15.494 27.5791C17.0399 27.5791 18.5225 28.1932 19.6157 29.2864L30 39.6707"
                                                stroke="#29335C"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M17.9189 51.7591L33.1386 36.5394C35.4149 34.2631 39.1056 34.2631 41.382 36.5394L50.9056 46.063"
                                                stroke="#29335C"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M44.506 8.24097L38.4619 14.2852"
                                                stroke="#29335C"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M50.5502 14.2852L44.506 8.24097"
                                                stroke="#29335C"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M44.506 8.24097V20.3293"
                                                stroke="#29335C"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <input
                                            accept="image/png, image/gif, image/jpeg"
                                            type="file"
                                            onChange={melliHanleChange}
                                            placeholder="کارت ملی"
                                        />
                                        کارت ملی
                                    </Upload>
                                )}
                                {shenasname !== null &&
                                shenasname.lenght !== 0 ? (
                                    <div className="success">
                                        تصویر با موفقیت آپلود شد
                                    </div>
                                ) : (
                                    <Upload onDrop={shenasnameHanleChange}>
                                        <svg
                                            width="60"
                                            height="60"
                                            viewBox="0 0 60 60"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M51.7591 25.1647V42.0884C51.7591 47.4294 47.4293 51.7591 42.0884 51.7591H17.9116C12.5707 51.7591 8.24094 47.4294 8.24094 42.0884V17.9117C8.24094 12.5707 12.5707 8.24097 17.9116 8.24097H32.4177"
                                                stroke="#29335C"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M8.24094 32.4177L11.3722 29.2864C12.4654 28.1932 13.948 27.5791 15.494 27.5791C17.0399 27.5791 18.5225 28.1932 19.6157 29.2864L30 39.6707"
                                                stroke="#29335C"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M17.9189 51.7591L33.1386 36.5394C35.4149 34.2631 39.1056 34.2631 41.382 36.5394L50.9056 46.063"
                                                stroke="#29335C"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M44.506 8.24097L38.4619 14.2852"
                                                stroke="#29335C"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M50.5502 14.2852L44.506 8.24097"
                                                stroke="#29335C"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M44.506 8.24097V20.3293"
                                                stroke="#29335C"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <input
                                            accept="image/png, image/gif, image/jpeg"
                                            type="file"
                                            onChange={shenasnameHanleChange}
                                        />
                                        شناسنامه
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
                                        <svg
                                            width="60"
                                            height="60"
                                            viewBox="0 0 60 60"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M51.7591 25.1647V42.0884C51.7591 47.4294 47.4293 51.7591 42.0884 51.7591H17.9116C12.5707 51.7591 8.24094 47.4294 8.24094 42.0884V17.9117C8.24094 12.5707 12.5707 8.24097 17.9116 8.24097H32.4177"
                                                stroke="#29335C"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M8.24094 32.4177L11.3722 29.2864C12.4654 28.1932 13.948 27.5791 15.494 27.5791C17.0399 27.5791 18.5225 28.1932 19.6157 29.2864L30 39.6707"
                                                stroke="#29335C"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M17.9189 51.7591L33.1386 36.5394C35.4149 34.2631 39.1056 34.2631 41.382 36.5394L50.9056 46.063"
                                                stroke="#29335C"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M44.506 8.24097L38.4619 14.2852"
                                                stroke="#29335C"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M50.5502 14.2852L44.506 8.24097"
                                                stroke="#29335C"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M44.506 8.24097V20.3293"
                                                stroke="#29335C"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <input
                                            accept="image/png, image/gif, image/jpeg"
                                            type="file"
                                            onChange={selfiHandleChange}
                                        />
                                        سلفی
                                    </Upload>
                                )}
                            </Uploads>
                            <div className="d-flex justify-content-between w-100 px-4">
                                <BackBtn
                                    onClick={(e) => {
                                        props.profile.is_phone_accepted != true
                                            ? setStep(2)
                                            : setStep(1);
                                    }}
                                >
                                    بازگشت
                                </BackBtn>
                                <Submit
                                    onClick={uploadHandler}
                                    className="mt-3"
                                >
                                    تایید و ادامه
                                </Submit>
                            </div>
                        </StepThree>
                    </Content>
                </>
            ) : (
                <>
                    <Circles>
                        <Circle>
                            <svg
                                width="17"
                                height="12"
                                viewBox="0 0 17 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M16.0813 0.925354L6.00667 11L0.970673 5.96269"
                                    stroke="#30E0A1"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                            <span className="first">آدرس و مشخصات</span>
                        </Circle>
                        <Line />
                        <Circle>
                            <svg
                                width="17"
                                height="12"
                                viewBox="0 0 17 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M16.0813 0.925354L6.00667 11L0.970673 5.96269"
                                    stroke="#30E0A1"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span>تلفن ثابت</span>
                        </Circle>
                        <Line />
                        <Circle>
                            <svg
                                width="17"
                                height="12"
                                viewBox="0 0 17 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M16.0813 0.925354L6.00667 11L0.970673 5.96269"
                                    stroke="#30E0A1"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span>آپلود مدارک</span>
                        </Circle>
                        <Line />
                        <Circle>
                            4<span>تایید هویت</span>
                        </Circle>
                    </Circles>
                    <Content>
                        <StepThree
                            className={
                                props.stts.night == "true" ? "bg-gray" : ""
                            }
                        >
                            <p>آپلود مدارک</p>
                            <span>
                                اطلاعات شما جهت بررسی به کارشناسان ما ارسال شد .
                                بزودی نتیجه برای شما ارسال می شود .
                            </span>
                            <svg
                                className="mt-5 mb-3"
                                width="250"
                                height="108"
                                viewBox="0 0 250 108"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clipPath="url(#clip0_144_4269)">
                                    <path
                                        d="M241.573 107.556H7.85474C5.77226 107.553 3.77575 106.723 2.30322 105.247C0.830682 103.772 0.00235882 101.771 -4.57764e-05 99.6837V7.87202C0.00235882 5.78497 0.830682 3.78409 2.30322 2.30832C3.77575 0.832552 5.77226 0.00240987 7.85474 0H241.573C243.655 0.00240987 245.652 0.832552 247.124 2.30832C248.597 3.78409 249.425 5.78497 249.427 7.87202V99.6837C249.425 101.771 248.597 103.772 247.124 105.247C245.652 106.723 243.655 107.553 241.573 107.556Z"
                                        fill="#F2F2F2"
                                    />
                                    <path
                                        d="M187.064 102.535H44.9539C34.364 102.523 24.2113 98.3017 16.7231 90.7971C9.23493 83.2925 5.02283 73.1175 5.01088 62.5043V45.0556C5.02282 34.4425 9.2349 24.2674 16.7231 16.7628C24.2113 9.25811 34.364 5.0367 44.9539 5.02466H204.475C215.065 5.0367 225.217 9.25811 232.706 16.7628C240.194 24.2674 244.406 34.4425 244.418 45.0556C244.401 60.2948 238.353 74.9049 227.6 85.6807C216.848 96.4564 202.27 102.518 187.064 102.535Z"
                                        fill="white"
                                    />
                                    <path
                                        d="M150.406 31.3073H56.4689C55.9316 31.3073 55.4163 31.0934 55.0364 30.7127C54.6565 30.332 54.4431 29.8156 54.4431 29.2771C54.4431 28.7387 54.6565 28.2223 55.0364 27.8416C55.4163 27.4608 55.9316 27.2469 56.4689 27.2469H150.406C150.943 27.2469 151.458 27.4608 151.838 27.8416C152.218 28.2223 152.431 28.7387 152.431 29.2771C152.431 29.8156 152.218 30.332 151.838 30.7127C151.458 31.0934 150.943 31.3073 150.406 31.3073Z"
                                        fill="#E6E6E6"
                                    />
                                    <path
                                        d="M197.958 52.9682H56.4689C55.9316 52.9682 55.4163 52.7543 55.0364 52.3736C54.6565 51.9929 54.4431 51.4765 54.4431 50.938C54.4431 50.3996 54.6565 49.8832 55.0364 49.5025C55.4163 49.1217 55.9316 48.9078 56.4689 48.9078H197.958C198.495 48.9078 199.011 49.1217 199.391 49.5025C199.77 49.8832 199.984 50.3996 199.984 50.938C199.984 51.4765 199.77 51.9929 199.391 52.3736C199.011 52.7543 198.495 52.9682 197.958 52.9682Z"
                                        fill="#E6E6E6"
                                    />
                                    <path
                                        d="M197.958 74.6291H56.4689C55.9316 74.6291 55.4163 74.4152 55.0364 74.0345C54.6565 73.6537 54.4431 73.1374 54.4431 72.5989C54.4431 72.0605 54.6565 71.5441 55.0364 71.1634C55.4163 70.7826 55.9316 70.5687 56.4689 70.5687H197.958C198.495 70.5687 199.011 70.7826 199.391 71.1634C199.77 71.5441 199.984 72.0605 199.984 72.5989C199.984 73.1374 199.77 73.6537 199.391 74.0345C199.011 74.4152 198.495 74.6291 197.958 74.6291Z"
                                        fill="#E6E6E6"
                                    />
                                    <path
                                        d="M197.958 74.6291H56.4689C55.9316 74.6291 55.4163 74.4152 55.0364 74.0345C54.6565 73.6537 54.4431 73.1374 54.4431 72.5989C54.4431 72.0605 54.6565 71.5441 55.0364 71.1634C55.4163 70.7826 55.9316 70.5687 56.4689 70.5687H197.958C198.495 70.5687 199.011 70.7826 199.391 71.1634C199.77 71.5441 199.984 72.0605 199.984 72.5989C199.984 73.1374 199.77 73.6537 199.391 74.0345C199.011 74.4152 198.495 74.6291 197.958 74.6291Z"
                                        fill="#E6E6E6"
                                    />
                                    <path
                                        d="M119.878 78.2204C134.24 78.2204 145.883 66.5522 145.883 52.1587C145.883 37.7653 134.24 26.097 119.878 26.097C105.516 26.097 93.8736 37.7653 93.8736 52.1587C93.8736 66.5522 105.516 78.2204 119.878 78.2204Z"
                                        fill="#108ABB"
                                    />
                                    <path
                                        d="M117.514 87.2358L101.573 73.744C101.028 73.2818 100.689 72.6218 100.629 71.9089C100.569 71.196 100.793 70.4884 101.253 69.9413L104.187 66.4594C104.648 65.9133 105.307 65.5728 106.018 65.5127C106.73 65.4526 107.436 65.6778 107.982 66.1388L123.923 79.6306C124.468 80.0928 124.807 80.7527 124.867 81.4656C124.927 82.1785 124.703 82.8862 124.243 83.4333L121.309 86.9152C120.847 87.4613 120.189 87.8017 119.478 87.8618C118.766 87.9219 118.06 87.6968 117.514 87.2358Z"
                                        fill="#3F3D56"
                                    />
                                    <path
                                        d="M102.41 70.2221C102.162 70.5169 102.041 70.8983 102.073 71.2824C102.105 71.6666 102.288 72.0222 102.582 72.2713L118.523 85.7631C118.817 86.0115 119.198 86.1329 119.581 86.1005C119.964 86.0681 120.319 85.8846 120.568 85.5904L123.502 82.1085C123.75 81.8136 123.871 81.4323 123.838 81.0481C123.806 80.664 123.623 80.3083 123.329 80.0592L107.388 66.5674C107.094 66.319 106.714 66.1977 106.33 66.2301C105.947 66.2625 105.592 66.446 105.344 66.7402L102.41 70.2221Z"
                                        fill="white"
                                    />
                                    <path
                                        d="M111.768 75.4669C111.713 75.5445 111.64 75.6081 111.556 75.6527C111.472 75.6973 111.379 75.7216 111.284 75.7238L108.779 75.7814C108.698 75.7833 108.618 75.7692 108.543 75.7401C108.468 75.7109 108.4 75.6672 108.341 75.6115C108.283 75.5558 108.237 75.4892 108.204 75.4154C108.172 75.3416 108.154 75.2621 108.152 75.1814C108.15 75.1008 108.164 75.0206 108.193 74.9454C108.222 74.8702 108.266 74.8014 108.322 74.7431C108.377 74.6848 108.444 74.638 108.517 74.6054C108.591 74.5728 108.67 74.5551 108.751 74.5533L110.389 74.5155L108.776 70.2482C108.718 70.0959 108.724 69.9272 108.791 69.779C108.858 69.6307 108.98 69.5151 109.132 69.4575C109.284 69.3998 109.452 69.4049 109.6 69.4715C109.748 69.5381 109.864 69.6608 109.922 69.8128L111.843 74.892C111.877 74.9839 111.89 75.0828 111.878 75.1804C111.867 75.278 111.833 75.3714 111.778 75.4529L111.768 75.4669Z"
                                        fill="#108ABB"
                                    />
                                    <path
                                        d="M118.964 62.613C118.615 62.613 118.27 62.5316 117.958 62.3751C117.646 62.2187 117.375 61.9915 117.165 61.7116L111.652 54.3437C111.474 54.107 111.346 53.8376 111.272 53.551C111.199 53.2644 111.183 52.9661 111.225 52.6732C111.266 52.3803 111.365 52.0986 111.516 51.844C111.666 51.5894 111.865 51.367 112.101 51.1895C112.578 50.831 113.178 50.677 113.768 50.7615C114.06 50.8034 114.342 50.9025 114.596 51.0533C114.85 51.204 115.072 51.4035 115.249 51.6402L118.856 56.4601L128.121 42.5325C128.452 42.0353 128.966 41.6901 129.55 41.5729C130.135 41.4557 130.742 41.5761 131.238 41.9076C131.735 42.2391 132.079 42.7545 132.196 43.3404C132.313 43.9264 132.193 44.5349 131.862 45.0321L120.834 61.6097C120.635 61.9095 120.367 62.157 120.052 62.3315C119.737 62.5059 119.386 62.6022 119.026 62.6123C119.005 62.6127 118.985 62.613 118.964 62.613Z"
                                        fill="white"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_144_4269">
                                        <rect
                                            width="250"
                                            height="108"
                                            fill="white"
                                        />
                                    </clipPath>
                                </defs>
                            </svg>

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
