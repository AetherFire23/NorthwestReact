import {api, GetMainmenuGetMainMenuStateApiArg, MainMenuState} from "../../Redux/query/generated.ts";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../Redux/hooks.tsx";
import {updateMainMenuSlice} from "../../Redux/mainMenuSlice.ts";


export function useAutoJoinGame() {

}


export function useMainMenuRefresh() {
    const userId = useAppSelector(x => x!.mainMenu!.userDto!.id)
    const dispatch = useAppDispatch()

    if (userId === undefined) throw new Error("invalid user")

    const [fetchMainMenu,] = api.useLazyGetMainmenuGetMainMenuStateQuery()

    useEffect(() => {
        const onTick = () => {
            const fetchargs: GetMainmenuGetMainMenuStateApiArg = {
                userId: userId
            }
            fetchMainMenu(fetchargs).unwrap().then(fetchedGameState => {
                const state: MainMenuState = {
                    ...fetchedGameState,
                }
                dispatch(updateMainMenuSlice(state))
            })

            // Faire le GameStateSlice pour pouvoir savoir si le timestamp y'est null ou pas.
            // et ensuite storer le result dans le slice de redux
            // logObject("this is player", player)


            // triggerFetchGameState({lastTimeStamp: undefined, playerId: player.id}).unwrap().then(fetchedGameState => {
            //     //@ts-expect-error sdsd
            //     dispatch(updateGameStateSlice({
            //         gameState: fetchedGameState,
            //         currentPlayerId: player.id!,
            //     }))
            //     console.log(fetchedGameState)
            // })
        }
        const intervalId = setInterval(onTick, 2000)
        return () => clearInterval(intervalId)
    }, []);

}