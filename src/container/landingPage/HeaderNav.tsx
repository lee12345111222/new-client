import React, { FC } from 'react';

import SideBar from './SideBar';
import { LandingPageImages } from '../../utils/links';
import { getOssUrl } from '../../lib/fn';
import { Obj } from '../../store/globalSlice';

type HeaderNavProps = {
    handleBackdropShow?: () => void;
    handleBackdropRemove?: () => void;
    showMenu: boolean;
    eventSlug: string;
    menuObj: Obj;
};

const HeaderNav: FC<HeaderNavProps> = ({
    showMenu,
    handleBackdropShow,
    eventSlug,
    menuObj,
    handleBackdropRemove,
}) => {
    return (
        <nav className="landing-page-layout-header">
            <div className="landing-page-header-logo">
                <img
                    className="google-svg"
                    src={getOssUrl('logo.png')}
                    alt="Google"
                />
            </div>
            <div className="landing-page-header-lang-selector-container">
                <div>
                    <SideBar
                        showMenu={showMenu}
                        eventSlug={eventSlug}
                        menuObj={menuObj}
                        handleBackdropRemove={handleBackdropRemove}
                        handleBackdropShow={handleBackdropShow}
                    />
                </div>
            </div>
        </nav>
    );
};

export default HeaderNav;
