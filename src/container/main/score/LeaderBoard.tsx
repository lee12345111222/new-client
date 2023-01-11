import React, { FC } from 'react';

// import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { Links } from '../../../utils/links';
import { encodeName } from '../../../lib/fn';

const LeaderBoard: FC = () => {
    const leaders: any = [];

    const handleRanking = (rank: number) => {
        switch (rank) {
            case 1:
                return (
                    <img
                        src={Links.LEADER_BOARD_NOTE1}
                        alt="leader board avatar"
                    />
                );
            case 2:
                return (
                    <img
                        src={Links.LEADER_BOARD_NOTE2}
                        alt="leader board avatar"
                    />
                );
            case 3:
                return (
                    <img
                        src={Links.LEADER_BOARD_NOTE3}
                        alt="leader board avatar"
                    />
                );
        }

        return <span>{rank}</span>;
    };

    return (
        <div className="leader-board-wrap">
            <div className="leader-board-title">能量值排行</div>
            <div className="leader-board-item-header">
                <div className="leader-board-item-avt">排行</div>
                <div className="leader-board-item-info">嘉宾</div>
                <div>能量值</div>
            </div>
            <div className="leader-board-list">
                {leaders.map((leader: any, i: number) => {
                    return (
                        <div key={leader._id} className="leader-board-item">
                            <div className="leader-board-item-rank">
                                {handleRanking(i + 1)}
                            </div>
                            <div className="leader-board-item-info">
                                <div>{encodeName(leader.uid.name)}</div>
                                <div>{leader.uid.company}</div>
                            </div>
                            <div>{leader.score}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LeaderBoard;
