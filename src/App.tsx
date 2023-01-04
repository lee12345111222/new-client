import { createContext, memo, useState, useEffect, useRef, lazy, Suspense } from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Socket } from 'socket.io-client'

import initialSkt from './lib/socket'

import 'antd/dist/reset.css';
import Loader from './components/ui/Loader'
import { useDispatch, useSelector } from 'react-redux';
import { updateState } from './app/globalSlice';

const LandingPage = lazy(() => import('./container/landingPage/LandingPage'))
const Main = lazy(() => import('./container/main/Main'))


const socket = initialSkt;

const App = memo(() => {

  const dispatch = useDispatch();
  const { global }: any = useSelector(state => { return state });
  console.log(global, 'global')


  useEffect(() => {
    // fetch('http://localhost:8080/api/tutorials',{method:'post',body:JSON.stringify({title:'test',description:'测试'})})
    socket.on('connect', () => {
      console.log({ status: 'socket connected', socketId: socket.id })

      // dispatch(updateState({socket}))
      dispatch(updateState({ key: 'socket', value: socket }))
      dispatch(updateState({ key: 'socketId', value: socket.id }))
      dispatch(updateState({ key: 'socketOn', value: true }))
    })

    socket.on('disconnect', () => {
      dispatch(updateState({ key: 'socket', value: null }))
      dispatch(updateState({ key: 'socketId', value: '' }))
      dispatch(updateState({ key: 'socketOn', value: false }))
    })

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, [])

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/landingPage" element={<LandingPage />} />
          <Route path="/main/*" element={<Main />} />
        </Routes>
      </Suspense>

    </BrowserRouter>
  );
})

export default App;
