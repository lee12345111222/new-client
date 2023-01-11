import React, { FC, memo } from 'react';
import { Collapse } from 'antd';
import { useIntl } from 'react-intl';

const { Panel } = Collapse;

const RegistryProblems: FC = () => {
    const intl = useIntl();

    return (
        <div>
            <Collapse
                accordion
                bordered={false}
                expandIconPosition="right"
                className="landing-page-faq-collapse"
            >
                <Panel
                    header={intl.formatMessage({
                        id: 'landingPage.faq_category2_q1',
                    })}
                    key="1"
                    className="landing-page-faq-collapse-header"
                >
                    <p>
                        {intl.formatMessage({
                            id: 'landingPage.faq_category2_a1',
                        })}
                    </p>
                </Panel>
                <Panel
                    header={intl.formatMessage({
                        id: 'landingPage.faq_category2_q2',
                    })}
                    key="2"
                    className="landing-page-faq-collapse-header"
                >
                    <p>
                        {intl.formatMessage({
                            id: 'landingPage.faq_category2_a2',
                        })}
                    </p>
                </Panel>
                <Panel
                    header={intl.formatMessage({
                        id: 'landingPage.faq_category2_q3',
                    })}
                    key="3"
                    className="landing-page-faq-collapse-header"
                >
                    <p>
                        {intl.formatMessage({
                            id: 'landingPage.faq_category2_a3',
                        })}
                    </p>
                </Panel>
                <Panel
                    header={intl.formatMessage({
                        id: 'landingPage.faq_category2_q4',
                    })}
                    key="4"
                    className="landing-page-faq-collapse-header"
                >
                    <p>
                        {intl.formatMessage({
                            id: 'landingPage.faq_category2_a4',
                        })}
                    </p>
                </Panel>
                <Panel
                    header={intl.formatMessage({
                        id: 'landingPage.faq_category2_q5',
                    })}
                    key="5"
                    className="landing-page-faq-collapse-header"
                >
                    <p>
                        {intl.formatMessage({
                            id: 'landingPage.faq_category2_a5',
                        })}
                    </p>
                </Panel>
                <Panel
                    header={intl.formatMessage({
                        id: 'landingPage.faq_category2_q6',
                    })}
                    key="6"
                    className="landing-page-faq-collapse-header"
                >
                    <p style={{ padding: '0 0 10px', fontWeight: 500 }}>
                        {intl.formatMessage({
                            id: 'landingPage.faq_category2_a6-1',
                        })}
                    </p>
                    <p>
                        {intl.formatMessage({
                            id: 'landingPage.faq_category2_a6-2',
                        })}
                    </p>
                    <p>
                        {intl.formatMessage({
                            id: 'landingPage.faq_category2_a6-3',
                        })}
                    </p>
                    <p style={{ padding: '10px 0 10px', fontWeight: 500 }}>
                        {intl.formatMessage({
                            id: 'landingPage.faq_category2_a6-4',
                        })}
                    </p>
                    <p>
                        {intl.formatMessage({
                            id: 'landingPage.faq_category2_a6-5',
                        })}
                    </p>
                    <p style={{ padding: '10px 0 10px', fontWeight: 500 }}>
                        {intl.formatMessage({
                            id: 'landingPage.faq_category2_a6-6',
                        })}
                    </p>
                    <p>
                        {intl.formatMessage({
                            id: 'landingPage.faq_category2_a6-7',
                        })}
                    </p>
                </Panel>
            </Collapse>
        </div>
    );
};

export default memo(RegistryProblems);
