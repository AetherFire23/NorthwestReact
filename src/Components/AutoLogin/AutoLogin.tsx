import {useAppDispatch} from "../../Redux/hooks"
import {LoginRequest, api} from "../../Redux/query/generated"
import {updateMainMenuSlice} from "../../Redux/mainMenuSlice"
import {useEffect} from "react";

export function useAutoLogin() {
    console.log("autologin")
    const dispatch = useAppDispatch()
    const [triggerGetUserDto,] = api.usePostUsersLoginMutation()
    const [triggerFetchMainMenuState,] = api.useLazyGetMainmenuGetMainMenuStateQuery()
    const [triggerGetGameState, gameStateFetch] = api.useLazyGetGamecontrollerGameStateQuery()
    const loginRequest: LoginRequest = {
        userName: "username",
        passwordAttempt: "password",
    }

    // dispatch(updateMainMenuSlice({timeStamp: "", userDto: {}}))
    useEffect(() => {
        triggerGetUserDto({body: loginRequest}).unwrap().then((x) => {
            console.log(x)
            triggerFetchMainMenuState({userId: x.userId}).unwrap().then((x) => {
                dispatch(updateMainMenuSlice(x))

                function onIntervalTick() {
                    console.log("did the interval tick ?")
                    const firstPlayerId = x!.userDto!.players[0]!.id
                    triggerGetGameState({lastTimeStamp: "", playerId: firstPlayerId})
                }
                const intervalId = setInterval(onIntervalTick, 2000)
                return () => clearInterval(intervalId)
            })
        })
    }, [])
}
