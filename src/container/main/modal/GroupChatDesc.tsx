import React, { FC, memo } from 'react'

import { Links } from '../../../utils/links'

const GroupChatDesc: FC = () => {
    return (
        <div className="group-chat-desc-wrap">
            <div className="group-chat-desc-title">
                <div>分组问答</div>
                <div>
                    <img src={Links.GROUP_CHAT_ICON} alt="" />
                </div>
            </div>
            <div className="group-chat-desc-paragraph">
                <div className="group-chat-desc-paragraph-title">
                    <div>
                        <img src={Links.BALLON1} alt="" />
                    </div>
                    <div>分组问答说明</div>
                </div>
                <div>
                    <p>
                        您可以根据您的需求，选择进入不同话题的分组问答聊天室，由谷歌专家针对活动期间未获得解答的问题，为您进行近一步答疑，您也可以和志同道合的参会嘉宾进行深入交流。
                    </p>
                </div>
            </div>
            <div className="group-chat-desc-paragraph">
                <div className="group-chat-desc-paragraph-title">
                    <div>
                        <img src={Links.BALLON2} alt="" />
                    </div>
                    <div>登录方式说明</div>
                </div>
                <ol>
                    <li>选择您感兴趣的话题聊天室登录，将以腾讯会议形式进行</li>
                    <li>
                        <div>腾讯会议登入方式</div>
                        <div>
                            PC端：请确保您的电脑已安装腾讯会议应用，如还没有安装请
                            <a href="https://meeting.tencent.com/download/" target="blank">
                                点击这里
                            </a>
                            下载并安装手机端：请使用以下方式登录如果您在登录腾讯会议过程中有任何问题，请在聊天窗口告诉我们，会议小助手将尽快协助您解决
                            下载并安装
                        </div>
                        <div>手机端：请使用以下方式登录</div>
                        <div className="group-chat-qrcode-gp">
                            <div className="group-chat-qrcode">
                                <img src={Links.WE_CHAT} alt="" />
                                <div>微信小程序</div>
                            </div>
                            <div className="group-chat-qrcode">
                                <img src={Links.IOS} alt="" />
                                <div>iOS 应用下载</div>
                            </div>
                            <div className="group-chat-qrcode">
                                <img src={Links.ANDROID} alt="" />
                                <div>Android 应用下载</div>
                            </div>
                        </div>
                        <div>如果您在登录过程中有任何问题，请在聊天窗口告诉我们，会议小助手将尽快协助您解决</div>
                    </li>
                </ol>
            </div>
        </div>
    )
}

//     微信小程序                      iOS应用下载                   Android应用下载

export default memo(GroupChatDesc)
