import React, { FC, memo, useEffect, useState } from 'react';
import { Collapse } from 'antd';
import Lottie from 'react-lottie';

import AddressSelector from './AddressSelector';
// import { useTypedSelector, useActions } from '../../../../hooks'
import { LottieJSON } from '../../../../utils/links';
import { Links } from '../../../../utils/links';
import { Obj } from '../../../../store/globalSlice';
import { updateState } from '../../../../store/mainSlice';
import { useDispatch } from 'react-redux';

const { Panel } = Collapse;

interface Props {
    lottery: Obj;
    socket: any;
}

const SwagDrawing = memo((props: Props) => {
    const { lottery, socket } = props;

    const dispatch = useDispatch();

    const [thanks, setThanks] = useState(false);
    const [during, setDuring] = useState(false);
    // const { onGetUserSwagPrize, updateSwagFinish } = useActions()

    const {
        awards,
        user: { _id },
        swag: { prizeFinished },
    }: any = { user: {}, swag: {}, awards: {} };

    useEffect(() => {
        if (prizeFinished) {
            // window.setTimeout(() => {
            //     updateSwagFinish()
            // }, 3000)
        }
    }, [prizeFinished]);

    const handleSwagDrawing = () => {
        setDuring(true);
    };
    const handleCommit = (status: boolean) => {
        setThanks(status);
        socket.emit(
            'lottery',
            {
                action: 'draw',
                data: {
                    id: lottery.id,
                },
            },
            (res: any) => {
                console.log(res, 'res');
            },
        );
        setTimeout(() => {
            dispatch(updateState({ key: 'lottery', value: {} }));
            setThanks(false);
        }, 3000);
    };

    return (
        <Collapse
            defaultActiveKey={['0']}
            className="swag-collapse"
            onChange={handleSwagDrawing}
        >
            <Panel
                className="swag-panel"
                header="点击领取谷歌乘风破浪参会礼品！"
                key="1"
            >
                <div className="swag-collapse-body">
                    {during ? (
                        <div className="swag-collapse-drawing">
                            <div className="swag-collapse-drawing-animation">
                                <Lottie
                                    isClickToPauseDisabled={true}
                                    options={{
                                        loop: false,
                                        autoplay: true,
                                        animationData:
                                            LottieJSON.SWAG_LUCKY_DRAWING,
                                        rendererSettings: {
                                            preserveAspectRatio:
                                                'xMidYMid slice',
                                        },
                                    }}
                                    eventListeners={[
                                        {
                                            eventName: 'complete',
                                            callback: () => {
                                                setDuring(false);
                                            },
                                        },
                                    ]}
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
                                        <div>
                                            我们将把礼物寄送至您填写的地址
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="swag-collapse-add-receipt">
                            <div className="swag-collapse-add-receipt-img">
                                <img
                                    // src={`https://oss.uppmkt.com/cxo/img/swag/Swag_${awards['swag'].prizeName}.png`}
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

                                        <span>{lottery.awardName}</span>
                                    </div>
                                </div>
                                <p>
                                    请填写收件人信息，我们将把礼物寄送至您填写的地址
                                </p>
                            </div>
                            <AddressSelector setThanks={handleCommit} />
                        </div>
                    )}
                </div>
            </Panel>
        </Collapse>
    );
});

export default SwagDrawing;
