import React, { FC, useState, MouseEvent, memo } from 'react'
import { Button } from 'antd'

// import { useTypedSelector, useActions } from '../../../hooks'
import { Links } from '../../../utils/links'

type customAvatarProps = {
    handleCloseModal(): void
}

const customAvatar: FC<customAvatarProps> = ({ handleCloseModal }) => {
    // const [avatarLink, setAvatarLink] = useState(Links.AVATAR_1)
    const avatarLink = Links.AVATAR_1
    const { _id }:any = {}
    // const { updateChatroomAvatar, onPostUserAvatar } = useActions()

    const handleSelectAvatar = (e: MouseEvent) => {
        const avatar = 'AVATAR_' + (e.currentTarget as HTMLButtonElement).dataset.avatar
        // setAvatarLink(Links[avatar])
    }

    const handleConfirmSelectAvatar = () => {
        // onPostUserAvatar({ _id, avatar: avatarLink })
        // updateChatroomAvatar({ _id, avatar: avatarLink })
        handleCloseModal()
    }

    return (
        <div className="custom-avatar-wrap">
            <div className="custom-avatar-body">
                <div className="custom-avatar-title">
                    <h3>欢迎来到 CxO Connect</h3>
                    <h3>立即选择您的专属头像</h3>
                </div>
                <div className="custom-avatar-key-avatar">
                    <img src={avatarLink} alt="avatar" />
                </div>
                <div className="custom-avatar-options">
                    <button onClick={(e) => handleSelectAvatar(e)} data-avatar="1">
                        <div className="custom-avatar-option">
                            <img src={Links.AVATAR_1} alt="avatar" />
                        </div>
                    </button>
                    <button onClick={(e) => handleSelectAvatar(e)} data-avatar="2">
                        <div className="custom-avatar-option">
                            <img src={Links.AVATAR_2} alt="avatar" />
                        </div>
                    </button>
                    <button onClick={(e) => handleSelectAvatar(e)} data-avatar="3">
                        <div className="custom-avatar-option">
                            <img src={Links.AVATAR_3} alt="avatar" />
                        </div>
                    </button>
                    <button onClick={(e) => handleSelectAvatar(e)} data-avatar="4">
                        <div className="custom-avatar-option">
                            <img src={Links.AVATAR_4} alt="avatar" />
                        </div>
                    </button>
                </div>
                <div className="custom-avatar-btn">
                    <Button onClick={handleConfirmSelectAvatar}>确认更换头像</Button>
                </div>
            </div>
        </div>
    )
}

export default memo(customAvatar)
