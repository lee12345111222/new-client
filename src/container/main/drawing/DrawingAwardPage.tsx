import React, { FC, memo } from 'react'

// import { CurrentAwards } from '../../drawing/DrawingView'

type DrawingAwardPageProps = {
    currentAward: any
}

const DrawingAwardPage: FC<DrawingAwardPageProps> = ({ currentAward }) => {
    return (
        <div className="main-drawing-award-page">
            <div className="main-drawing-award-img">
                <img src={currentAward.path} alt="award" />
            </div>
            <div className="main-drawing-award-prize">
                {/* <span>{currentAward.award}</span> */}
                <span>抽奖 - </span>
                <span>{currentAward.prize}</span>
            </div>
        </div>
    )
}

export default memo(DrawingAwardPage)
