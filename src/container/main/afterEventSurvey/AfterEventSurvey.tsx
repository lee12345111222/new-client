import React, { FC, useState, useEffect, Dispatch, SetStateAction, MutableRefObject } from 'react'
import { Button, Input } from 'antd'
import { useIntl } from 'react-intl'

import { Survey } from '../../../lib/socketDataTypes'
import { Links } from '../../../utils/links'
import { PostingResults } from '../interactiveSec/InteractiveSec'
import '../../../styles/after-event.scss'
import { useNavigate } from 'react-router'

const { TextArea } = Input

type AfterEventSurveyProps = {
    restPostSurveyPage: number
    setRestPostSurveyPage: Dispatch<SetStateAction<number>>
    setShowUnlockResult: Dispatch<SetStateAction<boolean>>
    showUnlockResult: boolean
    resultRef: MutableRefObject<PostingResults[]>
    selectedOption: any[]
    setSelectedOption: Dispatch<SetStateAction<any[]>>
    textAnswer: string
    setTextAnswer: Dispatch<SetStateAction<string>>
    boxChecked: string[]
    setBoxChecked: Dispatch<SetStateAction<string[]>>
    postSurveyShow: boolean
}

const AfterEventSurvey: FC<AfterEventSurveyProps> = ({
    restPostSurveyPage,
    setRestPostSurveyPage,
    setShowUnlockResult,
    showUnlockResult,
    resultRef,
    selectedOption,
    setSelectedOption,
    textAnswer,
    setTextAnswer,
    boxChecked,
    setBoxChecked,
    postSurveyShow,
}) => {
    const intl = useIntl()

    const {
        user: {
            user: { _id, code, eventId, postSurveys: userPostSurveys },
        },
        postSurvey: { postSurveys },
    }:any = {user:{user:{}},postSurvey: {postSurvey:[]}}


    const [nextDisabled, setNextDisabled] = useState(true)
    const navigate = useNavigate()

    /**
     * 判斷選中選項是否大於 0，if not, disable submit button
     */
    useEffect(() => {
        if (
            selectedOption.length > 0 ||
            textAnswer.length > 0 ||
            (restPostSurveyPage && !postSurveys[restPostSurveyPage - 1].mustAnswer)
        )
            setNextDisabled(false)
        else setNextDisabled(true)
    }, [selectedOption.length, textAnswer.length])

    /**
     * 點擊會後問卷開始
     */
    const handleSurveyStart = () => setRestPostSurveyPage(1)

    /**
     * 點擊選項，將選中項目加入待提交陣列
     * @param pkg 選中目標資訊物件
     */
    const handleOptionClick = (pkg: any, surveyId: string) => {
        if (pkg.type === 'multiple') {
            if (!boxChecked.includes(pkg.option + surveyId)) {
                setBoxChecked((state) => [...state, pkg.option + surveyId])
                setSelectedOption((state) => [...state, pkg])
            } else {
                setBoxChecked((state) => state.filter((s) => s !== pkg.option + surveyId))
                setSelectedOption((state) => state.filter((s) => s.option !== pkg.option))
            }
        } else if (pkg.type === 'single') {
            if (!boxChecked.includes(pkg.option + surveyId)) {
                setBoxChecked((state) => state.filter((s) => !s.includes(surveyId)))
                setBoxChecked((state) => [...state, pkg.option + surveyId])
                setSelectedOption([pkg])
            } else {
                setBoxChecked((state) => state.filter((s) => !s.includes(surveyId)))
                setSelectedOption([])
            }
        } else return
    }

    /**
     * 將單題結果放進待提交陣列，並儲存進資料庫
     * @param surveyId
     * @param category
     */
    const handleAddResult = (surveyId: string, category: string, type: string, isFinished: boolean) => {
        let sendingSurvey: { surveyId: string; category: string; selected: any[] | string }
        const postingResult = { userId: _id, userCode: code, eventId }

        if (type === 'single' || type === 'multiple') {
            sendingSurvey = { surveyId, category, selected: selectedOption }
            setSelectedOption([])
        } else {
            sendingSurvey = { surveyId, category, selected: textAnswer }
            setTextAnswer('')
        }

        const sending = { sendingSurvey, ...postingResult }
        if (sending.sendingSurvey.selected.length > 0 || isFinished)
            // onPostUserEventSurveyResult({ sendingData: [sending], isFinished, identifier: 'post', scoreDetail })

        if (resultRef.current.length > 0) {
            const filteredResults = resultRef.current.filter((r) => r.sendingSurvey.surveyId !== surveyId)

            if (filteredResults.length > 0) resultRef.current = [...filteredResults, sending]
            else resultRef.current = [sending]
        } else resultRef.current = [sending]
    }

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
        nextType?: string
    ) => {
        if (identifier === '_submit') {
            handleAddResult(surveyId, category, type, true)

            setShowUnlockResult(true)

            // 3 秒後關閉動畫
            window.setTimeout(() => {
                setShowUnlockResult(false)
            }, 3000)
        } else {
            handleAddResult(surveyId, category, type, false)

            if (resultRef.current.length > 0) {
                const selected = resultRef.current.filter((s) => s.sendingSurvey.surveyId === nextSurveyId)
                // 選擇題
                if (nextType === 'single' || nextType === 'multiple') {
                    if (selected.length > 0) {
                        setSelectedOption(selected[0].sendingSurvey.selected as any[])

                        for (const op of selected[0].sendingSurvey.selected) {
                            if (nextSurveyId && typeof op === 'object') {
                                setBoxChecked((state) => [...state, op.option + nextSurveyId])
                            }
                        }
                    } else setSelectedOption([])
                    // 簡答題
                } else {
                    if (selected.length > 0) {
                        setTextAnswer(selected[0].sendingSurvey.selected as string)
                    } else setTextAnswer('')
                }
            } else setSelectedOption([])

            setRestPostSurveyPage((state: number) => state + 1)
        }
    }

    /**
     * 回復至上一題
     * @param prevSurveyId
     * @param type
     * @param surveyId
     * @param prevType
     */
    const handlePrev = (prevSurveyId: string, prevType: string, surveyId: string, type: string, category: string) => {
        // 找到前一題
        const [prevSelected] = resultRef.current.filter((s) => s.sendingSurvey.surveyId === prevSurveyId)
        // 刪除本題本來結果
        resultRef.current = resultRef.current.filter((r) => r.sendingSurvey.surveyId !== surveyId)
        // 加入本題更新後結果
        if (selectedOption.length > 0 || textAnswer.length > 0) handleAddResult(surveyId, category, type, false)
        // 刪除本題選中選項
        if (type === 'single' || type === 'multiple')
            setBoxChecked((state) => state.filter((s) => !s.includes(surveyId)))
        else setTextAnswer('')

        // 放入前一題選中選項
        if (prevType === 'single' || prevType === 'multiple')
            setSelectedOption(prevSelected.sendingSurvey.selected as any[])
        else setTextAnswer(prevSelected.sendingSurvey.selected as string)

        setRestPostSurveyPage((state: number) => state - 1)
    }

    return (
        <div className="after-event-survey-wrap scroll-Control">
            <Button onClick={() => { document.body.clientWidth > 700 ? navigate('/mergeImg') : navigate('/phoneMergeImg') }}>合成图片</Button>
            {postSurveyShow && postSurveys && postSurveys.length > 0 ? (
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
                                        {intl.formatMessage({ id: 'main.UnlockMessage' })}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            {restPostSurveyPage === 0 ? (
                                <div className="after-event-startBox">
                                    <div className="after-event-title">
                                        {intl.formatMessage({ id: 'main.PostSurveyStartMessage' })}
                                    </div>
                                    <Button className="after-event-survey-prev-btn" onClick={handleSurveyStart}>
                                        {intl.formatMessage({ id: 'main.PostSurveyStart' })}
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <div className="after-event-Question">
                                        {(postSurveys as Survey[])[restPostSurveyPage - 1].subject}
                                    </div>
                                    <div className="after-event-survey-body">
                                        {(postSurveys as Survey[])[restPostSurveyPage - 1].type === 'single' ||
                                            (postSurveys as Survey[])[restPostSurveyPage - 1].type === 'multiple' ? (
                                            <div className="after-event-survey-options">
                                                {(postSurveys as Survey[])[restPostSurveyPage - 1]?.options.map(
                                                    (option) => (
                                                        <div key={option.option} className="after-event-survey-option">
                                                            <input
                                                                id={option.option}
                                                                type="checkbox"
                                                                className="after-event-survey-checkbox"
                                                                checked={boxChecked.includes(
                                                                    option.option +
                                                                    (postSurveys as Survey[])[
                                                                        restPostSurveyPage - 1
                                                                    ].surveyId
                                                                )}
                                                                onChange={() =>
                                                                    handleOptionClick(
                                                                        {
                                                                            option: option.option,
                                                                            type: (postSurveys as Survey[])[
                                                                                restPostSurveyPage - 1
                                                                            ].type,
                                                                        },
                                                                        (postSurveys as Survey[])[
                                                                            restPostSurveyPage - 1
                                                                        ].surveyId
                                                                    )
                                                                }
                                                            />
                                                            <label
                                                                htmlFor={option.option}
                                                                className="after-event-survey-label"
                                                                onChange={() =>
                                                                    handleOptionClick(
                                                                        {
                                                                            option: option.option,
                                                                            type: (postSurveys as Survey[])[
                                                                                restPostSurveyPage - 1
                                                                            ].type,
                                                                        },
                                                                        (postSurveys as Survey[])[
                                                                            restPostSurveyPage - 1
                                                                        ].surveyId
                                                                    )
                                                                }
                                                                role="presentation"
                                                            >
                                                                {option.option}
                                                            </label>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        ) : (
                                            <div className="after-event-survey-textarea-box">
                                                <TextArea
                                                    className="after-event-survey-textarea"
                                                    value={textAnswer}
                                                    onChange={(e) => setTextAnswer(e.target.value)}
                                                    placeholder={intl.formatMessage({
                                                        id: 'main.PostSurveyTextPlaceholder',
                                                    })}
                                                />
                                            </div>
                                        )}

                                        <div className="after-event-survey-btn-group">
                                            {restPostSurveyPage - 1 < (postSurveys as Survey[]).length - 1 && (
                                                <Button
                                                    disabled={nextDisabled}
                                                    className="after-event-survey-next-btn"
                                                    type="primary"
                                                    onClick={() =>
                                                        handleNext(
                                                            (postSurveys as Survey[])[restPostSurveyPage - 1].surveyId,
                                                            (postSurveys as Survey[])[restPostSurveyPage - 1].category,
                                                            (postSurveys as Survey[])[restPostSurveyPage - 1].type,
                                                            '_next',
                                                            (postSurveys as Survey[])[restPostSurveyPage].surveyId,
                                                            (postSurveys as Survey[])[restPostSurveyPage].type
                                                        )
                                                    }
                                                >
                                                    {intl.formatMessage({ id: 'main.Next' })}
                                                </Button>
                                            )}
                                            {restPostSurveyPage - 1 === (postSurveys as Survey[]).length - 1 && (
                                                <Button
                                                    disabled={nextDisabled}
                                                    type="primary"
                                                    className="after-event-survey-submit-btn"
                                                    onClick={() =>
                                                        handleNext(
                                                            (postSurveys as Survey[])[restPostSurveyPage - 1].surveyId,
                                                            (postSurveys as Survey[])[restPostSurveyPage - 1].category,
                                                            (postSurveys as Survey[])[restPostSurveyPage - 1].type,
                                                            '_submit'
                                                        )
                                                    }
                                                >
                                                    {intl.formatMessage({ id: 'main.Finish' })}
                                                </Button>
                                            )}
                                            {restPostSurveyPage - 1 > 0 && (
                                                <Button
                                                    className="after-event-survey-prev-btn"
                                                    onClick={() =>
                                                        handlePrev(
                                                            (postSurveys as Survey[])[restPostSurveyPage - 2].surveyId,
                                                            (postSurveys as Survey[])[restPostSurveyPage - 2].type,
                                                            (postSurveys as Survey[])[restPostSurveyPage - 1].surveyId,
                                                            (postSurveys as Survey[])[restPostSurveyPage - 1].type,
                                                            (postSurveys as Survey[])[restPostSurveyPage - 1].category
                                                        )
                                                    }
                                                >
                                                    {intl.formatMessage({ id: 'main.PostSurveyPrevious' })}
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
                    {intl.formatMessage({ id: 'main.PostSurveyBefore' })}
                </div>
            )}
        </div>
    )
}

export default AfterEventSurvey
