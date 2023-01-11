import React, { FC, RefObject, UIEventHandler } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

// import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { handleTimestampToString } from '../../../../lib/fn';
import QuestionResponseInput from './QuestionResponseInput';
import { RepliedDetail } from '../../interactiveSec/InteractiveSec';

type QuestionListProps = {
    scrollRef: RefObject<HTMLDivElement>;
    handleScroll: UIEventHandler<HTMLDivElement>;
    handleResponseSubmit(
        type: string,
        response: string,
        repliedDetail: RepliedDetail,
    ): void;
};

const QuestionList: FC<QuestionListProps> = ({
    handleResponseSubmit,
    scrollRef,
    handleScroll,
}) => {
    const {
        question: { questions, loading },
    }: any = {};

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    return (
        <div onScroll={handleScroll} className="question-list scroll-Control">
            <div className={loading ? 'question-list-loading' : ''}>
                {loading && <Spin indicator={antIcon} />}
            </div>
            {questions.map((question: any, idx: number) => {
                return (
                    <div
                        key={question._id}
                        ref={scrollRef}
                        className="question-list-item"
                    >
                        <div className="question-list-item-user-main">
                            <div className="question-list-item-user-container">
                                <img
                                    src={question.from.avatar}
                                    alt="avatar img"
                                    className="question-list-item-user-avatar"
                                />
                            </div>
                            <div className="question-list-item-user-right">
                                <div className="question-list-item-user-detail">
                                    <div className="question-list-item-user-name">
                                        {question.from.name}
                                    </div>
                                    <div className="question-list-item-user-time">
                                        {handleTimestampToString(
                                            question.createTime,
                                        )}
                                    </div>
                                </div>
                                <div className="question-list-item-content">
                                    {question.content}
                                </div>
                            </div>
                        </div>
                        {question.response && question.response.length > 0 ? (
                            <div className="question-list-item-user-response">
                                {question.response.map((rsp: any) => {
                                    return (
                                        <div
                                            key={rsp._id}
                                            className="question-list-item-user-response-main"
                                        >
                                            <div className="question-list-item-user-response-container">
                                                <img
                                                    src={rsp.from.avatar}
                                                    alt="avatar img"
                                                    className="question-list-item-user-response-avatar"
                                                />
                                            </div>
                                            <div className="question-list-item-user-response-right">
                                                <div className="question-list-item-user-response-detail">
                                                    <div className="question-list-item-user-response-name">
                                                        {rsp.from.name}
                                                    </div>
                                                    <div className="question-list-item-user-response-time">
                                                        {handleTimestampToString(
                                                            rsp.createTime,
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="question-list-item-content">
                                                    {rsp.content}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : null}

                        <div>
                            <QuestionResponseInput
                                repliedDetail={{
                                    replied_id: question._id,
                                    repliedAvatar: question.from.avatar,
                                    repliedName: question.from.name,
                                    repliedContent: question.content,
                                    repliedIndex: idx,
                                }}
                                handleResponseSubmit={handleResponseSubmit}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default QuestionList;
