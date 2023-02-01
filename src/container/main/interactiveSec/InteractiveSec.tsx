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
import { Obj } from '../../../store/globalSlice';

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
    socketOn: boolean;
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

const InteractiveSec: FC<InteractiveSecProps> = ({
    setChangeEvent,
    socketOn,
}) => {
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

    const [textAnswer, setTextAnswer] = useState<string>('');
    const [boxChecked, setBoxChecked] = useState<string[]>([]);
    const [showUnlockResult, setShowUnlockResult] = useState(false);
    const [postSurveyShow, setPostSurveyShow] = useState(false);
    const [showReply, setShowReply] = useState(false);

    const intl = useIntl();

    const { main }: any = useSelector(state => {
        return state;
    });

    const {
        mainInitial: { tabs = [] },
        socket,
        postSurveys,
        middleSurveys = [],
    } = main;
    const tabsObj: Obj = {};
    tabs.forEach((ele: Obj) => {
        tabsObj[ele.name] = 1;
    });

    const { setShowModal, setModalContent } = useContext(
        ModalContext,
    ) as ModalProps;

    const navigate = useNavigate();

    const dispatch = useDispatch();

    //获取积分 排行 抽奖等
    useEffect(() => {
        dispatch(getScore());
    }, [dispatch]);

    /**
     * 確認會中卷開啟狀態
     */
    useEffect(() => {
        if (middleSurveys.length && middleSurveys[0].category === 'middle') {
            const { shiftTime = 30 } = middleSurveys[0];

            const timer = window.setTimeout(() => {
                setSurveyShow(false);
                setThanksShow(null);
            }, shiftTime * 1000);
            setSurveyShow(true);
        }
    }, [middleSurveys]);

    /**
     * 提交問卷選擇項目
     * @param selectedOption 用戶選擇選項陣列
     * @param surveyData { _id: 用戶 id, category: 問卷類型 }
     */
    const handleSubmitSurveyAnswer = () => {
        const { id, code, choiceIndexes } = middleSurveys[0];
        const data = [{ id, code, choiceIndexes }];
        socket.emit('survey', {
            action: 'answer',
            data,
        });
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
        content: string,
        parent?: string,
        type?: string,
    ) => {
        console.log(socket, 'socket');
        const data = {
            content,
            parent,
            type,
        };
        if (!parent) {
            delete data.parent;
        }
        if (!type) {
            delete data.type;
        }
        socket.emit('message', {
            action: 'add',
            data,
        });
        setReplied(INIT_REPLIED_DETAIL);
        setShowReply(false);
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

        message = message.replace(/\n|\r\n/g, '<br>');

        handleSendMessage(message, replied.replied_id, type);

        if (type !== 'sticker') {
            if (messageInputRef.current) messageInputRef.current.value = '';
            setInputContent('');
        }

        if (messageInputRef && messageInputRef.current)
            messageInputRef.current.focus();
    };

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
                    <NavigateBar
                        setChangeEvent={setChangeEvent}
                        tabsObj={tabsObj}
                    />
                    <div
                        className="interactive-routers-wrap"
                        style={{ overflow: 'scroll' }}
                    >
                        {/* {!(helper || admin || googler || whoSharedWalkin) &&
                            !finishSwag && <SwagDrawing />} */}
                        {surveyShow && (
                            <SurveySec
                                thanksShow={thanksShow}
                                middleSurveys={middleSurveys}
                                handleSubmitSurveyAnswer={
                                    handleSubmitSurveyAnswer
                                }
                            />
                        )}

                        <Routes>
                            {tabsObj['chat'] ? (
                                <Route
                                    path="/"
                                    element={
                                        <Chatroom
                                            messageInputRef={messageInputRef}
                                            handleSubmitMessage={
                                                handleSubmitMessage
                                            }
                                            handleInputKeyDown={
                                                handleInputKeyDown
                                            }
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
                                            handleSendSticker={
                                                handleSendSticker
                                            }
                                            handleSendEmoji={handleSendEmoji}
                                        />
                                    }
                                />
                            ) : null}
                            {tabsObj['survey'] ? (
                                <Route
                                    path="/post"
                                    element={
                                        <AfterEventSurvey
                                            setShowUnlockResult={
                                                setShowUnlockResult
                                            }
                                            showUnlockResult={showUnlockResult}
                                            resultRef={resultRef}
                                            textAnswer={textAnswer}
                                            setTextAnswer={setTextAnswer}
                                            boxChecked={boxChecked}
                                            setBoxChecked={setBoxChecked}
                                            postSurveyShow={postSurveyShow}
                                        />
                                    }
                                />
                            ) : null}
                            {tabsObj['score'] ? (
                                <Route
                                    path="/score"
                                    element={<PersonalScore />}
                                />
                            ) : null}
                            {tabsObj['rank'] ? (
                                <Route
                                    path="/leaders"
                                    element={<LeaderBoard />}
                                />
                            ) : null}
                        </Routes>
                    </div>
                </>
            )}
        </div>
    );
};

export default InteractiveSec;
