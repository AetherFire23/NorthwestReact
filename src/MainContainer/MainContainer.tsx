import React, {useState} from "react"
import LoginPage from "./AuthPages/LoginPage"
import {useMouseLog} from "./MainContainer-hooks"
import MainMenuPage from "./MainMenuPage/MainMenuPage.tsx";
import useDevAutoLogin from "./AutoLogin/useDevAutoLogin.tsx";
import GameBar from "./GameComponents/GameBar/GameBar.tsx";
import LocalPlayer from "./GameComponents/LocalPlayer.tsx";
import CamChange from "./GameComponents/CamChange.tsx";
import BackGroundImage from "./GameComponents/BackGroundImage.tsx";
import Rooms from "./GameComponents/Rooms.tsx";
import {useAutoLogin} from "./AutoLogin/useAutoLogin.tsx";
import OtherPlayers from "./GameComponents/OtherPlayers.tsx";
import GameBar2 from "./GameComponents/GameBar/GameBar2.tsx";



export default function MainContainer() {
    useMouseLog()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    // const [gameId, setGameId] = useState("")

    // gameId should  be in ReduxState so that I can access it from everywhere
    const [gameId, setGameId] = useState("")

    useDevAutoLogin(setIsLoggedIn, setGameId)


    //useAutoLogin(setIsLoggedIn)




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
            {(isLoggedIn && !gameId) && (
                <div>
                    <MainMenuPage setGameId={setGameId}>

                    </MainMenuPage>
                </div>
            )}
            {(isLoggedIn && gameId) && (
                <div>
                    {/*<GameBar gameId={gameId}/>*/}
                    <GameBar2 gameId={gameId}/>
                    <LocalPlayer/>
                    <CamChange/>
                    <BackGroundImage/>
                    <Rooms/>

                </div>
            )}
        </div>
    )
}