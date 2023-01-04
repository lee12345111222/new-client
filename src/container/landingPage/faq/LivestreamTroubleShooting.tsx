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
                    header={intl.formatMessage({ id: 'landingPage.faq_category3_q1' })}
                    key="1"
                    className="landing-page-faq-collapse-header"
                >
                    <p>{intl.formatMessage({ id: 'landingPage.faq_category3_a1-1' })}</p>
                    <p>{intl.formatMessage({ id: 'landingPage.faq_category3_a1-2' })}</p>
                    <p>{intl.formatMessage({ id: 'landingPage.faq_category3_a1-3' })}</p>
                    <p>{intl.formatMessage({ id: 'landingPage.faq_category3_a1-4' })}</p>
                </Panel>
                <Panel
                    header={intl.formatMessage({ id: 'landingPage.faq_category3_q2' })}
                    key="2"
                    className="landing-page-faq-collapse-header"
                >
                    <p>{intl.formatMessage({ id: 'landingPage.faq_category3_a2' })}</p>
                </Panel>
                <Panel
                    header={intl.formatMessage({ id: 'landingPage.faq_category3_q3' })}
                    key="3"
                    className="landing-page-faq-collapse-header"
                >
                    <p>{intl.formatMessage({ id: 'landingPage.faq_category3_a3' })}</p>
                </Panel>
                <Panel
                    header={intl.formatMessage({ id: 'landingPage.faq_category3_q4' })}
                    key="4"
                    className="landing-page-faq-collapse-header"
                >
                    <p>{intl.formatMessage({ id: 'landingPage.faq_category3_a4' })}</p>
                </Panel>
                <Panel
                    header={intl.formatMessage({ id: 'landingPage.faq_category3_q5' })}
                    key="5"
                    className="landing-page-faq-collapse-header"
                >
                    <p>{intl.formatMessage({ id: 'landingPage.faq_category3_a5' })}</p>
                </Panel>
                <Panel
                    header={intl.formatMessage({ id: 'landingPage.faq_category3_q6' })}
                    key="6"
                    className="landing-page-faq-collapse-header"
                >
                    <p>{intl.formatMessage({ id: 'landingPage.faq_category3_a6' })}</p>
                </Panel>
                <Panel
                    header={intl.formatMessage({ id: 'landingPage.faq_category3_q7' })}
                    key="7"
                    className="landing-page-faq-collapse-header"
                >
                    <p>{intl.formatMessage({ id: 'landingPage.faq_category3_a7' })}</p>
                </Panel>
                <Panel
                    header={intl.formatMessage({ id: 'landingPage.faq_category3_q8' })}
                    key="8"
                    className="landing-page-faq-collapse-header"
                >
                    <p>{intl.formatMessage({ id: 'landingPage.faq_category3_a8' })}</p>
                </Panel>
            </Collapse>
        </div>
    )
}

export default memo(RegistryProblems)
