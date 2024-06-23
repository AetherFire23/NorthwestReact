import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from './store'
import {GameStateRead} from "./query/generated.ts";
import * as shared from "../Redux/query/generated.ts"
import * as gameStateExtensions from "../Hooks/gameStateHooks.tsx"
import {first, removeElementById, removeSingle} from "../Utils/ListExtensions.tsx";

export interface IGameStateSlice {
    currentSelectedRoomId: string
    currentPlayerId: string,
    gameState: GameStateRead,
}

const initialState: IGameStateSlice = {} as IGameStateSlice
export const counterSlice = createSlice({
    name: 'counter',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        updateGameStateSlice: (state, action: PayloadAction<IGameStateSlice>) => {
            // logObject("Updating gameState slice with this data:", action.payload)
            state.currentPlayerId = action.payload.currentPlayerId
            state.gameState = action.payload.gameState
            
            // not initialized yet, so put the default room
            if (!state.currentSelectedRoomId) {
                state.currentSelectedRoomId = action.payload.gameState.localPlayerRoom.id
            }
        },
        // will need to verify if refernce of the object will work
        swapItemOptimistically: (state, action: PayloadAction<shared.Item>) => {
            const isPlayerItem = gameStateExtensions.isPlayerItem(state.gameState, action.payload)
            const selectedRoom = first(state.gameState.rooms, r => r.id === state.currentSelectedRoomId)
            if (!selectedRoom) {
                throw new Error("single please")
            }
            const playerItems = state.gameState.playerDto.items

            // if player, go to room, else go to player
            if (isPlayerItem) {
                const updatedItem = {...action.payload, ownerId: selectedRoom.id} // changes owner
                selectedRoom.items.push(updatedItem)

                state.gameState.playerDto.items = removeElementById(playerItems, action.payload)
            } else {
                selectedRoom.items = removeSingle(selectedRoom.items, x => x.id === action.payload.id)

                const updatedItem = {...action.payload, ownerId: state.gameState.playerDto.id} // changes ownwer
                state.gameState.playerDto.items.push(updatedItem)
            }
        },
    },
})

export const {updateGameStateSlice, swapItemOptimistically} = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectGameState = (state: RootState) => state.gameState.gameState
export const selectVisibleTasks = (state: RootState) => state.gameState.gameState.visibleGameTasks
export default counterSlice.reducer


// payloads
interface ChangeItemOwnershipPayload {
    item: shared.Item,

}
