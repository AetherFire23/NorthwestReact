import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { updateGameStateSlice } from "../../../Redux/gameStateSlice";
import { api } from "../../../Redux/query/generated";

function useGameStateRefresher() {
    const dispatch = useAppDispatch()
    const mainMenuSlice = useAppSelector(x => x.mainMenu)
    const [triggerFetchGameState,] = api.useLazyGetGameGetGameStateQuery()

    useEffect(() => {
        const onTick = () => {
            const player = mainMenuSlice!.userDto!.players[0]!

            // Faire le GameStateSlice pour pouvoir savoir si le timestamp y'est null ou pas.
            // et ensuite storer le result dans le slice de redux
            // logObject("this is player", player)
            triggerFetchGameState({ lastTimeStamp: undefined, playerId: player.id }).unwrap().then(fetchedGameState => {
                dispatch(updateGameStateSlice({
                    gameState: fetchedGameState,
                    currentPlayerId: player.id!,
                }))
                console.log(fetchedGameState)
            })
        }
        const intervalId = setInterval(onTick, 2000)
        return () => clearInterval(intervalId)
    }, []);
}
