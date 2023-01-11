import React, {
    FC,
    FormEvent,
    ChangeEvent,
    Dispatch,
    SetStateAction,
} from 'react';
import { Routes, Route } from 'react-router-dom';
import Lottie from 'react-lottie';
import { useIntl } from 'react-intl';

import LoginForm from './LoginForm';
import Google from './Google';
import '../../../styles/homeTransition.scss';

import Countdown from '../Countdown';
import { icons } from '../../../lib/icons';
import { LottieJSON } from '../../../utils/links';

export type LoginFormProps = {
    handleSubmit(e: FormEvent<HTMLFormElement>): void;
    eventOpen: boolean;
    code: string;
    HandleInputChange(e: ChangeEvent<HTMLInputElement>): void;
    eventSlug: string;
};

const Home: FC<LoginFormProps> = ({
    handleSubmit,
    eventOpen,
    code,
    HandleInputChange,
    eventSlug,
}) => {
    const intl = useIntl();

    return (
        <div className="landing-page-home-background" id="home">
            <div className="landing-page-home-kv-lottie">
                <Lottie
                    isClickToPauseDisabled={true}
                    options={{
                        loop: true,
                        autoplay: true,
                        animationData: LottieJSON.KV_PC,
                        rendererSettings: {
                            preserveAspectRatio: 'xMidYMid slice',
                        },
                    }}
                ></Lottie>
            </div>

            <div className="landing-page-home-wrap">
                <div className="landing-page-home-content">
                    <div className="landing-page-home-title">
                        <div className="landing-page-home-title-box">
                            <div className="landing-page-home-title-box-title">
                                {intl.formatMessage({
                                    id: 'landingPage.event_title',
                                })}
                            </div>
                            <div className="landing-page-home-title-box-title">
                                {intl.formatMessage({
                                    id: 'landingPage.event_title2',
                                })}
                            </div>
                            <Google eventSlug={eventSlug} />
                        </div>
                    </div>
                    <a
                        className="landing-page-home-calendarBtn-mo"
                        target="_blank"
                        href="https://googleads.link/2212cxoc"
                        rel="noreferrer"
                    >
                        <div className="calendarIconBox">{icons.bell()}</div>
                        {intl.formatMessage({
                            id: 'landingPage.calendar_btn_google',
                        })}
                    </a>
                    <div className="landing-page-home-kv-lottie-mo">
                        <Lottie
                            isClickToPauseDisabled={true}
                            options={{
                                loop: true,
                                autoplay: true,
                                animationData: LottieJSON.KV_MO,
                                rendererSettings: {
                                    preserveAspectRatio: 'xMidYMid slice',
                                },
                            }}
                        ></Lottie>
                    </div>
                    <label className="landing-page-home-add-to-calendar-dropdown">
                        <div className="dd-button">
                            <div className="calendarIconBox">
                                {icons.bell()}
                            </div>
                            {intl.formatMessage({
                                id: 'landingPage.calendar_btn',
                            })}
                        </div>

                        <input type="checkbox" className="dd-input" id="test" />

                        <ul className="dd-menu">
                            <li>
                                <a
                                    target="_blank"
                                    href="https://googleads.link/2212cxoc"
                                    rel="noreferrer"
                                >
                                    {intl.formatMessage({
                                        id: 'landingPage.calendar_btn_google',
                                    })}
                                </a>
                            </li>
                            <li>
                                <a
                                    target="_blank"
                                    href="https://googleads.link/2212cxoci"
                                    rel="noreferrer"
                                >
                                    {intl.formatMessage({
                                        id: 'landingPage.calendar_btn_ics',
                                    })}
                                </a>
                            </li>
                        </ul>
                    </label>

                    <Countdown classes={'landing-page-count-down'} />

                    <LoginForm
                        handleSubmit={handleSubmit}
                        eventOpen={eventOpen}
                        code={code}
                        HandleInputChange={HandleInputChange}
                        eventSlug={eventSlug}
                    />
                </div>
                <div className="landing-page-home-content-right"></div>
            </div>
        </div>
    );
};

export default Home;
