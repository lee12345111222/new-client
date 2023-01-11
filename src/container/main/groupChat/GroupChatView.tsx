import React, { FC, Fragment, memo } from 'react';

import GroupChatQRCode from './GroupChatQRCode';
import { data_0708 } from '../../../utils/groupChatItemsData';

const GroupChatView: FC = () => {
    return (
        <div className="group-chat content">
            <div className="group-chat-top">
                <div className="group-chat-title">
                    <h2>CxO 分组问答</h2>
                    <p>
                        选择您想加入的腾讯会议室，与其他参会者和谷歌专家进行问答交流
                    </p>
                </div>
            </div>
            <div className="group-chat-body">
                {data_0708.map(group => {
                    return (
                        <Fragment key={group.id}>
                            <GroupChatQRCode group={group} />
                        </Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default memo(GroupChatView);
