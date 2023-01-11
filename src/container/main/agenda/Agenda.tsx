import React, {
    FC,
    useEffect,
    useContext,
    Fragment,
    RefObject,
    memo,
} from 'react';
import Slider from 'react-slick';

// import { useTypedSelector, useActions } from '../../../hooks'
import { localeContext, LocaleProps } from '../../../index';
import { handleGetTopics, handleGetSymbols } from '../../../lib/fn';
import AgendaItem from './AgendaItem';

type AgendaProps = {
    sliderRef: RefObject<HTMLDivElement>;
};

const Agenda: FC<AgendaProps> = ({ sliderRef }) => {
    const { jsonData } = useContext(localeContext) as LocaleProps;

    const {
        user: {
            user: { eventId },
        },
        agenda: { agenda = [], symbols, current },
    }: any = { user: { user: {} }, agenda: {} };

    /**
     * 初始化 agenda 清單
     */
    useEffect(() => {
        if (eventId) {
            if (!agenda || agenda.length <= 0) {
                const topicVals = handleGetTopics(eventId, jsonData);
                // initAgenda({ agenda: [...new Set(topicVals)] })
            }

            const symbols = handleGetSymbols(eventId, jsonData);
            // initSymbols({ symbols: [...new Set(symbols)] })
        } else return;
    }, [eventId, agenda.length]);

    // slick config
    const settings = {
        dots: false,
        infinite: false,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,

        responsive: [
            {
                breakpoint: 1800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: false,
                    initialSlide: 0,
                    dots: false,
                    arrows: true,
                },
            },
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: false,
                    initialSlide: 0,
                    dots: false,
                    arrows: true,
                },
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: false,
                    swipe: true,
                    infinite: false,
                    initialSlide: 0,
                    dots: false,
                    arrows: true,
                },
            },
        ],
    };

    return (
        <Slider {...settings} className="main-agenda-slide" ref={sliderRef}>
            {agenda && agenda.length > 0
                ? ['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(
                      (topic, i) => {
                          return (
                              <Fragment key={topic}>
                                  <AgendaItem
                                      symbols={symbols}
                                      topic={topic as string}
                                      eventId={eventId}
                                      current={i === current ? 'current' : null}
                                  />
                              </Fragment>
                          );
                      },
                  )
                : null}
        </Slider>
    );
};

export default memo(Agenda);
