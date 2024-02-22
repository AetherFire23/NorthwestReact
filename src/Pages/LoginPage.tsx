import React from 'react'
import useControlledInput from "../Hooks/useControlledInput.tsx";
import {useAppDispatch} from "../Redux/hooks.tsx";
import {Client, LoginRequest} from "../Redux/testgen.ts";

interface ILoginPageProps {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
}

function LoginPage({setIsLoggedIn}: ILoginPageProps) {
    const dispatch = useAppDispatch()
    const {text: usernameText, control: controlUserName} = useControlledInput("username")
    const {text: passwordText, control: controlPassword} = useControlledInput("password")
    // const [triggerLogin,] = api.usePostUsersLoginMutation()
    // const [triggerMainMenu,] = api.useLazyGetMainmenuGetMainMenuStateQuery()
    const s = new Client("http://localhost:7060")


    function handleLogin() {
        s.login(new LoginRequest({userName: "username", passwordAttempt: "password"})).then(loginResult => {
            console.log(loginResult)
            setIsLoggedIn(true)

            s.getMainMenuState(loginResult.userId).then(mainMenuContext => {
                console.log(mainMenuContext)

            })
        })


        // triggerLogin({body: {userName: usernameText, passwordAttempt: passwordText}}).unwrap().then(r => {
        //     // save some info inside localstorage
        //     window.localStorage.setItem("userId", r.userId!)
        //     window.localStorage.setItem("token", r.token!)
        //
        // after login, fetch the main menu.
        // triggerMainMenu({userId: r.userId}).unwrap().then(r => {
        //     console.log("test2")
        //     dispatch(updateMainMenuSlice({userDto: r.userDto, timeStamp: r.timeStamp}))
        //     setIsLoggedIn(true)
        //     console.log("test3")
        // })
        //
        //
        // })
    }

    return (
        <div>
            <input value={usernameText} onChange={controlUserName}/>
            <input value={passwordText} onChange={controlPassword}/>
            <button onClick={handleLogin}> send</button>
        </div>
    )
}

export default LoginPage
