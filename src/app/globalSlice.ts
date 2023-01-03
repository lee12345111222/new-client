import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface GlobalState {
    socket: null | any;
    socketId: string;
    socketOn: boolean;
}
export interface Obj{
    [name:string]: any;
}

const initialState: GlobalState = {
    socket: null,
    socketId: '',
    socketOn: false,

}

export const globalSlice = createSlice({
  name: 'gloable',
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