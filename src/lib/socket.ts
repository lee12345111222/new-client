import { io } from 'socket.io-client';

let token = localStorage.getItem('Authorization');

const skt = io(
    process.env.NODE_ENV === 'production'
        ? 'https://acliapi.uppmkt.com/amplify-client'
        : 'https://acliapi.uppmkt.com/amplify-client',
    {
        transports: ['websocket', 'polling', 'flashsocket'],
        auth: {
            token: 'Bearer ' + token,
            Authorization: 'Bearer ' + token,
        },
        extraHeaders: {
            Authorization: 'Bearer ' + token,
        },
        reconnection: true,
        transportOptions: {
            polling: {
                extraHeaders: {
                    Authorization: 'Bearer ' + token,
                },
            },
        },
    },
);

export default skt;
