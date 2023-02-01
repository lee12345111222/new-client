import React, {
    FC,
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
    MutableRefObject,
} from 'react';
import { Button, Input } from 'antd';

import { Links } from '../../../utils/links';
import { PostingResults } from '../interactiveSec/InteractiveSec';
import '../../../styles/after-event.scss';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Obj } from '../../../store/globalSlice';
import { updateState } from '../../../store/mainSlice';

const { TextArea } = Input;

type AfterEventSurveyProps = {
    setShowUnlockResult: Dispatch<SetStateAction<boolean>>;
    showUnlockResult: boolean;
    resultRef: MutableRefObject<PostingResults[]>;
    textAnswer: string;
    setTextAnswer: Dispatch<SetStateAction<string>>;
    boxChecked: string[];
    setBoxChecked: Dispatch<SetStateAction<string[]>>;
    postSurveyShow: boolean;
};

const AfterEventSurvey: FC<AfterEventSurveyProps> = ({
    setShowUnlockResult,
    showUnlockResult,
    resultRef,
    textAnswer,
    setTextAnswer,
    boxChecked,
    setBoxChecked,
    postSurveyShow,
}) => {
    const dispatch = useDispatch();

    const { main }: any = useSelector(state => {
        return state;
    });

    const {
        mainInitial: {},
        socket,
        postSurveys = [],
        userPostSurveys = false,
        restPostSurveyPage = 0,
    } = main;

    const [surveyShow, setSurveyShow] = useState(false);

    const navigate = useNavigate();

    /**
     * 確認會後卷開啟狀態
     */
    // useEffect(() => {
    //     if (postSurveys?.length && postSurveys[0].category === 'middle') {
    //         setSurveyShow(true);
    //     }
    // }, [postSurveys]);

    /**
     * 點擊會後問卷開始
     */
    const handleSurveyStart = () =>
        dispatch(updateState({ key: 'restPostSurveyPage', value: 1 }));

    /**
     * 點擊選項，將選中項目加入待提交陣列
     * @param pkg 選中目標資訊物件
     */
    const handleOptionClick = (idx: string, type: string) => {
        console.log(idx, type);
        const newObj: Obj[] = JSON.parse(JSON.stringify(postSurveys));
        let { choiceIndexes = [], answer } = newObj[restPostSurveyPage - 1];
        if (type === 'multiple') {
            if (choiceIndexes.includes(idx)) {
                choiceIndexes = choiceIndexes.filter(
                    (ele: string) => idx !== ele,
                );
            } else {
                choiceIndexes.push(idx);
            }
        } else if (type === 'single') {
            if (choiceIndexes.includes(idx)) {
                choiceIndexes = choiceIndexes.filter((ele: string) => {
                    console.log(idx);
                    return idx !== ele;
                });
            } else {
                choiceIndexes = [idx];
            }
        } else if (type === 'dialog') {
            answer = idx;
        }
        newObj[restPostSurveyPage - 1] = {
            ...newObj[restPostSurveyPage - 1],
            choiceIndexes,
            answer,
        };
        console.log(newObj, 'newObj');
        dispatch(updateState({ key: 'postSurveys', value: newObj }));
    };

    /**
     * 處理下一題以及最終問卷提交
     * @param surveyId
     * @param category
     * @param type
     * @param identifier
     * @param nextSurveyId
     * @param nextType
     */
    const handleNext = () => {
        const data = postSurveys.map((ele: Obj) => {
            const { id, code, choiceIndexes } = ele;
            return {
                id,
                code,
                choiceIndexes,
            };
        });
        socket.emit('survey', {
            action: 'answer',
            data,
        });
        dispatch(updateState({ key: 'userPostSurveys', value: true }));
        setShowUnlockResult(true);

        // 3 秒後關閉動畫
        window.setTimeout(() => {
            setShowUnlockResult(false);
        }, 3000);
    };
    return (
        <div className="after-event-survey-wrap scroll-Control">
            {postSurveys.length ? (
                <>
                    {userPostSurveys ? (
                        <>
                            {showUnlockResult ? (
                                <div className="after-event-survey-unlock">
                                    <img src={Links.UNLOCK} alt="unlock" />
                                </div>
                            ) : (
                                <div className="after-event-survey-unlock-result">
                                    <div className="after-event-survey-unlock-result-text">
                                        感谢您的填写，回顾文章将于活动后寄送至您信箱。
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            {restPostSurveyPage === 0 ? (
                                <div className="after-event-startBox">
                                    <div className="after-event-title">
                                        填写问卷，获取活动回顾文章！
                                    </div>
                                    <Button
                                        className="after-event-survey-prev-btn"
                                        onClick={handleSurveyStart}
                                    >
                                        开始填写
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <div className="after-event-Question">
                                        {
                                            postSurveys[restPostSurveyPage - 1]
                                                .subject
                                        }
                                    </div>
                                    <div className="after-event-survey-body">
                                        {postSurveys[restPostSurveyPage - 1]
                                            .type === 'single' ||
                                        postSurveys[restPostSurveyPage - 1]
                                            .type === 'multiple' ? (
                                            <div className="after-event-survey-options">
                                                {postSurveys[
                                                    restPostSurveyPage - 1
                                                ].choices.map(
                                                    (
                                                        option: string,
                                                        idx: string,
                                                    ) => {
                                                        const {
                                                            id,
                                                            code,
                                                            choiceIndexes = [],
                                                        } = postSurveys[
                                                            restPostSurveyPage -
                                                                1
                                                        ];
                                                        return (
                                                            <div
                                                                key={idx}
                                                                className="after-event-survey-option"
                                                            >
                                                                <input
                                                                    id={option}
                                                                    type="checkbox"
                                                                    className="after-event-survey-checkbox"
                                                                    checked={choiceIndexes.includes(
                                                                        idx,
                                                                    )}
                                                                    onChange={() =>
                                                                        handleOptionClick(
                                                                            idx,
                                                                            postSurveys[
                                                                                restPostSurveyPage -
                                                                                    1
                                                                            ]
                                                                                .type,
                                                                        )
                                                                    }
                                                                />
                                                                <label
                                                                    htmlFor={
                                                                        option
                                                                    }
                                                                    className="after-event-survey-label"
                                                                    onChange={() =>
                                                                        handleOptionClick(
                                                                            idx,
                                                                            postSurveys[
                                                                                restPostSurveyPage -
                                                                                    1
                                                                            ]
                                                                                .type,
                                                                        )
                                                                    }
                                                                    role="presentation"
                                                                >
                                                                    {option}
                                                                </label>
                                                            </div>
                                                        );
                                                    },
                                                )}
                                            </div>
                                        ) : (
                                            <div className="after-event-survey-textarea-box">
                                                <TextArea
                                                    className="after-event-survey-textarea"
                                                    value={textAnswer}
                                                    onChange={e =>
                                                        handleOptionClick(
                                                            e.target.value,
                                                            'dialog',
                                                        )
                                                    }
                                                    placeholder="请作答"
                                                />
                                            </div>
                                        )}

                                        <div className="after-event-survey-btn-group">
                                            {restPostSurveyPage <
                                                postSurveys.length && (
                                                <Button
                                                    disabled={
                                                        !postSurveys[
                                                            restPostSurveyPage -
                                                                1
                                                        ].choiceIndexes?.length
                                                    }
                                                    className="after-event-survey-next-btn"
                                                    type="primary"
                                                    onClick={() =>
                                                        dispatch(
                                                            updateState({
                                                                key: 'restPostSurveyPage',
                                                                value:
                                                                    restPostSurveyPage +
                                                                    1,
                                                            }),
                                                        )
                                                    }
                                                >
                                                    下一题
                                                </Button>
                                            )}
                                            {restPostSurveyPage - 1 ===
                                                postSurveys.length - 1 && (
                                                <Button
                                                    disabled={
                                                        !postSurveys[
                                                            restPostSurveyPage -
                                                                1
                                                        ].choiceIndexes?.length
                                                    }
                                                    type="primary"
                                                    className="after-event-survey-submit-btn"
                                                    onClick={() => handleNext()}
                                                >
                                                    完成
                                                </Button>
                                            )}
                                            {restPostSurveyPage - 1 > 0 && (
                                                <Button
                                                    className="after-event-survey-prev-btn"
                                                    onClick={() =>
                                                        dispatch(
                                                            updateState({
                                                                key: 'restPostSurveyPage',
                                                                value:
                                                                    restPostSurveyPage -
                                                                    1,
                                                            }),
                                                        )
                                                    }
                                                >
                                                    前一题
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </>
            ) : (
                <div className="after-event-survey-before-start-text">
                    问卷调研尚未开始
                </div>
            )}
        </div>
    );
};

export default AfterEventSurvey;
