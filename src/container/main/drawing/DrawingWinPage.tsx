import React, { FC } from 'react';

import { Winner } from '../../../lib/socketDataTypes';
// import { CurrentAwards } from '../../drawing/DrawingView'
import { encodeName } from '../../../lib/fn';

type DrawingWinPageProps = {
    winners: Winner[];
    currentAward: any;
};

const DrawingWinPage: FC<DrawingWinPageProps> = ({ currentAward, winners }) => {
    return (
        <div className="main-drawing-win">
            <div className="main-drawing-win-img">
                <img src={currentAward.path} alt="" />
            </div>
            <div className="main-drawing-win-body">
                <div className="main-drawing-win-text">
                    恭喜以下幸运儿获得{' '}
                    <div>
                        {/*  <span>{currentAward.award}</span>  */}
                        <span>{currentAward.prize}</span>
                    </div>
                </div>
                <div
                    className={
                        winners.length <= 1
                            ? 'main-drawing-win-winners only-winner'
                            : 'main-drawing-win-winners'
                    }
                >
                    {winners.map((winner, i) => {
                        return (
                            <div
                                key={winner._id}
                                className="main-drawing-win-winner"
                            >
                                <div className="main-drawing-win-winner-icon">
                                    <img
                                        src={`https://oss.uppmkt.com/cxo/img/avatar/a${
                                            (i % 4) + 1
                                        }.svg`}
                                        alt="winner"
                                    />
                                </div>
                                <span id="winner-name">
                                    {encodeName(winner.name)}
                                </span>
                                <span> - </span>
                                <span id="winner-company">
                                    {winner.company}
                                </span>
                            </div>
                        );
                    })}
                </div>
                <div className="main-drawing-win-note-container">
                    <div className="main-drawing-win-note">
                        我们将把礼物直接寄送至您报名填写的地址
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DrawingWinPage;
