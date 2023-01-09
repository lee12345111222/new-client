import React, { FC, useState, useEffect, useCallback, ReactNode, ChangeEvent, FormEvent,memo } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useIntl } from 'react-intl'
import xss from 'xss'

import Backdrop from '../../components/ui/Backdrop'
import CustomModal from '../../components/ui/CustomModal'
import Agenda from './agenda/Agenda'
import FAQ from './faq/FAQ'
import Home from './home/Home'
import HeaderNav from './HeaderNav'
import '../../styles/landingPage.scss'

import { useDispatch, useSelector } from 'react-redux'
import { fetchLogin, getLanding } from '../../store/globalSlice'

import { Obj } from '../../store/globalSlice'

const LandingPage: FC = memo(() => {
    const [eventOpen, setEventOpen] = useState(true)
    const [code, setCode] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [modalContent, setModalContent] = useState<ReactNode | null>(null)
    const [eventSlug, setEventSlug] = useState(process.env.REACT_APP_DEFAULT_EVENT_ID as string)
    const [showBackdrop, setShowBackdrop] = useState(false)
    const [showMenu, setShowMenu] = useState(false)

    const {global}:any = useSelector(state => state)
    const {setting ={} } = global
    
    const {main:{openTime}} = setting

    console.log(setting)

    const dispatch = useDispatch()
   

    const intl = useIntl()

    const location = useLocation()
    const navigate = useNavigate()
    const search = location.search.replace('?','')


    /**
     * 獲取資料庫該服務 event id 資料
     */
    useEffect(() => {
        console.log(search, 'search')

        dispatch(getLanding())
    }, [dispatch])

    /**
     * 初始化定時任務，設定倒數至活動開始開啟輸入框
     */
    useEffect(() => {
        const now = new Date().getTime()
            if (new Date(openTime).getTime() >= now) {
                setEventOpen(true)
            } 
    }, [openTime])

    

    

    /**
     * 判斷是否存在錯誤訊息
     */
    // useEffect(() => {
    //     if (eventError || userError) return handleMessageModal()
    // }, [eventError, userError])

  



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
     * 提交登入碼登入會場
     * @param e form event
     */
    const handleSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            const loginCode = code.toLocaleLowerCase().trim()

            // const ex = '\\W'

            // if (loginCode.match(ex)) {
            //     setModalContent(<div id="login-msg-modal-content">参会码须为英数字</div>)
            //     setShowModal(true)

            //     return
            // }

            if (!loginCode) {
                setModalContent(
                    <div id="login-msg-modal-content">{intl.formatMessage({ id: 'landingPage.USER_CODE_EMPTY' })}</div>
                )
                setShowModal(true)
                return
            }
            localStorage.setItem('code',code)
            dispatch(fetchLogin(search, code,()=>{navigate('/main')}))
            setCode('')
        },
        [code, location.search]
    )


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
                        <CustomModal handleCloseModal={handleCloseModal} showModal={showModal}>
                            {modalContent}
                        </CustomModal>
                        <Backdrop showBackdrop={showBackdrop} />
                        <Home
                            handleSubmit={handleSubmit}
                            eventOpen={eventOpen}
                            code={code}
                            HandleInputChange={HandleInputChange}
                            eventSlug={eventSlug}
                        />

                        <Agenda eventSlug={eventSlug} />
                        <FAQ />
                    </div>
                </section>
            </section>
        </main>
    )
})

export default LandingPage
