import React, {
    useEffect,
    useRef,
    FC,
   
    useContext,
    MouseEvent,
} from 'react';

// import { useTypedSelector, useActions } from '../../../hooks'
import { RepliedDetail } from '../interactiveSec/InteractiveSec';
import MessageList from './chat/MessageList';
import MessageInput from '../../../components/ui/MessageInput';
import { MessageAndQuestionProps } from '../interactiveSec/InteractiveSec';
import { localeContext, LocaleProps } from '../../../index';

type ChatroomProps = {
    handleReplyMessageClick: (pkg: RepliedDetail) => void;
    showReply: boolean;
    replied: RepliedDetail;
    handleRepliedDetailClose: () => void;
    handleSendSticker(e: MouseEvent): void;
    handleSendEmoji: (e: MouseEvent) => void;
};

const Chatroom: FC<MessageAndQuestionProps & ChatroomProps> = ({
    messageInputRef,
    handleInputKeyDown,
    handleSubmitMessage,
    setIsInputtingMandarin,
    setInputContent,
    inputContent,
    type,
    handleReplyMessageClick,
    handleRepliedDetailClose,
    showReply,
    replied,
    handleSendSticker,
    handleSendEmoji,
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const {
        user: {
            user: { _id, eventId },
        },
        chat: { messages, comingData },
    }: any = { user: { user: {} }, chat: { messages: [] } };

    const { locale } = useContext(localeContext) as LocaleProps;

    /**
     * 取得歷史訊息清單
     */
    useEffect(() => {
        // onGetHistoryMessages({ _id, room: eventId })
    }, [eventId, locale]);

    /**
     * 監聽訊息發出時回到視窗底部
     */
    useEffect(() => {
        if (scrollRef && scrollRef.current) {
            scrollRef.current.scrollIntoView({ block: 'end' });
        }
    }, [messages.length]);

    return (
        <div className="chat-wrap">
            <MessageList handleReplyMessageClick={handleReplyMessageClick} />

            <MessageInput
                section={'chatroom'}
                messageInputRef={messageInputRef}
                handleInputKeyDown={handleInputKeyDown}
                setIsInputtingMandarin={setIsInputtingMandarin}
                handleSubmitMessage={handleSubmitMessage}
                setInputContent={setInputContent}
                inputContent={inputContent}
                type={type}
                showReply={showReply}
                replied={replied}
                handleRepliedDetailClose={handleRepliedDetailClose}
                handleSendSticker={handleSendSticker}
                handleSendEmoji={handleSendEmoji}
            />
        </div>
    );
};

export default Chatroom;
