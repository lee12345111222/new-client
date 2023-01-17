import React, {
    FC,
    /*  Fragment, */ useContext,
    useEffect,
    useState,
} from 'react';
import { Tabs } from 'antd';
import { useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';
// import Slider from 'react-slick';
import { localeContext, LocaleProps } from '../../../index';
// import AgendaItem from './AgendaItem';
// import { LandingPageImages } from '../../../utils/links';
import DayOne from './DayOne';
import DayTwo from './DayTwo';
import { getOssUrl } from '../../../lib/fn';
import { Obj } from '../../../store/globalSlice';

const { TabPane } = Tabs;

type AgendaProps = { schedules: Obj[] };

const Agenda: FC<AgendaProps> = ({ schedules = [] }) => {
    const { jsonData } = useContext(localeContext) as LocaleProps;

    const intl = useIntl();

    const location = useLocation();

    const [activeKey, setActiveKey] = useState<any>('0');

    return (
        <div
            className="landing-page-agenda-background"
            id="agenda"
            style={{ backgroundImage: `url(${getOssUrl('session.png')})` }}
        >
            <div className="landing-page-agenda-wrap">
                <div className="agenda-page-top">
                    <h1 className="page-title">
                        {intl.formatMessage({ id: 'landingPage.nav_agenda' })}
                    </h1>
                    <div className="page-top-right">
                        <Tabs
                            activeKey={activeKey}
                            size="large"
                            animated={{ inkBar: false, tabPane: false }}
                            tabBarStyle={{
                                color: '#000',
                            }}
                            destroyInactiveTabPane={false}
                            onChange={val => setActiveKey(val)}
                        >
                            {schedules.map((ele, idx) => (
                                <TabPane
                                    tab={ele.group}
                                    key={idx}
                                    className="landing-page-agenda-slide"
                                ></TabPane>
                            ))}
                        </Tabs>
                    </div>
                </div>

                <div className="landing-page-agenda-slide-container">
                    <Tabs
                        defaultActiveKey="1"
                        size="large"
                        animated={{ inkBar: false, tabPane: false }}
                        tabBarStyle={{
                            color: '#000',
                        }}
                        destroyInactiveTabPane={false}
                    >
                        {schedules[activeKey]?.data?.map((ele: Obj) => (
                            <TabPane
                                tab={ele.name}
                                key={ele.code}
                                className="landing-page-agenda-slide"
                            >
                                <DayOne symbols={ele.agendas} />
                            </TabPane>
                        ))}
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default Agenda;
