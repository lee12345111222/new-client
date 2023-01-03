import React, { FC, useEffect, MouseEvent } from 'react'
import { useIntl } from 'react-intl'

import SendMessageButton from './SendMessageButton'
// import { MessageAndQuestionProps } from '../main/interactiveSec/InteractiveSec'
// import RepliedDetailSec from '../main/chatroom/chat/RepliedDetailSec'
// import { RepliedDetail } from '../main/interactiveSec/InteractiveSec'
// import StickerDropdown from '../main/chatroom/chat/StickerDropdown'

type MessageInputProps = {
    section: string
    showReply: boolean
    // replied: RepliedDetail
    handleRepliedDetailClose: () => void
    handleSendSticker?: (e: MouseEvent) => void
    handleSendEmoji?: (e: MouseEvent) => void
}
// FC<MessageAndQuestionProps & MessageInputProps> 
const MessageInput: any = ({
    messageInputRef,
    handleInputKeyDown,
    setIsInputtingMandarin,
    handleSubmitMessage,
    setInputContent,
    inputContent,
    type,
    showReply,
    replied,
    handleRepliedDetailClose,
    section,
    handleSendSticker,
    handleSendEmoji,
}:any) => {
    const intl = useIntl()

    /**
     * 頁面初始化時對焦聊天室輸入框
     */
    useEffect(() => {
        if (messageInputRef && messageInputRef.current) {
            messageInputRef.current.focus()
        }
    }, [])

    return (
        <div className="message-box-container">
            {/* {section === 'chatroom'
                ? showReply && (
                      <RepliedDetailSec replied={replied} handleRepliedDetailClose={handleRepliedDetailClose} />
                  )
                : null} */}

            <form autoComplete="off" onSubmit={(e) => e.preventDefault()} className="message-form">
                <textarea
                    placeholder={
                        section === 'chatroom' ? intl.formatMessage({ id: 'main.Type your reply' }) : '发起问题'
                    }
                    maxLength={500}
                    ref={messageInputRef}
                    onKeyPress={(e) => handleInputKeyDown(type, e)}
                    onCompositionStart={() => setIsInputtingMandarin(true)}
                    onCompositionEnd={() => setIsInputtingMandarin(false)}
                    className="message-textarea scroll-Control"
                    onChange={(e) => setInputContent(e.target.value)}
                    value={inputContent}
                />
            </form>

            {/* {section === 'chatroom' && handleSendSticker && handleSendEmoji ? (
                <StickerDropdown handleSendSticker={handleSendSticker} handleSendEmoji={handleSendEmoji} />
            ) : null} */}

            <SendMessageButton handleSubmitMessage={handleSubmitMessage} type={type} inputContent={inputContent} />
        </div>
    )
}

export default MessageInput
