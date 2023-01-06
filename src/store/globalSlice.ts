import { createSlice, createSelector } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axiosInstance from '../lib/axios';
import axios from 'axios';

export interface GlobalState {
    socket: null | any;
    socketId: string;
    socketOn: boolean;
    setting: Obj,
    userInfo: Obj
}
export interface Obj{
    [name:string]: any;
}

const initialState: GlobalState = {
    socket: null,
    socketId: '',
    socketOn: false,
    setting: {},
    userInfo:{},
}

export const globalSlice = createSlice({
  name: 'globle',
  initialState,
  reducers: {
    updateState: (state:Obj, action: PayloadAction<any>) => {
        const {key, value} = action.payload
        state[key] = value
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateState } = globalSlice.actions

export default globalSlice.reducer

//获取排版等页面信息
export const getLanding:any = () => async (dispatch:any) => {
  let res = await axiosInstance.get('https://mock.apifox.cn/m2/2059601-0-default/54914441',{})
  console.log(res,'res')
  if(res.status === 200){
    let data = res.data;
    dispatch(updateState({key:'setting',value:data}))
  }else{

  }
}
//登录  获取token 用户信息
export const fetchLogin:any = (session:string,guest:string,callback?:()=>void) => async (dispatch:any) => {
  let res = await axiosInstance.post('https://mock.apifox.cn/m2/2059601-0-default/56962960',{session,guest})

  if(res.status === 200){
    let data = res.data.user;
    dispatch(updateState({key:'userInfo',value:data}))
    localStorage.setItem('Authorization',res.data.accessToken)
    callback?.()
  }else{

  }
}

const selectGlobal = (state: any) =>
  state.globle || {};

export const selectGlobalState = createSelector(
  [selectGlobal],
  globle => globle,
);