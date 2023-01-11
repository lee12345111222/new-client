import React, { FC, memo, Dispatch, SetStateAction } from 'react';
import Ctd from 'react-countdown';

type CountdownProps = {
    classes: string;
    setNavigateSlug?: Dispatch<SetStateAction<string>>;
};

const Countdown: FC<CountdownProps> = ({ classes }) => {
    return (
        <Ctd
            date={parseInt(process.env.REACT_APP_EVENT_COUNTDOWN as string)}
            intervalDelay={0}
            renderer={({ days, hours, minutes, seconds }) => {
                return (
                    <div className={classes}>
                        <time>
                            <span className="landing-page-count-col">
                                <span className="landing-page-count-down-d count-down-num">
                                    {days}
                                </span>
                                <span
                                    className="landing-page-count-down-word home-non"
                                    id="landing-page-count-down-days"
                                >
                                    day
                                </span>
                            </span>
                            <span className="landing-page-count-col">
                                <span className="landing-page-count-down-h count-down-num">
                                    {hours}
                                </span>
                                <span
                                    className="landing-page-count-down-word home-non"
                                    id="landing-page-count-down-hours"
                                >
                                    hour
                                </span>
                            </span>
                            <span className="landing-page-count-col">
                                <span className="landing-page-count-down-m count-down-num">
                                    {minutes}
                                </span>
                                <span
                                    className="landing-page-count-down-word home-non"
                                    id="landing-page-count-down-mins"
                                >
                                    min
                                </span>
                            </span>
                            <span className="landing-page-count-col">
                                <span className="landing-page-count-down-s count-down-num">
                                    {seconds}
                                </span>
                                <span
                                    className="landing-page-count-down-word home-non"
                                    id="landing-page-count-down-secs"
                                >
                                    sec
                                </span>
                            </span>
                        </time>
                    </div>
                );
            }}
        />
    );
};

export default memo(Countdown);
