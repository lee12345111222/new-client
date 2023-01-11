import React, { FC, memo } from 'react';
import { useIntl } from 'react-intl';
import Slider from 'react-slick';
import { SpeakerChildrenProps } from './Speaker';
import { LandingPageImages } from '../../../utils/links';

const KeyNote: FC<SpeakerChildrenProps> = ({ symbols, jsonData, venue }) => {
    const intl = useIntl();

    const settings = {
        infinite: false,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        //自動播放
        autoplay: false,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 4000,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    infinite: false,
                    dots: true,
                },
            },
            {
                breakpoint: 1700,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    infinite: false,
                    dots: true,
                },
            },
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: false,
                    dots: true,
                },
            },
            {
                breakpoint: 650,
                settings: {
                    // centerPadding: '30px',
                    // centerMode: true,
                    swipe: true,
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: false,
                    dots: true,
                    arrows: false,
                },
            },
        ],
    };

    const cards =
        symbols && symbols.length > 0
            ? symbols.map((symbol: string) => {
                  if (jsonData[`${venue}_agenda_${symbol}.Team`] === 'Google') {
                      return (
                          <div className="speaker-card" key={symbol}>
                              <div className="landing-page-slide-item-topdeco">
                                  <img
                                      className="card-dot"
                                      src={
                                          LandingPageImages.AGENDA_SPEAKER_CARD_DOT
                                      }
                                      alt=""
                                  />
                              </div>
                              <div className="speaker-photoBox">
                                  <img
                                      className="speaker-photoImg"
                                      src={intl.formatMessage({
                                          id: `${venue}_agenda_${symbol}.Img Url`,
                                      })}
                                      alt={symbol}
                                  />
                              </div>
                              <div>
                                  <div className="speaker-name">
                                      {intl.formatMessage({
                                          id: `${venue}_agenda_${symbol}.Speaker Name`,
                                      })}
                                  </div>
                                  <div className="speaker-title">
                                      {intl.formatMessage({
                                          id: `${venue}_agenda_${symbol}.Speaker Title`,
                                      })}
                                  </div>
                              </div>
                          </div>
                      );
                  }
              })
            : null;

    return (
        <div>
            <Slider {...settings}>{cards}</Slider>
        </div>
    );
};

export default memo(KeyNote);
