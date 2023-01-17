import React, { FC, memo } from 'react';
import { useIntl } from 'react-intl';
import Slider from 'react-slick';

type AgendaItemProps = {
    symbols: string[];
};
const DayOne: FC<AgendaItemProps> = ({ symbols }) => {
    const intl = useIntl();

    const settings = {
        arrows: true,
        infinite: false,
        speed: 800,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        autoplay: false,
        dots: true,
        responsive: [
            {
                breakpoint: 4000,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: false,
                    dots: true,
                    arrows: true,
                },
            },
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: false,
                    dots: true,
                    arrows: true,
                },
            },
            {
                breakpoint: 1180,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: false,
                    dots: true,
                    arrows: false,
                },
            },
            {
                breakpoint: 650,
                settings: {
                    swipe: true,
                    infinite: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: false,
                    dots: true,
                    arrows: false,
                },
            },
        ],
    };
    const venue = '';

    const cards =
        symbols && symbols.length > 0
            ? symbols.map((symbol: any) => {
                  return (
                      <div
                          key={`${symbol}`}
                          className="landing-page-agenda-slide-item"
                      >
                          <div className="landing-page-agenda-slide-item-time">
                              <span>{symbol.startTime}</span>
                              <span> - </span>
                              <span>{symbol.endTime}</span>
                          </div>
                          <div className="landing-page-agenda-slide-item-topic">
                              <span>{symbol.topic}</span>
                          </div>
                          <div className="landing-page-agenda-slide-item-speaker">
                              <div className="landing-page-agenda-slide-img-container">
                                  <img
                                      className="landing-page-agenda-slide-img"
                                      src={intl.formatMessage({
                                          id: `${venue}_agenda_${`${symbol}`}.Img Url`,
                                      })}
                                      alt={`${symbol}`}
                                  />
                              </div>
                              <div className="landing-page-agenda-slide-content">
                                  <div className="landing-page-agenda-slide-content-name">
                                      {intl.formatMessage({
                                          id: `${venue}_agenda_${`${symbol}`}.Speaker Name`,
                                      })}
                                  </div>

                                  <div className="landing-page-agenda-slide-content-title">
                                      {intl.formatMessage({
                                          id: `${venue}_agenda_${`${symbol}`}.Company name`,
                                      })}
                                  </div>
                                  <div className="landing-page-agenda-slide-content-title">
                                      {intl.formatMessage({
                                          id: `${venue}_agenda_${`${symbol}`}.Speaker Title`,
                                      })}
                                  </div>
                              </div>
                          </div>
                      </div>
                  );
              })
            : null;

    return (
        <div>
            <Slider {...settings}>{cards}</Slider>
        </div>
    );
};

export default memo(DayOne);
