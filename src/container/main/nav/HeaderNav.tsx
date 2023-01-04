import React, {
    FC,
    SetStateAction,
    Dispatch,
    useContext,
    useEffect,
    useRef,
    ReactNode /* , MutableRefObject  */,
} from 'react'
import { /* Select,  */ Button } from 'antd'
import { /* useNavigate,  */ useLocation } from 'react-router-dom'
import { useIntl } from 'react-intl'
import {useSelector} from 'react-redux'

import { userLocate } from '../../../lib/services'
import SocketHint from '../../../components/ui/SocketHint'

import { icons } from '../../../lib/icons'
import { LandingPageImages } from '../../../utils/links'
import FAQ from '../../landingPage/faq/FAQ'



type HeaderNavProps = {
    changeEvent: boolean
    setChangeEvent: Dispatch<SetStateAction<boolean>>
    setShowModal: Dispatch<SetStateAction<boolean>>
    handleClickSharedWalkin(): void
    onlineUsers: number
    setModalContent: Dispatch<SetStateAction<ReactNode>>
    handleClickScoreRules(): void
    handleClickGroupChatDescription(): void
}

const HeaderNav: FC<HeaderNavProps> = ({
    changeEvent,
    handleClickSharedWalkin,
    onlineUsers,
    setShowModal,
    setModalContent,
    handleClickScoreRules,
    handleClickGroupChatDescription,
}) => {
    const location = useLocation()

    const intl = useIntl()

    const { global }: any = useSelector(state => { return state });

    const { socket, socketId, socketOn } = global

    const {
        user: {
            user: { eventId, name, avatar, code, _id, admin },
        },
    }:any = {user:{user:{}}}

    const eventRef = useRef(eventId)

    // const { onPostSwitchEventId, initAgenda, initSymbols, switchEvent } = useActions()

    /**
     * 判斷用戶所在頁面，更新後台 user list 資訊
     */
    useEffect(() => {
        // changeEvent 為 false 表示單純在同個會場內做頁面切換
        if (!changeEvent) {
            if (location.pathname === '/main') {
                userLocate(eventId, socketId, code, 'chatroom')
            } else if (location.pathname === '/main/qs') {
                userLocate(eventId, socketId, code, 'qs')
            } else if (location.pathname === '/main/post') {
                userLocate(eventId, socketId, code, 'post')
            }
        } else {
            // changeEvent 為 true 表示會場切換
            userLocate(eventRef.current, socketId, code, 'changeEvent')
        }
    }, [location.pathname, changeEvent])

    /**
     * 紀錄更換會場前的 event id，用戶更換會場時使用
     */
    useEffect(() => {
        eventRef.current = eventId
    }, [eventId])

    /**
     * 從 event 物件返回該場活動的 channel id
     * @param eventId
     * @returns
     */
    // const handleFindChannelId = (eventId: string) => {
    //     const [currentEvent] = event.filter((e) => e.eventId === eventId)
    //     return currentEvent
    // }

    /**
     * 處理語言切換，sea 專用
     * @param lang
     * @param pre
     */
    // const handleChangeEventLang = (lang: string, pre: string) => {
    //     const [, event] = eventId.split('-')
    //     const updatedEventId = `${lang}-${event}`
    //     const ev = handleFindChannelId(updatedEventId)
    //     userSwitchEvent(pre, `${lang}-${event}`, code, socketId)
    //     onPostSwitchEventId({ updatedEventId, channelId: ev.channelId, _id })
    //     navigate(`/main`, { replace: true })
    // }

    /**
     * 選擇語言的 selector handler，目的為改變 url 至選取的語言
     */
    // const handleChangeLang = (v: string) => {
    //     setChangeEvent(true)
    //     const pre = eventId

    //     if (v === 'en') handleChangeEventLang('SE', pre)
    //     else if (v === 'id') handleChangeEventLang('SI', pre)
    //     else if (v === 'vi') handleChangeEventLang('SV', pre)
    //     else if (v === 'th') handleChangeEventLang('ST', pre)
    // }

    /**
     * 切換同服務內不同會場。admin 專用
     * @param v
     */
    // const handleChangeEvent = (v: string) => {
    //     const ev = handleFindChannelId(v)
    //     switchEvent({ eventId: v, channelId: ev.channelId })

    //     const symbols = handleGetSymbols(v, jsonData)
    //     initSymbols({ symbols: [...new Set(symbols)] })

    //     const topicVals = handleGetTopics(v, jsonData)
    //     initAgenda({ agenda: [...new Set(topicVals)] })

    //     setChangeEvent(true)
    //     const pre = eventId
    //     userSwitchEvent(pre, v, code, socketId)

    //     onPostSwitchEventId({ updatedEventId: v, channelId: ev.channelId, _id })
    //     navigate(`/main`, { replace: true })
    // }

    const handleFaqShow = () => {
        setModalContent(<FAQ />)
        setShowModal(true)
    }

    return (
        <nav className="main-layout-header">
            <SocketHint socketOn={socketOn} />
            <div className="main-header-logo">
                <img className="google-svg" src={LandingPageImages.EVENT_GOOGLE_TITLE} alt="Google" />
            </div>
            <div className="main-header-right">
                <div style={{ display: 'none' }}>目前同时在线人数 {onlineUsers}</div>
                <div className="main-header-user-detail">
                    <div className="main-header-user-avatar">
                        <img src={avatar} alt="user-avatar" />
                    </div>
                    <div className="main-header-user-name">{name}</div>
                </div>
                <Button className="main-header-faqBtn" onClick={handleFaqShow}>
                    {icons.faq_icon()}
                    {intl.formatMessage({ id: 'landingPage.nav_faq' })}
                </Button>
                <Button className="main-header-faqBtn" onClick={handleClickScoreRules}>
                    {icons.rule_icon()}
                    {intl.formatMessage({ id: 'landingPage.nav_score_rules' })}
                </Button>

                <Button className="main-header-faqBtn" onClick={handleClickGroupChatDescription}>
                    {icons.chat_icon()}
                    {intl.formatMessage({ id: 'landingPage.nav_groupchat' })}
                </Button>
                {/* {admin && (
                    <Button className="main-header-admin-share-walkin-btn" onClick={handleClickSharedWalkin}>
                        {intl.formatMessage({ id: 'main.ShareWalkin' })}
                    </Button>
                )} */}

                {/* {admin && (
                    <div className="main-header-admin-selector-container">
                        <Select
                            dropdownClassName="main-admin-selector"
                            defaultValue={eventId}
                            bordered={false}
                            defaultActiveFirstOption={false}
                            onChange={(v) => handleChangeEvent(v)}
                        >
                            {event.map((e) => {
                                return (
                                    <Option key={e.eventId} value={e.eventId}>
                                        {e.name}
                                    </Option>
                                )
                            })}
                        </Select>
                    </div>
                )} */}

                {/* {!admin && eventId.startsWith('S') && (
                    <div className="main-header-lang-selector-container">
                        <Select
                            dropdownClassName="main-lang-selector"
                            defaultValue={locale}
                            bordered={false}
                            defaultActiveFirstOption={false}
                            onChange={(v) => handleChangeLang(v)}
                        >
                            {SelectorOptions.map((option) => {
                                return (
                                    <Option key={option.value} value={option.value}>
                                        {option.option}
                                    </Option>
                                )
                            })}
                        </Select>
                    </div>
                )} */}
            </div>
        </nav>
    )
}

export default HeaderNav
