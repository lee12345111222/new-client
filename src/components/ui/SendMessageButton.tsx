import React, { FC } from 'react'

import { icons } from '../../lib/icons'

interface SendMessageButtonProps {
    handleSubmitMessage: (type: string) => void
    inputContent: string
    type: string
}

const SendMessageButton: FC<SendMessageButtonProps> = ({ handleSubmitMessage, inputContent, type }) => {
    return (
        <button
            onClick={() => handleSubmitMessage(type)}
            id="send-message-button"
            className="send-message-button"
            disabled={inputContent === ''}
        >
            {icons.paperPlane()}
        </button>
    )
}

export default SendMessageButton
