import React, { FC, RefObject, UIEventHandler, Fragment } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';

// import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { handleTimestampToString } from '../../../../lib/fn';
import { icons } from '../../../../lib/icons';
import { RepliedDetail } from '../../interactiveSec/InteractiveSec';
import { useSelector } from 'react-redux';
import { Obj } from '../../../../store/mainSlice';

type MessageListProps = {
    scrollRef: RefObject<HTMLDivElement>;
    handleScroll: UIEventHandler<HTMLDivElement>;
    handleReplyMessageClick(pkg: RepliedDetail): void;
};

const MessageList: FC<MessageListProps> = ({
    handleReplyMessageClick,
    scrollRef,
    handleScroll,
}) => {
    const {
        chat: { loading },
    }: any = { user: { user: {} }, chat: { messages: [], loading: false } };

    const user: Obj = JSON.parse(localStorage.getItem('user') || '{}');
    const { id } = user;
    console.log(id , 'id')

    const main: Obj = useSelector((state: any) => {
        return state.main;
    });

    const {
        mainInitial: { chat = {} },
    } = main;
    const { messages = [] }: Obj = chat;

    const intl = useIntl();

    const antIcon = <LoadingOutlined style={{ fontSize: 25 }} spin />;

    return (
        <div className="message-list scroll-Control" onScroll={handleScroll}>
            <div className="message-list-loading">
                {loading && <Spin indicator={antIcon} />}
            </div>
            {messages.map((message: any) => {
                return (
                    <Fragment key={message.id}>
                        {!message.parent?.guest ? null : (
                            <div
                                className={
                                    message.guest.id === id
                                        ? 'message-list-replied-hint-self'
                                        : 'message-list-replied-hint'
                                }
                            >
                                {message.guest.name +
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
                                    ? message.guest.helper
                                        ? [
                                              'message-list-item-self',
                                              'googler',
                                          ].join(' ')
                                        : 'message-list-item-self'
                                    : message.guest.helper
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
                                            repliedAvatar: message.guest.avatar,
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

                            {message?.content === null ? null : (
                                <div className="message-list-item-user-replied-content">
                                    {message?.content?.length > 100
                                        ? message.repliedContent.substring(
                                              0,
                                              100,
                                          ) + '...'
                                        : message.contetn}
                                </div>
                            )}

                            <div className="message-list-item-user-main">
                                <div className="message-list-item-user-container">
                                    <img
                                        src={message.guest.avatar}
                                        alt="avatar img"
                                        className="message-list-item-user-avatar"
                                    />
                                </div>
                                <div className="message-list-item-user-right">
                                    <div className="message-list-item-user-detail">
                                        <div className="message-list-item-user-name">
                                            {message.guest.name}
                                        </div>
                                        {message.guest.googler ? (
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
                                                __html: message.content,
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </Fragment>
                );
            })}
            <div className="message-list-holder" ref={scrollRef}></div>
        </div>
    );
};

export default MessageList;
