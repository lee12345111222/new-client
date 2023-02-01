import React, {
    FC,
    SetStateAction,
    Dispatch,
    useContext,
    useEffect,
    useRef,
    ReactNode /* , MutableRefObject  */,
} from 'react';
import { /* Select,  */ Button } from 'antd';
import { /* useNavigate,  */ useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { userLocate } from '../../../lib/services';
import SocketHint from '../../../components/ui/SocketHint';

import { icons } from '../../../lib/icons';
import { LandingPageImages } from '../../../utils/links';
import FAQ from '../../landingPage/faq/FAQ';
import { Obj } from '../../../store/globalSlice';

type HeaderNavProps = {
    navigatorObj: Obj;
    socketOn: boolean;
    guest: Obj;
    avatarStyle: string;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    setModalContent: Dispatch<SetStateAction<ReactNode>>;
    handleClickScoreRules(): void;
    handleClickGroupChatDescription(): void;
};

const HeaderNav: FC<HeaderNavProps> = ({
    navigatorObj,
    socketOn,
    guest,
    avatarStyle,
    setShowModal,
    setModalContent,
    handleClickScoreRules,
    handleClickGroupChatDescription,
}) => {
    const intl = useIntl();

    const handleFaqShow = () => {
        setModalContent(<FAQ />);
        setShowModal(true);
    };
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');

    return (
        <nav className="main-layout-header">
            <SocketHint socketOn={socketOn} />
            <div className="main-header-logo">
                <img
                    className="google-svg"
                    src={LandingPageImages.EVENT_GOOGLE_TITLE}
                    alt="Google"
                />
            </div>
            <div className="main-header-right">
                {navigatorObj.avatar ? (
                    <div className="main-header-user-detail">
                        <div className="main-header-user-avatar">
                            <img
                                src={`https://oss.uppmkt.com/amplify/avatar/${avatarStyle}/${guest.avatar}.png`}
                                alt="user-avatar"
                            />
                        </div>
                        <div className="main-header-user-name">{user.name}</div>
                    </div>
                ) : null}

                {navigatorObj.faq ? (
                    <Button
                        className="main-header-faqBtn"
                        onClick={handleFaqShow}
                    >
                        {icons.faq_icon()}
                        {intl.formatMessage({ id: 'landingPage.nav_faq' })}
                    </Button>
                ) : null}
                {navigatorObj.rule ? (
                    <Button
                        className="main-header-faqBtn"
                        onClick={handleClickScoreRules}
                    >
                        {icons.rule_icon()}
                        {intl.formatMessage({
                            id: 'landingPage.nav_score_rules',
                        })}
                    </Button>
                ) : null}
                {navigatorObj.chat ? (
                    <Button
                        className="main-header-faqBtn"
                        onClick={handleClickGroupChatDescription}
                    >
                        {icons.chat_icon()}
                        {intl.formatMessage({
                            id: 'landingPage.nav_groupchat',
                        })}
                    </Button>
                ) : null}
            </div>
        </nav>
    );
};

export default HeaderNav;
