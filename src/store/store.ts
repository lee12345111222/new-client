import { configureStore, combineReducers } from '@reduxjs/toolkit'

import counterReducer from '../container/counter/countSlice';
import globalSlice from './globalSlice';
import mainSlice from './mainSlice';


export const store = configureStore({
  reducer: combineReducers({
    counter: counterReducer,
    global: globalSlice,
    main: mainSlice,
  }),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch