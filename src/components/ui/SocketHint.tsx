import React, { FC } from 'react';

import '../../styles/socketHint.scss';

type SocketHintProps = {
    socketOn: boolean;
};

const SocketHint: FC<SocketHintProps> = ({ socketOn }) => {
    return <> {socketOn ? null : <div id="socket-hint"></div>}</>;
};

export default SocketHint;
