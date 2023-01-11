import React, { FC } from 'react';
import { Button } from 'antd';

import { Links } from '../../../utils/links';

type GroupChatQRCodeProps = {
    group: any;
};

const GroupChatQRCode: FC<GroupChatQRCodeProps> = ({ group }) => {
    return (
        <div className="group-chat-item">
            <div id="group-chat-item-topic">{group.topic}</div>
            <div className="group-chat-item-qrcode">
                <img src={group.QRCodePath} alt="QR code" />
            </div>
            <div className="group-chat-item-body">
                <div className="group-chat-item-body-cfr-code">
                    <img src={Links.GROUP_CHAT_KEY_ICON} alt="" />
                    会议代码：{group.conferenceCode}
                </div>
                <Button>
                    <a href={group.linkUrl} target="blank">
                        立即加入聊天室
                    </a>
                </Button>
            </div>
        </div>
    );
};

export default GroupChatQRCode;
