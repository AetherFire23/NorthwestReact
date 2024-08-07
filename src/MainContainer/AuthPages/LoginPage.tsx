import React from 'react'
import useControlledInput from "../../Hooks/useControlledInput.tsx";

import {useRequestStatus} from "../../Hooks/useRequestStatus.tsx";
import {useAppDispatch, useAppSelector} from "../../Redux/hooks.tsx";
import {updateMainMenuSlice} from "../../Redux/mainMenuSlice.ts";
import {api, LoginResult} from "../../Redux/query/generated.ts"
import {logObject} from "../../Utils/nice.tsx";

interface ILoginPageProps {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
}

function LoginPage({setIsLoggedIn}: ILoginPageProps) {
    const {text: usernameText, control: controlUserName} = useControlledInput("username")
    const {text: passwordText, control: controlPassword} = useControlledInput("password")
    const {data,} = useRequestStatus<LoginResult>()
    const [fetchLogin,] = api.usePostUsersLoginMutation()
    const [fetchMainMenu,] = api.useLazyGetMainmenuGetMainMenuStateQuery()
    const dispatch = useAppDispatch()
    const mainMenuSlice = useAppSelector(x => x.mainMenu)

    // 
    function handleLogin() {
        fetchLogin({body: {userName: usernameText, passwordAttempt: passwordText}}).unwrap().then(r => {
            console.log("trigger result")
            console.log(r)

            fetchMainMenu({userId: r.userId}).unwrap().then(r2 => {
                logObject("this is main menu data", r2)
                dispatch(updateMainMenuSlice(r2))
                // save to localstorage
                setIsLoggedIn(true)
                window.localStorage.setItem("token", r.token!)
            })
        })

        // save to LocalStorage the token


    }

    return (
        <div>
            <input value={usernameText} onChange={controlUserName}/>
            <input value={passwordText} onChange={controlPassword}/>
            <button onClick={handleLogin}> send</button>
            {data.isFetching && (<label> fetching</label>)}
            {data.isError && (<label> Error</label>)}
            {data.isSuccess && (<label> Success </label>)}
            <button onClick={() => console.log(mainMenuSlice)}> Log MainMenu Slice</button>
        </div>
    )
}

export default LoginPage
