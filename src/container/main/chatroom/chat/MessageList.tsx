import React, { FC, RefObject, UIEvent, Fragment } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';

// import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { getOssUrl, handleTimestampToString } from '../../../../lib/fn';
import { icons } from '../../../../lib/icons';
import { RepliedDetail } from '../../interactiveSec/InteractiveSec';
import { useDispatch, useSelector } from 'react-redux';
import { Obj, onGetRestHistoryMessages } from '../../../../store/mainSlice';

type MessageListProps = {
    handleReplyMessageClick(pkg: RepliedDetail): void;
};

const MessageList: FC<MessageListProps> = ({ handleReplyMessageClick }) => {
    const dispatch = useDispatch();

    const main: Obj = useSelector((state: any) => {
        return state.main;
    });

    const {
        mainInitial: {
            chat = {},
            avatarStyle,
            guest: { id },
        },
    } = main;
    const { messages = [] }: Obj = chat;

    const intl = useIntl();
    /**
     * @param e
     * 處理訊息表單 scroll lazy loading
     */
    const handleScroll = async (e: UIEvent<HTMLDivElement>) => {
        const $scroll = e.target as HTMLDivElement;

        if (
            $scroll.scrollTop === 0 &&
            $scroll.scrollHeight > $scroll.clientHeight &&
            messages
        ) {
            console.log(messages[0].createdAt, 'messages[0].createdAt');
            dispatch(onGetRestHistoryMessages(messages[0].createdAt));
        }
    };

    const antIcon = <LoadingOutlined style={{ fontSize: 25 }} spin />;
    return (
        <div className="message-list scroll-Control" onScroll={handleScroll}>
            {/* <div className="message-list-loading">
                {loading && <Spin indicator={antIcon} />}
            </div> */}
            {messages.map((message: any) => {
                return (
                    <Fragment key={message.id}>
                        {!message?.parent ? null : (
                            <div
                                className={
                                    message.guest.id === id
                                        ? 'message-list-replied-hint-self'
                                        : 'message-list-replied-hint'
                                }
                            >
                                {message.guest.user.name +
                                    ' ' +
                                    intl.formatMessage({
                                        id: 'main.reply to',
                                    }) +
                                    ' ' +
                                    message.parent.guest.user.name}
                            </div>
                        )}
                        <div
                            className={
                                message.guest.id === id
                                    ? message.guest.type === 'googler'
                                        ? [
                                              'message-list-item-self',
                                              'googler',
                                          ].join(' ')
                                        : 'message-list-item-self'
                                    : message.guest.type === 'googler'
                                    ? ['message-list-item', 'googler'].join(' ')
                                    : 'message-list-item'
                            }
                        >
                            {message.type === 'sticker' ? null : (
                                <div
                                    className="message-list-item-dot-btn"
                                    onClick={() =>
                                        handleReplyMessageClick({
                                            replied_id: message.id,
                                            repliedAvatar: `https://oss.uppmkt.com/amplify/avatar/${avatarStyle}/${message.guest.avatar}.png`,
                                            repliedName:
                                                message.guest.user.name,
                                            repliedContent: message.content,
                                        })
                                    }
                                    role="presentation"
                                >
                                    {message.guest.id === id
                                        ? icons.arrow_right()
                                        : icons.arrow_left()}
                                </div>
                            )}

                            <div className="message-list-item-user-time">
                                {handleTimestampToString(message.createdAt)}
                            </div>

                            {!message?.parent ? null : (
                                <div className="message-list-item-user-replied-content">
                                    {message?.parent?.content?.length > 100
                                        ? message.repliedContent.substring(
                                              0,
                                              100,
                                          ) + '...'
                                        : message?.parent?.content}
                                </div>
                            )}

                            <div className="message-list-item-user-main">
                                <div className="message-list-item-user-container">
                                    <img
                                        src={`https://oss.uppmkt.com/amplify/avatar/${avatarStyle}/${message.guest.avatar}.png`}
                                        alt="avatar img"
                                        className="message-list-item-user-avatar"
                                    />
                                </div>
                                <div className="message-list-item-user-right">
                                    <div className="message-list-item-user-detail">
                                        <div className="message-list-item-user-name">
                                            {message.guest.name}
                                        </div>
                                        {message.guest.type === 'googler' ? (
                                            <div className="message-list-item-user-company">
                                                {message.guest.user.company}
                                            </div>
                                        ) : null}
                                    </div>
                                    {message.type === 'sticker' ? (
                                        <div className="message-list-item-content-sticker">
                                            <img
                                                src={message.content}
                                                alt="sticker"
                                            />
                                        </div>
                                    ) : (
                                        <div
                                            className="message-list-item-content"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    message?.content?.length >
                                                    100
                                                        ? message.repliedContent.substring(
                                                              0,
                                                              100,
                                                          ) + '...'
                                                        : message?.content,
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </Fragment>
                );
            })}
            <div className="message-list-holder"></div>
        </div>
    );
};

export default MessageList;
