import {useTokenLocalStorage} from "./useTokenLocalStorage.tsx";
import {
    api,
    LoginResult,
    useGetMainmenuGetMainMenuStateQuery,
    usePostUsersTokenloginMutation
} from "../../Redux/query/generated.ts";
import React, {useEffect} from "react";
import {useAppDispatch} from "../../Redux/hooks.tsx";
import {updateMainMenuSlice} from "../../Redux/mainMenuSlice.ts";

export function useAutoLogin(setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>) {
    const [fetchTokenLogin,] = usePostUsersTokenloginMutation()
    const [fetchMainMenuSlice,] = api.useLazyGetMainmenuGetMainMenuStateQuery()
    const dispatch = useAppDispatch()

    useEffect(() => {
        // Remember prepareheaders of rtk query automatically tries to get token from localstorage
        // So if token value in localstorage was already set, we just have to try to make a request and
        // check if it fails.

        async function handleLogin() {
            try {
                const {userId} = await fetchTokenLogin().unwrap()
                const {userDto, timeStamp} = await fetchMainMenuSlice({userId: userId}).unwrap()
                dispatch(updateMainMenuSlice({userDto: userDto, timeStamp: timeStamp}))
                setIsLoggedIn(true)

            } catch (e) {
                console.log("Could not login with provided token in localstorage")
            }
            console.log("handle login function")
        }

        handleLogin()
    }, []);
}
