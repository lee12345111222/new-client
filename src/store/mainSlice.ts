import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../lib/axios';
import axios from 'axios';

export interface MainState {
    mainInitial: Obj;
    personScoreData: Obj;
    scoreList: Obj;
    surveysData: Obj;
    leaders: Obj[];
    socket: null | any;
    socketId: string;
    socketOn: boolean;
    postSurveys: Obj[];
    middleSurveys: Obj[];
    userPostSurveys: boolean;
    restPostSurveyPage: number;
}
export interface Obj {
    [name: string]: any;
}

const initialState: MainState = {
    mainInitial: {},
    personScoreData: {},
    scoreList: {},
    surveysData: {},
    leaders: [],
    socket: null,
    socketId: '',
    socketOn: false,
    postSurveys: [],
    middleSurveys: [],
    userPostSurveys: false,
    restPostSurveyPage: 0,
};

export const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        updateState: (state: Obj, action: PayloadAction<any>) => {
            const { key, value } = action.payload;
            state[key] = value;
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateState } = mainSlice.actions;

export default mainSlice.reducer;

//获取main页面信息
export const getInitial: any = () => async (dispatch: any) => {
    try {
        let res = await axiosInstance.get('initial', {});
        if (res.status === 200) {
            let data = res.data.data;
            dispatch(updateState({ key: 'mainInitial', value: data || {} }));
        } else {
            console.log('res err', res);
        }
    } catch (error) {
        console.log('error', error);
    }
};

//guestCode存在获取个人积分和中奖情况 五guestCode获取能量排行版
export const getScore: any = (guestCode?: string) => async (dispatch: any) => {
    try {
        let res = await axiosInstance.get('/scores', { params: { guestCode } });
        if (res.status === 200) {
            let data = res.data;
            if (getScore) {
                dispatch(
                    updateState({ key: 'personScoreData', value: data || {} }),
                );
            } else {
                dispatch(updateState({ key: 'scoreList', value: data || {} }));
            }
        } else {
            console.log('res err', res);
        }
    } catch (error) {
        console.log('error', error);
    }
};

//取得 surveys 問卷內容
export const getSurveys: any = () => async (dispatch: any) => {
    try {
        let res = await axiosInstance.get('surveys?apifoxApiId=54482929', {});
        if (res.status === 200) {
            let data = res.data;
            dispatch(updateState({ key: 'surveysData', value: data || {} }));
        } else {
            console.log('res err', res);
        }
    } catch (error) {
        console.log('error', error);
    }
};
//取得能量排行版
export const getRank: any = () => async (dispatch: any) => {
    try {
        let res = await axiosInstance.get('rank', {});
        if (res.status === 200) {
            let data = res.data.data;
            dispatch(updateState({ key: 'leaders', value: data || [] }));
        } else {
            console.log('res err', res);
        }
    } catch (error) {
        console.log('error', error);
    }
};
//向上滑动获取聊天记录
export const onGetRestHistoryMessages: any =
    (createdAt: string) => async (dispatch: any, getState: any) => {
        try {
            // const mainInitial
            let res = await axiosInstance.get('messages', {
                params: { page: createdAt },
            });
            if (res.status === 200) {
                let data = res.data.data.messages;

                if (data?.length) {
                    const { mainInitial = {} } = getState().main;
                    const {
                        chat: { messages = [] },
                    } = mainInitial;
                    if (messages) {
                        let newMsg = [...data, ...messages];

                        dispatch(
                            updateState({
                                key: 'mainInitial',
                                value: {
                                    ...mainInitial,
                                    chat: {
                                        ...mainInitial.chat,
                                        messages: newMsg,
                                    },
                                },
                            }),
                        );
                    }
                }
            } else {
                console.log('res err', res);
            }
        } catch (error) {
            console.log('error', error);
        }
    };

export const postMessage: any = (after: boolean) => async (dispatch: any) => {
    try {
        let res = await axiosInstance.post(
            '/surveys/' + (after ? 'SUR88-4' : 'SUR88-5'),
            {},
        );
    } catch (error) {
        dispatch(updateState({ key: 'userError', value: true }));
    }
};
