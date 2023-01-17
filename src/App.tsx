import {
    createContext,
    memo,
    useState,
    useEffect,
    useRef,
    lazy,
    Suspense,
    useLayoutEffect,
} from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Socket } from 'socket.io-client';

import initialSkt from './lib/socket';

import 'antd/dist/reset.css';
import './styles/App.scss';
import Loader from './components/ui/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { updateState, selectGlobalState } from './store/globalSlice';

const LandingPage = lazy(() => import('./container/landingPage/LandingPage'));
const Main = lazy(() => import('./container/main/Main'));

const socket = initialSkt;

const App = memo(() => {
    const dispatch = useDispatch();

    useEffect(() => {
        socket.on('connect', () => {
            console.log('connect');
            dispatch(updateState({ key: 'socket', value: socket }));
            dispatch(updateState({ key: 'socketId', value: socket.id }));
            dispatch(updateState({ key: 'socketOn', value: true }));
            socket.emit('room', { roomId: 'SES8888888' }, (res: any) => {
                console.log(res, 'emit');
            });
        });
        socket.on('message', data => {
            console.log(data, 'message data');
        });

        socket.on('disconnect', () => {
            dispatch(updateState({ key: 'socket', value: null }));
            dispatch(updateState({ key: 'socketId', value: '' }));
            dispatch(updateState({ key: 'socketOn', value: false }));
        });

        return () => {
            console.log(123)
            socket.off('connect');
            socket.off('disconnect');
        };
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/landingPage" element={<LandingPage />} />
                    <Route path="/main/*" element={<Main />} />
                    <Route path="/" element={<Navigate to="/landingPage" />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
});

export default App;
