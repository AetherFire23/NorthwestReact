import {Provider} from "react-redux";
import {store} from "./Redux/store";
import CamChange from "./Components/CamChange";
import React, {useEffect, useState} from "react";
import {useAppSelector} from "./Redux/hooks";
import {getMousePosition, useTransformations} from "./Utils/nice";
import {Vector} from "./Models/Vector";
import LocalPlayer from "./Components/LocalPlayer";
import BackGroundImage from "./Components/BackGroundImage";
import {selectCamera} from "./Redux/gameSlice";
import Rooms from "./Components/Rooms"
import Bar from './Components/Bar';
import LoginPage from "./Pages/LoginPage.tsx";

export default function App() {
    // give the gameobject (with id I guess?)
    // then the gameobject can modify the redux state
    // I guess the camera would be inside the redux container
    // Then the component could modify itself + other components: i.e. :
    return (
        <div style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
            top: "0",
            right: "0",
            bottom: "0",
            left: "0"
        }}>
            <Provider store={store}>
                <GameContainer/>
            </Provider>
        </div>
    )
}

function GameContainer() {
    useMouseLog()
  //  useAutoLogin()

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    // const [triggerGetQuery, {isError}] = api.useLazyGetMainmenuGetMainMenuStateQuery()

    // useEffect(() => {
    //     let incrementCount = 0;
    //
    //     // login req
    //     const logRe: LoginRequest = {
    //         passwordAttempt: "sex",
    //         userName: "sss",
    //     }
    //
    //     const onInterval = () => {
    //        // console.log(incrementCount)
    //         incrementCount++
    //     }
    //     setInterval(onInterval, 1000)
    // }, [])


    // todo :
    // Log page
    // inventory
    // Chat system
    // Task system

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

                    <Bar/>
                    <LocalPlayer/>
                    <CamChange/>
                    <BackGroundImage/>
                    <Rooms/>
                </div>
            )}
        </div>
    )
}

function useMouseLog() {
    const {camera, mouseToWorld} = useTransformations()

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            console.log(`Mouse position: ${e.clientX}x, ${e.clientY}y`)

            const world = mouseToWorld(e)
            console.log(`Mouse World: ${world.x}x ${world.y}y`)
        }
        window.addEventListener("click", handleClick)

        return () => window.removeEventListener("click", handleClick)
    }, [camera])
}

// just the generic way I guess to add an effect / cleanup for the mouse by passing worldVec, screenVec...
// lesson : you can apss anny additional dependencies through React.DependencyList
export function useMouseEffect(clickHandler: (screenPosition: Vector, worldPosition: Vector) => void, deps?: React.DependencyList | undefined) {
    const camera = useAppSelector(selectCamera)
    const {mouseToWorld} = useTransformations()

    useEffect(() => {
        function onClick(e: MouseEvent) {
            const worldPos = mouseToWorld(e)
            const screenPos = getMousePosition(e)

            clickHandler(screenPos, worldPos)
        }

        window.addEventListener("click", onClick)

        return () => window.removeEventListener("click", onClick)

    }, [deps])
}
