import React, { FC } from 'react';
import { useIntl } from 'react-intl';
import AnchorLink from 'react-anchor-link-smooth-scroll';

import { icons } from '../../lib/icons';

type SideBarProps = {
    eventSlug: string;
    handleBackdropShow?: () => void;
    handleBackdropRemove?: () => void;
    showMenu: boolean;
};

const SideBar: FC<SideBarProps> = ({
    showMenu,
    handleBackdropRemove,
    handleBackdropShow,
}) => {
    const intl = useIntl();

    return (
        <nav className="sidebar-nav">
            <label className="label_ham_svgBox PC_non MO_show" htmlFor="switch">
                <button className="ham_svgBox" onClick={handleBackdropShow}>
                    {icons.menu_icon()}
                </button>
            </label>
            <input
                className="displayNon menu-input"
                checked={showMenu}
                onChange={handleBackdropShow}
                id="switch"
                type="checkbox"
            />
            {/* 頁面滑動 */}
            <div className="sidebar-menu">
                <AnchorLink href="#home" className="link-a">
                    <div
                        className="sidebar-menu-item"
                        role="button"
                        onKeyDown={handleBackdropRemove}
                        onClick={handleBackdropRemove}
                        tabIndex={0}
                    >
                        {icons.home_icon()}
                        <p className="sidebar-menu-item-text">
                            {intl.formatMessage({ id: 'landingPage.nav_home' })}
                        </p>
                    </div>
                </AnchorLink>
                <AnchorLink href="#agenda" className="link-a">
                    <div
                        className="sidebar-menu-item"
                        role="button"
                        onKeyDown={handleBackdropRemove}
                        onClick={handleBackdropRemove}
                        tabIndex={0}
                    >
                        {icons.agenda_icon()}
                        <p className="sidebar-menu-item-text">
                            {intl.formatMessage({
                                id: 'landingPage.nav_agenda',
                            })}
                        </p>
                    </div>
                </AnchorLink>

                <AnchorLink href="#faq" className="link-a">
                    <div
                        className="sidebar-menu-item"
                        role="button"
                        onKeyDown={handleBackdropRemove}
                        onClick={handleBackdropRemove}
                        tabIndex={0}
                    >
                        {icons.faq_icon()}
                        <p className="sidebar-menu-item-text">
                            {intl.formatMessage({ id: 'landingPage.nav_faq' })}
                        </p>
                    </div>
                </AnchorLink>
            </div>
        </nav>
    );
};

export default SideBar;
