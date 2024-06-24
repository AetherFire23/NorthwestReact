import {api, LoginRequest, useGetUsersLoginasQuery, usePostUsersLoginMutation} from "../../Redux/query/generated.ts";
import {useEffect} from "react";
import {updateMainMenuSlice} from "../../Redux/mainMenuSlice.ts";
import {useDispatch} from "react-redux";

export default function useDevAutoLogin(
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
    setGameId: React.Dispatch<React.SetStateAction<string>>,
) {
    const [fetchUserName,] = api.useLazyGetUsersLoginasQuery();
    const [fetchLogin,] = usePostUsersLoginMutation()
    const [fetchMainMenuSlice,] = api.useLazyGetMainmenuGetMainMenuStateQuery()
    const dispatch = useDispatch();

    useEffect(() => {
        async function handleLogin() {
            const autolog = await fetchUserName({roleType: "Commander"}).unwrap() // set dev login role

            const credentials: LoginRequest = {
                userName: autolog.userName,
                passwordAttempt: "password"
            }

            const login = await fetchLogin({
                body: credentials,
            }).unwrap()

            const {userDto, timeStamp} = await fetchMainMenuSlice({userId: login.userId}).unwrap()
            dispatch(updateMainMenuSlice({userDto: userDto, timeStamp: timeStamp}))
            setIsLoggedIn(true)

            window.localStorage.setItem("token", login!.token!)

            if (userDto!.activeGames === null || userDto!.activeGames === undefined) {
                throw new Error()
            }

            const gameId = userDto!.activeGames[0]!.id!
            setGameId(gameId)
            console.log(`logged inside this game automatically: ${gameId}`)
        }

        handleLogin()
    }, []);
}