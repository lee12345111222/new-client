import React, { FC, memo } from 'react'
import { Tabs } from 'antd'
import { useIntl } from 'react-intl'

import RegistryProblems from './RegistryProblems'
import LivestreamTroubleShooting from './LivestreamTroubleShooting'
import GeneralProblems from './GeneralProblems'
import OtherProblems from './OtherProblems'

const { TabPane } = Tabs

const FAQ: FC = () => {
    const intl = useIntl()

    return (
        <div className="landing-page-faq-background" id="faq">
            <div className="landing-page-faq-wrap">
                <h1 className="page-title">{intl.formatMessage({ id: 'landingPage.nav_faq' })}</h1>

                <Tabs
                    defaultActiveKey="1"
                    size="small"
                    animated={{ inkBar: false, tabPane: false }}
                    tabBarStyle={{
                        color: '#222',
                        fontSize: '10px',
                    }}
                >
                    <TabPane tab={intl.formatMessage({ id: 'landingPage.faq_category1' })} key="1">
                        <RegistryProblems />
                    </TabPane>
                    <TabPane tab={intl.formatMessage({ id: 'landingPage.faq_category2' })} key="2">
                        <GeneralProblems />
                    </TabPane>
                    <TabPane tab={intl.formatMessage({ id: 'landingPage.faq_category3' })} key="3">
                        <LivestreamTroubleShooting />
                    </TabPane>
                    <TabPane tab={intl.formatMessage({ id: 'landingPage.faq_category4' })} key="4">
                        <OtherProblems />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}

export default memo(FAQ)
