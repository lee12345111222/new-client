import React, { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Button } from 'antd';
import { useIntl } from 'react-intl';

type DisconnectedSkeletonProps = {
    showReload: boolean;
    handleReload(): void;
};

const DisconnectedSkeleton: FC<DisconnectedSkeletonProps> = ({
    showReload,
    handleReload,
}) => {
    const intl = useIntl();

    return (
        <div style={{ position: 'relative' }}>
            <div
                style={{
                    position: 'absolute',
                    top: '40%',
                    left: '0',
                    right: '0',
                    zIndex: '200',
                    fontSize: '1rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                {!showReload ? (
                    <span>
                        {intl.formatMessage({ id: 'main.TRYING_CONNECTING' })}
                    </span>
                ) : (
                    <>
                        <span>
                            {intl.formatMessage({
                                id: 'main.MAKE_RELOAD_PAGE_FOR_CONNECTING',
                            })}
                        </span>
                        <Button onClick={handleReload}>
                            {intl.formatMessage({ id: 'main.RELOAD_PAGE' })}
                        </Button>
                    </>
                )}
            </div>
            <Skeleton height={700} />
        </div>
    );
};

export default DisconnectedSkeleton;
