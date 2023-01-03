import { io } from 'socket.io-client'
const skt = io(
    process.env.NODE_ENV === 'production'
        ? (process.env.REACT_APP_SERVER_BASE_URL_PROD as string)
        : (process.env.REACT_APP_SERVER_BASE_URL_DEV as string),
    {
        transports: ['websocket', 'polling'],
        auth: { token: process.env.REACT_APP_SOCKET_IO_AUTH_TOKEN as string },
        reconnection: true,
    }
)

export default skt
