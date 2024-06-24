import React, {useState} from "react"
import LoginPage from "./AuthPages/LoginPage"
import {useMouseLog} from "./MainContainer-hooks"
import MainMenuPage from "./MainMenuPage/MainMenuPage.tsx";
import {useAutoLogin} from "./AutoLogin/useAutoLogin.tsx";

export default function MainContainer() {
    useMouseLog()
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useAutoLogin(setIsLoggedIn)
    // auto login if credentials exist
    // if only 1 game exists AND isDevTest -> jump into game

    // if MainMenuSlice exists before LoginPage due to AutoLogin,
    // skip the login page.
    // If MianMenuSlice does not exist,
    return (
        <div>
            {!isLoggedIn && (
                <div>
                    <LoginPage setIsLoggedIn={setIsLoggedIn}>
                    </LoginPage>
                </div>
            )}
            {isLoggedIn && (
                <div>
                    <MainMenuPage>

                    </MainMenuPage>
                </div>
            )}
        </div>
    )
}