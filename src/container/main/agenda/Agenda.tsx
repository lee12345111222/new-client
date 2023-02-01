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
import { Obj } from '../../../store/globalSlice';
import AgendaItem from './AgendaItem';

type AgendaProps = {
    sliderRef: RefObject<HTMLDivElement>;
    agendas: Obj[];
};

const Agenda: FC<AgendaProps> = ({ sliderRef, agendas }) => {
    const { jsonData } = useContext(localeContext) as LocaleProps;

    const {
        agenda: { agenda = [], symbols, current },
    }: any = { user: { user: {} }, agenda: {} };
    const eventId: string = sessionStorage.getItem('eventCode') || '';

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
            {agendas.map((ele, i) => {
                return (
                    <Fragment key={ele.topic}>
                        <AgendaItem
                            symbols={ele}
                            topic={ele.topic}
                            eventId={eventId}
                            current={i === current ? 'current' : null}
                        />
                    </Fragment>
                );
            })}
        </Slider>
    );
};

export default memo(Agenda);
