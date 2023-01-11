import React, {
    FC,
    useState,
    useEffect,
    useContext,
    useCallback,
    createContext,
    ReactNode,
    Dispatch,
    useRef,
    SetStateAction,
} from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';

import CustomModal from '../../components/ui/CustomModal';
import InteractiveSec from './interactiveSec/InteractiveSec';
import Agenda from './agenda/Agenda';
// import { useTypedSelector, useActions } from '../../hooks'
import { useDispatch, useSelector } from 'react-redux';
import {
    joinInitRoom,
    getCurrentAgenda,
    checkGroupChatStatus,
} from '../../lib/services';
import {
    SwitchAgendaPageEventData,
    GroupChatShowData,
} from '../../lib/socketDataTypes';
import HeaderNav from './nav/HeaderNav';
import ShareWalkin from './modal/ShareWalkin';
import PolyPlayer from './player/PolyPlayer';
import CustomAvatarButton from '../../components/ui/CustomAvatarButton';
import CustomAvatar from './modal/CustomAvatar';
import ScoreRules from './modal/ScoreRules';
import GroupChatDesc from './modal/GroupChatDesc';
import GroupChatView from './groupChat/GroupChatView';
import DisconnectedSkeleton from '../../components/ui/DisconnectedSkeleton';
import { localeContext, LocaleProps } from '../../index';
import { LottieJSON } from '../../utils/links';
import { handleCheckParams } from '../../lib/fn';
import 'react-loading-skeleton/dist/skeleton.css';
import '../../styles/main.scss';
import { getInitial, getScore, getSurveys } from '../../store/mainSlice';

export type ModalProps = {
    setModalContent: Dispatch<SetStateAction<ReactNode>>;
    setShowModal: Dispatch<SetStateAction<boolean>>;
};

export const ModalContext = createContext<ModalProps | null>(null);

const handleCloseWindow = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = true;
};

const Main: FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState<ReactNode | null>(null);
    const [changeEvent, setChangeEvent] = useState(false);
    const [showReload, setShowReload] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState(0);
    const [showCustomAvtBtn, setShowCustomAvtBtn] = useState(true);
    const [groupChatShow, setGroupChatShow] = useState(true);
    const [openAnimation, setOpenAnimation] = useState(true);
    const [showMain, setShowMain] = useState(false);

    const { setLocale } = useContext(localeContext) as LocaleProps;
    const { global, main }: any = useSelector(state => {
        return state;
    });

    const { socket, socketId, socketOn } = global;
    const { mainInitial } = main;

    const dispatch = useDispatch();

    console.log(mainInitial, 'mainInitial');

    const navigate = useNavigate();

    const sliderRef = useRef<any>(null);
    const timer5Ref = useRef(0);
    const timer30Ref = useRef(0);
    const drawingTimerRef = useRef(0);

    useEffect(() => {
        dispatch(getInitial());
        dispatch(getScore());
        dispatch(getSurveys());
    }, [dispatch]);

    /**
     * 加入 event id 所屬房間
     */
    useEffect(() => {
        // 未登入
        // if (!auth) navigate(`/${process.env.REACT_APP_DEFAULT_EVENT_ID as string}`, { replace: true })
        // // 已登入，加入所屬房間
        // else joinInitRoom(_id, eventId, socketId, code, channelId)

        return () => window.clearTimeout(drawingTimerRef.current);
    }, [socket, socketId]);

    /**
     * 關閉瀏覽器分頁前提醒
     */
    useEffect(() => {
        window.addEventListener('beforeunload', handleCloseWindow);
        return () =>
            window.removeEventListener('beforeunload', handleCloseWindow);
    }, []);

    useEffect(() => {
        if (socket) {
            // 監聽切換 agenda 事件
            socket.on('switchAgendaPage', (data: any) =>
                handleReceiveSwitchAgendaPageJob(data),
            );
            // 監聽重複登入事件，登出使用者
            socket.on('alreadyInRoom', (data: any) =>
                handleLoginDuplicated(data),
            );
            // 監聽後台 drop 用戶清單，將用戶導向至 landing page
            socket.on('updateUserList', () => handleUpdateUserList());
            // 監聽後台重新整理特定用戶頁面
            socket.on('reload', () => handleReload());
            // 監聽獲取目前在線人數
            socket.on('getOnlineCount', (data: any) =>
                handleGetOnlineCount(data),
            );
            // 監聽接收抽獎獎品
            socket.on('deliverPrize', (data: any) => handleReceivePrize(data));
            // 監聽開關群聊視窗
            socket.on('groupChatOpen', (data: any) =>
                handleGroupChatOpen(data),
            );
        }

        return () => {
            if (socket) {
                socket.removeListener('switchAgendaPage');
                socket.removeListener('alreadyInRoom');
                socket.removeListener('updateUserList');
                socket.removeListener('reload');
                socket.removeListener('getOnlineCount');
                socket.removeListener('deliverPrize');
                socket.removeListener('groupChatOpen');
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket]);

    /**
     * 確認群聊視窗開啟狀態
     */
    useEffect(() => {
        async function checkGroupChatOpenStatus() {
            const data = await checkGroupChatStatus();
            setGroupChatShow(data);
        }

        checkGroupChatOpenStatus();
    }, []);

    /**
     * socket 斷線 console.log
     */
    useEffect(() => {
        if (!socketOn) {
            const timer5 = window.setTimeout(() => {
                // onDeliverSocketDisconnect({ code, des: '5' })
            }, 5000);

            const timer30 = window.setTimeout(() => {
                // onDeliverSocketDisconnect({ code, des: '30' })
                setShowReload(true);
            }, 30000);

            timer5Ref.current = timer5;
            timer30Ref.current = timer30;
        } else {
            setShowReload(false);
            clearTimeout(timer5Ref.current);
            clearTimeout(timer30Ref.current);
        }

        return () => {
            clearTimeout(timer5Ref.current);
            clearTimeout(timer30Ref.current);
        };
    }, [socketOn]);

    /**
     * 根據語言及活動 id 訂定初始畫面
     */
    // useEffect(() => {
    //     if (eventId && eventId.includes('-')) {
    //         handleCheckParams(eventId, setLocale)
    //     }
    // }, [eventId])

    /**
     * 獲取目前 agenda 的 index
     */
    // useEffect(() => {
    //     async function getAgenda() {
    //         const { data } = await getCurrentAgenda(eventId)

    //         if (data) {
    //             handleOnClick(parseInt(data))
    //             forwardToCurrentAgenda({ current: parseInt(data) })
    //         } else {
    //             handleOnClick(0)
    //             forwardToCurrentAgenda({ current: 0 })
    //         }
    //     }

    //     getAgenda()
    // }, [])

    /**
     * 獲取裝置高度
     */
    useEffect(() => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }, []);

    /**
     * 点播初始化完成
     */
    const playerComplete = () => {
        setOpenAnimation(false);
        setShowMain(true);
    };

    /**
     * 監聽後台重新 reload 特定使用者頁面
     */
    const handleReload = () => {
        window.removeEventListener('beforeunload', handleCloseWindow);
        window.location.reload();
    };

    const handleGroupChatOpen = ({ groupChatShow }: GroupChatShowData) => {
        setGroupChatShow(groupChatShow);
    };

    /**
     * 處理接收目前在線人數事件的 callback
     */
    const handleGetOnlineCount = (data: any) => {
        const { online } = data;
        setOnlineUsers(online);
    };

    /**
     * 處理接收抽獎獎品事件的 callback
     */
    const handleReceivePrize = (data: any) => {
        // const {
        //     payload: { winIds, prize },
        // } = data
        // if (_id.includes(winIds)) updateUserAwards(prize)
        // else return
    };

    /**
     * 監聽後台刪除用戶清單事件的 callback
     */
    const handleUpdateUserList = () => {
        // setUserLoginError({ error: 'USER_LIST_DROP' })
        // navigate(`/${eventId}`, { replace: true })
    };

    /**
     * 處理接收切換 agenda 頁面定時任務訊息後需觸發事件
     */
    const handleReceiveSwitchAgendaPageJob = (
        data: SwitchAgendaPageEventData,
    ) => {
        const {
            payload: { payload },
            message,
        } = data;

        console.log({ message });

        // forwardToCurrentAgenda({ current: payload })
        handleOnClick(payload);
    };

    /**
     * 處理接收伺服器判斷重複登入訊息，使使用者登出
     */
    const handleLoginDuplicated = (data: { expire: boolean }) => {
        // const { expire } = data
        // if (eventId && !expire) {
        //     setUserLoginError({ error: 'USER_LOGIN_IN_DUPLICATE_ERROR' })
        //     navigate(`/${eventId}`, { replace: true })
        // } else {
        //     setUserLoginError({ error: 'USER_LOG_OUT' })
        //     navigate(`/${eventId}`, { replace: true })
        // }
    };

    /**
     * 關閉彈窗
     */
    const handleCloseModal = useCallback(() => {
        setShowModal(false);
    }, []);

    /**
     * agenda slides 滑動至當前 index
     * @param index
     */
    const handleOnClick = (index: number) => {
        if (sliderRef.current) sliderRef.current.slickGoTo(index);
    };

    /**
     * 向後端請求新的 walkin code
     */
    const handlePostSharedWalkin = () => {
        // const [currentEvent] = event.filter((ev) => ev.eventId === eventId)
        // onPostWalkin({ eventId, channelId: currentEvent.channelId, code })
    };

    /**
     * 點擊分享 walkin code 按鈕觸發
     */
    const handleClickSharedWalkin = () => {
        handlePostSharedWalkin();
        setModalContent(
            <ShareWalkin handlePostSharedWalkin={handlePostSharedWalkin} />,
        );
        setShowModal(true);
    };

    /**
     * 點擊客製化頭像按鈕
     */
    const handleClickCustomAvatar = () => {
        setModalContent(<CustomAvatar handleCloseModal={handleCloseModal} />);
        setShowModal(true);
    };

    /**
     * 點擊積分規則按鈕
     */
    const handleClickScoreRules = () => {
        setModalContent(<ScoreRules />);
        setShowModal(true);
    };

    /**
     * 點擊分組回答按鈕
     */
    const handleClickGroupChatDescription = () => {
        setModalContent(<GroupChatDesc />);
        setShowModal(true);
    };

    return (
        <div className="main-wrap" id="main-wrap">
            <CustomModal
                showModal={showModal}
                handleCloseModal={handleCloseModal}
            >
                {modalContent}
            </CustomModal>
            {openAnimation && (
                <div className="main-open-animation-lottie">
                    <div className="main-open-animation-container">
                        <Lottie
                            isClickToPauseDisabled={true}
                            // speed={0.8}
                            options={{
                                loop: false,
                                autoplay: true,
                                animationData: LottieJSON.OPEN_ANIMATION,
                                rendererSettings: {
                                    preserveAspectRatio: 'xMidYMid slice',
                                },
                            }}
                            eventListeners={[
                                {
                                    eventName: 'complete',
                                    callback: () => setOpenAnimation(false),
                                },
                            ]}
                            // id="open-animation"
                        ></Lottie>
                    </div>
                    {/* <div className="main-open-animation-container-mo">
                        <Lottie
                            isClickToPauseDisabled={true}
                            options={{
                                loop: true,
                                autoplay: true,
                                animationData: LottieJSON.OPEN_ANIMATION_MO,
                                rendererSettings: {
                                    preserveAspectRatio: 'xMidYMid slice'
                                }
                            }}
                        // id="open-animation"
                        ></Lottie>
                    </div> */}
                </div>
            )}
            <ModalContext.Provider value={{ setShowModal, setModalContent }}>
                <HeaderNav
                    changeEvent={changeEvent}
                    setChangeEvent={setChangeEvent}
                    handleClickSharedWalkin={handleClickSharedWalkin}
                    onlineUsers={onlineUsers}
                    setModalContent={setModalContent}
                    setShowModal={setShowModal}
                    handleClickScoreRules={handleClickScoreRules}
                    handleClickGroupChatDescription={
                        handleClickGroupChatDescription
                    }
                />

                <div className="main-body">
                    {showCustomAvtBtn && (
                        <CustomAvatarButton
                            handleClickCustomAvatar={handleClickCustomAvatar}
                            setShowCustomAvtBtn={setShowCustomAvtBtn}
                        />
                    )}
                    <div className="main-body-left">
                        <div className="main-left-player-mask">
                            {/* {groupChatShow ? <GroupChatView /> : <PolyPlayer />} */}
                            <PolyPlayer playerComplete={playerComplete} />
                        </div>
                        <div className="main-agenda-container">
                            <Agenda sliderRef={sliderRef} />
                        </div>
                    </div>

                    {!socketOn ? (
                        <DisconnectedSkeleton
                            showReload={showReload}
                            handleReload={handleReload}
                        />
                    ) : (
                        <InteractiveSec setChangeEvent={setChangeEvent} />
                    )}
                </div>
            </ModalContext.Provider>
        </div>
    );
};

export default Main;
