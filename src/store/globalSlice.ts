import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../lib/axios';

export interface GlobalState {
    socket: null | any;
    socketId: string;
    socketOn: boolean;
    setting: Obj;
    userInfo: Obj;
    userError: boolean;
}
export interface Obj {
    [name: string]: any;
}

const initialState: GlobalState = {
    socket: null,
    socketId: '',
    socketOn: false,
    setting: {},
    userInfo: {},
    userError: false,
};

export const globalSlice = createSlice({
    name: 'globle',
    initialState,
    reducers: {
        updateState: (state: Obj, action: PayloadAction<any>) => {
            const { key, value } = action.payload;
            state[key] = value;
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateState } = globalSlice.actions;

export default globalSlice.reducer;

//获取排版等页面信息
export const getLanding: any = () => async (dispatch: any) => {
    let res = await axiosInstance.get('landing/SES8888888', {});
    console.log(res, 'res');
    if (res.status === 200) {
        let data = res.data.data || {};
        localStorage.setItem('eventCode', data.eventCode);
        dispatch(updateState({ key: 'setting', value: data }));
    } else {
    }
};
//登录  获取token 用户信息
export const fetchLogin: any =
    (session: string, guest: string, callback?: () => void) =>
    async (dispatch: any) => {
        try {
            let res = await axiosInstance.post('login', { session, guest });
            if (res.status === 200) {
                dispatch(updateState({ key: 'userError', value: false }));
                let data = res.data.data.user;
                dispatch(updateState({ key: 'userInfo', value: data }));
                localStorage.setItem(
                    'Authorization',
                    res.data.data.accessToken,
                );
                localStorage.setItem('user', JSON.stringify(data));
                callback?.();
            } else {
            }
        } catch (error) {
            dispatch(updateState({ key: 'userError', value: true }));
        }
    };

const selectGlobal = (state: any) => state.globle || {};

export const selectGlobalState = createSelector(
    [selectGlobal],
    globle => globle,
);
