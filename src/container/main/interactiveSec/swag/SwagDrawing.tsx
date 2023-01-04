import React, { FC, useEffect, useState } from 'react'
import { Collapse } from 'antd'
import Lottie from 'react-lottie'

import AddressSelector from './AddressSelector'
// import { useTypedSelector, useActions } from '../../../../hooks'
import { LottieJSON } from '../../../../utils/links'
import { Links } from '../../../../utils/links'

const { Panel } = Collapse

const SwagDrawing: FC = () => {
    const [thanks, setThanks] = useState(false)
    // const { onGetUserSwagPrize, updateSwagFinish } = useActions()

    const {
        awards,
        user: { _id },
        swag: { prizeFinished },
    }:any = {user:{},swag:{},awards:{}}

    useEffect(() => {
        if (prizeFinished) {
            // window.setTimeout(() => {
            //     updateSwagFinish()
            // }, 3000)
        }
    }, [prizeFinished])

    const handleSwagDrawing = () => {
        if (!awards['swag']) {
            // window.setTimeout(() => {
            //     onGetUserSwagPrize({ uid: _id })
            // }, 4000)
        }
    }

    return (
        <Collapse defaultActiveKey={['0']} className="swag-collapse" onChange={handleSwagDrawing}>
            <Panel className="swag-panel" header="点击领取谷歌乘风破浪参会礼品！" key="1">
                <div className="swag-collapse-body">
                    {!awards['swag'] ? (
                        <div className="swag-collapse-drawing">
                            <div className="swag-collapse-drawing-animation">
                                <Lottie
                                    isClickToPauseDisabled={true}
                                    options={{
                                        loop: false,
                                        autoplay: true,
                                        animationData: LottieJSON.SWAG_LUCKY_DRAWING,
                                        rendererSettings: {
                                            preserveAspectRatio: 'xMidYMid slice'
                                        }
                                    }}
                                    // id="swag-drawing-lottie"
                                ></Lottie>
                            </div>
                            <div className="swag-collapse-drawing-text">
                                <div>抽奖中...</div>
                            </div>
                        </div>
                    ) : thanks || prizeFinished ? (
                        <div className="swag-collapse-swag-success">
                            <div className="swag-collapse-swag-success-img">
                                {prizeFinished ? (
                                    <img src={Links.SWAG_GIFT_RUN_OUT} alt="" />
                                ) : (
                                    <img src={Links.SWAG_GIFT} alt="" />
                                )}
                            </div>
                            <div className="swag-collapse-swag-success-text">
                                {prizeFinished ? (
                                    <div>{awards['swag'].prizeName}</div>
                                ) : (
                                    <>
                                        <div>填写成功 敬请期待</div>
                                        <div>我们将把礼物寄送至您填写的地址</div>
                                    </>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="swag-collapse-add-receipt">
                            <div className="swag-collapse-add-receipt-img">
                                <img
                                    src={`https://oss.uppmkt.com/cxo/img/swag/Swag_${awards['swag'].prizeName}.png`}
                                    alt=""
                                />
                            </div>
                            <div className="swag-collapse-add-receipt-prize">
                                <div className="swag-collapse-prize">
                                    <div>恭喜您抽中</div>
                                    <div>
                                        {awards['pre'] && (
                                            <>
                                                <span>会前提问专属好礼 </span>与{' '}
                                            </>
                                        )}

                                        <span>{awards['swag'].prizeName}</span>
                                    </div>
                                </div>
                                <p>请填写收件人信息，我们将把礼物寄送至您填写的地址</p>
                            </div>
                            <AddressSelector setThanks={setThanks} />
                        </div>
                    )}
                </div>
            </Panel>
        </Collapse>
    )
}

export default SwagDrawing
