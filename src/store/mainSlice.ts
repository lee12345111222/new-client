import { createSlice, createSelector } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axiosInstance from '../lib/axios';
import axios from 'axios';

export interface MainState {
    mainInitial: Obj,
    personScoreData: Obj,
    scoreList: Obj,
    surveysData: Obj
}
export interface Obj {
    [name: string]: any;
}

const initialState: MainState = {
    mainInitial: {},
    personScoreData: {},
    scoreList: {},
    surveysData: {}
}

export const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        updateState: (state: Obj, action: PayloadAction<any>) => {
            const { key, value } = action.payload
            state[key] = value
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateState } = mainSlice.actions

export default mainSlice.reducer

//获取main页面信息
export const getInitial: any = () => async (dispatch: any) => {
    try {
        let res = await axiosInstance.get('https://mock.apifox.cn/m1/2059601-0-default/initial', {})
        if (res.status === 200) {
            let data = res.data;
            dispatch(updateState({ key: 'mainInitial', value: data || {} }))
        } else {
            console.log('res err', res)
        }
    } catch (error) {
        console.log('error', error)
    }

}

//guestCode存在获取个人积分和中奖情况 五guestCode获取能量排行版
export const getScore: any = (guestCode?: string) => async (dispatch: any) => {
    try {
        let res = await axiosInstance.get('/scores', { params: { guestCode } })
        if (res.status === 200) {
            let data = res.data;
            if (getScore) {
                dispatch(updateState({ key: 'personScoreData', value: data || {} }))
            } else {
                dispatch(updateState({ key: 'scoreList', value: data || {} }))
            }
        } else {
            console.log('res err', res)
        }
    } catch (error) {
        console.log('error', error)
    }
}

//取得 surveys 問卷內容
export const getSurveys: any = () => async (dispatch: any) => {
    try {
        let res = await axiosInstance.get('surveys?apifoxApiId=54482929', {})
        if (res.status === 200) {
            let data = res.data;
            dispatch(updateState({ key: 'surveysData', value: data || {} }))

        } else {
            console.log('res err', res)
        }
    } catch (error) {
        console.log('error', error)
    }
}
