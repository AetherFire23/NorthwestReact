import { configureStore } from '@reduxjs/toolkit'
import gameSlice from './gameSlice'
// ...

export const myAppStore = configureStore({
  reducer: {
    gameSlice: gameSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof myAppStore.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof myAppStore.dispatch