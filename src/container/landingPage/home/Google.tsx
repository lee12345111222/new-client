import React, { FC, memo } from 'react';
import moment from 'moment';
import { getWeekDay } from '../../../lib/fn';
import { Obj } from '../../../store/globalSlice';

type GoogleProps = {
    eventSlug: string;
    main: Obj;
};

const Google: FC<GoogleProps> = ({ main = {} }) => {
    const { startTime = '', endTime = '', loginTime = '' } = main;
    return (
        <div className="landing-page-google-content">
            <article className="landing-page-home-intro">
                <div
                    dangerouslySetInnerHTML={{
                        __html:
                            moment(startTime).format('YYYY年MM月DD日') +
                            '（' +
                            getWeekDay(moment(startTime).toString()) +
                            '）',
                    }}
                />

                {/* <a className="calendar_btn_mo" target="_blank" href="https://d.uppmkt.com/2207cxoc" rel="noreferrer">
                    <div className="calendarIconBox">{icons.bell()}</div>
                </a> */}
            </article>
            <div className="landing-page-home-intro-time">
                {startTime && endTime && loginTime
                    ? moment(startTime).format('hh:mm') +
                      ' - ' +
                      moment(endTime).format('hh:mm') +
                      '（ ' +
                      moment(loginTime).format('hh:mm') +
                      '开放入场 ）'
                    : '-'}
            </div>
        </div>
    );
};

export default memo(Google);
