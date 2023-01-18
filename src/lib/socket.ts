import { io } from 'socket.io-client';

const getSocket = () => {
    let token: string = localStorage.getItem('Authorization') || '';

    const socket = io(
        process.env.NODE_ENV === 'production'
            ? 'https://acliapi.uppmkt.com/amplify-client'
            : 'https://acliapi.uppmkt.com/amplify-client',
        {
            transports: ['websocket', 'polling'],
            auth: {
                // token: 'Bearer ' + token,
                Authorization: token,
            },
            reconnection: true,
        },
    );
    return socket;
};

export default getSocket;
