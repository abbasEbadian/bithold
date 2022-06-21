import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap/dist/js/bootstrap.js";
import Sidebar from "../components/Sidebar";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Router from "next/router";
import Image from "next/image";
import axios from "axios";
import LandingChart from "../components/LandingChart";
import { baseUrl } from "../components/BaseUrl";
import Footer from "../components/Footer";
import landingSidebar from "../components/LandingSidebar";
import LandingSidebar from "../components/LandingSidebar";

const Main = styled.div`
    background-color: rgb(191 226 239);
    width: 100%;
    min-height: 100vh;
    padding: 32px;
    padding-right: 0;
    padding-left: 0;
    @media (min-width: 992px) {
        .poss {
            position: sticky;
            top: 0;
        }
    }
`;

const HeadMain = styled.div`
    background: #fcfcfc;
    border-radius: 16px;
    padding: 16px;
    padding-bottom: 60px;
`;

const Header = styled.header`
    height: 48px;
    width: 100%;
    background: rgb(191 226 239);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px;
    img {
    }

    ul {
        display: flex;
        align-items: center;
        list-style: none;
        margin: 0;
        padding-right: 8px;
        .active-li {
            background: linear-gradient(90deg, #128cbd -1.72%, #3dbdc8 100%);
            border-radius: 4px;
            padding: 0 5px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
        }
        li {
            cursor: pointer;
            margin-left: 20px;
            color: #323232;
            font-size: 15px;
            line-height: 26px;
        }
    }
    .toggle {
        display: none;
    }
    @media (max-width: 992px) {
        .toggle {
            display: block;
            margin-right: 22px;
        }
        ul {
            display: none;
        }
    }
`;

const CopyRight = styled.div`
    font-weight: 600;
    font-size: 12px;
    line-height: 17px;
    text-align: center;
    margin-top: 16px;
    color: #777777;
`;

const ToogleMenu = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    background-color: #fff;
    transition: 0.1s all;
    height: 100vh;
    width: 250px;
    z-index: 2;
    overflow: hidden;
    ul {
        list-style: none;
        margin-top: 50px;
        li {
            margin-bottom: 20px;
        }
    }
`;

const RulesMain = styled.div`
    background-size: cover;
    min-height: 80vh;
    max-height: 80vh;
    overflow: scroll;
    overflow-x: hidden;
    display: flex;
    padding: 30px;
    line-height: 30px;
    @media (max-width: 992px) {
        flex-direction: column;
        div {
            order: 1;
        }
        p {
            padding-left: 0px;
        }
    }
    h4 {
        margin-top: 50px;
        :first-child {
            margin-top: 0;
        }
    }
`;

export default function OurRules() {
    const [showMenu, setShowMenu] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [img, setImg] = useState(null);

    let token = "";
    setTimeout(() => {
        token = localStorage.getItem("token");
    }, 2000);
    useEffect(() => {
        setTimeout(() => {
            let config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                url: `${baseUrl}account/details/`,
                method: "GET",
            };
            axios(config)
                .then((res) => {
                    if (res.status == "200") {
                        setImg(res.data.avatar);
                    }
                })
                .catch((error) => {});
        }, 2200);
    }, []);
    setTimeout(() => {
        if (
            localStorage.getItem("token") != null &&
            typeof window != "undefined"
        ) {
            setIsLogin(true);
        }
    }, 1000);
    const closeHandler = (e) => {
        setShowMenu(false);
    };
    return (
        <Main className="max-w-1992">
            <Head>
                <link rel="shortcut icon" href="/images/fav.png" />
                <title>بیت هولد | قوانین ما</title>
            </Head>
            <LandingSidebar shows={showMenu.toString()} close={closeHandler} />

            <div className="px-4">
                <HeadMain>
                    <Header>
                        <div
                            onClick={() => {
                                setShowMenu(true);
                            }}
                            className="toggle"
                        >
                            <svg
                                width="20"
                                height="14"
                                viewBox="0 0 20 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M0.330322 7C0.330322 6.44772 0.778037 6 1.33032 6H18.6704C19.2227 6 19.6704 6.44772 19.6704 7C19.6704 7.55229 19.2227 8 18.6704 8H1.33032C0.778037 8 0.330322 7.55229 0.330322 7Z"
                                    fill="#323232"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M0.330322 12.3356C0.330322 11.7833 0.778037 11.3356 1.33032 11.3356H18.6704C19.2227 11.3356 19.6704 11.7833 19.6704 12.3356C19.6704 12.8879 19.2227 13.3356 18.6704 13.3356H1.33032C0.778037 13.3356 0.330322 12.8879 0.330322 12.3356Z"
                                    fill="#323232"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M0.329834 1.66443C0.329834 1.11214 0.777549 0.664429 1.32983 0.664429H18.6699C19.2222 0.664429 19.6699 1.11214 19.6699 1.66443C19.6699 2.21671 19.2222 2.66443 18.6699 2.66443H1.32983C0.777549 2.66443 0.329834 2.21671 0.329834 1.66443Z"
                                    fill="#323232"
                                />
                            </svg>
                        </div>
                        <ul>
                            <li
                                onClick={() => {
                                    Router.push("/");
                                }}
                            >
                                خانه
                            </li>
                            <li
                                onClick={() => {
                                    Router.push("/trade");
                                }}
                            >
                                خرید و فروش
                            </li>
                            <li className="analysis-dd">
                                تحلیل
                                <ul>
                                    <li
                                        onClick={() => {
                                            Router.push("/analysis");
                                        }}
                                    >
                                        ابزار تحلیل
                                    </li>
                                    <li>
                                        <a
                                            href="https://blog.bithold.exchange/category/analysis/"
                                            target="blank"
                                        >
                                            تحلیل های بیت هولد
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li
                                onClick={() => {
                                    Router.push("/dashboard");
                                }}
                            >
                                مبدل ارزها
                            </li>

                            <li
                                onClick={() => {
                                    Router.push("/faq");
                                }}
                            >
                                سوالات متداول
                            </li>
                            <li
                                onClick={() => {
                                    Router.push("/our_rules");
                                }}
                                className="active-li"
                            >
                                قوانین ما
                            </li>
                            <li
                                onClick={() => {
                                    Router.push("/contact_us");
                                }}
                            >
                                تماس با ما
                            </li>
                            <li
                                onClick={() => {
                                    Router.push("/about_us");
                                }}
                            >
                                درباره ما
                            </li>
                        </ul>
                        {isLogin ? (
                            img !== null ? (
                                <img
                                    onClick={() => {
                                        Router.push("/dashboard");
                                    }}
                                    src={img}
                                    width={38}
                                    height={38}
                                    alt="profile"
                                    className="c-p radi"
                                />
                            ) : (
                                <img
                                    onClick={() => {
                                        Router.push("/dashboard");
                                    }}
                                    className="ms-1 img-prof c-p"
                                    src="/images/prof-img.png"
                                    width={38}
                                    height={38}
                                    alt="profile"
                                />
                            )
                        ) : (
                            ""
                        )}
                    </Header>
                    <div className="page-title">قوانین ما</div>
                </HeadMain>
                <RulesMain>
                    <div>
                        <h4>شرایط اساسی و اولیه‌ی استفاده کاربران از خدمات</h4>
                        <br />
                        موضوع موافقتنامه‌ی حاضر، تدوین اصول اولیه از قبیل حقوق،
                        تکالیف و مسئولیت‌ها و نیز دستورالعمل‌های لازم جهت
                        استفاده کاربر، از خدمات سایت بیت هولد که برای معامله ارز
                        های دیجیتال با نرخ های پیشنهادی کاربران است.
                        <br />
                        ـ این شرایط برای استفاده از سایت bithold.exchangeکه از
                        این پس در این موافقتنامه بیت هولد نامیده می شود ، تنظیم
                        گردیده است. همچنین در این موافقتنامه “ما” به منظور تیم
                        بیت هولد در نظر گرفته می‌شود. کاربران و سایت ملزم به
                        انجام تعهدات خود که در قالب این موافقتنامه هستند. بیت
                        هولد تابع قوانین جمهوری اسلامی ایران بوده و از کلیه ی
                        مقررات حاکم بر آن تبعیت می کنند.
                        <br />
                        ـ مفاد موافقتنامه که از سوی ما ارائه می‌شود و پس از
                        موافقت کاربر و تایید آن (با ثبت نام به عنوان کاربر) به
                        مورد اجرا گذاشته می‌شود و همچنین در صورت لزوم از سوی ما
                        قوانین و مقررات قابل اصلاح خواهد بود و مسلما اعمال هر
                        گونه تغییر در این موافقتنامه، قبل از تاریخ اجرای آن، به
                        اطلاع کاربر خواهد رسید.
                        <br />
                        <h4>کاربر می پذیرد که:</h4>
                        <br />
                        ۱ـ استفاده از خدمات سایت ( ثبت نام ـ خرید ـ فروش و…) به
                        این معنی است که کاربر قوانین را کاملاً خوانده ، فهمیده و
                        قبول کرده و در غیر اینصورت، حق استفاده از امکانات سایت
                        را ندارد.
                        <br />
                        ۲ـ این حق برای سایت محفوظ است که در هر زمان که بخواهد،
                        با اعلام مراتب قبلی به کاربر، مفاد این موافقتنامه را
                        تغییر دهد.
                        <br />
                        ۳ـ تمامی معاملات انجام گرفته توسط کاربر صحیح تلقی
                        می‌گردد. از این رو صیانت از حساب کاربری، رمز عبور یا
                        سایر اطلاعات برعهده وی بوده و لازم است به صدمات ناشی از
                        انجام تخلفات یا جرایم مالی توجه داشته باشد.
                        <br />
                        ۴ـ معاملات ارز های دیجیتال باید با آگاهی و بررسی انجام
                        شود و مسئولیت ضرر نا آگاهانه از خرید ارز های دیجیتال به
                        عهده خود کاربر است.
                        <br />
                        ۵ـ تلاش ما ارائه‌ی خدمات به صورت ۲۴ ساعته در طول شبانه
                        روز خواهد بود.لیکن در صورت وقوع حادثه‌ای از قبیل تعلیق
                        خدمات به علت اقدام غیر قانونی کاربران یا اشخاص ثالث، یا
                        وقوع خطا در خدمات، مشکل را مرتفع نموده و ارائه‌ی خدمات
                        را از سر می‌گیریم. در این زمان می‌توانید درخواست بازیابی
                        را بر اساس سوابق معاملاتی ارائه کنید. اما نمی‌توانیم سود
                        و زیان ناشی از این وقفه زمانی را جبران کنیم.
                        <br />
                        ۶- در صورت وقوع خسارت به سایت، در اثر فعالیت‌های غیر
                        قانونی کاربر، سایت می‌تواند طبق قانون نسبت به مطالبه‌ی
                        آن اقدام کند. لذا باید با رعایت قوانین و مقررات از خدمات
                        ما استفاده کنید.
                        <br />
                        ۷ ـ پس از اعلام موارد تغییر در چارچوب موافقتنامه و ابلاغ
                        به کاربر به منظور قبول موارد تغییر پس از ۷ روز از تاریخ
                        مؤثر اعمال تغییرات مذکور، و عدم واکنش کاربر، موافقنامه‌ی
                        اصلاحی تایید شده از سوی شما مفروض انگاشته خواهد شد. در
                        صورت عدم توافق کاربر با موافقنامه‌ی اخیر، امکان خروج
                        کاربر از عضویت به صورت جداگانه نیز وجود خواهد داشت.
                        <br />
                        ۸ ـ مواردی که در این موافقتنامه نمی‌باشد، تابع قوانین و
                        مقررات جمهوری اسلامی ایران و یا تابع قواعد اعلامی از سوی
                        ما خواهد بود.
                        <br />
                        <h4>مدیریت حساب‌ها</h4>
                        <br />
                        مراحل فرایند ایجاد حساب از سوی شما به شرح ذیل است:
                        <br />
                        الف ـ وارد کردن مشخصات شامل ایمیل و رم
                        <br />
                        ب ـ موافقت کاربر با این موافقنامه
                        <br />
                        ت- تکمیل فرآیند ثبت نام
                        <br />
                        ج ـ تأیید مشخصات کاربر از سوی سایت
                        <br />
                        برای استفاده از خدمات بیت هولد به یک حساب نیاز است و
                        کاربرموظف به استفاده از حساب ایجاد شده از طریق وارد کردن
                        اطلاعات صحیح می باشد که کاربر در این امر نباید از
                        اطلاعات دیگران استفاده کرده یا قوانین و مقررات مربوطه را
                        نقض نماید.
                        <br />
                        <h4>
                            تایید نکردن حساب کاربری
                            <br />
                            <br />
                            در موارد ذیل می‌توانیم ایجاد حساب را مردود اعلام
                            کرده و نسبت به حذف حساب اقدام نماییم:
                        </h4>
                        <br />
                        ۱ ـ چنانچه کاربر به سن قانونی نرسیده (۱۸ سال کامل
                        شمسی)یا از اهلیت قانونی کافی برخوردار نباشید.(مگر با
                        دخالت ولی خاص یا قیم قانونی)
                        <br />
                        ۲ ـ تلاش برای ایجاد حساب از طریق ارائه‌ی اطلاعات شخصی
                        دیگران توسط کاربر از قبیل نام یا آدرس پست الکترونیکی
                        <br />
                        ۳ ـ عدم وارد کردن اطلاعات لازم یا وارد کردن اطلاعات
                        نادرست در زمان ایجاد حساب از سوی کاربر
                        <br />
                        ۴ـ در صورت عدم رعایت سایر قوانین و مقررات از سوی شما یا
                        انجام اقداماتی برخلاف استانداردهای که توسط سایت اعلام
                        می‌گردد.
                        <br />
                        <h4>مدیریت حساب</h4>‌
                        <br />
                        ۱ـ حساب شما تنها باید توسط خود شما مورد استفاده قرار
                        گیرد. در صورت تغییرات اطلاعات شما پس از ثبت نام باید
                        بلافاصله اطلاعات جدید را در اطلاعات حساب به روز کرده و
                        منتظر تایید سایت در اسرع وقت باشید.
                        <br />
                        ۲ـ در خصوص خسارات ناشی از عدم اصلاح اطلاعات یا صدمه‌ی
                        ناشی از استفاده‌ی غیر مجاز از حساب توسط شخص دیگری که رمز
                        عبور شما را به سرقت برده است، مسئولیتی نخواهیم داشت.
                        <br />
                        <h4>استفاده از خدمات</h4>
                        <br />
                        برای ارائه‌ی بهتر خدمات، ممکن است اعلامیه‌های مربوط به
                        استفاده از خدمات، شامل انواع اطلاعات برای شما ارسال شود
                        یا آن را مستقیماً به ایمیل یا تلفن همراه شما ارسال
                        نماییم.
                        <br />
                        در صورت وقوع خطای سیستمی در استفاده از خدمات از جمله
                        برنامه‌ها، می‌توانیم اطلاعات نادرست ناشی از خطا را حذف و
                        اطلاعات حقیقی را اعمال کنیم.
                        <br />
                        <h4>نحوه‌ی استفاده از خدمات و موارد مهم</h4>
                        <br />
                        الف ـ ممکن است در خصوص نقض مقررات از سوی شما به طور موقت
                        یا دائمی مانع استفاده‌ی شما از خدمات بشویم.
                        <br />
                        ب – در صورتی که کاربر اطلاعات ورود خود برای سامانه را از
                        دست دهد، برای بازگرداندن اطلاعات به او، اطلاعاتی که بنا
                        به صلاح دید ما است گرفته خواهد شد و در صورت تایید
                        اطلاعات به فرد دسترسی داده خواهد‌شد و در صورت احراز نشدن
                        کامل هویت دسترسی بازگردانده نخواهد شد.
                        <br />
                        ج ـ در صورت عدم ورود طولانی مدت برای استفاده از خدمات
                        معین، ممکن است جهت امکان استفاده از خدمات، از شما
                        اطلاعات دیگری مطالبه کنیم. به ویژه اگر برای ۶ ماه یا
                        بیشتر از حساب خود استفاده نکرده باشید.
                        <br />
                        <h4>کاربر می پذیرد که</h4>
                        <br />
                        ۱- منبع و مقصد کلیه ی ارزهای دیجیتال در تراکنش های سایت
                        کاملا قانونی و مطابق با قوانین بین المللی و مقررات
                        جمهوری اسلامی ایران باشند.
                        <br />
                        ۲- مالک قانونی وجوه و حساب هایی است که وی در هر سفارش به
                        هر نحو چه برای پرداخت و چه برای دریافت از آنها استفاده
                        کرده است.
                        <br />
                        ۳- اطلاعاتی که کاربر در خلال سفارش یا ثبت نام در سایت
                        وارد کرده است کاملا محفوظ خواهد ماند و به هیچ شخص یا
                        سازمان دیگری ارائه نخواهد شد مگر در راستای مطابقت عملکرد
                        با قوانین و مقررات کشور ، دستور از مراجع قضایی و اداری
                        ذی صلاح و ذی ربط و یا درخواست پلیس فتای جمهوری اسلامی
                        ایران. در این موارد هیچ گونه مسئولیت قانونی برای جبران
                        خسارت یا موارد دیگر برای ما وجود ندارد و کاربران با
                        استفاده از خدمات سایت ما اعلام رضایت خود را صراحتا اعلام
                        می دارند.
                        <br />
                        ۴- این حق برای بیت هولد محفوظ است که اطلاعات لازم برای
                        احراز هویت را قبل از پذیرش از کاربر بخواهد. در این حال
                        تا احراز هویت کامل به عمل نیامده است، عضویت کاربرامکان
                        نخواهد داشت.
                        <br />
                        فرآیند احراز هویت شامل گردآوری اطلاعاتی از کاربر من جمله
                        شماره تماس ثابت –آدرس – کارت ملی با تصویر آن – کد ملی و
                        اطلاعات بانکی وی می باشد.
                        <br />
                        این اقدامات حریم شخصی وی را نقض نخواهد کرد و به هیچ شخص
                        ثالثی ارائه نخواهد شد
                        <br />
                        تصمیم راجع به موفق یا ناموفق بودن احراز هویت فقط و فقط
                        در اختیار بیت هولد خواهد بود و سایت بیت هولد می تواند یک
                        احراز هویت را به تشخیص خود قبول کند یا قبول نکند
                        <br />
                        تراکنش هایی که توسط بیت هولد در خلال انجام سفارشات انجام
                        می شود غیر قابل بازگشت هستند و تابع قوانین سیستم هر ارز
                        دیجیتال مربوط به تراکنش انجام شده هستند.
                        <br />
                        ۵- اطلاعات لازم در طی سفارش را با دقت وارد کرده است و
                        کلیه ی مسئولیت مربوط به اشتباه وارد کردن اطلاعات در خلال
                        سفارش با خود وی است و بیت هولد هیچ مسئولیتی راجع به
                        سفارش انجام شده ای که اطلاعات اشتباه داشته و موجب زیان
                        کاربر شده نمی‌پذیرد.
                        <br />
                        ۶- بیت هولد صرفا مسئول جابه جایی مقدار مشخص شده در
                        تراکنش(سفارش خرید و فروش ) معین است و هیچ گونه مسئولیت
                        دیگری ندارد.
                        <br />
                        ۷- کارمزد خدمات بیت هولد، همانطور که در بخش سفارش و
                        تراکنش با نرخ مشخص نشان داده شده اند دریافت می شود.
                        <br />
                        ۸- هر گونه کارمزد – کمیسیون و هزینه ی دیگر که سیستم
                        بانکی جهت نقل و انتقال پول به کاربر اضافه نماید ، بر
                        عهده ی کاربر خواهد بود و بیت هولد راجع به این گونه هزینه
                        ها ندارد.
                        <br />
                        ۹- بیت هولد هیچ گونه مسئولیتی راجع به تاخیر یا تراکنش
                        ناموفق ایجاد شده در انجام سفارش به علت نقص یا مشکل یا
                        تعمیرات سیستم ارز دیجیتال یا بانک پذیرنده ندارد.
                        <br />
                        ۱۰- حقوق هر کاربر برای استفاده از سایت مخصوص به خود اوست
                        و مسئولیت استفاده ی هر کاربر از نام کاربری و رمز عبور وی
                        فقط و فقط به عهده ی کاربر خواهد بود. همچنین مسئولیت کلیه
                        ی تراکنش های انجام شده از حساب کاربری وی به عهده ی خود
                        وی است.
                        <br />
                        ۱۱- هر گونه پیامدهای مالیاتی ناشی از تراکنش های کاربران
                        به عهده ی خود آنان خواهد بود و بیت هولد هیچ گونه
                        مسئولیتی ندارد.
                        <br />
                        ۱۲- جز در مورد انجام صحیح سفارش طبق قیمت مشخص و شفاف و
                        کارمزد مشخص و شفاف طبق قرارداد فوق هیچ گونه ادعایی از
                        سایت و مدیران – کارکنان – و کلیه ی مرتبطان با این سایت
                        نداشته باشد.
                        <br />
                        نکات مهم در رابطه با خدمات معاملات بیت هولد شامل موارد
                        ذیل می‌شود. باید از این موارد آگاه بوده و آن‌ها را رعایت
                        کنید:
                        <br />
                        ۱۳- خدمات معامله‌ی بیت هولد نقش واسطه را میان کاربران بر
                        عهده دارد و ارزش و یا بازپرداخت پول مجازی را به هیچ وجه
                        تضمین نمی کنیم و نیز مسئولیت منافع اقتصادی ناشی از
                        معامله با واحد پول مجازی بر عهده‌ی کاربر خواهد بود. قیمت
                        بازار پول مجازی که توسط ما بعضاً اعلام می‌شود ممکن است
                        به طور موقت با قیمت واقعی همخوان نباشد که علت آن
                        محدودیت‌های فنی از قبیل خطای سیستمی یا برنامه‌ای عدم
                        تقارن محیطی، محدودیت در مورد فضای ارتباطی در داخل و خارج
                        است. البته تمامی تلاش خود را برای رفع این تفاوت در قیمت
                        انجام می‌دهیم.
                        <br />
                        ۱۴- صحت اطلاعات شخصی کاربر را که نزد ماست تضمین نمی
                        کنیم. به محض اطمینان از عدم صحت آن موظف به قطع استفاده‌ی
                        کاربر مربوطه از خدمات معاملات بیت هولد خواهیم بود و
                        اقدام متقابل را به انجام خواهیم رساند. ۱۵- در برابر
                        خسارات ناشی از به سرقت رفتن حساب شما توسط شخص ثالث
                        مسئولیتی نخواهیم داشت.
                        <br />
                        ۱۶- حداقل حجم معاملات در بیت هولد ۱۰۰ هزارتومان است و
                        زیر آن معامله ثبت نمی‌شود.
                        <br />
                        ۱۷ – اولین درخواست برداشت رمز ارز ۴۸ ساعت بعد از اولین
                        واریز ریالی امکان پذیر خواهد بود. بدیهی است این محدودیت
                        صرفا برای اولین درخواست اعمال می شود و بعد آز آن
                        محدودیتی وجود نخواهد داشت .
                        <br />
                        ۱۸- در صورت تعلیق حساب، تحقیقات اولیه در مورد حساب انجام
                        داده و موظف خواهید بود که با ما همکاری کامل به عمل
                        آورید.
                        <br />
                        ۱۹- در صورت تعلیق حساب، نمی‌توانید تومان را سپرده‌گذاری
                        کرده یا درخواست واریز دهید و نمی‌توانید از کیف پول خود
                        استفاده کنید.
                        <br />
                        ۲۰- وجه تومان را با توجه به میزان پول نقد در کیف پول
                        تومان حساب خود دریافت خواهید کرد.
                        <br />
                        ۲۱- همواره می‌توانید پول نقد معادل تومان خود را که در
                        کیف پول حساب شماست، دریافت کنید. که به تعیین آن از سوی
                        ما بستگی خواهد داشت. البته تعهدی به پرداخت سود مربوط
                        برای تومان موجود در کیف الکترونیکی تومان شما نخواهیم
                        داشت.
                        <br />
                        22- می‌توانیم مبادله‌ی تومان را در شرایط ذیل ممنوع کرده
                        و البته ممنوعیت و علت آن را به شما اعلام خواهیم کرد.
                        <br />
                        الف ـ چنانچه درخواست کتبی از محاکم و نهادهای دولتی در
                        این خصوص ارائه شود.
                        <br />
                        ب ـ در صورتی که مبلغ مبادله بسیار زیاد باشد.
                        <br />
                        ج ـ در صورتی که کاربر مرتکب جرم شده یا مظنون به تملک
                        عواید از محل ارتکاب جرم باشد.
                        <br />
                        دـ در سایر موارد چنانچه محدود کردن استفاده از خدمات
                        پرداخت بر اساس سیاست عملیاتی ما ضروری تشخیص داده شود.
                        <br />
                        <br />
                        ۶ـ سایر موارد
                        <br />
                        ۱/۶ ـ در حدود قانون هیچگونه تعهد یا ضمانتی برای اموری
                        خاص مسکوت مانده در این موافقتنامه از حیث ارائه‌ی خدمات
                        بر عهده نمی گیریم. علاوه بر این، در خصوص محصولات یا ارزش
                        واحد پول مجازی که خود آن را صادر نکرده یا واگذار ننموده
                        و همچنین پرداخت آن را ضمانت ننموده ایم، هیچ گونه تعهدی
                        نخواهیم داشت
                        <br />
                        ۲/۶ـ در صورتی که خدمات در اثر اقدام شما دچار مشکل شود.
                        <br />
                        ۳/۶ـ خسارات ناشی از فرایند ورود به خدمات و استفاده از آن
                        <br />
                        ۴/۶ـ خسارات ناشی از دسترسی غیر قانونی شخص ثالث به سرور و
                        استفاده غیر قانونی از آن
                        <br />
                        ۵/۶ـ ضررهای ناشی از انتقال و انتشار بد افزارها از سوی
                        شخص ثالث
                        <br />
                        ۶/۶ـ ضررهای ناشی از استفاده شخص ثالث از خدمات، خساراتی
                        ناشی از دور زدن، حذف یا نابودی اطلاعات ارسال شده .
                        <br />
                        ۷/۶ـ ضررهای ناشی از قصور در خدمات ارتباطاتی توسط بستر
                        ارائه خدمات. به ویژه مواردی که ارائه دهنده خدمات
                        ارتباطاتی در صورت وجود رابطه حقوقی فی ما بین ما و
                        کاربران موجب ناتوانی ما در ارائه‌ی خدمات شود و غیر قابل
                        کنترل باشد. ضررهای ناشی از موارد قهریه از قبیل جنگ، آتش
                        سوزی، زلزله و سایر بلایای طبیعی و موارد اضطراری ملی
                        ضررهای ناشی از ویژگی های خاص پول مجازی. به ویژه مواردی
                        که موجب نقص یا محدودیت فنی در سیستم مدیریت. در ارائه‌ی
                        خدمات از سوی ما می‌شود.
                        <br />
                        ۸/۶ـ در صورتی که سرورها را برای ارائه‌ی خدمات قطع شود یا
                        از دسترس خارج شوند
                        <br />
                        ۹/۶ـ سایر خسارات ناشی از دلایلی که ناشی از اعمال یا عمل
                        ما نباشد.
                        <br />
                        ۱۰/۶ـ ارائه‌ی خدمات را می‌توانیم متوقف کرده یا تمامی یا
                        بخشی از این موافقنامه را فسخ نماییم چنانچه اطلاعات ارائه
                        شده از سوی شما با واقعیت همخوانی نداشته باشد. در صورتی
                        که خسارتی متوجه ما شود، می‌توانیم از شما خسارت مذکور را
                        از حساب شما برداشت کنیم.
                        <br />
                        ۱۱/۶ـ در صورتی که باعث خسارات ذیل این ماده از ما
                        مطالبه‌ی خسارت نمایید، می‌توانیم از طریق پول مجازی در
                        واحد تومان در کیف الکترونیکی شما که تعلق آن به شما مورد
                        تأیید است ولو با آن موافق نباشید منظور نماییم.
                        <br />
                        ۱۲/۶ـ در صورت ورود خسارت به ما که ناشی از فعالیت های غیر
                        قانونی است. می‌توانید حق مطالبه‌ی خسارت علیه شما به موجب
                        قانون استفاده کنیم. لذا لازم است از خدمات در چارچوب
                        قوانین و مقررات استفاده نمایید.
                    </div>
                    <img
                        className="poss"
                        src="/images/rouls.png"
                        width={500}
                        alt=""
                    />
                </RulesMain>
            </div>
            <Footer />
            <CopyRight>کلیه حقوق برای بیت هولد محفوظ میباشد 2022</CopyRight>
        </Main>
    );
}