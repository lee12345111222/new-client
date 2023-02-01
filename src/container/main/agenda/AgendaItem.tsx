import React, { FC, memo } from 'react';
import { useIntl } from 'react-intl';
import { getOssUrl } from '../../../lib/fn';
import moment from 'moment';
import { Obj } from '../../../store/globalSlice';

type AgendaItemProps = {
    symbols: Obj;
    eventId: string;
    current: 'current' | null;
    topic: string;
};
const AgendaItem: FC<AgendaItemProps> = ({
    current,
    eventId,
    symbols,
    topic,
}) => {
    const intl = useIntl();

    return (
        <div
            className={
                current
                    ? 'main-agenda-slide-item-current'
                    : 'main-agenda-slide-item'
            }
        >
            <div
                className={
                    current
                        ? 'main-agenda-slide-item-time-current'
                        : 'main-agenda-slide-item-time'
                }
            >
                <span>{moment(symbols.startTime).format('HH:mm')}</span>
                <span> - </span>
                <span>{moment(symbols.endTime).format('HH:mm')}</span>
            </div>
            <div className="main-agenda-slide-item-topic">
                <span>{symbols.topic}</span>
            </div>
            <div className="main-agenda-slide-item-speaker">
                {symbols.speakers.map((ele: Obj) => (
                    <>
                        <div className="main-agenda-slide-img-container">
                            <img
                                className="main-agenda-slide-img"
                                src={getOssUrl(symbols.code + '_icon.png')}
                                alt={`${topic}_1`}
                            />
                        </div>
                        <div className="main-agenda-slide-content">
                            <div className="main-agenda-slide-content-name">
                                {ele.name}
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </div>
    );
};

export default memo(AgendaItem);
