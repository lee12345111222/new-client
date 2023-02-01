import React, { FC, useState, useEffect, MutableRefObject } from 'react';
import { Collapse, Button, Progress } from 'antd';
import { useIntl } from 'react-intl';

// import { SelectedOption, MiddleSurveys } from '../../../state'
// import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { Links } from '../../../utils/links';
import { Obj } from '../../../store/globalSlice';
import { updateState } from '../../../store/mainSlice';
import { useDispatch } from 'react-redux';

const { Panel } = Collapse;

type SurveySecProps = {
    middleSurveys: Obj[];
    handleSubmitSurveyAnswer(): void;
    thanksShow: '_post' | '_middle' | null;
};

const SurveySec: FC<SurveySecProps> = ({
    middleSurveys = [],
    thanksShow,
    handleSubmitSurveyAnswer,
}) => {
    const [selectedOption, setSelectedOption] = useState<any[]>([]);
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [boxChecked, setBoxChecked] = useState<string[]>([]);

    const {
        result: { result = [], total, correct },
    }: any = { result: {} };
    const currentSurveyRef: any = {};

    const dispatch = useDispatch();

    /**
     * 處理點擊選項，將選中項目加入待提交陣列
     *
     */
    const handleOptionClick = (idx: string, type: string) => {
        console.log(idx, type);
        const newObj: Obj[] = JSON.parse(JSON.stringify(middleSurveys));
        let { choiceIndexes = [], answer } = newObj[0];
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
        }
        newObj[0] = {
            ...newObj[0],
            choiceIndexes,
            answer,
        };
        console.log(newObj, 'newObj');
        dispatch(updateState({ key: 'middleSurveys', value: newObj }));
    };

    if (result && result.length) {
        return (
            <Collapse defaultActiveKey={['1']} className="survey-collapse">
                <Panel className="survey-panel" header="Live Poll" key="1">
                    <h3 className="survey-question">
                        {(currentSurveyRef.current as any).subject}
                    </h3>

                    <div className="survey-process">
                        {result.map((rlt: any) => {
                            return (
                                <div
                                    key={rlt.option}
                                    className="survey-process-container"
                                >
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
                                                {total === 0
                                                    ? (
                                                          100 / result.length
                                                      ).toFixed(2)
                                                    : rlt.percent}
                                                %
                                            </span>
                                        </div>
                                    </div>
                                    <Progress
                                        strokeColor={
                                            correct.includes(rlt.option)
                                                ? '#669DF6'
                                                : '#DADCE0'
                                        }
                                        percent={
                                            total === 0
                                                ? 100 / result.length
                                                : rlt.percent
                                        }
                                        showInfo={false}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <div className="survey-result-unlock">
                        <div className="survey-result-unlock-body">
                            <div className="survey-result-unlock-img">
                                <img src={Links.UNLOCK_ICON} alt="lock" />
                            </div>
                            <div className="survey-result-unlock-content">
                                <img src={Links.UNLOCK_LOCK} alt="lock" />
                                参与活动内所有问答，并完成提交，即可解锁观看回放及活动精彩内容。
                            </div>
                        </div>
                    </div>
                </Panel>
            </Collapse>
        );
    }

    return (
        <Collapse defaultActiveKey={['1']} className="survey-collapse">
            <Panel className="survey-panel" header="有奖问答" key="1">
                <h3>
                    {currentSurveyRef.current &&
                        currentSurveyRef.current.subject}
                </h3>

                {thanksShow ? (
                    <div className="survey-done-content">
                        <div className="survey-doneImg-box">
                            <img
                                className="survey-doneImg"
                                src={Links.DONE}
                                alt=""
                            />
                        </div>
                        {thanksShow === '_post'
                            ? '作答完成'
                            : '等待其他用户作答 ...'}
                    </div>
                ) : (
                    <>
                        <div className="survey-options">
                            {middleSurveys[0].choices.map(
                                (option: any, idx: string) => {
                                    const { choiceIndexes = [], type } =
                                        middleSurveys[0];
                                    return (
                                        <div key={idx}>
                                            <input
                                                id={option}
                                                type="checkbox"
                                                className="survey-options-checkbox"
                                                checked={choiceIndexes.includes(
                                                    idx,
                                                )}
                                                onChange={() =>
                                                    handleOptionClick(idx, type)
                                                }
                                            />
                                            <label
                                                htmlFor={option}
                                                className="survey-options-label"
                                                onChange={() =>
                                                    handleOptionClick(idx, type)
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

                        <Button
                            className="survey-btn"
                            disabled={!middleSurveys[0].choiceIndexes?.length}
                            onClick={() => handleSubmitSurveyAnswer()}
                        >
                            提交
                        </Button>
                    </>
                )}
            </Panel>
        </Collapse>
    );
};

export default SurveySec;
