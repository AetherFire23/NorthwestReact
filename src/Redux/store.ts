import {configureStore} from '@reduxjs/toolkit'
import gameSlice from './gameSlice'
import mainMenuSlice from "./mainMenuSlice.ts"
import {api} from "./query/generated.ts";

export const store = configureStore({
    reducer: {
        game: gameSlice, // Assuming your slice reducers have a `reducer` property
        mainMenu: mainMenuSlice,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
