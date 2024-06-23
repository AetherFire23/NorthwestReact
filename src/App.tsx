import { Provider } from "react-redux";
import { store } from "./Redux/store";
import CamChange from "./Components/CamChange";
import React, { useEffect, useState } from "react";
import { getMousePosition, useTransformations } from "./Utils/nice";
import { Vector } from "./Models/Vector";
import LocalPlayer from "./Components/LocalPlayer";
import BackGroundImage from "./Components/BackGroundImage";
import Rooms from "./Components/Rooms"
import MenuBar from './Components/Bar';
import LoginPage from "./Pages/LoginPage.tsx";

export default function App() {
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
                <GameContainer />
            </Provider>
        </div>
    )
}

function GameContainer() {
    useMouseLog()
    const [isLoggedIn, setIsLoggedIn] = useState(false)

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
                    <MenuBar />
                    <LocalPlayer />
                    <CamChange />
                    <BackGroundImage />
                    <Rooms />
                </div>
            )}
        </div>
    )
}

function useMouseLog() {
    const { camera, mouseToWorld } = useTransformations()

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



// Does something on click and passes click information as event
// lesson : you can apss anny additional dependencies through React.DependencyList
export function useMouseEffect(clickHandler: (screenPosition: Vector, worldPosition: Vector) => void, deps?: React.DependencyList | undefined) {
    const { mouseToWorld } = useTransformations()

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
