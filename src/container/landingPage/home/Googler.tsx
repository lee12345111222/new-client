import React, { FC, memo, Dispatch, SetStateAction, FormEvent } from 'react'
import { useIntl } from 'react-intl'
import '@culturehq/add-to-calendar/dist/styles.css'

type GooglerProps = {
    handleGooglerSubmit(e: FormEvent<HTMLFormElement>): void
    setGooglerName: Dispatch<SetStateAction<string>>
    googlerName: string
}

const Googler: FC<GooglerProps> = ({ setGooglerName, googlerName, handleGooglerSubmit }) => {
    const intl = useIntl()

    return (
        <div className="landing-page-login-content">
            <div className="landing-page-login-content-box">
                <form onSubmit={handleGooglerSubmit} className="login-form login-form-googler">
                    <input
                        type="text"
                        value={googlerName}
                        className="login-input"
                        onChange={(e) => setGooglerName(e.target.value)}
                        placeholder={intl.formatMessage({ id: 'landingPage.walkinName' })}
                    />
                    <button className="login-btn" disabled={googlerName === ''}>
                        {intl.formatMessage({ id: 'landingPage.button_text_open' })}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default memo(Googler)
