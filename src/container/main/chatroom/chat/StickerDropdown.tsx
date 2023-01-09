import React, { FC, MouseEvent } from 'react'
import { Dropdown, Button } from 'antd'
import { icons } from '../../../../lib/icons'
import gifStickers from '../../../../utils/stickers'
import emojis from '../../../../utils/emoji'
import '../../../../styles/sticker-dropdown.scss'

type StickerDropdownProps = {
    handleSendSticker: (e: MouseEvent) => void
    handleSendEmoji: (e: MouseEvent) => void
}

const StickerDropdown: FC<StickerDropdownProps> = ({ handleSendSticker, handleSendEmoji }) => {
    const overlay = (
        <div className="sticker-dropdown-box">
            <div className="sticker-dropdown-emojiBox" role="presentation" onClick={handleSendEmoji}>
                {emojis.emoji.map((emj) => {
                    return (
                        <span className="emoji-item" key={emj} data-name={emj}>
                            {emj}
                        </span>
                    )
                })}
            </div>
            <div className="sticker-dropdown-bigStickerBox" role="presentation" onClick={handleSendSticker}>
                {gifStickers.stickers.map((stk) => {
                    return (
                        <div className="bigSticker-itemBox" key={stk}>
                            <img className="bigSticker-itemSvg" src={stk} alt="sticker" />
                        </div>
                    )
                })}
            </div>
        </div>
    )

    return (
        <Dropdown overlay={overlay} placement="topRight">
            <Button className="send-message-button">{icons.stickerFace()}</Button>
        </Dropdown>
    )
}

export default StickerDropdown
