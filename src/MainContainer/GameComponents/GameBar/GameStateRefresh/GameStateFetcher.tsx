import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@src/Redux/hooks.tsx";
import {api} from "@src/Redux/query/generated";
import {updateGameStateSlice} from "@src/Redux/gameStateSlice";

export default function useGameStateRefresher(gameId: string) {
    const dispatch = useAppDispatch()
    const mainMenuSlice = useAppSelector(x => x.mainMenu)
    const [triggerFetchGameState,] = api.useLazyGetGameGetGameStateQuery()

    useEffect(() => {
        const onTick = () => {
            // @ts-expect-error sdsds
            const player = mainMenuSlice!.userDto.players.find(x => x.gameId === gameId)

            // Faire le GameStateSlice pour pouvoir savoir si le timestamp y'est null ou pas.
            // et ensuite storer le result dans le slice de redux
            // logObject("this is player", player)
            triggerFetchGameState({lastTimeStamp: undefined, playerId: player!.id}).unwrap().then(fetchedGameState => {
                // @ts-expect-error sdsds
                dispatch(updateGameStateSlice({
                    gameState: fetchedGameState,
                    currentPlayerId: player!.id!,
                }))
                console.log(fetchedGameState)
            })
        }
        const intervalId = setInterval(onTick, 2000)
        return () => clearInterval(intervalId)
    }, []);
}
