import React, { FC, memo, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { icons } from '../../../lib/icons'

type GoogleProps = {
    eventSlug: string
}

const Google: FC<GoogleProps> = () => {
    const intl = useIntl()

    const [paragraph, setParagraph] = useState<any>('')

    useEffect(() => {
        const p = intl.formatMessage({ id: 'landingPage.event_intro' })

        setParagraph(p)
    }, [intl.formatMessage({ id: 'landingPage.event_intro' })])

    return (
        <div className="landing-page-google-content">
            <article className="landing-page-home-intro">
                <div dangerouslySetInnerHTML={{ __html: paragraph }} />
                
                {/* <a className="calendar_btn_mo" target="_blank" href="https://d.uppmkt.com/2207cxoc" rel="noreferrer">
                    <div className="calendarIconBox">{icons.bell()}</div>
                </a> */}
            </article>
            <div className="landing-page-home-intro-time">
                    {intl.formatMessage({ id: 'landingPage.event_intro-time' })}
                </div>
        </div>
    )
}

export default memo(Google)
