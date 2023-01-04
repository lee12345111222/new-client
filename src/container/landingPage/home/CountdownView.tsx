import React, { FC, useEffect, memo } from 'react'

import { deliverWaitingOnlineCount } from '../../../lib/services'
// import { useTypedSelector } from '../../../hooks/useTypedSelector'
import Countdown from '../Countdown'
import { icons } from '../../../lib/icons'

type CountdownViewProps = {
    onlineCount: number
}

const CountdownView: FC<CountdownViewProps> = ({ onlineCount }) => {
    // const {
    //     user: { code },
    // } = useTypedSelector((state) => state.user)

    /**
     * 獲取目前已上線等待人數
     */
    // useEffect(() => {
    //     async function handleGetOnlineCount() {
    //         await deliverWaitingOnlineCount(code)
    //     }

    //     handleGetOnlineCount()
    // }, [])

    return (
        <div className="landing-page-countdownView-background">
            <div className="landing-page-home-title">{icons.main_title()}</div>
            <div className="landing-page-countdownView-waiting-online">
                <h2 className="landing-page-countdownView-waitingNum">{onlineCount}</h2>
                <h3 className="landing-page-countdownView-waitingText">People are waiting online</h3>
            </div>
            <Countdown classes={'landing-page-countdownView-count-down'} />
        </div>
    )
}

export default memo(CountdownView)
