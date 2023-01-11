import React, {
    FC,
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
    MutableRefObject,
    Fragment,
} from 'react';
import { Button, Input, Progress } from 'antd';
import { useIntl } from 'react-intl';

import { Survey } from '../../../lib/socketDataTypes';
import { toPercent } from '../../../lib/fn';
import { PostingResults } from '../interactiveSec/InteractiveSec';
import '../../../styles/after-event.scss';
import { LandingPageImages } from '../../../utils/links';
const { TextArea } = Input;

type DuringEventSurvey = {
    restMiddleSurveyPage: number;
    setRestMiddleSurveyPage: Dispatch<SetStateAction<number>>;
    duringEventResultRef: MutableRefObject<PostingResults[]>;
    duringEventSelectedOption: any[];
    setDuringEventSelectedOption: Dispatch<SetStateAction<any[]>>;
    duringEventTextAnswer: string;
    setDuringEventTextAnswer: Dispatch<SetStateAction<string>>;
    duringEventBoxChecked: string[];
    setDuringEventBoxChecked: Dispatch<SetStateAction<string[]>>;
    middleSurveyShow: boolean;
};

const DuringEventSurvey: FC<DuringEventSurvey> = ({
    restMiddleSurveyPage,
    setRestMiddleSurveyPage,
    duringEventResultRef,
    duringEventSelectedOption,
    setDuringEventSelectedOption,
    middleSurveyShow,
    duringEventTextAnswer,
    setDuringEventTextAnswer,
    duringEventBoxChecked,
    setDuringEventBoxChecked,
}) => {
    const intl = useIntl();

    const {
        user: {
            user: { _id, code, eventId, middleSurveys: userMiddleSurveys },
            scoreDetail,
        },
        middleSurvey: { middleSurveys },
        result: { middleResult, correct },
    }: any = {};

    const [nextDisabled, setNextDisabled] = useState(true);

    /**
     * 判斷選中選項是否大於 0，if not, disable submit button
     */
    useEffect(() => {
        if (
            duringEventSelectedOption.length > 0 ||
            duringEventTextAnswer.length > 0
        )
            setNextDisabled(false);
        else setNextDisabled(true);
    }, [duringEventSelectedOption.length, duringEventTextAnswer.length]);

    /**
     * 點擊會後問卷開始
     */
    const handleSurveyStart = () => setRestMiddleSurveyPage(1);

    /**
     * 點擊選項，將選中項目加入待提交陣列
     * @param pkg 選中目標資訊物件
     */
    const handleOptionClick = (pkg: any, surveyId: string) => {
        if (pkg.type === 'multiple') {
            if (!duringEventBoxChecked.includes(pkg.option + surveyId)) {
                setDuringEventBoxChecked(state => [
                    ...state,
                    pkg.option + surveyId,
                ]);
                setDuringEventSelectedOption(state => [...state, pkg]);
            } else {
                setDuringEventBoxChecked(state =>
                    state.filter(s => s !== pkg.option + surveyId),
                );
                setDuringEventSelectedOption(state =>
                    state.filter(s => s.option !== pkg.option),
                );
            }
        } else if (pkg.type === 'single') {
            if (!duringEventBoxChecked.includes(pkg.option + surveyId)) {
                setDuringEventBoxChecked(state =>
                    state.filter(s => !s.includes(surveyId)),
                );
                setDuringEventBoxChecked(state => [
                    ...state,
                    pkg.option + surveyId,
                ]);
                setDuringEventSelectedOption([pkg]);
            } else {
                setDuringEventBoxChecked(state =>
                    state.filter(s => !s.includes(surveyId)),
                );
                setDuringEventSelectedOption([]);
            }
        } else return;
    };

    const handleCollectionAnswer = () => {
        const { options } = middleSurveys[restMiddleSurveyPage - 1];

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
     * 將單題結果放進待提交陣列，並儲存進資料庫
     * @param surveyId
     * @param category
     */
    const handleAddResult = (
        surveyId: string,
        category: string,
        type: string,
        isFinished: boolean,
    ) => {
        const correct = handleCollectionAnswer();

        let sendingSurvey: {
            surveyId: string;
            category: string;
            selected: any[] | string;
            correct: string[];
        };
        const postingResult = { userId: _id, userCode: code, eventId };

        if (type === 'single' || type === 'multiple') {
            sendingSurvey = {
                surveyId,
                category,
                selected: duringEventSelectedOption,
                correct,
            };
            setDuringEventSelectedOption([]);
        } else {
            sendingSurvey = {
                surveyId,
                category,
                selected: duringEventTextAnswer,
                correct,
            };
            setDuringEventTextAnswer('');
        }

        const sending = { sendingSurvey, ...postingResult };
        // onPostUserEventSurveyResult({
        //     sendingData: [sending],
        //     isFinished,
        //     identifier: 'middle',
        //     scoreDetail,
        // })

        if (duringEventResultRef.current.length > 0) {
            const filteredResults = duringEventResultRef.current.filter(
                r => r.sendingSurvey.surveyId !== surveyId,
            );

            if (filteredResults.length > 0)
                duringEventResultRef.current = [...filteredResults, sending];
            else duringEventResultRef.current = [sending];
        } else duringEventResultRef.current = [sending];
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
    const handleNext = (
        surveyId: string,
        category: string,
        type: string,
        identifier: '_submit' | '_next',
        nextSurveyId?: string,
        nextType?: string,
    ) => {
        if (identifier === '_submit') {
            handleAddResult(surveyId, category, type, true);
        } else {
            handleAddResult(surveyId, category, type, false);

            if (duringEventResultRef.current.length > 0) {
                const selected = duringEventResultRef.current.filter(
                    s => s.sendingSurvey.surveyId === nextSurveyId,
                );
                // 選擇題
                if (nextType === 'single' || nextType === 'multiple') {
                    if (selected.length > 0) {
                        setDuringEventSelectedOption(
                            selected[0].sendingSurvey.selected as any[],
                        );

                        for (const op of selected[0].sendingSurvey.selected) {
                            if (nextSurveyId && typeof op === 'object') {
                                setDuringEventBoxChecked(state => [
                                    ...state,
                                    op.option + nextSurveyId,
                                ]);
                            }
                        }
                    } else setDuringEventSelectedOption([]);
                    // 簡答題
                } else {
                    if (selected.length > 0) {
                        setDuringEventTextAnswer(
                            selected[0].sendingSurvey.selected as string,
                        );
                    } else setDuringEventTextAnswer('');
                }
            } else setDuringEventSelectedOption([]);

            setRestMiddleSurveyPage((state: number) => state + 1);
        }
    };

    /**
     * 回復至上一題
     * @param prevSurveyId
     * @param type
     * @param surveyId
     * @param prevType
     */
    const handlePrev = (
        prevSurveyId: string,
        prevType: string,
        surveyId: string,
        type: string,
        category: string,
    ) => {
        // 找到前一題
        const [prevSelected] = duringEventResultRef.current.filter(
            s => s.sendingSurvey.surveyId === prevSurveyId,
        );
        // 刪除本題本來結果
        duringEventResultRef.current = duringEventResultRef.current.filter(
            r => r.sendingSurvey.surveyId !== surveyId,
        );
        // 加入本題更新後結果
        if (
            duringEventSelectedOption.length > 0 ||
            duringEventTextAnswer.length > 0
        )
            handleAddResult(surveyId, category, type, false);
        // 刪除本題選中選項
        if (type === 'single' || type === 'multiple')
            setDuringEventBoxChecked(state =>
                state.filter(s => !s.includes(surveyId)),
            );
        else setDuringEventTextAnswer('');

        // 放入前一題選中選項
        if (prevType === 'single' || prevType === 'multiple')
            setDuringEventSelectedOption(
                prevSelected.sendingSurvey.selected as any[],
            );
        else
            setDuringEventTextAnswer(
                prevSelected.sendingSurvey.selected as string,
            );

        setRestMiddleSurveyPage((state: number) => state - 1);
    };

    if (middleSurveyShow && middleResult.length > 0) {
        return (
            <div className="during-event-survey-wrap scroll-Control">
                <div className="during-event-survey-unlock">
                    <div className="during-event-survey-result-title">
                        {intl.formatMessage({ id: 'main.resultTitle' })}
                    </div>
                    {middleResult.map((rlt: any, i: number) => {
                        return (
                            <div
                                key={rlt.surveyId}
                                className="survey-process-container"
                            >
                                <h3 className="survey-question">
                                    {middleSurveys[i].subject}
                                </h3>
                                {Object.keys(rlt.result).map(r => {
                                    return (
                                        <Fragment key={r}>
                                            <div className="survey-process-text">
                                                <div
                                                    className="survey-process-q-text"
                                                    style={
                                                        correct.includes(r)
                                                            ? {
                                                                  fontWeight:
                                                                      '600',
                                                              }
                                                            : {
                                                                  fontWeight:
                                                                      '400',
                                                              }
                                                    }
                                                >
                                                    {r}
                                                </div>
                                                <div className="survey-process-text-right">
                                                    <span className="survey-process-text-percent">
                                                        {toPercent(
                                                            rlt.result[r],
                                                            rlt.total,
                                                        )}
                                                        %
                                                    </span>
                                                </div>
                                            </div>
                                            <Progress
                                                strokeColor={
                                                    correct.includes(r)
                                                        ? '#669DF6'
                                                        : '#DADCE0'
                                                }
                                                percent={toPercent(
                                                    rlt.result[r],
                                                    rlt.total,
                                                )}
                                                showInfo={false}
                                            />
                                        </Fragment>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <div className="during-event-survey-wrap scroll-Control">
            <>
                {middleSurveyShow && userMiddleSurveys ? (
                    <>
                        <div className="during-event-survey-waitingBox">
                            <img
                                className="during-event-survey-waitingImg"
                                src={LandingPageImages.SURVEY_DONE}
                                alt="waiting"
                            />
                            <div className="during-event-survey-waitingText">
                                {intl.formatMessage({
                                    id: 'main.WaitOtherUser',
                                })}
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        {middleSurveyShow &&
                        middleSurveys &&
                        middleSurveys.length > 0 ? (
                            <>
                                {restMiddleSurveyPage === 0 ? (
                                    <div className="after-event-startBox">
                                        <div className="after-event-title">
                                            {intl.formatMessage({
                                                id: 'main.QuizStartMessage',
                                            })}
                                        </div>
                                        <Button
                                            className="during-event-survey-prev-btn"
                                            onClick={handleSurveyStart}
                                        >
                                            {intl.formatMessage({
                                                id: 'main.PostSurveyStart',
                                            })}
                                        </Button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="during-event-survey-QuestionBox">
                                            <div className="after-event-Question">
                                                {
                                                    (middleSurveys as Survey[])[
                                                        restMiddleSurveyPage - 1
                                                    ].subject
                                                }
                                            </div>
                                            <div className="during-event-survey-body">
                                                {(middleSurveys as Survey[])[
                                                    restMiddleSurveyPage - 1
                                                ].type === 'single' ||
                                                (middleSurveys as Survey[])[
                                                    restMiddleSurveyPage - 1
                                                ].type === 'multiple' ? (
                                                    <div className="during-event-survey-options">
                                                        {(
                                                            middleSurveys as Survey[]
                                                        )[
                                                            restMiddleSurveyPage -
                                                                1
                                                        ]?.options.map(
                                                            option => (
                                                                <div
                                                                    key={
                                                                        option.option
                                                                    }
                                                                    className="during-event-survey-option"
                                                                >
                                                                    <input
                                                                        id={
                                                                            option.option
                                                                        }
                                                                        type="checkbox"
                                                                        className="during-event-survey-checkbox"
                                                                        checked={duringEventBoxChecked.includes(
                                                                            option.option +
                                                                                (
                                                                                    middleSurveys as Survey[]
                                                                                )[
                                                                                    restMiddleSurveyPage -
                                                                                        1
                                                                                ]
                                                                                    .surveyId,
                                                                        )}
                                                                        onChange={() =>
                                                                            handleOptionClick(
                                                                                {
                                                                                    option: option.option,
                                                                                    type: (
                                                                                        middleSurveys as Survey[]
                                                                                    )[
                                                                                        restMiddleSurveyPage -
                                                                                            1
                                                                                    ]
                                                                                        .type,
                                                                                },
                                                                                (
                                                                                    middleSurveys as Survey[]
                                                                                )[
                                                                                    restMiddleSurveyPage -
                                                                                        1
                                                                                ]
                                                                                    .surveyId,
                                                                            )
                                                                        }
                                                                    />
                                                                    <label
                                                                        htmlFor={
                                                                            option.option
                                                                        }
                                                                        className="during-event-survey-label"
                                                                        onChange={() =>
                                                                            handleOptionClick(
                                                                                {
                                                                                    option: option.option,
                                                                                    type: (
                                                                                        middleSurveys as Survey[]
                                                                                    )[
                                                                                        restMiddleSurveyPage -
                                                                                            1
                                                                                    ]
                                                                                        .type,
                                                                                },
                                                                                (
                                                                                    middleSurveys as Survey[]
                                                                                )[
                                                                                    restMiddleSurveyPage -
                                                                                        1
                                                                                ]
                                                                                    .surveyId,
                                                                            )
                                                                        }
                                                                        role="presentation"
                                                                    >
                                                                        {
                                                                            option.option
                                                                        }
                                                                    </label>
                                                                </div>
                                                            ),
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="during-event-survey-textarea-box">
                                                        <TextArea
                                                            className="during-event-survey-textarea"
                                                            value={
                                                                duringEventTextAnswer
                                                            }
                                                            onChange={e =>
                                                                setDuringEventTextAnswer(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            placeholder={intl.formatMessage(
                                                                {
                                                                    id: 'main.PostSurveyTextPlaceholder',
                                                                },
                                                            )}
                                                        />
                                                    </div>
                                                )}

                                                <div className="during-event-survey-btn-group">
                                                    {restMiddleSurveyPage - 1 <
                                                        (
                                                            middleSurveys as Survey[]
                                                        ).length -
                                                            1 && (
                                                        <Button
                                                            disabled={
                                                                nextDisabled
                                                            }
                                                            className="during-event-survey-next-btn"
                                                            type="primary"
                                                            onClick={() =>
                                                                handleNext(
                                                                    (
                                                                        middleSurveys as Survey[]
                                                                    )[
                                                                        restMiddleSurveyPage -
                                                                            1
                                                                    ].surveyId,
                                                                    (
                                                                        middleSurveys as Survey[]
                                                                    )[
                                                                        restMiddleSurveyPage -
                                                                            1
                                                                    ].category,
                                                                    (
                                                                        middleSurveys as Survey[]
                                                                    )[
                                                                        restMiddleSurveyPage -
                                                                            1
                                                                    ].type,
                                                                    '_next',
                                                                    (
                                                                        middleSurveys as Survey[]
                                                                    )[
                                                                        restMiddleSurveyPage
                                                                    ].surveyId,
                                                                    (
                                                                        middleSurveys as Survey[]
                                                                    )[
                                                                        restMiddleSurveyPage
                                                                    ].type,
                                                                )
                                                            }
                                                        >
                                                            {intl.formatMessage(
                                                                {
                                                                    id: 'main.Next',
                                                                },
                                                            )}
                                                        </Button>
                                                    )}
                                                    {restMiddleSurveyPage -
                                                        1 ===
                                                        (
                                                            middleSurveys as Survey[]
                                                        ).length -
                                                            1 && (
                                                        <Button
                                                            disabled={
                                                                nextDisabled
                                                            }
                                                            type="primary"
                                                            className="during-event-survey-submit-btn"
                                                            onClick={() =>
                                                                handleNext(
                                                                    (
                                                                        middleSurveys as Survey[]
                                                                    )[
                                                                        restMiddleSurveyPage -
                                                                            1
                                                                    ].surveyId,
                                                                    (
                                                                        middleSurveys as Survey[]
                                                                    )[
                                                                        restMiddleSurveyPage -
                                                                            1
                                                                    ].category,
                                                                    (
                                                                        middleSurveys as Survey[]
                                                                    )[
                                                                        restMiddleSurveyPage -
                                                                            1
                                                                    ].type,
                                                                    '_submit',
                                                                )
                                                            }
                                                        >
                                                            {intl.formatMessage(
                                                                {
                                                                    id: 'main.Finish',
                                                                },
                                                            )}
                                                        </Button>
                                                    )}
                                                    {restMiddleSurveyPage - 1 >
                                                        0 && (
                                                        <Button
                                                            className="during-event-survey-prev-btn"
                                                            onClick={() =>
                                                                handlePrev(
                                                                    (
                                                                        middleSurveys as Survey[]
                                                                    )[
                                                                        restMiddleSurveyPage -
                                                                            2
                                                                    ].surveyId,
                                                                    (
                                                                        middleSurveys as Survey[]
                                                                    )[
                                                                        restMiddleSurveyPage -
                                                                            2
                                                                    ].type,
                                                                    (
                                                                        middleSurveys as Survey[]
                                                                    )[
                                                                        restMiddleSurveyPage -
                                                                            1
                                                                    ].surveyId,
                                                                    (
                                                                        middleSurveys as Survey[]
                                                                    )[
                                                                        restMiddleSurveyPage -
                                                                            1
                                                                    ].type,
                                                                    (
                                                                        middleSurveys as Survey[]
                                                                    )[
                                                                        restMiddleSurveyPage -
                                                                            1
                                                                    ].category,
                                                                )
                                                            }
                                                        >
                                                            {intl.formatMessage(
                                                                {
                                                                    id: 'main.PostSurveyPrevious',
                                                                },
                                                            )}
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </>
                        ) : (
                            <div className="during-event-survey-before-start">
                                <div className="during-event-survey-before-start-text">
                                    {intl.formatMessage({
                                        id: 'main.QuizBefore',
                                    })}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </>
        </div>
    );
};

export default DuringEventSurvey;
