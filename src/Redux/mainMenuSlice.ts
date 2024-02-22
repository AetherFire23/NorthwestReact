import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { MainMenuState } from './query/generated';
const mainMenuState: MainMenuState = {
    timeStamp: "",
    userDto: {},
}
export const mainMenuSlice = createSlice({
    name: 'mainMenu',

    // `createSlice` will infer the state type from the `initialState` argument
    initialState: mainMenuState,
    reducers: {
        updateMainMenuSlice: (state, action: PayloadAction<MainMenuState>) => {
            console.log('updating main menu slice with this data;')
            console.log(action.payload)
            state.timeStamp = action.payload.timeStamp
            state.userDto = action.payload.userDto
        },
    },
})

export const { updateMainMenuSlice } = mainMenuSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCamera = (state: RootState) => state.gameSlice.cameraPosition

export default mainMenuSlice.reducer
