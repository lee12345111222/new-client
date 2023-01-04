import React, { FC, useState, useEffect, MutableRefObject } from 'react'
import { Collapse, Button, Progress } from 'antd'
import { useIntl } from 'react-intl'

// import { SelectedOption, MiddleSurveys } from '../../../state'
// import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { Links } from '../../../utils/links'

const { Panel } = Collapse

type SurveySecProps = {
    currentSurveyRef: any
    handleSubmitSurveyAnswer(selectedOption: any[], surveyData: { surveyId: string; category: string }): void
    thanksShow: '_post' | '_middle' | null
}

const SurveySec: FC<SurveySecProps> = ({ currentSurveyRef, thanksShow, handleSubmitSurveyAnswer }) => {
    const [selectedOption, setSelectedOption] = useState<any[]>([])
    const [submitDisabled, setSubmitDisabled] = useState(true)
    const [boxChecked, setBoxChecked] = useState<string[]>([])

    const {
        result: { result, total, correct },
    }:any = {}

    const intl = useIntl()

    /**
     * 判斷選中選項是否大於 0，disable submit button
     */
    useEffect(() => {
        if (selectedOption.length > 0) setSubmitDisabled(false)
        else setSubmitDisabled(true)
    }, [selectedOption.length])

    /**
     * 處理點擊選項，將選中項目加入待提交陣列
     * @param pkg 選中目標資訊物件
     */
    const handleOptionClick = (pkg: any) => {
        if (pkg.type === 'multiple') {
            if (!boxChecked.includes(pkg.option)) {
                setBoxChecked((state) => [...state, pkg.option])
                setSelectedOption((state) => [...state, pkg])
            } else {
                setBoxChecked((state) => state.filter((s) => s !== pkg.option))
                setSelectedOption((state) => state.filter((s) => s.option !== pkg.option))
            }
        } else if (pkg.type === 'single') {
            if (!boxChecked.includes(pkg.option)) {
                setBoxChecked([pkg.option])
                setSelectedOption([pkg])
            } else {
                setBoxChecked([])
                setSelectedOption([])
            }
        } else return
    }

    if (result && result.length) {
        return (
            <Collapse defaultActiveKey={['1']} className="survey-collapse">
                <Panel className="survey-panel" header="Live Poll" key="1">
                    <h3 className="survey-question">{(currentSurveyRef.current as any).subject}</h3>

                    <div className="survey-process">
                        {result.map((rlt:any) => {
                            return (
                                <div key={rlt.option} className="survey-process-container">
                                    <div className="survey-process-text">
                                        <div
                                            className="survey-process-q-text"
                                            style={
                                                correct.includes(rlt.option)
                                                    ? { fontWeight: '600' }
                                                    : { fontWeight: '400' }
                                            }
                                        >
                                            {rlt.option}
                                        </div>
                                        <div className="survey-process-text-right">
                                            <span className="survey-process-text-percent">
                                                {total === 0 ? (100 / result.length).toFixed(2) : rlt.percent}%
                                            </span>
                                        </div>
                                    </div>
                                    <Progress
                                        strokeColor={correct.includes(rlt.option) ? '#669DF6' : '#DADCE0'}
                                        percent={total === 0 ? 100 / result.length : rlt.percent}
                                        showInfo={false}
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <div className="survey-result-unlock">
                        <div className="survey-result-unlock-body">
                            <div className="survey-result-unlock-img">
                                <img src={Links.UNLOCK_ICON} alt="lock" />
                            </div>
                            <div className="survey-result-unlock-content">
                                <img src={Links.UNLOCK_LOCK} alt="lock" />
                                {intl.formatMessage({ id: 'main.Unlock' })}
                            </div>
                        </div>
                    </div>
                </Panel>
            </Collapse>
        )
    }

    return (
        <Collapse defaultActiveKey={['1']} className="survey-collapse">
            <Panel className="survey-panel" header={intl.formatMessage({ id: 'main.Live Polling' })} key="1">
                <h3>{currentSurveyRef.current && currentSurveyRef.current.subject}</h3>

                {thanksShow ? (
                    <div className="survey-done-content">
                        <div className="survey-doneImg-box">
                            <img className="survey-doneImg" src={Links.DONE} alt="" />
                        </div>
                        {thanksShow === '_post'
                            ? intl.formatMessage({ id: 'main.Done!' })
                            : intl.formatMessage({ id: 'main.WaitOtherUser' })}
                    </div>
                ) : (
                    <>
                        <div className="survey-options">
                            {currentSurveyRef.current &&
                                currentSurveyRef.current.options.map((option:any) => (
                                    <div key={option.option}>
                                        <input
                                            id={option.option}
                                            type="checkbox"
                                            className="survey-options-checkbox"
                                            checked={boxChecked.includes(option.option)}
                                            onChange={() =>
                                                handleOptionClick({
                                                    option: option.option,
                                                    type: (currentSurveyRef.current as any).type,
                                                })
                                            }
                                        />
                                        <label
                                            htmlFor={option.option}
                                            className="survey-options-label"
                                            onChange={() =>
                                                handleOptionClick({
                                                    option: option.option,
                                                    type: (currentSurveyRef.current as any).type,
                                                })
                                            }
                                            role="presentation"
                                        >
                                            {option.option}
                                        </label>
                                    </div>
                                ))}
                        </div>

                        <Button
                            className="survey-btn"
                            disabled={submitDisabled}
                            onClick={() =>
                                handleSubmitSurveyAnswer(selectedOption, {
                                    surveyId: (currentSurveyRef.current as any).surveyId,
                                    category: (currentSurveyRef.current as any).category,
                                })
                            }
                        >
                            {intl.formatMessage({ id: 'main.Submit' })}
                        </Button>
                    </>
                )}
            </Panel>
        </Collapse>
    )
}

export default SurveySec
