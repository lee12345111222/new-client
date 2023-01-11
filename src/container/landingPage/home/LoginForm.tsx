import React, { FC, memo } from 'react';
import { useIntl } from 'react-intl';

import '@culturehq/add-to-calendar/dist/styles.css';
import { Input } from 'antd';

import { LoginFormProps } from './Home';

const LoginForm: FC<LoginFormProps> = ({
    handleSubmit,
    eventOpen,
    code,
    HandleInputChange,
}) => {
    const intl = useIntl();

    return (
        <div className="landing-page-login-content">
            <div className="landing-page-login-content-box">
                <form onSubmit={handleSubmit} className="login-form">
                    <Input
                        disabled={!eventOpen}
                        type="text"
                        value={code}
                        className="login-input"
                        onChange={HandleInputChange}
                        placeholder={
                            eventOpen
                                ? intl.formatMessage({
                                      id: 'landingPage.input_placeholder_open',
                                  })
                                : intl.formatMessage({
                                      id: 'landingPage.input_placeholder_notOpen',
                                  })
                        }
                    />

                    <button className="login-btn" disabled={!eventOpen}>
                        {eventOpen
                            ? intl.formatMessage({
                                  id: 'landingPage.button_text_open',
                              })
                            : intl.formatMessage({
                                  id: 'landingPage.button_text_not_open',
                              })}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default memo(LoginForm);
