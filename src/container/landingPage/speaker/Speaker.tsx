import React, { FC, useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Tabs } from 'antd';
import { useIntl } from 'react-intl';

import KeyNote from './KeyNote';
import BreakoutSession from './BreakoutSession';
import { localeContext, LocaleProps } from '../../../index';
import { handleGetSymbols } from '../../../lib/fn';

const { TabPane } = Tabs;

export type SpeakerChildrenProps = {
    symbols: string[];
    jsonData: any;
    venue: string;
};

export type SpeakerProps = {
    eventSlug: string;
};

const Speaker: FC<SpeakerProps> = ({ eventSlug }) => {
    const { jsonData } = useContext(localeContext) as LocaleProps;
    const intl = useIntl();

    const location = useLocation();

    const [symbols, setSymbols] = useState<string[]>([]);

    /**
     * 設置 speaker 顯示資料清單，symbols: [1_1, 2_1, 3_1...]
     */
    useEffect(() => {
        if (eventSlug) {
            const symbols = handleGetSymbols(eventSlug, jsonData);

            setSymbols(symbols);
        }
    }, [location.pathname, eventSlug]);

    return (
        <div className="landing-page-speaker-background" id="speaker">
            <div className="landing-page-speaker-wrap">
                <h1 className="page-title">
                    {intl.formatMessage({ id: 'landingPage.nav_speaker' })}
                </h1>
                <Tabs
                    defaultActiveKey="1"
                    size="large"
                    tabBarStyle={{
                        color: '#000',
                    }}
                    destroyInactiveTabPane={true}
                >
                    <TabPane
                        tab={intl.formatMessage({
                            id: 'landingPage.speaker_category1',
                        })}
                        key="1"
                    >
                        <KeyNote
                            symbols={symbols}
                            jsonData={jsonData}
                            venue={eventSlug}
                        />
                    </TabPane>
                    <TabPane
                        tab={intl.formatMessage({
                            id: 'landingPage.speaker_category2',
                        })}
                        key="2"
                    >
                        <BreakoutSession
                            symbols={symbols}
                            jsonData={jsonData}
                            venue={eventSlug}
                        />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
};

export default Speaker;
