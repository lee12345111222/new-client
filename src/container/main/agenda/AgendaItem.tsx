import React, { FC, memo } from 'react';
import { useIntl } from 'react-intl';
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
                <span>{symbols.startTime}</span>
                <span> - </span>
                <span>{symbols.endTime}</span>
            </div>
            <div className="main-agenda-slide-item-topic">
                <span>{symbols.topic}</span>
            </div>
            <div className="main-agenda-slide-item-speaker">
                <div className="main-agenda-slide-img-container">
                    <img
                        className="main-agenda-slide-img"
                        src={intl.formatMessage({
                            id: `${eventId}_agenda_${`${topic}_1`}.Img Url`,
                        })}
                        alt={`${topic}_1`}
                    />
                </div>
                <div className="main-agenda-slide-content">
                    <div className="main-agenda-slide-content-name">
                        {intl.formatMessage({
                            id: `${eventId}_agenda_${`${topic}_1`}.Speaker Name`,
                        })}
                    </div>
                </div>
                {symbols.includes(`${topic}_2`) && (
                    <>
                        <div className="main-agenda-slide-img-container">
                            <img
                                className="main-agenda-slide-img"
                                src={intl.formatMessage({
                                    id: `${eventId}_agenda_${`${topic}_2`}.Img Url`,
                                })}
                                alt={`${topic}_2`}
                            />
                        </div>
                        <div className="main-agenda-slide-content">
                            <div className="main-agenda-slide-content-name">
                                {intl.formatMessage({
                                    id: `${eventId}_agenda_${`${topic}_2`}.Speaker Name`,
                                })}
                            </div>
                        </div>
                    </>
                )}
                {symbols.includes(`${topic}_3`) && (
                    <>
                        <div className="main-agenda-slide-img-container">
                            <img
                                className="main-agenda-slide-img"
                                src={intl.formatMessage({
                                    id: `${eventId}_agenda_${`${topic}_3`}.Img Url`,
                                })}
                                alt={`${topic}_3`}
                            />
                        </div>
                        <div className="main-agenda-slide-content">
                            <div className="main-agenda-slide-content-name">
                                {intl.formatMessage({
                                    id: `${eventId}_agenda_${`${topic}_3`}.Speaker Name`,
                                })}
                            </div>
                        </div>
                    </>
                )}
                {symbols.includes(`${topic}_4`) && (
                    <>
                        <div className="main-agenda-slide-img-container">
                            <img
                                className="main-agenda-slide-img"
                                src={intl.formatMessage({
                                    id: `${eventId}_agenda_${`${topic}_4`}.Img Url`,
                                })}
                                alt={`${topic}_4`}
                            />
                        </div>
                        <div className="main-agenda-slide-content">
                            <div className="main-agenda-slide-content-name">
                                {intl.formatMessage({
                                    id: `${eventId}_agenda_${`${topic}_4`}.Speaker Name`,
                                })}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default memo(AgendaItem);
