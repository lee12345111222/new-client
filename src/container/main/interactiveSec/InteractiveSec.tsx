import React, {
    useState,
    useEffect,
    FC,
    useContext,
    useRef,
    useCallback,
    RefObject,
    KeyboardEvent,
    Dispatch,
    SetStateAction,
    MouseEvent,
} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import xss from 'xss';
import { ObjectID } from 'bson';
import SwagDrawing from './swag/SwagDrawing';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { getScore, getSurveys } from '../../../store/mainSlice';
import Chatroom from '../chatroom/Chatroom';
// import QuestionSec from '../questionSec/QuestionSec'
import NavigateBar from './NavigateBar';
import SurveySec from './SurveySec';
import PersonalScore from '../score/PersonalScore';
import LeaderBoard from '../score/LeaderBoard';
import {
    deliverMessageToConsole,
    /*  checkMiddleSurveyStatus, */ checkPostSurveyStatus,
    receiveSurvey,
} from '../../../lib/services';
import {
    ReceiveChatbotEventData,
    RaiseSurveyEventData,
    ReceiveLucyDrawEventData,
    ReceivePostSurveyGuidingEventData,
    PostSurveyShowData,
    LeaderBoardData,
    // MiddleSurveyShowData,
} from '../../../lib/socketDataTypes';
import { ModalContext, ModalProps } from '../Main';
import AfterEventSurvey from '../afterEventSurvey/AfterEventSurvey';
// import DuringEventSurvey from '../duringEventSurvey/DuringEventSurvey'
import { Links } from '../../../utils/links';

import '../../../styles/interactive.scss';
import '../../../styles/luckyDrawTransition.scss';

export type MessageAndQuestionProps = {
    handleSubmitMessage: (area: string, sticker?: string) => void;
    inputContent: string;
    type: string;
    handleInputKeyDown: (
        area: string,
        e: KeyboardEvent<HTMLTextAreaElement>,
    ) => void;
    setIsInputtingMandarin: Dispatch<SetStateAction<boolean>>;
    setInputContent: Dispatch<SetStateAction<string>>;
    messageInputRef: RefObject<HTMLTextAreaElement>;
};

type InteractiveSecProps = {
    setChangeEvent: Dispatch<SetStateAction<boolean>>;
};

const INIT_REPLIED_DETAIL = {
    replied_id: '',
    repliedAvatar: '',
    repliedName: '',
    repliedContent: '',
};

export type RepliedDetail = typeof INIT_REPLIED_DETAIL & {
    repliedIndex?: number;
};

export type LuckyDrawWinner = {
    _id: string;
    code: string;
    company: string;
    name: string;
};

export type PostingResults = {
    userId: string;
    userCode: string;
    eventId: string;
    sendingSurvey: {
        category: string;
        surveyId: string;
        selected: any[] | string;
    };
};

type MessageLocal = {
    to: RepliedDetail | null | string;
    type: string;
    content: string;
    msgId: string;
    createTime: number;
    eventId: string;
    _id: string;
    name: string;
    avatar: string;
    company: string;
    googler: boolean;
    approved: boolean;
    helper: boolean;
    response?: any[];
};

const InteractiveSec: FC<InteractiveSecProps> = ({ setChangeEvent }) => {
    const messageInputRef = useRef<HTMLTextAreaElement>(null);
    const currentSurveyRef = useRef<any>(null);
    const timerRef = useRef<number>(0);
    const resultRef = useRef<PostingResults[]>([]);

    const [isInputtingMandarin, setIsInputtingMandarin] =
        useState<boolean>(false);
    const [inputContent, setInputContent] = useState<string>('');
    const [surveyShow, setSurveyShow] = useState(false);
    const [thanksShow, setThanksShow] = useState<'_post' | '_middle' | null>(
        null,
    );
    const [replied, setReplied] = useState(INIT_REPLIED_DETAIL);
    const [luckyDrawWinner, setLuckyDrawWinner] = useState<LuckyDrawWinner[]>(
        [],
    );
    const [luckyDrawAnimation, setLuckyDrawAnimation] = useState(false);

    const [restPostSurveyPage, setRestPostSurveyPage] = useState(0);
    const [selectedOption, setSelectedOption] = useState<any[]>([]);
    const [textAnswer, setTextAnswer] = useState<string>('');
    const [boxChecked, setBoxChecked] = useState<string[]>([]);
    const [showUnlockResult, setShowUnlockResult] = useState(false);
    const [postSurveyShow, setPostSurveyShow] = useState(false);
    const [showReply, setShowReply] = useState(false);
    // const [middleSurveyStart, setMiddleSurveyStart] = useState(0)

    const {
        user: {
            user: {
                _id,
                code,
                name,
                avatar,
                company,
                googler,
                eventId,
                helper,
                admin,
                whoSharedWalkin,
            },
            scoreDetail,
            swag: { finishSwag },
        },
    }: // middleSurvey: { middleSurveys },
    // result: { middleResult },
    any = { user: { user: {}, swag: {} } };

    const intl = useIntl();

    const { global }: any = useSelector(state => {
        return state;
    });

    const { socket, socketId, socketOn } = global;

    const { setShowModal, setModalContent } = useContext(
        ModalContext,
    ) as ModalProps;

    const navigate = useNavigate();

    const dispatch = useDispatch();

    //获取积分 排行 抽奖等
    useEffect(() => {
        dispatch(getScore);
        dispatch(getSurveys());
    }, []);

    /**
     * 確認會後問卷開啟狀態
     */
    useEffect(() => {
        async function checkStatus() {
            const data = await checkPostSurveyStatus();
            setPostSurveyShow(data);
        }

        checkStatus();
    }, []);

    /**
     * 確認會後中卷開啟狀態
     */
    // useEffect(() => {
    //     async function checkStatus() {
    //         const data = await checkMiddleSurveyStatus()

    //         setMiddleSurveyShow(data.middleSurveyShow)
    //         setMiddleSurveyStart(data.timeStart)

    //         if (data.middleSurveyShow) {
    //             if (timerRef.current) window.clearTimeout(timerRef.current)
    //             const now = new Date().getTime()
    //             const timer = window.setTimeout(() => {
    //                 onGetMiddleSurveyResult({ eventId })
    //             }, data.timeStart + 100000 - now)
    //             timerRef.current = timer
    //         }
    //     }

    //     checkStatus()
    // }, [])

    /**
     * 獲取該會場的所有會後問卷內容
     */
    useEffect(() => {
        // onGetAllPostSurvey({ eventId })
        // onGetAllMiddleSurvey({ eventId })
    }, [eventId]);

    /**
     * socket.io 監聽
     */
    useEffect(() => {
        // 監聽通過審核的訊息
        socket.on('deliverPassedSpeech', (data: any) =>
            receivePassedSpeech(data),
        );
        // 監聽通過審核的問題
        socket.on('deliverPassedQuestion', (data: any) =>
            receivePassedQuestion(data),
        );
        // 監聽定時自動發送訊息
        socket.on('sendChatbot', (data: any) => handleReceiveChatbotJob(data));
        // 監聽定時幸運抽獎
        socket.on('luckyDraw', (data: any) => handleReceiveLuckyDraw(data));
        // 監聽定時自動導向會後問卷頁面
        socket.on('postSurveyGuiding', (data: any) =>
            handleReceivePostSurveyGuiding(data),
        );
        // 監聽定時自動發送問卷
        socket.on('sendSurvey', (data: any) =>
            handleReceiveRaiseSurveyJob(data),
        );
        // 監聽開關會後問卷
        socket.on('postSurveyOpen', (data: any) => handlePostSurveyOpen(data));
        // 監聽排行榜更新
        socket.on('deliverLeaderBoard', (data: any) =>
            handleLeaderBoardUpdate(data),
        );
        // 監聽用戶積極參與互動分數更新
        socket.on('deliverUserScore', (data: any) =>
            handleReceiveUserScore(data),
        );

        return () => {
            socket.removeListener('deliverPassedSpeech');
            socket.removeListener('deliverPassedQuestion');
            socket.removeListener('sendChatbot');
            socket.removeListener('luckyDraw');
            socket.removeListener('postSurveyGuiding');
            socket.removeListener('sendSurvey');
            socket.removeListener('postSurveyOpen');
            socket.removeListener('deliverLeaderBoard');
            socket.removeListener('deliverUserScore');
        };
    }, []);

    /**
     * 接收用戶分數更新
     */
    const handleReceiveUserScore = (data: { userScore: any }) => {
        const { userScore } = data;
        // if (userScore) updateUserScoreDetail({ scoreDetail: userScore })
    };

    /**
     * 接收分數排行榜更新
     */
    const handleLeaderBoardUpdate = (data: LeaderBoardData) => {
        const { leaders } = data;
        // updateLeaderBoard({ leaders })
    };

    /**
     * 開啟會後問卷
     */
    const handlePostSurveyOpen = ({
        postSurveyShow,
        postsurveySlug,
    }: PostSurveyShowData) => {
        setPostSurveyShow(postSurveyShow);
        if (postSurveyShow) navigate('/main/' + postsurveySlug);
    };

    /**
     * 處理會後問卷彈窗顯示
     */
    const handlePostSurveyJob = () => {
        if (timerRef.current) window.clearTimeout(timerRef.current);

        const timer = window.setTimeout(() => {
            currentSurveyRef.current = null;
            setSurveyShow(false);
        }, parseInt(process.env.REACT_APP_POST_SURVEY_WAITING_TIME as string));

        timerRef.current = timer;
    };

    /**
     * 接收問卷定時任務訊息後需觸發事件
     * @param data 發送問卷資訊物件及該則任務 id
     */
    const handleReceiveRaiseSurveyJob = async (data: RaiseSurveyEventData) => {
        const {
            payload: { surveyData },
            message,
        } = data;

        if (!currentSurveyRef.current && Object.keys(surveyData).length > 0) {
            console.log({ message });

            currentSurveyRef.current = surveyData;
            setSurveyShow(true);

            handlePostSurveyJob();

            receiveSurvey({ code, currentEventId: eventId });
            // onDeliverMiddleSurvey({ code, surveyId: surveyData.surveyId, socketId })
        } else return;
    };

    const handleCollectionAnswer = () => {
        const options = (currentSurveyRef.current as any).options;

        const correct = options
            .filter((option: any) => {
                if (option.isAnswer || option.isAnswer === '1') {
                    return option.option;
                }
            })
            .map((o: any) => o.option);
        return correct;
    };

    /**
     * 提交問卷選擇項目
     * @param selectedOption 用戶選擇選項陣列
     * @param surveyData { _id: 用戶 id, category: 問卷類型 }
     */
    const handleSubmitSurveyAnswer = (
        selectedOption: any[],
        surveyData: { surveyId: string; category: string },
    ) => {
        if (selectedOption.length > 0) {
            const correct = handleCollectionAnswer();
            const sendingSurvey = {
                ...surveyData,
                selected: selectedOption,
                correct,
            };

            // onPostUserSurveyResult({ sendingSurvey, userId: _id, userCode: code, eventId, scoreDetail })

            handleAfterSubmitSurveyAnswer();

            // if (surveyData.category === 'post') handleAfterSubmitSurveyAnswer()
            // else if (surveyData.category === 'middle') setThanksShow('_middle')
        }
    };

    /**
     * 會後問卷提交後顯示感謝填寫畫面，並設定該畫面自動關閉時間
     */
    const handleAfterSubmitSurveyAnswer = () => {
        if (timerRef.current) window.clearTimeout(timerRef.current);

        const timer = window.setTimeout(() => {
            currentSurveyRef.current = null;
            setSurveyShow(false);
            setThanksShow(null);
        }, parseInt(process.env.REACT_APP_POST_SURVEY_THANKS_SHOWING_TIME as string));

        setThanksShow('_post');
        timerRef.current = timer;
    };

    /**
     * 接收聊天室自動訊息定時任務訊息後需觸發事件
     * @param data chatbot 自動訊息 helper 資訊物件及該則任務 id
     */
    const handleReceiveChatbotJob = async (data: ReceiveChatbotEventData) => {
        const {
            payload: { helper, helperSpeech_id },
            message,
        } = data;

        console.log({ message });

        handleSubmitChatbotMessage(message, helper, helperSpeech_id);
    };

    /**
     * 接收幸運抽獎定時任務後需觸發事件
     * @param data
     */
    const handleReceiveLuckyDraw = async (data: ReceiveLucyDrawEventData) => {
        const {
            payload: { win },
            message,
        } = data;

        console.log({ message });

        if (timerRef.current) window.clearTimeout(timerRef.current);

        const timer = window.setTimeout(() => {
            setLuckyDrawAnimation(false);

            window.setTimeout(() => {
                setLuckyDrawWinner([]);
            }, parseInt(process.env.REACT_APP_LUCKY_DRAW_WINNER_SHOWING_TIME as string));
        }, parseInt(process.env.REACT_APP_LUCKY_DRAW_ANIMATION_TIME as string));

        setLuckyDrawAnimation(true);
        setLuckyDrawWinner(win);
        timerRef.current = timer;
    };

    /**
     * 接收導向會後問卷頁面定時任務後需觸發事件
     * @param data
     */
    const handleReceivePostSurveyGuiding = async (
        data: ReceivePostSurveyGuidingEventData,
    ) => {
        const { message } = data;

        console.log({ message });

        navigate('/main/post');
    };

    /**
     * 處理通過審核訊息，更新 chat state messages 陣列
     * @param data 審核通過單則訊息物件
     */
    const receivePassedSpeech = (data: { approved: any }) => {
        const { approved } = data;

        // updateLocalMessage(approved)
    };

    /**
     * 處理通過審核問題，更新 question state questions 陣列
     * @param data 審核通過單則問題物件
     */
    const receivePassedQuestion = (data: any) => {
        // updateLocalQuestion(data)
    };

    /**
     * 處理 Chatbot 訊息傳送至後台做審核
     * @param message 訊息內容
     * @param helper 是否為自動訊息
     * @param helperSpeech_id chatbot helper id
     * @returns
     */
    const handleSubmitChatbotMessage = async (
        message: string,
        helper: any,
        helperSpeech_id: string,
    ) => {
        if (message.length === 0) return;

        const msgId = new ObjectID(helperSpeech_id).toString();
        const createTime = Date.now();

        if (helper && helper._id) {
            const { eventId, _id, name, avatar, company } = helper;
            const messageLocal = {
                to: null,
                type: 'text',
                content: xss(message),
                msgId,
                createTime,
                eventId,
                _id,
                name,
                avatar,
                company,
                googler: true,
                approved: true,
                helper: true,
                response: [],
            };
            const addLocal = handleAddToSelf(messageLocal);

            // addLocal(addLocalMessage)
        }
    };

    /**
     * 將輸入訊息加入本地 state
     */
    const handleAddToSelf = (messageLocal: MessageLocal) => {
        // const { to, type, msgId, content, createTime, response, approved } = messageLocal
        // const from = {
        //     _id: _id,
        //     name,
        //     avatar,
        //     company,
        //     googler,
        //     helper,
        // }
        // let pkg: Message | Question
        // const dispatchPkg = {
        //     _id: msgId,
        //     type,
        //     content,
        //     createTime,
        //     approved,
        //     from,
        //     room: eventId,
        //     to,
        // }
        // if (type === 'question' || type === 'response') {
        //     pkg = {
        //         ...dispatchPkg,
        //         response,
        //     } as Question
        // } else pkg = dispatchPkg as Message
        // return (addLocal: Dispatch<Message | Question>) => addLocal(pkg)
    };

    /**
     * 傳送訊息至後台等待驗證
     * @param userId 用戶 id
     * @param to 回覆訊息，null 為全體
     * @param msgId 訊息 id
     * @param type 聊天室或提問區
     * @param content 訊息內容
     * @param createTime 訊息創建時間 timestamp
     * @param eventId event id
     * @returns 訊息 id
     */
    const handleSendMessage = async (
        userId: string,
        to: RepliedDetail | null,
        msgId: string,
        type: string,
        content: string,
        createTime: number,
        eventId: string,
    ) => {
        const error = await deliverMessageToConsole<string>(
            userId,
            to,
            msgId,
            type,
            eventId,
            content,
            createTime,
        );
        if (!error) {
            const messageLocal = {
                to,
                type,
                content: xss(content),
                msgId,
                createTime,
                eventId,
                _id,
                name,
                avatar,
                company,
                googler,
                approved: false,
                helper,
                response: [],
            };
            const addLocal = handleAddToSelf(messageLocal);

            // if (type === 'text') addLocal(addLocalMessage)
            // else if (type === 'sticker') addLocal(addLocalMessage)
            // else if (type === 'question' || type === 'response') addLocal(addLocalQuestion)

            setReplied(INIT_REPLIED_DETAIL);
            setShowReply(false);
        } else {
            setModalContent(error);
            setShowModal(true);
        }
    };

    /**
     * 處理輸入框訊息傳送
     * @param type 聊天室
     */
    const handleSubmitMessage = (type: string, sticker?: string) => {
        if (!socketOn) {
            setModalContent(
                intl.formatMessage({ id: 'main.FAIL_TO_SEND_MSG' }),
            );
            setShowModal(true);
        }
        let message = '';

        if (type === 'sticker' && sticker) message = sticker.trim();
        else
            message = (
                messageInputRef.current as HTMLTextAreaElement
            ).value.trim();

        if (message.length === 0) return;

        const msgId = new ObjectID().toString();
        const createTime = Date.now();

        let to: null | RepliedDetail = null;
        if (replied.replied_id.length > 0) to = replied;

        message = message.replace(/\n|\r\n/g, '<br>');

        handleSendMessage(
            _id,
            to,
            msgId,
            type,
            xss(message),
            createTime,
            eventId,
        );

        if (type !== 'sticker') {
            if (messageInputRef.current) messageInputRef.current.value = '';
            setInputContent('');
        }

        if (messageInputRef && messageInputRef.current)
            messageInputRef.current.focus();
    };

    /**
     * 處理輸入框訊息傳送
     * @param type 提問區
     */
    // const handleResponseSubmit = (type: string, response: string, repliedDetail: RepliedDetail) => {
    //     if (!socketOn) {
    //         setModalContent(intl.formatMessage({ id: 'main.FAIL_TO_SEND_MSG' }))
    //         setShowModal(true)
    //     }

    //     const message = response.trim()

    //     if (message.length === 0) return

    //     const msgId = new ObjectID().toString()
    //     const createTime = Date.now()

    //     handleSendMessage(_id, repliedDetail, msgId, type, xss(message), createTime, eventId)
    // }

    /**
     * 處理訊息傳送鍵盤事件
     * @param type 聊天室或提問區
     * @param e
     */
    const handleInputKeyDown = (
        type: string,
        e: KeyboardEvent<HTMLTextAreaElement>,
    ) => {
        if (e.key === 'Tab') e.preventDefault();
        else if (e.key == 'Enter' && !e.shiftKey && !isInputtingMandarin) {
            e.preventDefault();
            handleSubmitMessage(type);
        }
    };

    /**
     * 點擊回覆訊息按鈕
     * @param param0
     */
    const handleReplyMessageClick = useCallback(
        ({
            replied_id,
            repliedAvatar,
            repliedName,
            repliedContent,
        }: RepliedDetail) => {
            setReplied({
                replied_id,
                repliedAvatar,
                repliedName,
                repliedContent,
            });
            setShowReply(true);
        },
        [],
    );

    /**
     * 關閉回覆訊息區塊
     */
    const handleRepliedDetailClose = useCallback(() => {
        setReplied(INIT_REPLIED_DETAIL);
        setShowReply(false);
    }, []);

    /**
     * 處理貼圖訊息發送
     * @param e
     */
    const handleSendSticker = (e: MouseEvent) => {
        const stickerLink = (e.target as HTMLImageElement).src;
        handleSubmitMessage('sticker', stickerLink);
    };

    /**
     * 處理插入 emoji
     * @param emoji
     */
    const handleInsertEmoji = (emoji: string) => {
        const $input = messageInputRef.current as HTMLTextAreaElement;

        if ($input.selectionStart || $input.selectionStart === 0) {
            const startPos = $input.selectionStart;
            const endPos = $input.selectionEnd;
            const restoreTop = $input.scrollTop;

            $input.value =
                $input.value.substring(0, startPos) +
                emoji +
                $input.value.substring(endPos as number, $input.value.length);
            setInputContent($input.value);
            if (restoreTop > 0) $input.scrollTop = restoreTop;

            $input.selectionStart = startPos + emoji.length;
            $input.selectionEnd = startPos + emoji.length;
            $input.focus();
        } else {
            $input.value += emoji;
            setInputContent($input.value);
            $input.focus();
        }
    };

    /**
     * 處理 emoji 訊息發送
     * @param e
     */
    const handleSendEmoji = (e: MouseEvent) => {
        const { name } = (e.target as HTMLButtonElement).dataset;
        if (name) handleInsertEmoji(`${name}`);
    };

    // lucky draw
    const luckyWinner = luckyDrawAnimation ? (
        <div className="interactive-lucky-draw-animation">
            <img src={Links.LUCKY_DRAW} alt="lucky draw" />
        </div>
    ) : (
        <div className="interactive-lucky-draw-winner">
            <div className="interactive-lucky-draw-winner-container">
                <h2>Congratulations</h2>
                <div className="interactive-lucky-draw-winner-body">
                    {luckyDrawWinner.map(winner => {
                        return (
                            <div
                                key={winner._id}
                                className="interactive-lucky-draw-winner-item"
                            >
                                <div className="interactive-lucky-draw-winner-item-name">
                                    {winner.name}
                                </div>
                                <div className="interactive-lucky-draw-winner-item-company">
                                    {winner.company}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );

    return (
        <div className="interactive-wrap">
            {luckyDrawWinner && luckyDrawWinner.length > 0 ? (
                <>{luckyWinner}</>
            ) : (
                <>
                    <NavigateBar setChangeEvent={setChangeEvent} />
                    <div
                        className="interactive-routers-wrap"
                        style={{ overflow: 'scroll' }}
                    >
                        {!(helper || admin || googler || whoSharedWalkin) &&
                            !finishSwag && <SwagDrawing />}
                        {surveyShow && (
                            <SurveySec
                                thanksShow={thanksShow}
                                currentSurveyRef={currentSurveyRef}
                                handleSubmitSurveyAnswer={
                                    handleSubmitSurveyAnswer
                                }
                            />
                        )}
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Chatroom
                                        messageInputRef={messageInputRef}
                                        handleSubmitMessage={
                                            handleSubmitMessage
                                        }
                                        handleInputKeyDown={handleInputKeyDown}
                                        setIsInputtingMandarin={
                                            setIsInputtingMandarin
                                        }
                                        setInputContent={setInputContent}
                                        inputContent={inputContent}
                                        type="text"
                                        handleReplyMessageClick={
                                            handleReplyMessageClick
                                        }
                                        handleRepliedDetailClose={
                                            handleRepliedDetailClose
                                        }
                                        replied={replied}
                                        showReply={showReply}
                                        handleSendSticker={handleSendSticker}
                                        handleSendEmoji={handleSendEmoji}
                                    />
                                }
                            />
                            <Route
                                path="/post"
                                element={
                                    <AfterEventSurvey
                                        restPostSurveyPage={restPostSurveyPage}
                                        setRestPostSurveyPage={
                                            setRestPostSurveyPage
                                        }
                                        setShowUnlockResult={
                                            setShowUnlockResult
                                        }
                                        showUnlockResult={showUnlockResult}
                                        resultRef={resultRef}
                                        selectedOption={selectedOption}
                                        setSelectedOption={setSelectedOption}
                                        textAnswer={textAnswer}
                                        setTextAnswer={setTextAnswer}
                                        boxChecked={boxChecked}
                                        setBoxChecked={setBoxChecked}
                                        postSurveyShow={postSurveyShow}
                                    />
                                }
                            />
                            <Route path="/score" element={<PersonalScore />} />
                            <Route path="/leaders" element={<LeaderBoard />} />
                        </Routes>
                    </div>
                </>
            )}
        </div>
    );
};

export default InteractiveSec;
