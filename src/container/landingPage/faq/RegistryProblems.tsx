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
                        id: 'landingPage.faq_category1_q1',
                    })}
                    key="1"
                    className="landing-page-faq-collapse-header"
                >
                    <p>
                        {intl.formatMessage({
                            id: 'landingPage.faq_category1_a1',
                        })}
                    </p>
                </Panel>
                <Panel
                    header={intl.formatMessage({
                        id: 'landingPage.faq_category1_q2',
                    })}
                    key="2"
                    className="landing-page-faq-collapse-header"
                >
                    <p>
                        {intl.formatMessage({
                            id: 'landingPage.faq_category1_a2',
                        })}
                    </p>
                </Panel>
                <Panel
                    header={intl.formatMessage({
                        id: 'landingPage.faq_category1_q3',
                    })}
                    key="3"
                    className="landing-page-faq-collapse-header"
                >
                    <p>
                        {intl.formatMessage({
                            id: 'landingPage.faq_category1_a3',
                        })}
                    </p>
                </Panel>
                <Panel
                    header={intl.formatMessage({
                        id: 'landingPage.faq_category1_q4',
                    })}
                    key="4"
                    className="landing-page-faq-collapse-header"
                >
                    <p>
                        {intl.formatMessage({
                            id: 'landingPage.faq_category1_a4',
                        })}
                    </p>
                </Panel>
            </Collapse>
        </div>
    );
};

export default memo(RegistryProblems);
