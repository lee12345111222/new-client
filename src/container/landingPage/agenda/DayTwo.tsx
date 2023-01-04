import React, { FC, memo } from 'react'
import { useIntl } from 'react-intl'
import Slider from 'react-slick'

// import { LandingPageImages } from '../../../utils/links'

type AgendaItemProps = {
    venue: string
    symbols: string[]
    jsonData: any
}
const DayTwo: FC<AgendaItemProps> = ({ symbols, venue, jsonData }) => {
    const intl = useIntl()

    const settings = {
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
    }

    const cards =
        symbols && symbols.length > 0
            ? symbols.map((symbol: string) => {
                  if (jsonData[`${venue}_agenda_${symbol}.Team`].trim().toLowerCase() === 'day2') {
                      return (
                          <div key={`${symbol}`} className="landing-page-agenda-slide-item">
                              <div className="landing-page-agenda-slide-item-time">
                                  <span>
                                      {intl.formatMessage({
                                          id: `${venue}_agenda_${`${symbol}`}.Local Time From`,
                                      })}
                                  </span>
                                  <span> - </span>
                                  <span>
                                      {intl.formatMessage({
                                          id: `${venue}_agenda_${`${symbol}`}.Local Time Ends`,
                                      })}
                                  </span>
                              </div>
                              <div className="landing-page-agenda-slide-item-topic">
                                  <span>
                                      {intl.formatMessage({
                                          id: `${venue}_agenda_${`${symbol}`}.Topic`,
                                      })}
                                  </span>
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
                      )
                  }
              })
            : null

    return (
        <div>
            <Slider {...settings}>{cards}</Slider>
        </div>
    )
}

export default memo(DayTwo)
