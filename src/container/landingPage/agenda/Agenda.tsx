import React, { FC, /*  Fragment, */ useContext, useEffect, useState } from 'react'
import { Tabs } from 'antd'
import { useIntl } from 'react-intl'
import { useLocation } from 'react-router-dom'
// import Slider from 'react-slick';
import { localeContext, LocaleProps } from '../../../index'
// import AgendaItem from './AgendaItem';
// import { LandingPageImages } from '../../../utils/links';
import DayOne from './DayOne'
import DayTwo from './DayTwo'

const { TabPane } = Tabs

type AgendaProps = { eventSlug: string }

const Agenda: FC<AgendaProps> = ({ eventSlug }) => {
    const { jsonData } = useContext(localeContext) as LocaleProps

    const intl = useIntl()

    const location = useLocation()

    // 該會場 agenda 數量  ([1, 2, 3 ...])
    // const [topics,  setTopics] = useState<string[]>([]);
    // agenda 標示 ([1_1, 1_2 ...])
    const [symbols, setSymbols] = useState<string[]>([])
    // agenda 代碼 (T1S2...)
    const [venue, setVenue] = useState<string>(process.env.REACT_APP_DEFAULT_EVENT_ID as string)

    /**
     * 判斷是否帶上 event id
     * 蒐集 agenda 標示資訊及 agenda 代碼
     */
    useEffect(() => {
        if (eventSlug) {
            const symbols = handleGetSymbolAndTopics(eventSlug)

            setVenue(eventSlug)
            setSymbols(symbols)
        } else {
            const symbols = handleGetSymbolAndTopics(process.env.REACT_APP_DEFAULT_EVENT_ID as string)

            setVenue(process.env.REACT_APP_DEFAULT_EVENT_ID as string)
            setSymbols(symbols)
        }
    }, [location, venue, eventSlug])

    /**
     * @param ve 活動 event id
     * @returns symbols array
     * 整理 agenda 標示
     */
    const handleGetSymbolAndTopics = (ve: string): string[] => {
        const keys = Object.keys(jsonData)
        const topics = keys.filter((key) => {
            return key.includes(ve) && key.includes('#topic')
        })

        const spks = keys.filter((key) => {
            return key.includes(ve) && key.includes('#spk')
        })

        const symbols = topics.map((topic, i) => {
            return `${jsonData[topic]}_${jsonData[spks[i]]}`
        })

        // const topicVals = topics.map((topic) => {
        //     return `${jsonData[topic]}`;
        // });

        // setTopics([...new Set(topicVals)]);

        return symbols
    }

    // slick config
    // const settings = {
    //     dots: true,
    //     infinite: false,
    //     speed: 800,
    //     slidesToShow: 4,
    //     slidesToScroll: 2,
    //     initialSlide: 0,
    //     autoplay: false,
    //     responsive: [
    //         {
    //             breakpoint: 1800,
    //             settings: {
    //                 slidesToShow: 3,
    //                 slidesToScroll: 2,
    //                 dots: true,
    //                 infinite: false,
    //                 initialSlide: 0,
    //             },
    //         },
    //         {
    //             breakpoint: 1300,
    //             settings: {
    //                 slidesToShow: 2,
    //                 slidesToScroll: 1,
    //                 initialSlide: 0,
    //                 dots: true,
    //                 arrows: false,
    //             },
    //         },
    //         {
    //             breakpoint: 650,
    //             settings: {
    //                 slidesToShow: 1,
    //                 slidesToScroll: 1,
    //                 autoplay: false,
    //                 dots: true,
    //                 arrows: false,
    //                 swipe: true,
    //                 infinite: false,
    //             },
    //         },
    //     ],
    // };

    return (
        <div className="landing-page-agenda-background" id="agenda">
            <div className="landing-page-agenda-wrap">
                <h1 className="page-title">{intl.formatMessage({ id: 'landingPage.nav_agenda' })}</h1>
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
                        <TabPane
                            tab={intl.formatMessage({ id: 'landingPage.speaker_category1' })}
                            key="1"
                            className="landing-page-agenda-slide"
                        >
                            <DayOne symbols={symbols} jsonData={jsonData} venue={eventSlug} />
                        </TabPane>
                        <TabPane
                            tab={intl.formatMessage({ id: 'landingPage.speaker_category2' })}
                            key="2"
                            className="landing-page-agenda-slide"
                        >
                            <DayTwo symbols={symbols} jsonData={jsonData} venue={eventSlug} />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default Agenda
