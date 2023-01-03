import React, { FC } from 'react'

import SideBar from './SideBar'
import { LandingPageImages } from '../../utils/links'

type HeaderNavProps = {
    handleBackdropShow?: () => void
    handleBackdropRemove?: () => void
    showMenu: boolean
    eventSlug: string
}

const HeaderNav: FC<HeaderNavProps> = ({ showMenu, handleBackdropShow, eventSlug, handleBackdropRemove }) => {
    return (
        <nav className="landing-page-layout-header">
            <div className="landing-page-header-logo">
                <img className="google-svg" src="https://oss.uppmkt.com/cxo/img/kv/google.svg" alt="Google" />
            </div>
            <div className="landing-page-header-lang-selector-container">
                <div>
                    <SideBar
                        showMenu={showMenu}
                        eventSlug={eventSlug}
                        handleBackdropRemove={handleBackdropRemove}
                        handleBackdropShow={handleBackdropShow}
                    />
                </div>
            </div>
        </nav>
    )
}

export default HeaderNav
