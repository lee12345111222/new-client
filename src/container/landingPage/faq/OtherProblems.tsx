import React, { FC, memo } from 'react'
import { Collapse } from 'antd'
import { useIntl } from 'react-intl'

const { Panel } = Collapse

const RegistryProblems: FC = () => {
    const intl = useIntl()

    return (
        <div>
            <Collapse accordion bordered={false} expandIconPosition="right" className="landing-page-faq-collapse">
                <Panel
                    header={intl.formatMessage({ id: 'landingPage.faq_category4_q1' })}
                    key="1"
                    className="landing-page-faq-collapse-header"
                >
                    <p>{intl.formatMessage({ id: 'landingPage.faq_category4_a1' })}</p>
                </Panel>
                <Panel
                    header={intl.formatMessage({ id: 'landingPage.faq_category4_q2' })}
                    key="2"
                    className="landing-page-faq-collapse-header"
                >
                    <p>{intl.formatMessage({ id: 'landingPage.faq_category4_a2' })}</p>
                </Panel>
                <Panel
                    header={intl.formatMessage({ id: 'landingPage.faq_category4_q3' })}
                    key="3"
                    className="landing-page-faq-collapse-header"
                >
                    <p>{intl.formatMessage({ id: 'landingPage.faq_category4_a3' })}</p>
                </Panel>
            </Collapse>
        </div>
    )
}

export default memo(RegistryProblems)
