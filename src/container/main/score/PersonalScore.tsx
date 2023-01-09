import React, { FC, memo, useState } from 'react'
import { Collapse } from 'antd'
import { useSelector } from 'react-redux'
import { Obj } from '../../../store/globalSlice'

// import { useTypedSelector } from '../../../hooks/useTypedSelector'

const { Panel } = Collapse

const PersonalScore: FC = () => {
    const { scoreDetail={detail:[]}, awards={} }:any = {}
    const main:Obj = useSelector((state: any) => { return state.main });

    const [collapseOpened, setCollapseOpened] = useState(true)

    return (
        <div className="score-wrap">
            <div className="score-user-info">
                <div className="score-user-info-energy-bar">
                    <img
                        src={`https://oss.uppmkt.com/cxo/img/energy/Value-${~~(scoreDetail.score / 1000)}.png`}
                        alt="energy bar"
                    />
                </div>
                <div className="score-user-score">
                    <div>目前能量值：{scoreDetail.score}</div>
                </div>
            </div>
            <div className="score-list">
                {scoreDetail &&
                    scoreDetail.detail.map((sc:any) => {
                        return (
                            <div key={sc.id} className="score-list-item">
                                <div>{sc.name}</div>
                                <div>+ {sc.score}</div>
                            </div>
                        )
                    })}
            </div>
            <Collapse
                defaultActiveKey={['1']}
                className="score-user-awards-collapse"
                onChange={() => setCollapseOpened((state) => !state)}
            >
                <Panel
                    className={collapseOpened ? 'score-user-awards-panel panel-open' : 'score-user-awards-panel'}
                    header="中奖清单"
                    key="1"
                >
                    <ul className="score-user-awards-list">
                        <li>
                            <div>会前提问</div>
                            <div>
                                {awards['pre'] ? (
                                    <span className="score-user-awards">{awards['pre'].prizeName}</span>
                                ) : (
                                    <span className="score-user-not-win">未中奖</span>
                                )}
                            </div>
                        </li>
                        <li>
                            <div>乘风破浪参会礼品</div>
                            <div>
                                {awards['swag'] ? (
                                    <span className="score-user-awards">中奖 - {awards['swag'].prizeName}</span>
                                ) : (
                                    <span className="score-user-not-win">尚未参与</span>
                                )}
                            </div>
                        </li>
                        <li>
                            <div>会中问答</div>
                            <div>
                                {awards['middle'] ? (
                                    <span className="score-user-awards">{awards['middle'].prizeName}</span>
                                ) : (
                                    <span className="score-user-not-win">未中奖</span>
                                )}
                            </div>
                        </li>
                        <li>
                            <div>互动增能量 登顶抽好礼</div>
                            <div>
                                {awards['post'] ? (
                                    <span className="score-user-awards">{awards['post'].prizeName} </span>
                                ) : (
                                    <span className="score-user-not-win">未中奖</span>
                                )}
                            </div>
                        </li>
                    </ul>
                </Panel>
            </Collapse>
        </div>
    )
}

export default memo(PersonalScore)
