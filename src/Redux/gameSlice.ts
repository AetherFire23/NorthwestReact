import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../Redux/store'
import { IVector, vectorZero } from '../Models/Vector';

interface IGameState {
    cameraPosition: IVector,
    localPlayer: IVector,
    otherPlayers: IVector[]
}
const initialState: IGameState = {
    localPlayer: vectorZero,
    cameraPosition: { x: 0, y: 0 },
    otherPlayers: [vectorZero]
}
export const counterSlice = createSlice({
    name: 'counter',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        updateLocalPlayer: (state, action: PayloadAction<IVector>) => {
            state.localPlayer.x = action.payload.x
            state.localPlayer.y = action.payload.y
        },
        updateCamera: (state, action: PayloadAction<IVector>) => {
            state.cameraPosition.x = action.payload.x
            state.cameraPosition.y = action.payload.y
        }
        // increment: (state) => {
        //     state.value += 1
        // },
    },
})

export const { updateLocalPlayer, updateCamera } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectGame = (state: RootState) => state.game
export const selectLocalPlayer = (state: RootState) => state.game.localPlayer
export const selectCamera = (state: RootState) => state.game.cameraPosition

export default counterSlice.reducer
