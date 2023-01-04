import React, { FC, memo, Dispatch, SetStateAction, FormEvent } from 'react'
import { useIntl } from 'react-intl'
import '@culturehq/add-to-calendar/dist/styles.css'

type WalkinProps = {
    handleWalkinSubmit(e: FormEvent<HTMLFormElement>): void
    setWalkinName: Dispatch<SetStateAction<string>>
    setWalkinCompany: Dispatch<SetStateAction<string>>
    setWalkinEmail: Dispatch<SetStateAction<string>>
    walkinName: string
    walkinCompany: string
    walkinEmail: string
}

const Walkin: FC<WalkinProps> = ({
    setWalkinName,
    setWalkinCompany,
    handleWalkinSubmit,
    walkinName,
    walkinCompany,
    walkinEmail,
    setWalkinEmail,
}) => {
    const intl = useIntl()

    return (
        <div className="landing-page-login-content">
            <div className="landing-page-login-content-box">
                <form onSubmit={handleWalkinSubmit} className="login-form login-form-walkin">
                    <input
                        type="text"
                        value={walkinName}
                        className="login-input"
                        onChange={(e) => setWalkinName(e.target.value)}
                        placeholder={intl.formatMessage({ id: 'landingPage.walkinName' })}
                    />
                    <input
                        type="text"
                        value={walkinCompany}
                        className="login-input"
                        onChange={(e) => setWalkinCompany(e.target.value)}
                        placeholder={intl.formatMessage({ id: 'landingPage.walkinCompany' })}
                    />
                    <input
                        type="email"
                        value={walkinEmail}
                        className="login-input"
                        onChange={(e) => setWalkinEmail(e.target.value)}
                        placeholder={intl.formatMessage({ id: 'landingPage.walkinEmail' })}
                    />
                    <button
                        className="login-btn"
                        disabled={walkinName === '' || walkinCompany === '' || walkinEmail === ''}
                    >
                        {intl.formatMessage({ id: 'landingPage.button_text_open' })}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default memo(Walkin)
