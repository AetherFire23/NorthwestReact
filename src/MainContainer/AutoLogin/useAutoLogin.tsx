import {useTokenLocalStorage} from "./useTokenLocalStorage.tsx";
import {api, useGetMainmenuGetMainMenuStateQuery, usePostUsersTokenloginMutation} from "../../Redux/query/generated.ts";
import React, {useEffect} from "react";
import {useAppDispatch} from "../../Redux/hooks.tsx";
import {updateMainMenuSlice} from "../../Redux/mainMenuSlice.ts";

export function useAutoLogin(setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>) {
    const tokenStorage = useTokenLocalStorage()
    const [fetchTokenLogin,] = usePostUsersTokenloginMutation()
    const [fetchMainMenuSlice,] = api.useLazyGetMainmenuGetMainMenuStateQuery()
    const dispatch = useAppDispatch()

    useEffect(() => {
        // check to see if we can login by token
        // Remember prepareheaders of rtk query automatically tries to get token from localstorage
        fetchTokenLogin()
            .unwrap()
            .then((loginResult) => {
                fetchMainMenuSlice({userId: loginResult.userId})
                    .unwrap()
                    .then(r => {
                        dispatch(updateMainMenuSlice({userDto: r.userDto, timeStamp: r.timeStamp}))
                        setIsLoggedIn(true)
                    })
            })
            .catch(e => {
                console.log("could not login with provided token")
            })
    }, []);
}