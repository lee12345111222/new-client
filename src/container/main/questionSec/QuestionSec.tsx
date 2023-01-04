import React, { FC, useEffect, useRef, UIEvent, useContext } from 'react'

import { MessageAndQuestionProps } from '../interactiveSec/InteractiveSec'
import MessageInput from '../../../components/ui/MessageInput'
import QuestionList from './question/QuestionList'
// import { useTypedSelector, useActions } from '../../../hooks'
import { localeContext, LocaleProps } from '../../../index'
import { RepliedDetail } from '../interactiveSec/InteractiveSec'

type QuestionSecProps = {
    showReply: boolean
    replied: RepliedDetail
    handleRepliedDetailClose: () => void
    handleResponseSubmit: any
}

const QuestionSec: FC<MessageAndQuestionProps & QuestionSecProps> = ({
    messageInputRef,
    handleInputKeyDown,
    handleSubmitMessage,
    setIsInputtingMandarin,
    setInputContent,
    inputContent,
    type,
    handleRepliedDetailClose,
    showReply,
    replied,
    handleResponseSubmit,
}) => {
    const scrollRef = useRef<HTMLDivElement>(null)

    const {
        user: {
            user: { _id, eventId },
        },
        question: { questions, comingData },
    }:any = {}

    // const { onGetRestHistoryQuestions, onGetHistoryQuestions } = useActions()

    const { locale } = useContext(localeContext) as LocaleProps

    useEffect(() => {
        // 取得歷史問題清單
        // onGetHistoryQuestions({ _id, room: eventId })
    }, [eventId, locale])

    /**
     * 監聽問題發出時回到視窗底部
     */
    useEffect(() => {
        if (scrollRef && scrollRef.current) {
            scrollRef.current.scrollIntoView({ block: 'end' })
        }
    }, [questions.length])

    /**
     * @param e
     * 處理問題表單 scroll lazy loading
     */
    async function handleScroll(e: UIEvent<HTMLDivElement>) {
        const $scroll = e.target as HTMLDivElement

        if ($scroll.scrollTop === 0 && $scroll.scrollHeight > $scroll.clientHeight && comingData) {
            // onGetRestHistoryQuestions({ _id, localQuestionCount: questions.length, room: eventId })
        }
    }

    return (
        <div className="questionSec-wrap">
            <QuestionList
                scrollRef={scrollRef}
                handleScroll={handleScroll}
                handleResponseSubmit={handleResponseSubmit}
            />
            <MessageInput
                section={'question'}
                handleSubmitMessage={handleSubmitMessage}
                messageInputRef={messageInputRef}
                handleInputKeyDown={handleInputKeyDown}
                setIsInputtingMandarin={setIsInputtingMandarin}
                setInputContent={setInputContent}
                inputContent={inputContent}
                type={type}
                showReply={showReply}
                replied={replied}
                handleRepliedDetailClose={handleRepliedDetailClose}
            />
        </div>
    )
}

export default QuestionSec
