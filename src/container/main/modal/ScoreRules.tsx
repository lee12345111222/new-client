import React, { FC, memo } from 'react'

import { Links } from '../../../utils/links'

// import '../../../styles/_main-pop.scss'

const ScoreRules: FC = () => {
    return (
        <div className="score-rules-wrap">
            <div className="score-rules-title">
                <div>互动增能量 登顶抽好礼</div>
                <div>
                    <img src={Links.SCORE_RULE_ICON} alt="" />
                </div>
            </div>
            <div className="score-rules-paragraph">
                <div className="score-rules-paragraph-title">
                    <div>
                        <img src={Links.BALLON1} alt="" />
                    </div>
                    <div>互动规则</div>
                </div>
                <ol>
                    <li>您可参与如下互动获得相应能量值：</li>
                    <li>参与会前提问 + 2,000 能量值</li>
                    <li>参与现场互动答题（共 4 次）+ 1,000 能量值</li>
                    <li>聊天窗口参与提问互动（每次 + 1,000 能量值，2,000 能量值封顶）+ 2,000 能量</li>
                    <li>填写活动调研问卷 + 1,000 能量值</li>
                </ol>
            </div>
            <div className="score-rules-paragraph">
                <div className="score-rules-paragraph-title">
                    <div>
                        <img src={Links.BALLON2} alt="" />
                    </div>
                    <div>抽奖规则</div>
                </div>
                <ol>
                    <li>累计达到 3,000 能量值，即可获得抽奖资格</li>
                    <li>
                        达到 3,000 能量值后，每增加 1,000 能量值，中奖几率增加一倍（即 4,000 能量值中奖几率为 2
                        倍，5,000 能量值中奖几率为 3 倍，6,000 能量值中奖几率为 4 倍）
                    </li>
                    <li>抽奖时间：抽奖将在活动期间抽奖环节进行抽取</li>
                    <li>奖品发放：活动结束后，将由主办方进行统一发放</li>
                    <li>奖品信息：大疆手持云台</li>
                </ol>
                <div className="score-rules-paragraph-img">
                    <img src={Links.SCORE_RULE_1} alt="" />
                </div>
            </div>
            <div className="score-rules-paragraph">
                <div className="score-rules-paragraph-title">
                    <div>
                        <img src={Links.BALLON3} alt="" />
                    </div>
                    <div>惊喜彩蛋抽奖</div>
                </div>
                <div>
                    <p>
                        参加活动期间 4 次互动答题，在获得 1,000
                        能量值的同时，您还将获得惊喜彩蛋抽奖的资格，抽奖将在活动期间抽取，活动结束后，奖品将由主办方进行统一发放。
                    </p>
                </div>
                <div className="score-rules-paragraph-img">
                    <img src={Links.SCORE_RULE_2} alt="" />
                </div>
            </div>
        </div>
    )
}

export default memo(ScoreRules)
