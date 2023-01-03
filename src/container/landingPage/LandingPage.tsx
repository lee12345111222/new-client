import React, { FC, useState, useEffect, useCallback, ReactNode, ChangeEvent, FormEvent } from 'react'
import { useLocation, useNavigate, useParams, Route, Routes } from 'react-router-dom'
import { useIntl } from 'react-intl'
import xss from 'xss'
// import momenttz from 'moment-timezone';

// import Backdrop from '../../../../client/src/components/ui/Backdrop'
// import { useTypedSelector, useActions } from '../../../../client/src/hooks'
// import CustomModal from '../../../../client/src/components/ui/CustomModal'
// import Agenda from './agenda/Agenda'
// import FAQ from './faq/FAQ'
// import Home from './home/Home'
import HeaderNav from './HeaderNav'
import '../../styles/landingPage.scss'

const LandingPage: FC = () => {
    const [code, setCode] = useState('')
    const [eventOpen, setEventOpen] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [modalContent, setModalContent] = useState<ReactNode | null>(null)
    const [eventSlug, setEventSlug] = useState(process.env.REACT_APP_DEFAULT_EVENT_ID as string)
    const [showBackdrop, setShowBackdrop] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [walkinName, setWalkinName] = useState('')
    const [walkinCompany, setWalkinCompany] = useState('')
    const [walkinEmail, setWalkinEmail] = useState('')
    const [googler, setGoogler] = useState(false)
    const [googlerName, setGooglerName] = useState('')

    // const {
    //     onUserLogin,
    //     onGetEventDetail,
    //     removeUserError,
    //     onUserWalkinLogin,
    //     initUser,
    //     onUserGooglerLogin,
    //     onCheckUser,
    // } = useActions()

    // const {
    //     user: {
    //         isWalkin,
    //         isCreatingGoogler,
    //         error: userError,
    //         auth,
    //         user: { _id, logo },
    //     },
    //     event: { error: eventError, event, timeNow },
    // } = useTypedSelector((state) => state)

    const intl = useIntl()

    const location = useLocation()
    const navigate = useNavigate()
    const params = useParams()

    /**
     * 獲取資料庫該服務 event id 資料
     */
    useEffect(() => {
        // onGetEventDetail()
    }, [])

    /**
     * 初始化定時任務，設定倒數至活動開始開啟輸入框
     */
    // useEffect(() => {
    //     const now = timeNow
    //     let timer = 0

    //     if (now > 0) {
    //         if (parseInt(process.env.REACT_APP_EVENT_START_DATE as string) >= now) {
    //             timer = window.setTimeout(() => {
    //                 return setEventOpen(true)
    //             }, parseInt(process.env.REACT_APP_EVENT_START_DATE as string) - now)
    //         } else return setEventOpen(true)
    //     }

    //     return () => {
    //         clearTimeout(timer)
    //     }
    // }, [timeNow])

    /**
     * 根據語言及活動 id 訂定初始畫面
     */
    useEffect(() => {
        if (params) {
            const param = params['*'] as string

            if (param) {
                const [, slug] = param.split('/')

                if (slug) {
                    setEventSlug(slug)
                } else {
                    setEventSlug(param)
                }
            } else {
                // navigate('/404', { replace: false })
            }
        }
    }, [params])

    /**
     * 頁面不存在
     */
    useEffect(() => {
        if (eventSlug !== (process.env.REACT_APP_DEFAULT_EVENT_ID as string)) navigate('/404', { replace: false })
    }, [params, eventSlug])

    /**
     * 判斷是否存在錯誤訊息
     */
    // useEffect(() => {
    //     if (eventError || userError) return handleMessageModal()
    // }, [eventError, userError])

    /**
     * 判斷 query string
     */
    useEffect(() => {
        if (location.search) handleCheckSearch(location.search)
    }, [location.search])

    /**
     * 判斷 uid 是否成功登入，若 uid 為 walkin，導向至輸入用戶名稱及公司頁面
     */
    // useEffect(() => {
    //     if (auth) navigate(`/main`, { replace: true })
    //     else {
    //         if (isWalkin) navigate(`/walkin/${eventSlug}`, { replace: true })
    //         else if (isCreatingGoogler) navigate(`/g/${eventSlug}`, { replace: true })
    //         else navigate(`${location.pathname}${location.search}`, { replace: true })
    //     }
    // }, [auth, isWalkin, isCreatingGoogler])

    // const getCalendarLink = () => {
    //     const res = {
    //         st: 1654506000000, // event start time
    //         et: 1654509600000, // event end time
    //         allday: false, // is allday event?
    //         subject: 'test123', // event title
    //         body: '123456', // event description
    //         location: 'Taipei', // location
    //         timezone: 'Asia/Taipei', // event timezone
    //     };

    //     const subject = encodeURIComponent(res.subject);
    //     const body = encodeURIComponent(res.body);
    //     const location = res.location;
    //     const isAllDay = res.allday;
    //     const timezone = res.timezone;

    //     const begin = momenttz.tz(res.st, timezone);
    //     const end = momenttz.tz(res.et, timezone);

    //     let calStart;
    //     let calEnd;
    //     let mscalStart;
    //     let mscalEnd;

    //     if (isAllDay) {
    //         end.add(1, 'days');
    //         calStart = begin.format('YYYYMMDD');
    //         calEnd = end.format('YYYYMMDD');

    //         mscalStart = encodeURIComponent(begin.format('YYYY-MM-DD') + 'T00:00:00+00:00');
    //         mscalEnd = encodeURIComponent(end.format('YYYY-MM-DD') + 'T00:00:00+00:00');
    //     } else {
    //         calStart = begin.utc().format('YYYYMMDDTHHmm[00Z]');
    //         calEnd = end.utc().format('YYYYMMDDTHHmm[00Z]');

    //         mscalStart = encodeURIComponent(begin.format());
    //         mscalEnd = encodeURIComponent(end.format());
    //     }

    //     const dates = encodeURIComponent(calStart + '/' + calEnd);

    //     const ycalStart = encodeURIComponent(calStart);
    //     const ycalEnd = encodeURIComponent(calEnd);

    //     const generatedGoogleLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${dates}&details=${body}&location=${location}&text=${subject}`;

    //     const generatedOutlookLink = `https://outlook.live.com/calendar/0/deeplink/compose?allday=${isAllDay}&body=${body}&enddt=${mscalEnd}&location=${location}&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=${mscalStart}&subject=${subject}`;

    //     const generatedYahooLink = `https://calendar.yahoo.com/?desc=${body}&dur=${
    //         isAllDay ? 'allday' : null
    //     }&et=${ycalEnd}&in_loc=${location}&st=${ycalStart}&title=${subject}&v=60`;
    // };

    /**
     * 若存在錯誤訊息，顯示提示框。若訊息為重複登入初始化用戶登入資訊。
     * 若是由後台刪除資料庫用戶名單，不顯示提示框只初始化用戶登入資訊。
     */
    const handleMessageModal = () => {
        let errorMessage = ''

        // if (userError) {
        //     if (userError === 'USER_CODE_ERROR') {
        //         errorMessage = intl.formatMessage({ id: 'landingPage.USER_CODE_ERROR' })
        //     } else if (userError === 'USER_EVENT_ID_ERROR') {
        //         errorMessage = intl.formatMessage({ id: 'landingPage.USER_EVENT_ID_ERROR' })
        //     } else if (userError === 'USER_LOGIN_IN_DUPLICATE_ERROR') {
        //         errorMessage = intl.formatMessage({ id: 'landingPage.LoginDuplicated' })
        //         initUser()
        //     } else if (userError === 'USER_LIST_DROP') {
        //         initUser()
        //         removeUserError()
        //         return
        //     } else if (userError === 'USER_LOG_OUT') {
        //         initUser()
        //         return
        //     }
        // } else errorMessage = intl.formatMessage({ id: 'landingPage.EVENT_ERROR' })

        // setModalContent(<div id="login-msg-modal-content">{errorMessage}</div>)
        // setShowModal(true)
        // if (userError) removeUserError()
    }

    /**
     * 判斷 googler and uid query string
     * @param search query string
     */
    const handleCheckSearch = (search: string): void => {
        // const queryStr = new URLSearchParams(search)

        // for (const params of queryStr.entries()) {
        //     if (params[0] === 'uid') {
        //         setCode(params[1])
        //         onCheckUser({ code: params[1] })
        //     }
        //     if (params[0] === 'googler') handleGoogler()
        // }
    }

    /**
     * 處理 query string googler 等於 true
     */
    const handleGoogler = () => {
        setGoogler(true)
        setEventOpen(true)
    }

    /**
     * 提交登入碼登入會場
     * @param e form event
     */
    // const handleSubmit = useCallback(
    //     async (e: FormEvent<HTMLFormElement>) => {
    //         e.preventDefault()
    //         const loginCode = code.toLocaleLowerCase().trim()

    //         const ex = '\\W'

    //         if (loginCode.match(ex)) {
    //             setModalContent(<div id="login-msg-modal-content">参会码须为英数字</div>)
    //             setShowModal(true)

    //             return
    //         }

    //         if (!loginCode) {
    //             setModalContent(
    //                 <div id="login-msg-modal-content">{intl.formatMessage({ id: 'landingPage.USER_CODE_EMPTY' })}</div>
    //             )
    //             setShowModal(true)
    //             return
    //         }

    //         const searchQuery = location.search

    //         // onUserLogin({ loginCode: xss(loginCode), searchQuery, eventPackage: event, eventSlug, googler })
    //         setCode('')
    //     },
    //     [code, location.search, event]
    // )

    /**
     * 提交 walkin 資訊並登入會場
     * @param e form event
     */
    // const handleWalkinSubmit = useCallback(
    //     async (e: FormEvent<HTMLFormElement>) => {
    //         e.preventDefault()
    //         const name = walkinName.trim()
    //         const company = walkinCompany.trim()
    //         const email = walkinEmail.trim()

    //         if (!_id) {
    //             setModalContent(
    //                 <div id="login-msg-modal-content">{intl.formatMessage({ id: 'landingPage.USER_ID_ERROR' })}</div>
    //             )
    //             setShowModal(true)
    //             navigate(`/${process.env.REACT_APP_DEFAULT_EVENT_ID as string}`, { replace: true })
    //             return
    //         }

    //         onUserWalkinLogin({
    //             _id,
    //             walkinName: name,
    //             walkinCompany: company,
    //             walkinEmail: email,
    //             eventSlug,
    //             eventPackage: event,
    //         })

    //         setWalkinName('')
    //         setWalkinCompany('')
    //     },
    //     [_id, walkinName, walkinCompany, walkinEmail, eventSlug]
    // )

    /**
     * 提交 googler 資訊並登入會場
     * @param e form event
     */
    // const handleGooglerSubmit = useCallback(
    //     async (e: FormEvent<HTMLFormElement>) => {
    //         e.preventDefault()
    //         const name = googlerName.trim()

    //         if (!_id) {
    //             setModalContent(
    //                 <div id="login-msg-modal-content">{intl.formatMessage({ id: 'landingPage.USER_ID_ERROR' })}</div>
    //             )
    //             setShowModal(true)
    //             navigate(`/${process.env.REACT_APP_DEFAULT_EVENT_ID as string}`, { replace: true })
    //             return
    //         }

    //         onUserGooglerLogin({ _id, googlerName: name, eventSlug })

    //         setGooglerName('')
    //         setWalkinCompany('')
    //     },
    //     [_id, googlerName, eventSlug]
    // )

    /**
     * 登入框取值
     * @param e change event
     */
    const HandleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setCode(value)
    }, [])

    /**
     * 關閉常見問題彈窗
     */
    const handleCloseModal = useCallback(() => {
        setShowModal(false)
    }, [])

    /**
     * toggle 行動裝置 backdrop
     */
    const handleBackdropShow = useCallback(() => {
        setShowBackdrop((state) => !state)
        setShowMenu((state) => !state)
    }, [])

    /**
     * 關閉行動裝置 backdrop
     */
    const handleBackdropRemove = useCallback(() => {
        setShowBackdrop(false)
        setShowMenu(false)
    }, [])

    return (
        <main className="landing-page-wrap">
            {/* <img src={logo ? logo : 'https://oss.uppmkt.com/cxo/img/GOOGLE.svg'} alt="" style={{ display: 'none' }} /> */}
            <section className="landing-page-layout" id="landing-page-layout">
                <section className="landing-page-layout-main">
                    <HeaderNav
                        handleBackdropShow={handleBackdropShow}
                        handleBackdropRemove={handleBackdropRemove}
                        eventSlug={eventSlug}
                        showMenu={showMenu}
                    />
                    <div className="landing-page-layout-content" id="landing-page-layout-content">
                        {/* <CustomModal handleCloseModal={handleCloseModal} showModal={showModal}>
                            {modalContent}
                        </CustomModal>
                        <Backdrop showBackdrop={showBackdrop} />

                        <Routes>
                            <Route
                                path="/*"
                                element={
                                    <Home
                                        handleSubmit={handleSubmit}
                                        eventOpen={eventOpen}
                                        code={code}
                                        HandleInputChange={HandleInputChange}
                                        eventSlug={eventSlug}
                                        auth={auth}
                                        handleWalkinSubmit={handleWalkinSubmit}
                                        setWalkinName={setWalkinName}
                                        setWalkinCompany={setWalkinCompany}
                                        walkinName={walkinName}
                                        walkinCompany={walkinCompany}
                                        googler={googler}
                                        googlerName={googlerName}
                                        setGooglerName={setGooglerName}
                                        handleGooglerSubmit={handleGooglerSubmit}
                                        walkinEmail={walkinEmail}
                                        setWalkinEmail={setWalkinEmail}
                                    />
                                }
                            />
                        </Routes>
                        <Agenda eventSlug={eventSlug} />
                        <FAQ /> */}
                    </div>
                </section>
            </section>
        </main>
    )
}

export default LandingPage
