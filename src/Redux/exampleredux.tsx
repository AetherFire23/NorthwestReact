// import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from './store'
// import { IVector, vectorZero } from '../Models/Vector';
//
//
// const initialState:  = { // initial state
//     localPlayer: vectorZero,
//     cameraPosition: { x: 0, y: 0 },
//     otherPlayers: [vectorZero]
// }
// export const counterSlice = createSlice({
//     name: 'counter',
//     // `createSlice` will infer the state type from the `initialState` argument
//     initialState,
//     reducers: {
//         updateLocalPlayer: (state, action: PayloadAction<IVector>) => {
//             state.localPlayer.x = action.payload.x
//             state.localPlayer.y = action.payload.y
//         },
//     },
// })
//
// export const { updateLocalPlayer, updateCamera } = counterSlice.actions
//
// // Other code such as selectors can use the imported `RootState` type
// export const selectGame = (state: RootState) => state.gameSlice
// export const selectLocalPlayer = (state: RootState) => state.gameSlice.localPlayer
// export const selectCamera = (state: RootState) => state.gameSlice.cameraPosition
//
// export default counterSlice.reducer
