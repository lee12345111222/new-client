import React, { FC, SetStateAction, Dispatch } from 'react';

import { icons } from '../../lib/icons';
import { Links } from '../../utils/links';

type CustomAvatarButtonProps = {
    handleClickCustomAvatar(): void;
    setShowCustomAvtBtn: Dispatch<SetStateAction<boolean>>;
};

const CustomAvatarButton: FC<CustomAvatarButtonProps> = ({
    handleClickCustomAvatar,
    setShowCustomAvtBtn,
}) => {
    // const handleMouse = () => {
    //     const btn = document.getElementById('main-custom-avatar-btn')

    //     btn?.addEventListener('mousedown', () => console.log(123))
    //     btn?.addEventListener('mouseup', () => console.log(456))
    //     btn?.addEventListener('mousemove', () => console.log(789))
    // }
    return (
        <>
            <div
                role="presentation"
                className="main-custom-avatar-btn"
                id="main-custom-avatar-btn"
                onClick={handleClickCustomAvatar}
            >
                <button
                    className="main-custom-avatar-btn-close"
                    onClick={e => {
                        e.stopPropagation();
                        setShowCustomAvtBtn(false);
                    }}
                >
                    {icons.close()}
                </button>
                <img src={Links.AVATAR_BTN} alt="icon" />
            </div>
        </>
    );
};

export default CustomAvatarButton;
