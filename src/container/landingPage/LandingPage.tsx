import React, {
    FC,
    useState,
    useEffect,
    useCallback,
    ReactNode,
    ChangeEvent,
    FormEvent,
    memo,
} from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import xss from 'xss';

import Backdrop from '../../components/ui/Backdrop';
import CustomModal from '../../components/ui/CustomModal';
import Agenda from './agenda/Agenda';
import FAQ from './faq/FAQ';
import Home from './home/Home';
import HeaderNav from './HeaderNav';
import '../../styles/landingPage.scss';

import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin, getLanding, Obj } from '../../store/globalSlice';
import { joinInitRoom } from '../../lib/services';

const LandingPage: FC = memo(() => {
    const [eventOpen, setEventOpen] = useState(true);
    const [code, setCode] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState<ReactNode | null>(null);
    const [eventSlug, setEventSlug] = useState(
        process.env.REACT_APP_DEFAULT_EVENT_ID as string,
    );
    const [showBackdrop, setShowBackdrop] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const { global }: any = useSelector(state => state);
    const { setting = {}, userError } = global;

    const { main = {}, navigator = [], schedules = [] } = setting;
    const navigatorObj: Obj = {};
    navigator.forEach((ele: Obj) => {
        navigatorObj[ele.name] = 1;
    });
    const { openTime } = main;

    const dispatch = useDispatch();

    const intl = useIntl();

    const location = useLocation();
    const navigate = useNavigate();
    const search = location.search.replace('?', '');
    const token = sessionStorage.getItem('Authorization');

    useEffect(() => {
        if (token) {
            navigate('/main');
        }
    }, [navigate, token]);

    /**
     * 獲取資料庫該服務 event id 資料
     */
    useEffect(() => {
        dispatch(getLanding(search));
        sessionStorage.setItem('session', search);
    }, [dispatch, search]);

    /**
     * 初始化定時任務，設定倒數至活動開始開啟輸入框
     */
    useEffect(() => {
        const now = new Date().getTime();
        if (new Date(openTime).getTime() <= now) {
            setEventOpen(true);
        }
    }, [openTime]);

    /**
     * 判斷是否存在錯誤訊息
     */
    useEffect(() => {
        if (userError) return handleMessageModal();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userError]);

    /**
     * 若存在錯誤訊息，顯示提示框。若訊息為重複登入初始化用戶登入資訊。
     * 若是由後台刪除資料庫用戶名單，不顯示提示框只初始化用戶登入資訊。
     */
    const handleMessageModal = () => {
        let errorMessage = '';
        errorMessage = intl.formatMessage({
            id: 'landingPage.USER_CODE_ERROR',
        });
        setModalContent(<div id="login-msg-modal-content">{errorMessage}</div>);
        setShowModal(true);
    };

    /**
     * 提交登入碼登入會場
     * @param e form event
     */
    const handleSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const loginCode = code.toLocaleLowerCase().trim();

            // const ex = '\\W'

            // if (loginCode.match(ex)) {
            //     setModalContent(<div id="login-msg-modal-content">参会码须为英数字</div>)
            //     setShowModal(true)

            //     return
            // }

            if (!loginCode) {
                setModalContent(
                    <div id="login-msg-modal-content">
                        {intl.formatMessage({
                            id: 'landingPage.USER_CODE_EMPTY',
                        })}
                    </div>,
                );
                setShowModal(true);
                return;
            }
            sessionStorage.setItem('code', code);
            dispatch(
                fetchLogin(search, code, () => {
                    navigate('/main');
                }),
            );
            setCode('');
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [code, search],
    );

    /**
     * 登入框取值
     * @param e change event
     */
    const HandleInputChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target;
            setCode(value);
        },
        [],
    );

    /**
     * 關閉常見問題彈窗
     */
    const handleCloseModal = useCallback(() => {
        setShowModal(false);
    }, []);

    /**
     * toggle 行動裝置 backdrop
     */
    const handleBackdropShow = useCallback(() => {
        setShowBackdrop(state => !state);
        setShowMenu(state => !state);
    }, []);

    /**
     * 關閉行動裝置 backdrop
     */
    const handleBackdropRemove = useCallback(() => {
        setShowBackdrop(false);
        setShowMenu(false);
    }, []);

    return (
        <main className="landing-page-wrap">
            <section className="landing-page-layout" id="landing-page-layout">
                <section className="landing-page-layout-main">
                    <HeaderNav
                        handleBackdropShow={handleBackdropShow}
                        handleBackdropRemove={handleBackdropRemove}
                        eventSlug={eventSlug}
                        showMenu={showMenu}
                        menuObj={navigatorObj}
                    />
                    <div
                        className="landing-page-layout-content"
                        id="landing-page-layout-content"
                    >
                        <CustomModal
                            handleCloseModal={handleCloseModal}
                            showModal={showModal}
                        >
                            {modalContent}
                        </CustomModal>
                        <Backdrop showBackdrop={showBackdrop} />
                        {navigatorObj.home ? (
                            <Home
                                handleSubmit={handleSubmit}
                                eventOpen={eventOpen}
                                main={main}
                                code={code}
                                HandleInputChange={HandleInputChange}
                                eventSlug={eventSlug}
                            />
                        ) : null}

                        {navigatorObj.schedules ? (
                            <Agenda schedules={schedules} />
                        ) : (
                            ''
                        )}
                        {navigatorObj.faqs ? <FAQ /> : null}
                    </div>
                </section>
            </section>
        </main>
    );
});

export default LandingPage;
