import React, { FC } from 'react';
import { useIntl } from 'react-intl';
import { Button, Input } from 'antd';

// import { useTypedSelector } from '../../../hooks/useTypedSelector'

const { TextArea } = Input;

type ShareWalkinProps = {
    handlePostSharedWalkin(): void;
};

const ShareWalkin: FC<ShareWalkinProps> = ({ handlePostSharedWalkin }) => {
    const intl = useIntl();

    const {
        googler: {
            walkin: { code: walkinCode },
        },
    }: any = {};

    const textVal = `尊敬的嘉宾，诚挚地邀请您参与本次 ${
        process.env.REACT_APP_EVENT_NAME
    } . \n\n您的邀请码为：${walkinCode} 请用此链接登入：${
        process.env.NODE_ENV === 'development'
            ? `http://localhost:3000/#/${process.env.REACT_APP_DEFAULT_EVENT_ID}`
            : `${process.env.REACT_APP_SERVER_BASE_URL_PROD}#/${process.env.REACT_APP_DEFAULT_EVENT_ID}`
    }?uid=${walkinCode} \n\n期待您参与！`;

    return (
        <div className="main-share-walkin-modal">
            <h4>{intl.formatMessage({ id: 'main.ShareWalkinHead' })}</h4>
            <h6>{intl.formatMessage({ id: 'main.ShareWalkinSubHead' })}</h6>
            <Input.Group compact>
                <TextArea
                    style={{ width: '100%', height: '180px' }}
                    value={textVal}
                    disabled={true}
                />
            </Input.Group>
            <div className="main-share-walkin-modal-btn-gp">
                <Button onClick={handlePostSharedWalkin}>
                    {intl.formatMessage({ id: 'main.ShareWalkinBtnCreate' })}
                </Button>

                <Button onClick={() => navigator.clipboard.writeText(textVal)}>
                    {intl.formatMessage({ id: 'main.ShareWalkinBtnShare' })}
                </Button>
            </div>
        </div>
    );
};

export default ShareWalkin;
